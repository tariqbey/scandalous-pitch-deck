import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/contexts/AudioController";

const CHARS = [
  {
    id: "michael",
    name: "MICHAEL REED",
    role: "LEAD — THE PATRIARCH",
    roleColor: "#D4AF37",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/EtrWZOIjGikFkSER.jpg",
    desc: "Married to Tonya. Father of Jada. Michael is a man who buried a mistake and called it survival. When Darius shows him Renee's photo, Michael realizes the past is sitting in his living room holding his daughter's hand.",
    arc: "From denial to devastation — he waited 20 years because the truth was inconvenient.",
    credits: ["Original Character", "BLOODLINE LIES"],
    audience: "Primary: 25–44 Black women. Secondary: Drama fans 18–54.",
    reach: 85,
  },
  {
    id: "renee",
    name: "RENEE COLE",
    role: "LEAD — THE GHOST",
    roleColor: "#e05c8a",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RgpPMudkgwfkFaOI.jpg",
    desc: "Married to Calvin. Mother of Darius. Renee protected her marriage by refusing a DNA test. She has lived 20 years inside that decision. When Michael calls, she is defensive — then he tells her their children are dating.",
    arc: "From victim to power broker — she thinks silence equals protection.",
    credits: ["Original Character", "BLOODLINE LIES"],
    audience: "Primary: 30–50 women. Secondary: Revenge drama fans.",
    reach: 78,
  },
  {
    id: "jada",
    name: "JADA REED",
    role: "LEAD — THE DAUGHTER",
    roleColor: "#e05c8a",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RKUuubvLMkNKOBwg.jpg",
    desc: "Michael's daughter. Darius's girlfriend. Jada is in love and expects Michael to respect her choice. She does not know her father recognizes Darius's mother — or what that recognition means.",
    arc: "From bliss to horror to the hardest choice of her life.",
    credits: ["Original Character", "BLOODLINE LIES"],
    audience: "Primary: 18–35 women. Secondary: Romance drama fans.",
    reach: 90,
  },
  {
    id: "darius",
    name: "DARIUS COLE",
    role: "LEAD — THE CATALYST",
    roleColor: "#4ecdc4",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/ZISqUnqzgXzOqwUY.jpg",
    desc: "Renee and Calvin's son. Darius fully believes Calvin is his dad. He is proud of him. Calvin raised him. Calvin shaped him. He is the innocent center of a storm he didn't create.",
    arc: "From devoted boyfriend to a man whose identity may be a lie.",
    credits: ["Original Character", "BLOODLINE LIES"],
    audience: "Primary: 20–40 men and women. Secondary: Thriller fans.",
    reach: 75,
  },
  {
    id: "tonya",
    name: "TONYA REED",
    role: "SUPPORTING — THE WIFE",
    roleColor: "#D4AF37",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/nPbUqfwlaEPLKHeU.jpg",
    desc: "Michael's wife. Jada's mother. Tonya is not involved at first. She slowly notices Michael acting different after Darius comes over. She is the last to know — and the first to act.",
    arc: "From loyal wife to the most dangerous woman in the room.",
    credits: ["Original Character", "BLOODLINE LIES"],
    audience: "Primary: 28–45 women. Secondary: Thriller fans.",
    reach: 72,
  },
  {
    id: "calvin",
    name: "CALVIN COLE",
    role: "SUPPORTING — THE HUSBAND",
    roleColor: "#8B0000",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/nPbUqfwlaEPLKHeU.jpg",
    desc: "Renee's husband. Darius's father. Calvin does not find out early. He senses Renee is hiding something, but she throws him off. His suspicion builds slowly over many episodes.",
    arc: "From trusting husband to a man whose entire family may be built on a lie.",
    credits: ["Original Character", "BLOODLINE LIES"],
    audience: "Primary: 30–50 men and women. Secondary: Family drama fans.",
    reach: 68,
  },
];

function CharCard({ char, index }: { char: typeof CHARS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { playVO } = useAudio();
  const isEven = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2.5rem",
        alignItems: "flex-start",
        paddingBottom: "5rem",
        marginBottom: "5rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${index * 0.05}s, transform 0.8s ease ${index * 0.05}s`,
      }}
      className="char-full-row"
    >
      {/* Portrait — alternates left/right on desktop */}
      <div className={isEven ? "char-portrait-left" : "char-portrait-right"} style={{ position: "relative" }}>
        <div style={{
          aspectRatio: "9/16",
          width: "100%",
          maxWidth: 320,
          margin: "0 auto",
          background: "#000",
          overflow: "hidden",
          border: `1px solid ${char.roleColor}`,
          boxShadow: `0 0 80px ${char.roleColor}25`,
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
            }}
          />
        </div>
        {/* Color bar under portrait */}
        <div style={{ height: 4, background: char.roleColor, maxWidth: 320, margin: "0 auto" }} />
        {/* VO button */}
        <button
          onClick={() => playVO(char.id)}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 320,
            margin: "0.75rem auto 0",
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
            (e.currentTarget as HTMLButtonElement).style.background = char.roleColor;
            (e.currentTarget as HTMLButtonElement).style.color = char.id === "calvin" ? "#fff" : "#000";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = char.roleColor;
          }}
        >
          ▶ PLAY VOICEOVER
        </button>
      </div>

      {/* Bio block */}
      <div style={{ paddingTop: "0.5rem" }}>
        {/* Role badge */}
        <div style={{
          display: "inline-block",
          background: char.roleColor,
          color: char.id === "calvin" ? "#fff" : "#000",
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

        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 900,
          color: "#fff",
          marginBottom: "1.5rem",
          lineHeight: 1.05,
        }}>
          {char.name}
        </h3>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.92rem",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.85,
          marginBottom: "2rem",
          maxWidth: 560,
        }}>
          {char.desc}
        </p>

        {/* Character Arc */}
        <div style={{
          paddingLeft: "1.5rem",
          borderLeft: `3px solid ${char.roleColor}`,
          marginBottom: "2rem",
        }}>
          <div className="section-label" style={{ color: char.roleColor, marginBottom: "0.5rem" }}>Character Arc</div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "#fff",
            lineHeight: 1.6,
          }}>
            {char.arc}
          </p>
        </div>

        {/* Audience */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="section-label" style={{ color: char.roleColor, marginBottom: "0.5rem" }}>Audience</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
          }}>
            {char.audience}
          </div>
        </div>

        {/* Reach bar */}
        <div>
          <div className="section-label" style={{ color: char.roleColor, marginBottom: "0.5rem" }}>Audience Engagement Potential</div>
          <div style={{
            background: "rgba(255,255,255,0.06)",
            height: 6,
            borderRadius: 0,
            overflow: "hidden",
            maxWidth: 400,
          }}>
            <div style={{
              height: "100%",
              width: visible ? `${char.reach}%` : "0%",
              background: char.roleColor,
              transition: "width 1.2s ease 0.4s",
            }} />
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.3)",
            marginTop: "0.3rem",
          }}>
            {char.reach}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadCharactersSection() {
  return (
    <section id="lead-characters" className="resp-section" style={{ background: "#000" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">The Players</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.5rem" }}>
          Lead Characters
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "4rem",
        }}>
          Six people. One secret. Every character is a loaded gun pointed at someone else.
        </p>

        {CHARS.map((char, i) => (
          <CharCard key={char.id} char={char} index={i} />
        ))}
      </div>

      <style>{`
        /* Desktop: portrait left on even, right on odd */
        @media (min-width: 768px) {
          .char-full-row {
            grid-template-columns: minmax(0, 300px) minmax(0, 1fr) !important;
            gap: 4rem !important;
          }
          .char-portrait-right {
            order: 2;
          }
          .char-portrait-right + div {
            order: 1;
          }
        }
      `}</style>
    </section>
  );
}
