import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Logline", href: "#logline" },
  { label: "Lead Characters", href: "#lead-characters" },
  { label: "Scripts", href: "#scripts" },
  { label: "Season Arc", href: "#season-arc" },
  { label: "Analytics", href: "#analytics" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 88,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.2)" : "none",
        transition: "background 0.4s ease, border 0.4s ease",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      {/* Logo text */}
      <div style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        SCANDALOUS
      </div>

      {/* Desktop nav */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", color: "#D4AF37", fontSize: "1.5rem", cursor: "pointer" }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 88,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.97)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
        }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#D4AF37",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
