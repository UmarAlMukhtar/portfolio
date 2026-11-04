import { useEffect, useState } from "react";

const greetings = ["Hello", "Hola", "Bonjour", "नमस्ते"];

const IntroLoader = ({ onComplete }) => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [phase, setPhase] = useState("open");
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    if (phase !== "open") return;

    if (prefersReducedMotion) {
      const timeout = window.setTimeout(() => setPhase("done"), 900);
      return () => window.clearTimeout(timeout);
    }

    const interval = window.setInterval(() => {
      setGreetingIndex((current) => (current + 1) % greetings.length);
    }, 150);
    const timeout = window.setTimeout(() => setPhase("closing"), 680);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [phase, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "closing") return;

    const timeout = window.setTimeout(() => setPhase("done"), 380);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") onComplete?.(true);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div className={`intro-loader${phase === "closing" ? " intro-loader--closing" : ""}`}>
      <p className="intro-loader__eyebrow">UMAR AL MUKHTAR / PORTFOLIO</p>
      <p className="intro-loader__greeting" key={greetingIndex} aria-hidden="true">
        {greetings[greetingIndex]}
      </p>
      <span className="intro-loader__count" aria-hidden="true">
        {prefersReducedMotion ? "01 / 01" : `0${greetingIndex + 1} / 0${greetings.length}`}
      </span>
      <button
        className="intro-loader__skip"
        type="button"
        onClick={() => setPhase(prefersReducedMotion ? "done" : "closing")}
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
};

export default IntroLoader;
