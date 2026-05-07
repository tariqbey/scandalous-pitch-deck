import { useEffect, useRef } from "react";
import { useAudio } from "@/contexts/AudioController";

// Character video CDN paths (looping, muted, autoplay)
const CHAR_VIDEOS: Record<string, string> = {
  michael: "/manus-storage/micheal_a7d5ce3d.mp4",
  renee:   "/manus-storage/renee_69e34bc3.mp4",
  jada:    "/manus-storage/jada_ad0689fa.mp4",
  darius:  "/manus-storage/darius_6156ca03.mp4",
  tonya:   "/manus-storage/marcus_6734376d.mp4",   // closest match available
  calvin:  "/manus-storage/calvin_cb9fe4fd.mp4",
};

const CHARS = [
  {
    id: "michael",
    name: "MICHAEL REED",
    role: "LEAD — THE PATRIARCH",
    roleColor: "#D4AF37",
    textOnBadge: "#000",
    desc: "Married to Tonya. Father of Jada. Michael is a man who buried a mistake and called it survival. When Darius shows him Renee's photo, Michael realizes the past is sitting in his living room holding his daughter's hand.",
    arc: "From denial to devastation — he waited 20 years because the truth was inconvenient.",
    audience: "Primary: 25–44 Black women. Secondary: Drama fans 18–54.",
    reach: 85,
  },
  {
    id: "renee",
    name: "RENEE COLE",
    role: "LEAD — THE GHOST",
    roleColor: "#e05c8a",
    textOnBadge: "#000",
    desc: "Married to Calvin. Mother of Darius. Renee protected her marriage by refusing a DNA test. She has lived 20 years inside that decision. When Michael calls, she is defensive — then he tells her their children are dating.",
    arc: "From victim to power broker — she thinks silence equals protection.",
    audience: "Primary: 30–50 women. Secondary: Revenge drama fans.",
    reach: 78,
  },
  {
    id: "jada",
    name: "JADA REED",
    role: "LEAD — THE DAUGHTER",
    roleColor: "#e05c8a",
    textOnBadge: "#000",
    desc: "Michael's daughter. Darius's girlfriend. Jada is in love and expects Michael to respect her choice. She does not know her father recognizes Darius's mother — or what that recognition means.",
    arc: "From bliss to horror to the hardest choice of her life.",
    audience: "Primary: 18–35 women. Secondary: Romance drama fans.",
    reach: 90,
  },
  {
    id: "darius",
    name: "DARIUS COLE",
    role: "LEAD — THE CATALYST",
    roleColor: "#4ecdc4",
    textOnBadge: "#000",
    desc: "Renee and Calvin's son. Darius fully believes Calvin is his dad. He is proud of him. Calvin raised him. Calvin shaped him. He is the innocent center of a storm he didn't create.",
    arc: "From devoted boyfriend to a man whose identity may be a lie.",
    audience: "Primary: 20–40 men and women. Secondary: Thriller fans.",
    reach: 75,
  },
  {
    id: "tonya",
    name: "TONYA REED",
    role: "SUPPORTING — THE WIFE",
    roleColor: "#D4AF37",
    textOnBadge: "#000",
    desc: "Michael's wife. Jada's mother. Tonya is not involved at first. She slowly notices Michael acting different after Darius comes over. She is the last to know — and the first to act.",
    arc: "From loyal wife to the most dangerous woman in the room.",
    audience: "Primary: 28–45 women. Secondary: Thriller fans.",
    reach: 72,
  },
  {
    id: "calvin",
    name: "CALVIN COLE",
    role: "SUPPORTING — THE HUSBAND",
    roleColor: "#8B0000",
    textOnBadge: "#fff",
    desc: "Renee's husband. Darius's father. Calvin does not find out early. He senses Renee is hiding something, but she throws him off. His suspicion builds slowly over many episodes.",
    arc: "From trusting husband to a man whose entire family may be built on a lie.",
    audience: "Primary: 30–50 men and women. Secondary: Family drama fans.",
    reach: 68,
  },
];

function CharacterCard({ char }: { char: typeof CHARS[0] }) {
  const { playVO } = useAudio();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    const play = () => vid.play().catch(() => {});
    play();
    // iOS autoplay fallback
    document.addEventListener("touchstart", play, { once: true });
    return () => document.removeEventListener("touchstart", play);
  }, []);

  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      paddingBottom: "4rem",
      marginBottom: "4rem",
    }}>
      <div className="char-profile-grid">
        {/* Video portrait column */}
        <div className="char-portrait-col">
          <div style={{
            aspectRatio: "9/16",
            width: "100%",
            maxWidth: 280,
            margin: "0 auto",
            overflow: "hidden",
            border: `1px solid ${char.roleColor}`,
            boxShadow: `0 0 60px ${char.roleColor}20`,
            background: "#111",
            position: "relative",
          }}>
            <video
              ref={videoRef}
              src={CHAR_VIDEOS[char.id]}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
          {/* Color bar */}
          <div style={{ height: 3, background: char.roleColor, maxWidth: 280, margin: "0 auto" }} />
          {/* VO button */}
          <button
            onClick={() => playVO(char.id)}
            style={{
              display: "block",
              width: "100%",
              maxWidth: 280,
              margin: "0.75rem auto 0",
              background: "transparent",
              border: `1px solid ${char.roleColor}`,
              color: char.roleColor,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.65rem 1rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = char.roleColor;
              e.currentTarget.style.color = char.textOnBadge;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = char.roleColor;
            }}
          >
            ▶ PLAY VOICEOVER
          </button>
        </div>

        {/* Bio column */}
        <div className="char-bio-col">
          {/* Role badge */}
          <div style={{
            display: "inline-block",
            background: char.roleColor,
            color: char.textOnBadge,
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "0.3rem 0.85rem",
            marginBottom: "1rem",
          }}>
            {char.role}
          </div>

          {/* Name */}
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#fff",
            marginBottom: "1.25rem",
            lineHeight: 1.05,
          }}>
            {char.name}
          </h3>

          {/* Description */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.85,
            marginBottom: "1.75rem",
            maxWidth: 540,
          }}>
            {char.desc}
          </p>

          {/* Arc */}
          <div style={{
            paddingLeft: "1.25rem",
            borderLeft: `3px solid ${char.roleColor}`,
            marginBottom: "1.75rem",
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: char.roleColor,
              marginBottom: "0.4rem",
            }}>
              Character Arc
            </div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "#fff",
              lineHeight: 1.65,
              margin: 0,
            }}>
              {char.arc}
            </p>
          </div>

          {/* Audience */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: char.roleColor,
              marginBottom: "0.4rem",
            }}>
              Audience
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}>
              {char.audience}
            </div>
          </div>

          {/* Reach bar */}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: char.roleColor,
              marginBottom: "0.5rem",
            }}>
              Audience Engagement Potential
            </div>
            <div style={{
              background: "rgba(255,255,255,0.07)",
              height: 5,
              maxWidth: 360,
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${char.reach}%`,
                background: char.roleColor,
              }} />
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.3)",
              marginTop: "0.3rem",
            }}>
              {char.reach}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadCharactersSection() {
  return (
    <section id="lead-characters" style={{ background: "#000", padding: "5rem 0 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>

        {/* Section header */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#D4AF37",
          marginBottom: "0.75rem",
        }}>
          The Players
        </div>
        <div style={{ width: 60, height: 2, background: "#D4AF37", marginBottom: "1rem" }} />
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 900,
          color: "#fff",
          marginBottom: "0.5rem",
          lineHeight: 1.05,
        }}>
          Lead Characters
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "4rem",
          maxWidth: 600,
          lineHeight: 1.7,
        }}>
          Six people. One secret. Every character is a loaded gun pointed at someone else.
        </p>

        {/* All 6 character cards — always visible, stacked */}
        <div>
          {CHARS.map((char) => (
            <CharacterCard key={char.id} char={char} />
          ))}
        </div>
      </div>

      <style>{`
        /* Mobile first: portrait on top, bio below */
        .char-profile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .char-portrait-col { width: 100%; }
        .char-bio-col { width: 100%; padding-top: 0.25rem; }

        /* Tablet and up: portrait left, bio right */
        @media (min-width: 640px) {
          .char-profile-grid {
            grid-template-columns: 220px 1fr;
            gap: 2.5rem;
            align-items: flex-start;
          }
        }

        /* Desktop: wider portrait */
        @media (min-width: 1024px) {
          .char-profile-grid {
            grid-template-columns: 260px 1fr;
            gap: 3.5rem;
          }
        }
      `}</style>
    </section>
  );
}
