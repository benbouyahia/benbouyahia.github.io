import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { identity } from "@/lib/portfolio";
const links = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
] as const;
export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="site-header">
      <div className="container navigation">
        <Link to="/" className="brand" aria-label="Ayoub Ben Bouyahia home">
          <span className="brand-mark">
            ab<span>.</span>
          </span>
          <span className="brand-name">Ayoub Ben Bouyahia</span>
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
  );
}
export function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© 2026 Ayoub Ben Bouyahia</span>
        <span className="footer-note">Business Intelligence &amp; Analytics · Tunis, Tunisia</span>
        <a href={identity.github} target="_blank" rel="noreferrer" className="footer-social">
          <Github size={16} /> GitHub <ArrowUpRight size={14} />
        </a>
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
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      {children && <p className="page-lede">{children}</p>}
    </section>
  );
}
