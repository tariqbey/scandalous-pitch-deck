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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          background: scrolled || menuOpen ? "rgba(0,0,0,0.97)" : "rgba(0,0,0,0.6)",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(212,175,55,0.25)" : "none",
          transition: "background 0.4s ease, border 0.4s ease",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          color: "#D4AF37",
          fontSize: "clamp(0.75rem, 2.5vw, 1rem)",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}>
          BLOODLINE LIES
        </div>

        {/* Desktop nav links — hidden on mobile */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Mobile hamburger button */}
        {isMobile && (
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "1px solid rgba(212,175,55,0.4)",
              color: "#D4AF37",
              width: 40,
              height: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: menuOpen ? 0 : 5,
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            {/* Animated hamburger lines */}
            <span style={{
              display: "block",
              width: 20,
              height: 2,
              background: "#D4AF37",
              transition: "all 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }} />
            <span style={{
              display: "block",
              width: 20,
              height: 2,
              background: "#D4AF37",
              transition: "all 0.3s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block",
              width: 20,
              height: 2,
              background: "#D4AF37",
              transition: "all 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }} />
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 199,
            background: "rgba(0,0,0,0.98)",
            borderBottom: "1px solid rgba(212,175,55,0.25)",
            overflow: "hidden",
            maxHeight: menuOpen ? 400 : 0,
            transition: "max-height 0.35s ease",
          }}
        >
          <div style={{ padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0" }}>
            {NAV_LINKS.map((link, i) => (
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
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "1rem 0",
                  borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  display: "block",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
