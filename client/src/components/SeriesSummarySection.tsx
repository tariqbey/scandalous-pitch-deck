import { useEffect, useRef, useState } from "react";

const ARCS = [
  { ep: "Ep 1–10", title: "Discovery & Mutual Guilt", color: "#D4AF37", desc: "Michael meets Darius and sees Renee’s photo. He calls her from the bathroom. Renee is defensive — until she learns their children are dating. She reminds Michael he was married too. They agree on one thing: keep both spouses out of it. Then the spouses start noticing anyway." },
  { ep: "Ep 11–20", title: "Two Houses Start to Crack", color: "#8B0000", desc: "Tonya asks why Michael is acting strange. Calvin asks why Renee suddenly fears Darius dating. Jada demands a reason. Darius asks why Renee dislikes Jada. Old affair flashbacks surface — both removing wedding rings, Renee telling Michael she is pregnant, and the block that followed." },
  { ep: "Ep 21–30", title: "The Cover-Up Gets Messy", color: "#4ecdc4", desc: "Tonya finds Renee’s name in Michael’s phone. Calvin sees deleted calls. Michael lies: old friend. Renee lies: school fundraiser. Jada visits Darius’s house and Renee nearly breaks. Then Jada and Darius announce they may move in together." },
  { ep: "Ep 31–40", title: "Spouses Enter the War", color: "#e05c8a", desc: "Both parents forbid the move. The kids compare notes and realize both families are acting strange. Tonya confronts Renee woman-to-woman. Calvin calls Michael directly. Tonya follows Michael and catches him meeting Renee. The affair comes out in a parking lot explosion." },
  { ep: "Ep 41–50", title: "Paternity Becomes Family War", color: "#D4AF37", desc: "Calvin learns Renee cheated during their marriage. Tonya learns about the pregnancy. Darius realizes this is about him. Jada hears the fear: Darius might be Michael’s son. Both marriages break. The kids separate in horror. Renee and Michael both try to delay the DNA test — but Jada and Darius take control and swab themselves." },
  { ep: "Ep 51–60", title: "Bloodline Reckoning", color: "#8B0000", desc: "All six sit in the clinic waiting room. Results arrive. Darius is not Michael’s son. Then the second page: he is not Calvin’s either. Renee tries to run. Michael stops her. Then Marcus appears — and says: ‘Tell them why you put my son in Calvin’s house.’" },
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
          SCANDALOUS: BLOODLINE LIES is a 60-episode vertical micro-drama series. Each episode runs 90 seconds, designed for mobile-first consumption. The full arc is pre-written, production-ready, and built for binge retention — with a cliffhanger every single episode.
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
