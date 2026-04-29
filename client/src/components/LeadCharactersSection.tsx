import { useEffect, useRef, useState } from "react";

const CHARS = [
  {
    name: "MARCUS HAYES",
    role: "The Patriarch",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/EtrWZOIjGikFkSER.jpg",
    color: "#D4AF37",
    desc: "Tech mogul. Devoted father. Man with one buried secret that is about to destroy everything he built.",
    arc: "From denial to devastation to redemption — or ruin.",
  },
  {
    name: "VANESSA COLE",
    role: "The Ghost",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RgpPMudkgwfkFaOI.jpg",
    color: "#e05c8a",
    desc: "The woman Marcus abandoned 20 years ago. She raised Leo alone. She never forgot. She never forgave.",
    arc: "From victim to power broker — her silence has a price.",
  },
  {
    name: "ELENA HAYES",
    role: "The Wife",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/nPbUqfwlaEPLKHeU.jpg",
    color: "#4ecdc4",
    desc: "Marcus's wife. Brilliant, perceptive, and the last person to know — until she becomes the first to act.",
    arc: "From loyal wife to the most dangerous woman in the room.",
  },
  {
    name: "TIANA HAYES",
    role: "The Daughter",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RKUuubvLMkNKOBwg.jpg",
    color: "#D4AF37",
    desc: "She found her soulmate. She planned her future. She has no idea her love story is a biological catastrophe.",
    arc: "From bliss to horror to the hardest choice of her life.",
  },
  {
    name: "LEO COLE",
    role: "The Fiancé",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/ZISqUnqzgXzOqwUY.jpg",
    color: "#8B0000",
    desc: "He loves Tiana completely. He idolizes his mother. He is the innocent center of a storm he didn't create.",
    arc: "From devoted fiancé to a man whose identity is a lie.",
  },
];

export default function LeadCharactersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const char = CHARS[active];

  return (
    <section id="lead-characters" ref={ref} style={{ background: "#000", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">The Players</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "3rem" }}>
          Lead Characters
        </h2>

        {/* Character selector tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {CHARS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? c.color : "transparent",
                border: `1px solid ${c.color}`,
                color: active === i ? "#000" : c.color,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.5rem 1.25rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Active character display */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)",
          gap: "4rem",
          alignItems: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }} className="flex-col md:grid">
          {/* Portrait */}
          <div style={{ position: "relative" }}>
            <img
              src={char.img}
              alt={char.name}
              style={{
                width: "100%",
                maxWidth: 360,
                display: "block",
                objectFit: "cover",
                objectPosition: "top",
                aspectRatio: "9/16",
                border: `1px solid ${char.color}`,
                boxShadow: `0 0 60px ${char.color}30`,
                transition: "all 0.4s ease",
              }}
            />
            {/* Color accent bar */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: char.color,
            }} />
          </div>

          {/* Info */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: char.color, marginBottom: "0.5rem", textTransform: "uppercase" }}>
              {char.role}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              {char.name}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "2rem" }}>
              {char.desc}
            </p>
            <div style={{ borderLeft: `3px solid ${char.color}`, paddingLeft: "1.5rem" }}>
              <div className="section-label" style={{ color: char.color, marginBottom: "0.5rem" }}>Character Arc</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#fff", lineHeight: 1.6 }}>
                {char.arc}
              </p>
            </div>
          </div>
        </div>

        {/* All character thumbnails */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {CHARS.map((c, i) => (
            <div
              key={c.name}
              onClick={() => setActive(i)}
              style={{
                cursor: "pointer",
                opacity: active === i ? 1 : 0.4,
                transition: "opacity 0.3s ease",
                border: active === i ? `2px solid ${c.color}` : "2px solid transparent",
              }}
            >
              <img
                src={c.img}
                alt={c.name}
                style={{ width: 60, height: 80, objectFit: "cover", objectPosition: "top", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
