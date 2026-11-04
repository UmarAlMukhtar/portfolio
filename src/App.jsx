import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "lenis/dist/lenis.css";
import NavBar from "./components/NavBar";
import Footer from "./sections/Footer";
import IntroLoader from "./components/IntroLoader";
import Portfolio from "./sections/Portfolio";
import ScrollSwarm from "./components/ScrollSwarm";
import { runSwarmBuild } from "./components/runSwarmBuild";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const motionQuery = "(prefers-reduced-motion: no-preference)";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [loaderDone, setLoaderDone] = useState(false);
  const [scrollBuildEnabled, setScrollBuildEnabled] = useState(() => window.matchMedia(motionQuery).matches);
  const [buildSkipped, setBuildSkipped] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    const fineMotion = window.matchMedia(motionQuery);
    const syncMotionPreference = () => setScrollBuildEnabled(fineMotion.matches);
    syncMotionPreference();
    fineMotion.addEventListener("change", syncMotionPreference);

    return () => fineMotion.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!scrollBuildEnabled) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.075,
    });
    lenis.on("scroll", ScrollTrigger.update);

    return () => lenis.destroy();
  }, [scrollBuildEnabled]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const buildState = buildSkipped || !scrollBuildEnabled
    ? "ready"
    : !loaderDone
      ? "loading"
      : "building";

  useGSAP(() => {
    if (buildState !== "building") return;

    const motion = gsap.matchMedia();
    motion.add(
      { allowed: motionQuery, touch: "(hover: none), (pointer: coarse)" },
      (context) => context.conditions.allowed ? runSwarmBuild(pageRef.current) : undefined,
    );

    return () => motion.revert();
  }, { scope: pageRef, dependencies: [buildState], revertOnUpdate: true });

  return (
    <div ref={pageRef} className="portfolio-page" data-theme={theme} data-build-state={buildState}>
      <div className="scroll-progress" aria-hidden="true" />
      <IntroLoader onComplete={setLoaderDone} />
      {scrollBuildEnabled && !buildSkipped && (
        <button
          className="scroll-build-skip"
          type="button"
          onClick={() => setBuildSkipped(true)}
        >
          Skip animation
        </button>
      )}
      <ScrollSwarm />
      <NavBar theme={theme} onThemeToggle={toggleTheme} inert={buildState === "building"} />
      <Portfolio buildState={buildState} />
      <Footer buildState={buildState} />
    </div>
  );
};

export default App;
