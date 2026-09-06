import { useEffect, useRef, useState } from "react";
const links = [
  ["WORK", "projects"],
  ["ABOUT", "about"],
  ["SKILLS", "skills"],
  ["EXPERIENCE", "career"],
  ["CONTACT", "contact"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setCompact(window.scrollY > 40);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    links.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  return (
    <header className={`navigation ${compact ? "compact" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <a className="logo" href="#home" aria-label="MZZ — back to home">
        MZZ<span>.</span>
      </a>
      <nav
        aria-label="Main navigation"
        id="main-navigation"
        className={open ? "nav-links open" : "nav-links"}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        {links.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
      <a className="availability mono" href="#contact">
        <i /> AVAILABLE FOR WORK
      </a>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-controls="main-navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "CLOSE −" : "MENU ＋"}
      </button>
    </header>
  );
}
