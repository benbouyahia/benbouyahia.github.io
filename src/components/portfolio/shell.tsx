import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionToggle, SplitWords } from "@/components/portfolio/motion";
import { identity } from "@/lib/portfolio";
const links = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
] as const;
export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  // Slides away while scrolling down and returns on any scroll up.
  useEffect(() => {
    setHidden(false);
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - last) < 8) return;
      setHidden(current > last && current > 120);
      last = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className={hidden && !open ? "site-header is-hidden" : "site-header"}>
        <div className="container navigation">
          <Link to="/" className="brand" aria-label="Ayoub Ben Bouyahia home">
            <span className="brand-name">Ayoub Ben Bouyahia</span>
            <span className="brand-role">BI Analyst</span>
          </Link>
          <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={path.startsWith(link.to) ? "nav-link active" : "nav-link"}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="portfolio" className="nav-contact">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Let’s talk <ArrowUpRight />
              </Link>
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
    </>
  );
}
export function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-name">{identity.name}</div>
        <div className="footer-inner">
          <span>© 2026 Ayoub Ben Bouyahia</span>
          <span className="footer-note">
            Business Intelligence &amp; Analytics · Tunis, Tunisia
          </span>
          <div className="footer-links">
            <MotionToggle />
            <a href={identity.linkedin} target="_blank" rel="noreferrer" className="text-link">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={identity.github} target="_blank" rel="noreferrer" className="text-link">
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function Availability() {
  return (
    <span className="availability">
      <span /> Open to opportunities
    </span>
  );
}
export function PageIntro({
  label,
  title,
  accent,
  children,
}: {
  label: string;
  title: string;
  accent?: string[] | undefined;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <span className="eyebrow">{label}</span>
      <h1 aria-label={title}>
        <SplitWords text={title} accent={accent} />
      </h1>
      {children && <p className="page-lede">{children}</p>}
    </section>
  );
}
