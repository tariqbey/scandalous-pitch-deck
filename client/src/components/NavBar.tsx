import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Logline",        href: "#logline" },
  { label: "Characters",     href: "#lead-characters" },
  { label: "Scripts",        href: "#scripts" },
  { label: "Season Arc",     href: "#season-arc" },
  { label: "Analytics",      href: "#analytics" },
  { label: "Contact",        href: "#contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        background: scrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.2)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
        boxSizing: "border-box",
      }}>
        {/* Logo */}
        <button
          onClick={() => navigate("#cover")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(0.65rem, 2.2vw, 0.95rem)",
            letterSpacing: "0.08em",
            color: "#D4AF37",
            textTransform: "uppercase",
            lineHeight: 1.2,
            textAlign: "left",
            maxWidth: "58vw",
            flexShrink: 0,
          }}
        >
          SCANDALOUS: BLOODLINE LIES
        </button>

        {/* Desktop links — hidden below 768px via CSS */}
        <div className="nav-desktop">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                padding: "0.25rem 0",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Hamburger — shown below 768px via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            background: "none",
            border: "1px solid rgba(212,175,55,0.45)",
            cursor: "pointer",
            width: 42,
            height: 42,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span style={{
            display: "block", width: 20, height: 2, background: "#D4AF37",
            transition: "transform 0.3s",
            transform: open ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: 20, height: 2, background: "#D4AF37",
            transition: "opacity 0.3s",
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: 20, height: 2, background: "#D4AF37",
            transition: "transform 0.3s",
            transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* Full-screen mobile drawer */}
      <div
        className="nav-drawer"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 999,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        <div style={{ width: 48, height: 1, background: "#D4AF37", opacity: 0.4 }} />

        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => navigate(link.href)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 6vw, 2.2rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.04em",
              padding: "0.2rem 1.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
          >
            {link.label}
          </button>
        ))}

        <div style={{ width: 48, height: 1, background: "#D4AF37", opacity: 0.4 }} />

        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
        }}>
          Created &amp; Written by Del Rivers
        </div>
      </div>

      <style>{`
        /* Desktop: show links, hide hamburger */
        @media (min-width: 768px) {
          .nav-desktop {
            display: flex !important;
            gap: 1.75rem;
            align-items: center;
          }
          .nav-hamburger { display: none !important; }
          .nav-drawer { display: none !important; }
        }
        /* Mobile/tablet: hide links, show hamburger */
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
