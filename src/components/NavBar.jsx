import { useRef, useState } from "react";
import { navLinks } from "../constants";

const NavBar = ({ theme, onThemeToggle, inert = false }) => {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  const closeMenu = () => setOpen(false);
  const handleKeyDown = (event) => {
    if (event.key === "Escape" && open) {
      closeMenu();
      menuButton.current?.focus();
    }
  };

  return (
    <header className="site-header" onKeyDown={handleKeyDown} inert={inert}>
      <div className="site-header__inner" data-build-piece="box">
        <a className="site-brand" href="#home" onClick={closeMenu} data-build-piece="text">
          Umar Al Mukhtar
        </a>

        <nav className="site-nav site-nav--desktop" aria-label="Primary navigation" data-build-piece="box">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name}>
                <a href={link} onClick={closeMenu} data-build-piece="text">{name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            aria-pressed={theme === "dark"}
            onClick={onThemeToggle}
            data-build-piece="text"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-navigation-menu"
            onClick={() => setOpen((current) => !current)}
            ref={menuButton}
            data-build-piece="text"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        className="site-nav site-nav--mobile"
        id="site-navigation-menu"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        <ul>
          {navLinks.map(({ link, name }) => (
            <li key={name}>
              <a href={link} onClick={closeMenu}>{name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
