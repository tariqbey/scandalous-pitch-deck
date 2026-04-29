import { useEffect, useRef, useState } from "react";

const ARCS = [
  { ep: "Ep 1–10", title: "The Revelation", color: "#D4AF37", desc: "Marcus discovers the truth. Panic, denial, and desperate research as he races to confirm the unthinkable." },
  { ep: "Ep 11–20", title: "The Cover-Up", color: "#8B0000", desc: "Marcus and Vanessa conspire to separate the kids without revealing why. Lies compound. Marriages crack." },
  { ep: "Ep 21–35", title: "The Unraveling", color: "#4ecdc4", desc: "Tiana and Leo grow closer. Elena suspects something. Dominic starts his own investigation." },
  { ep: "Ep 36–50", title: "The Exposure", color: "#e05c8a", desc: "The DNA test results go public. Tiana and Leo discover the truth. Families implode." },
  { ep: "Ep 51–60", title: "The Reckoning", color: "#D4AF37", desc: "Can love survive biology? Can families survive honesty? Every character faces their defining moment." },
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
    <section id="series-summary" ref={ref} style={{ background: "#050505", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Series Overview</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
          60 Episodes.<br />One Devastating Truth.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", maxWidth: 700, lineHeight: 1.8, marginBottom: "4rem" }}>
          SCANDALOUS: BLOODLINE BETRAYAL is a 60-episode vertical micro-drama series. Each episode runs 90 seconds, designed for mobile-first consumption. The full arc is pre-written, production-ready, and built for binge retention — with a cliffhanger every single episode.
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
            background: "linear-gradient(to bottom, #D4AF37, #8B0000, #4ecdc4, #e05c8a, #D4AF37)",
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
