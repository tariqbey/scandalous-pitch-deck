import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/contexts/AudioController";

const HERO_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/pOISOnpfDmMdXEEU.jpg";
const UPSCALE_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RtaaZtYQelqLcSao.png";
// Album cover art for spinning animation
const COVER_ART = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/AosWsbmtdbJmwUlM.jpg";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  const { themeStarted, startTheme } = useAudio();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
    }));
    setParticles(pts);
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cover" style={{ position: "relative", background: "#000", paddingTop: 88, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero image */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <img
          src={HERO_IMG}
          alt="BLOODLINE LIES"
          style={{
            width: "100%",
            display: "block",
            objectFit: "contain",
            objectPosition: "center top",
            maxHeight: "80vh",
          }}
        />
        {/* Gradient overlay at bottom */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          background: "linear-gradient(to bottom, transparent, #000)",
        }} />
        {/* Floating particles */}
        {particles.map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#D4AF37",
            opacity: 0.3,
            animation: `pulse-gold ${2 + p.delay}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>

      {/* Below-video content block */}
      <div style={{
        background: "#000",
        textAlign: "center",
        padding: "3rem 1.5rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1.2s ease, transform 1.2s ease",
      }}>

        {/* PLAY THEME SONG button — disappears after clicked, shows spinning album */}
        {!themeStarted ? (
          <button
            onClick={startTheme}
            className="gold-btn"
            style={{ fontSize: "0.7rem", padding: "0.65rem 2rem", letterSpacing: "0.2em" }}
          >
            ▶ PLAY THEME SONG
          </button>
        ) : (
          /* Spinning album animation */
          <div style={{ position: "relative", width: 64, height: 64 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              animation: "spin-album 3s linear infinite",
              border: "2px solid #D4AF37",
            }}>
              <img src={COVER_ART} alt="Now Playing" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Center hole */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 10, height: 10,
              borderRadius: "50%",
              background: "#000",
              border: "1px solid #D4AF37",
            }} />
          </div>
        )}

        {/* Upscale logo */}
        <img
          src={UPSCALE_LOGO}
          alt="Upscale Promotions & Entertainment, Inc."
          style={{
            width: "clamp(200px, 60vw, 500px)",
            maxWidth: "90vw",
            marginBottom: "-2rem",
            filter: "brightness(1.1)",
          }}
        />

        {/* Producer name — pulled tight under logo */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1rem, 3vw, 1.6rem)",
          letterSpacing: "0.25em",
          color: "#fff",
          textTransform: "uppercase",
        }}>
          MALIK DAVIS
        </div>

        {/* Presents */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#D4AF37",
        }}>
          Upscale Promotions & Entertainment, Inc. Presents
        </div>

        {/* Gold rule */}
        <div className="gold-rule" style={{ maxWidth: 600 }} />

        {/* Show title */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(2.5rem, 10vw, 8rem)",
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: "0 0 60px rgba(212,175,55,0.3)",
        }}>
          BLOODLINE LIES
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.6rem, 2vw, 0.85rem)",
          fontWeight: 600,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#D4AF37",
        }}>
          A VERTICAL MICRO-DRAMA SERIES
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          color: "rgba(255,255,255,0.7)",
          maxWidth: 600,
        }}>
          "He recognized her in a family photo. He said nothing. Then he went to the bathroom and called her."
        </div>

        {/* Genre pills */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
          {["Romance & Power", "Secrets & Betrayal", "Vertical Micro-Drama", "60 Episodes"].map((tag) => (
            <span key={tag} style={{
              border: "1px solid #D4AF37",
              color: "#D4AF37",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.4rem 1rem",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
          <button className="gold-btn" onClick={() => handleNav("#logline")}>
            Read the Pitch
          </button>
          <button className="gold-btn" onClick={() => handleNav("#scripts")}>
            Read Scripts
          </button>
        </div>
      </div>

      {/* Spinning album keyframe */}
      <style>{`
        @keyframes spin-album {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
