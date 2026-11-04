import { expCards, leadershipCards } from "../constants";

const projects = [
  {
    name: "FocusFlow",
    category: "Open source · Desktop product",
    description:
      "An open-source desktop app that turns screen recordings into focused demo videos using click tracking, automatic zoom, timeline generation, and FFmpeg export. Built with Rust, Tauri, React, and FFmpeg. Top 5 Winner at the Codex Community Hackathon Kochi 2026.",
    image: "/images/project1.png",
    imageAlt: "FocusFlow screen recorder and export settings",
    href: "https://focusflow.demosnap.tech",
    stack: ["Rust", "Tauri", "React", "FFmpeg"],
    featured: true,
  },
  {
    name: "MatchUndo",
    category: "Web product · Kerala",
    description:
      "A public screening discovery platform for Kerala, built with Next.js, Prisma, Supabase, and Vercel.",
    image: "/images/project2.png",
    imageAlt: "MatchUndo sports watch party directory",
    href: "https://matchundo.demosnap.tech",
    stack: ["Next.js", "Prisma", "Supabase", "Vercel"],
  },
  {
    name: "Client & Community Projects",
    category: "Selected work · Community",
    description:
      "Websites and product prototypes for local businesses, nonprofit initiatives, IEEE activities, and student-led tech communities.",
    image: "/images/project3.png",
    imageAlt: "IEEE student community event website",
    href: "https://github.umaralmukhtar.dev",
    stack: ["Websites", "Community", "IEEE"],
  },
];

const skillGroups = [
  {
    title: "Backend & data",
    items: ["Node.js", "Python", "API development", "MongoDB", "Prisma"],
  },
  {
    title: "Product engineering",
    items: ["Rust", "Tauri", "React", "Next.js", "FFmpeg"],
  },
  {
    title: "Infrastructure & delivery",
    items: ["Supabase", "Vercel", "Git"],
  },
];

const visibleLeadership = leadershipCards.filter(
  ({ title }) => title !== "Chair - IEEE Sensors Council SBC LBSCEK",
);

const ProjectCard = ({ project, index }) => (
  <article
    className={`project-card${project.featured ? " project-card--featured" : ""}`}
    data-build-component
    data-build-piece={index === 0 ? "box" : "duplicate"}
  >
    <a
      className="project-card__visual"
      data-build-piece="box"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.name}`}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        loading={index === 0 ? "eager" : "lazy"}
        data-build-piece="media"
      />
      <span className="project-card__open" aria-hidden="true">↗</span>
    </a>
    <div className="project-card__details">
      <p className="eyebrow" data-build-piece="text">
        <span>0{index + 1}</span> / {project.category}
      </p>
      <h3 data-build-piece="text">
        <a href={project.href} target="_blank" rel="noreferrer">
          {project.name}
        </a>
      </h3>
      <p className="project-card__description" data-build-piece="text">{project.description}</p>
      <ul className="project-card__stack" aria-label={`${project.name} technologies`}>
        {project.stack.map((item) => <li key={item} data-build-piece="text">{item}</li>)}
      </ul>
    </div>
  </article>
);

const Portfolio = ({ buildState = "ready" }) => {
  return (
  <main inert={buildState === "loading"}>
    <section className="hero section-wrap build-section" id="home" aria-labelledby="hero-title" inert={buildState === "building"}>
      <div className="hero__meta" data-build-component data-build-piece="box">
        <span data-build-piece="text">UMAR AL MUKHTAR / PORTFOLIO</span>
        <span data-build-piece="text">© {new Date().getFullYear()}</span>
      </div>

      <h1 id="hero-title" data-build-component>
        <span data-build-piece="text">Backend</span>
        <span data-build-piece="text">Engineer</span>
      </h1>

      <div className="hero__bottom">
        <div className="hero__intro" data-build-component>
          <p className="eyebrow" data-build-piece="text">Backend-focused software developer</p>
          <p data-build-piece="text">
            APIs, data, and product engineering for useful software.
          </p>
          <a className="line-link" href="#work" data-build-piece="text">
            Selected work <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>
      <a className="hero__scroll" href="#about" data-build-piece="text">SCROLL TO EXPLORE ↓</a>
    </section>

    <section className="about-section section-wrap build-section" id="about" aria-labelledby="about-title" inert={buildState === "building"}>
      <div className="section-rule" data-build-piece="line" aria-hidden="true" />
      <div className="section-label" data-build-piece="text">
        <span>01</span>
        <span>ABOUT</span>
      </div>
      <div className="about-section__content">
        <h2 id="about-title" data-build-piece="text">Hey, I’m Umar.</h2>
        <p data-build-piece="text">
          My focus is backend engineering: shaping APIs, data flows, and
          practical workflows that make software useful. I also build across
          the product when a project needs it.
        </p>
      </div>
    </section>

    <section className="focus-section section-wrap build-section" aria-labelledby="focus-title" inert={buildState === "building"}>
      <div className="section-rule" data-build-piece="line" aria-hidden="true" />
      <div className="section-heading">
        <p className="eyebrow" data-build-piece="text">02 / THE TOOLKIT</p>
        <h2 id="focus-title" data-build-piece="text">What I work with.</h2>
      </div>
      <div className="focus-list">
        {skillGroups.map((group, index) => (
          <article className="focus-row" data-build-component key={group.title} data-build-piece={index === 0 ? "box" : "duplicate"}>
            <span className="focus-row__number" data-build-piece="text">0{index + 1}</span>
            <h3 data-build-piece="text">{group.title}</h3>
            <ul>
              {group.items.map((item) => <li key={item} data-build-piece="text">{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="work-section section-wrap build-section" id="work" aria-labelledby="work-title" inert={buildState === "building"}>
      <div className="section-rule" data-build-piece="line" aria-hidden="true" />
      <div className="section-heading section-heading--work">
        <div>
          <p className="eyebrow" data-build-piece="text">03 / SELECTED WORK</p>
          <h2 id="work-title" data-build-piece="text">Things I’ve built.</h2>
        </div>
        <p data-build-piece="text">Selected projects from product and community work.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>

    <section className="experience-section section-wrap build-section" id="experience" aria-labelledby="experience-title" inert={buildState === "building"}>
      <div className="section-rule" data-build-piece="line" aria-hidden="true" />
      <div className="section-heading">
        <p className="eyebrow" data-build-piece="text">04 / EXPERIENCE</p>
        <h2 id="experience-title" data-build-piece="text">Experience &amp; contribution.</h2>
      </div>
      <div className="experience-list">
        {expCards.map((item, index) => (
          <article className="experience-item" data-build-component key={item.title} data-build-piece={index === 0 ? "box" : "duplicate"}>
            <div className="experience-item__heading">
              <p className="eyebrow" data-build-piece="text">{item.date}</p>
              <h3 data-build-piece="text">{item.title}</h3>
            </div>
            <ul>
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility} data-build-piece="text">{responsibility}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="leadership-block">
        <p className="eyebrow" data-build-piece="text">COMMUNITY</p>
        <div className="leadership-list">
          {visibleLeadership.map((item, index) => (
            <article className="leadership-item" data-build-component key={item.title} data-build-piece={index === 0 ? "box" : "duplicate"}>
              <p className="eyebrow" data-build-piece="text">{item.date}</p>
              <h3 data-build-piece="text">{item.title}</h3>
              <p data-build-piece="text">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="contact-section section-wrap build-section" id="contact" aria-labelledby="contact-title" inert={buildState === "building"}>
      <div className="section-rule" data-build-piece="line" aria-hidden="true" />
      <p className="eyebrow" data-build-piece="text">05 / CONTACT</p>
      <h2 id="contact-title" data-build-piece="text">Let’s talk<span>.</span></h2>
      <a className="contact-email" href="mailto:umar1868807@gmail.com" data-build-piece="text">
        umar1868807@gmail.com <span aria-hidden="true">↗</span>
      </a>
    </section>
  </main>
  );
};

export default Portfolio;
