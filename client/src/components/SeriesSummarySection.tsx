import { useEffect, useRef, useState } from "react";

const ARCS = [
  { ep: "Ep 1–10", title: "The Photo & The First Call", color: "#D4AF37", desc: "Michael meets Darius, recognizes Renee in a family photo, and calls her from the bathroom. Renee is defensive and clueless — until Michael explains their children are dating." },
  { ep: "Ep 11–20", title: "The Silent War", color: "#8B0000", desc: "Michael tells Jada to slow down with no explanation. Renee warns Darius. Calvin grows suspicious. Tonya finds Renee's name on Michael's phone." },
  { ep: "Ep 21–30", title: "Pressure From Both Homes", color: "#4ecdc4", desc: "Tonya confronts Michael. Calvin checks Renee's phone. Jada considers moving in with Darius. Michael and Renee meet in person. Renee cannot say Darius is not Michael's son." },
  { ep: "Ep 31–40", title: "The Affair Surfaces", color: "#e05c8a", desc: "Tonya follows Michael and sees him with Renee. Michael confesses the affair. Calvin questions Renee. Jada leaves home. Michael tells Tonya Renee was pregnant." },
  { ep: "Ep 41–50", title: "The DNA Question Explodes", color: "#D4AF37", desc: "Tonya realizes Jada may be dating Michael's child. Darius learns the truth. Renee refuses the DNA test again. Jada and Darius book the test themselves." },
  { ep: "Ep 51–60", title: "Bloodline Reckoning", color: "#8B0000", desc: "All six sit in the clinic waiting room. The results arrive. Darius is not Michael's son. Then the second page: he is not Calvin's either. Marcus enters. 'Tell them why you put my son in Calvin's house.'" },
];

export default function SeriesSummarySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="series-summary" ref={ref} className="resp-section" style={{ background: "#050505" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Series Overview</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
          60 Episodes.<br />One Devastating Truth.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", maxWidth: 700, lineHeight: 1.8, marginBottom: "4rem" }}>
          BLOODLINE LIES is a 60-episode vertical micro-drama series. Each episode runs 60 seconds, designed for mobile-first consumption. The full arc is pre-written, production-ready, and built for binge retention — with a cliffhanger every single episode.
        </p>

        {/* Arc timeline */}
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, #D4AF37, #8B0000, #4ecdc4, #e05c8a, #D4AF37, #8B0000)",
          }} />

          {ARCS.map((arc, i) => (
            <div key={arc.ep} style={{
              position: "relative",
              paddingLeft: "2rem",
              paddingBottom: "2.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`,
            }}>
              {/* Dot */}
              <div style={{
                position: "absolute",
                left: -6,
                top: 4,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: arc.color,
                boxShadow: `0 0 12px ${arc.color}`,
              }} />
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", color: arc.color, marginBottom: "0.25rem", textTransform: "uppercase" }}>
                {arc.ep}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>
                {arc.title}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, maxWidth: 600 }}>
                {arc.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
