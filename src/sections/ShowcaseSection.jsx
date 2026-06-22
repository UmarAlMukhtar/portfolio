import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: (index + 1) * 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=10",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" }
    );
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase mb-7">
      <div className="w-full">
        <div className="showcaselayout">
          <div className="first-project-wrapper" ref={project1Ref}>
            <a
              href="https://focusflow.demosnap.tech"
              target="_blank"
              rel="noreferrer"
              className="h-full flex flex-col"
            >
              <div className="image-wrapper">
                <img src="/images/project1.png" alt="FocusFlow desktop app" />
              </div>
              <div className="text-content">
                <h2>FocusFlow</h2>
                <p className="text-white-50">
                  An open-source desktop app that turns screen recordings into
                  focused demo videos using click tracking, automatic zoom,
                  timeline generation, and FFmpeg export. Built with Rust,
                  Tauri, React, and FFmpeg. Top 5 Winner at the Codex Community
                  Hackathon Kochi 2026.
                </p>
              </div>
            </a>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <a
                href="https://matchundo.demosnap.tech"
                target="_blank"
                rel="noreferrer"
              >
                <div className="image-wrapper bg-[#ffefdb] p-5">
                  <img src="/images/project2.png" alt="MatchUndo" />
                </div>
                <h2>MatchUndo</h2>
                <p className="text-white-50 mt-3">
                  A public screening discovery platform for Kerala, built with
                  Next.js, Prisma, Supabase, and Vercel.
                </p>
              </a>
            </div>

            <div className="project" ref={project3Ref}>
              <a
                href="https://github.umaralmukhtar.dev"
                target="_blank"
                rel="noreferrer"
              >
                <div className="image-wrapper bg-[#ffe7db] p-5">
                  <img src="/images/project3.png" alt="Client and community websites" />
                </div>
                <h2>Client & Community Web Projects</h2>
                <p className="text-white-50 mt-3">
                  Websites and product prototypes for local businesses,
                  nonprofit initiatives, IEEE activities, and student-led tech
                  communities.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;