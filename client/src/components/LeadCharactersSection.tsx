import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/contexts/AudioController";

const CHARS = [
  {
    id: "marcus",
    name: "MARCUS HAYES",
    role: "LEAD — THE PATRIARCH",
    roleColor: "#D4AF37",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/EtrWZOIjGikFkSER.jpg",
    desc: "Tech mogul. Devoted father. Man with one buried secret that is about to destroy everything he built. Twenty years ago he walked away from a woman — and a child he never knew existed.",
    arc: "From denial to devastation to redemption — or ruin.",
    credits: ["Original Character", "SCANDALOUS: Bloodline Betrayal"],
    audience: "Primary: 25–44 Black women. Secondary: Drama fans 18–54.",
    reach: 85,
  },
  {
    id: "vanessa",
    name: "VANESSA COLE",
    role: "LEAD — THE GHOST",
    roleColor: "#e05c8a",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RgpPMudkgwfkFaOI.jpg",
    desc: "The woman Marcus abandoned 20 years ago. She raised Leo alone, in silence, with a secret she swore she'd take to her grave. She never forgot. She never forgave. And now she doesn't have to.",
    arc: "From victim to power broker — her silence has a price.",
    credits: ["Original Character", "SCANDALOUS: Bloodline Betrayal"],
    audience: "Primary: 30–50 women. Secondary: Revenge drama fans.",
    reach: 78,
  },
  {
    id: "elena",
    name: "ELENA HAYES",
    role: "LEAD — THE WIFE",
    roleColor: "#4ecdc4",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/nPbUqfwlaEPLKHeU.jpg",
    desc: "Marcus's wife. Brilliant, perceptive, and the last person to know — until she becomes the first to act. She built this family. She will not watch it burn without striking the match herself.",
    arc: "From loyal wife to the most dangerous woman in the room.",
    credits: ["Original Character", "SCANDALOUS: Bloodline Betrayal"],
    audience: "Primary: 28–45 women. Secondary: Thriller fans.",
    reach: 72,
  },
  {
    id: "tiana",
    name: "TIANA HAYES",
    role: "LEAD — THE DAUGHTER",
    roleColor: "#e05c8a",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RKUuubvLMkNKOBwg.jpg",
    desc: "She found her soulmate. She planned her future. She has no idea her love story is a biological catastrophe. When the truth arrives, she will have to choose between love and survival.",
    arc: "From bliss to horror to the hardest choice of her life.",
    credits: ["Original Character", "SCANDALOUS: Bloodline Betrayal"],
    audience: "Primary: 18–35 women. Secondary: Romance drama fans.",
    reach: 90,
  },
  {
    id: "leo",
    name: "LEO COLE",
    role: "VILLAIN — THE CATALYST",
    roleColor: "#8B0000",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/ZISqUnqzgXzOqwUY.jpg",
    desc: "He loves Tiana completely. He idolizes his mother. He is the innocent center of a storm he didn't create — but once he learns the truth, innocence becomes a choice.",
    arc: "From devoted fiancé to a man whose identity is a lie.",
    credits: ["Original Character", "SCANDALOUS: Bloodline Betrayal"],
    audience: "Primary: 20–40 men and women. Secondary: Thriller fans.",
    reach: 68,
  },
];

export default function LeadCharactersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const { playVO, stopVO } = useAudio();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const char = CHARS[active];
  const isVillain = char.id === "leo";

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
              key={c.id}
              onClick={() => { stopVO(); setActive(i); }}
              style={{
                background: active === i ? c.roleColor : "transparent",
                border: `1px solid ${c.roleColor}`,
                color: active === i ? (c.id === "leo" ? "#fff" : "#000") : c.roleColor,
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

        {/* Active character card — skill layout: portrait left, bio right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)",
          gap: "4rem",
          alignItems: "flex-start",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}>
          {/* Left: 9:16 portrait image */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              aspectRatio: "9/16",
              width: "100%",
              maxWidth: 360,
              background: "#000",
              overflow: "hidden",
              border: `1px solid ${char.roleColor}`,
              boxShadow: `0 0 60px ${char.roleColor}30`,
            }}>
              <img
                src={char.img}
                alt={char.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                  transition: "all 0.4s ease",
                }}
              />
            </div>
            {/* Color accent bar */}
            <div style={{ height: 4, background: char.roleColor, maxWidth: 360 }} />

            {/* PLAY VOICEOVER button */}
            <button
              onClick={() => playVO(char.id)}
              style={{
                display: "block",
                width: "100%",
                maxWidth: 360,
                marginTop: "0.75rem",
                background: "transparent",
                border: `1px solid ${char.roleColor}`,
                color: char.roleColor,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.6rem 1rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.background = char.roleColor;
                (e.target as HTMLButtonElement).style.color = isVillain ? "#fff" : "#000";
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.background = "transparent";
                (e.target as HTMLButtonElement).style.color = char.roleColor;
              }}
            >
              ▶ PLAY VOICEOVER
            </button>
          </div>

          {/* Right: bio + badges */}
          <div style={{ paddingTop: "0.5rem" }}>
            {/* Role badge */}
            <div style={{
              display: "inline-block",
              background: char.roleColor,
              color: isVillain ? "#fff" : "#000",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.3rem 0.9rem",
              marginBottom: "1rem",
            }}>
              {char.role}
            </div>

            {/* Character name */}
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
            }}>
              {char.name}
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              {char.desc}
            </p>

            {/* Credits */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div className="section-label" style={{ color: char.roleColor, marginBottom: "0.5rem" }}>CREDITS</div>
              {char.credits.map((c) => (
                <div key={c} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  {c}
                </div>
              ))}
            </div>

            {/* Audience */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div className="section-label" style={{ color: char.roleColor, marginBottom: "0.5rem" }}>AUDIENCE</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                {char.audience}
              </div>
            </div>

            {/* Character arc */}
            <div style={{ paddingLeft: "1.5rem", borderLeft: `3px solid ${char.roleColor}`, marginBottom: "2rem" }}>
              <div className="section-label" style={{ color: char.roleColor, marginBottom: "0.5rem" }}>Character Arc</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1rem", color: "#fff", lineHeight: 1.6 }}>
                {char.arc}
              </p>
            </div>

            {/* TOTAL REACH bar */}
            <div>
              <div className="section-label" style={{ color: char.roleColor, marginBottom: "0.5rem" }}>TOTAL REACH</div>
              <div style={{ background: "rgba(255,255,255,0.06)", height: 6, borderRadius: 0, overflow: "hidden", maxWidth: 400 }}>
                <div style={{
                  height: "100%",
                  width: `${char.reach}%`,
                  background: char.roleColor,
                  transition: "width 1s ease",
                }} />
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: "0.3rem" }}>
                Audience engagement potential: {char.reach}%
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {CHARS.map((c, i) => (
            <div
              key={c.id}
              onClick={() => { stopVO(); setActive(i); }}
              style={{
                cursor: "pointer",
                opacity: active === i ? 1 : 0.4,
                transition: "opacity 0.3s ease",
                border: active === i ? `2px solid ${c.roleColor}` : "2px solid transparent",
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
