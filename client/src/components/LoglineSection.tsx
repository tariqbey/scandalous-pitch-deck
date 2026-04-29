import { useEffect, useRef, useState } from "react";

const WHY_IT_WORKS = [
  { label: "Forbidden Love", desc: "The #1 revenue driver on vertical platforms — amplified by biological horror." },
  { label: "Four-Way Power War", desc: "Two marriages, two secrets, one DNA test. Every character has something to lose." },
  { label: "Real-Time Drama", desc: "Inspired by a viral story with 3–5M+ documented views across platforms." },
  { label: "Mobile-First Format", desc: "9:16 vertical, 90-second episodes, 60-ep arc — engineered for scroll culture." },
];

export default function LoglineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="logline" ref={ref} style={{ background: "#000", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">The Hook</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 2rem" }} />

        <blockquote style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontStyle: "italic",
          color: "#fff",
          lineHeight: 1.5,
          borderLeft: "3px solid #D4AF37",
          paddingLeft: "2rem",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}>
          Twenty years after a scandalous Jersey motel affair ended in a ghosted pregnancy, a tech mogul's perfect life shatters when his daughter's fiancé shows him a family photo — revealing the boy's mother is the woman Marcus abandoned and sparking a desperate race to prove the kid isn't his son before a wedding turns into a biological crime.
        </blockquote>

        {/* Format specs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1px",
          background: "rgba(212,175,55,0.15)",
          border: "1px solid rgba(212,175,55,0.15)",
          marginBottom: "4rem",
        }}>
          {[
            { label: "Format", value: "9:16 Vertical" },
            { label: "Episodes", value: "60 LOCKED" },
            { label: "Runtime", value: "90 Seconds" },
            { label: "Locations", value: "4 Standing" },
          ].map((spec) => (
            <div key={spec.label} style={{ background: "#0A0A0A", padding: "1.5rem 2rem" }}>
              <div className="section-label" style={{ marginBottom: "0.5rem" }}>{spec.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#D4AF37", fontWeight: 700 }}>{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Why it works */}
        <div className="section-label">Why It Works</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 2rem" }} />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2rem",
        }}>
          {WHY_IT_WORKS.map((item, i) => (
            <div key={item.label} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`,
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#D4AF37",
                marginBottom: "0.5rem",
              }}>{item.label}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
