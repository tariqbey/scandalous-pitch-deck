import { useEffect, useRef, useState } from "react";

const SEASON_ARCS = [
  {
    season: "Season 1",
    eps: "Episodes 1–20",
    title: "THE REVELATION",
    color: "#D4AF37",
    tagline: "The secret surfaces. The cover-up begins.",
    desc: "Marcus discovers the truth and conspires with Vanessa to separate Tiana and Leo before the wedding. Every lie requires a bigger lie. Elena starts to notice.",
    cliffhanger: "Elena finds a burner phone in Marcus's jacket.",
  },
  {
    season: "Season 2",
    eps: "Episodes 21–40",
    title: "THE UNRAVELING",
    color: "#8B0000",
    tagline: "The kids grow closer. The parents fall apart.",
    desc: "Tiana and Leo's bond deepens despite every obstacle. Dominic hires a private investigator. Vanessa and Marcus's secret meetings are misread as an affair.",
    cliffhanger: "The PI delivers a DNA test result to Dominic. He opens it alone.",
  },
  {
    season: "Season 3",
    eps: "Episodes 41–60",
    title: "THE RECKONING",
    color: "#4ecdc4",
    tagline: "The truth cannot be buried. Only survived.",
    desc: "The DNA results go public. Tiana and Leo find out the truth. Both families are forced to confront 23 years of consequences. The question becomes: what does love survive?",
    cliffhanger: "Tiana, alone in her childhood bedroom, makes a phone call. We don't hear who she calls. She says: 'I need you to tell me everything.'",
  },
];

export default function SeasonArcSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="season-arc" ref={ref} style={{ background: "#000", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Series Structure</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          Season Arc
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "4rem" }}>
          Three acts. Sixty episodes. One complete story, engineered for maximum retention and platform flexibility.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2px", background: "rgba(212,175,55,0.1)" }}>
          {SEASON_ARCS.map((arc, i) => (
            <div key={arc.season} style={{
              background: "#060606",
              padding: "2.5rem",
              borderTop: `3px solid ${arc.color}`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`,
            }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: arc.color, textTransform: "uppercase", marginBottom: "0.25rem" }}>
                {arc.season} · {arc.eps}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>
                {arc.title}
              </h3>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.9rem", color: arc.color, marginBottom: "1.25rem" }}>
                "{arc.tagline}"
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {arc.desc}
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.25rem" }}>
                <div className="section-label" style={{ color: arc.color, marginBottom: "0.5rem" }}>Season Cliffhanger</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  {arc.cliffhanger}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extension note */}
        <div style={{
          marginTop: "3rem",
          padding: "2rem",
          border: "1px solid rgba(212,175,55,0.2)",
          background: "rgba(212,175,55,0.03)",
          textAlign: "center",
        }}>
          <div className="section-label" style={{ marginBottom: "0.75rem" }}>Expansion Potential</div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", maxWidth: 700, margin: "0 auto", lineHeight: 1.7 }}>
            The 60-episode arc is self-contained and complete. If performance warrants, Season 4 (Episodes 61–80) has been outlined — following the next generation as they navigate the aftermath of their parents' choices.
          </p>
        </div>
      </div>
    </section>
  );
}
