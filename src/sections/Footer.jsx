import React from "react";
import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center md:items-start gap-3">
          <div>
            <h3 className="font-semibold text-lg">
              Umar Al Mukhtar
            </h3>

            <p className="text-white-50 text-sm">
              Full Stack Developer • AI Product Builder
            </p>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm transition-all hover:border-white hover:bg-white hover:text-black"
          >
            <span>📄</span>
            Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="socials">
          {socialImgs.map((img) => (
            <a
              className="icon"
              target="_blank"
              rel="noreferrer"
              href={img.url}
              key={img.url}
              aria-label={img.name}
            >
              <img src={img.imgPath} alt={img.name} />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center md:items-end gap-2">
          <a
            href="mailto:umar1868807@gmail.com"
            className="text-white-50 hover:text-white transition-colors"
          >
            umar1868807@gmail.com
          </a>

          <p className="text-center md:text-end text-white-50">
            © {new Date().getFullYear()} Umar Al Mukhtar Ibrahimkutty
          </p>

          <p className="text-center md:text-end text-white-50 text-sm">
            Built with React, Three.js & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;