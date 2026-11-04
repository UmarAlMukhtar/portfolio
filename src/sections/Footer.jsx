import { socialImgs } from "../constants";

const socialLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X",
  insta: "Instagram",
};

const Footer = ({ buildState = "ready" }) => (
  <footer className="site-footer section-wrap build-section" inert={buildState !== "ready"}>
    <div className="section-rule" data-build-piece="line" aria-hidden="true" />
    <div className="site-footer__identity" data-build-piece="box">
      <a className="site-footer__name" href="#home" data-build-piece="text">
        Umar Al Mukhtar
      </a>
      <p data-build-piece="text">Backend-focused software developer</p>
      <a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer" data-build-piece="text">
        Resume <span aria-hidden="true">↗</span>
      </a>
    </div>

    <nav aria-label="Social profiles" data-build-piece="box">
      <ul className="social-links">
        {socialImgs.map((social) => (
          <li key={social.url}>
              <a href={social.url} target="_blank" rel="noreferrer" data-build-piece="text">
              {socialLabels[social.name]}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <div className="site-footer__meta" data-build-piece="box">
      <a href="mailto:umar1868807@gmail.com" data-build-piece="text">umar1868807@gmail.com</a>
      <p data-build-piece="text">© {new Date().getFullYear()} Umar Al Mukhtar Ibrahimkutty</p>
    </div>
  </footer>
);

export default Footer;
