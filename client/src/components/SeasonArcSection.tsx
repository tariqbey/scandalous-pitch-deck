import { useEffect, useRef, useState } from "react";

const SEASON_ARCS = [
  {
    season: "Act 1",
    eps: "Episodes 1–10",
    title: "THE PHOTO & THE FIRST CALL",
    color: "#D4AF37",
    tagline: "He recognized her. He said nothing. Then he called.",
    desc: "Michael meets Darius and recognizes Renee in a family photo. He calls her from the bathroom. Renee is defensive — until Michael tells her their children are dating. Calvin gets suspicious. Renee throws him off. Darius and Jada say 'I love you' at the door.",
    cliffhanger: "Michael calls Renee again from his car. She can't say Darius isn't his son.",
  },
  {
    season: "Act 2",
    eps: "Episodes 11–20",
    title: "THE SILENT WAR",
    color: "#8B0000",
    tagline: "Two marriages. Two secrets. One name.",
    desc: "Michael tells Jada to slow down with no explanation. Renee warns Darius the next day. Calvin notices Renee flinch at Jada's last name: Reed. Tonya meets Darius and sees Michael tense up. Michael looks up Calvin and sees years of father-son photos.",
    cliffhanger: "Tonya finds 'Renee Cole' in Michael's recent searches.",
  },
  {
    season: "Act 3",
    eps: "Episodes 21–30",
    title: "PRESSURE FROM BOTH HOMES",
    color: "#4ecdc4",
    tagline: "The kids grow closer. The parents fall apart.",
    desc: "Tonya confronts Michael about Renee. Calvin checks Renee's phone. Jada tells Michael she and Darius are considering moving in. Michael forbids it with no explanation. Michael and Renee meet in person. Renee cannot say Darius is not Michael's son.",
    cliffhanger: "Renee's silence tells Michael everything.",
  },
  {
    season: "Act 4",
    eps: "Episodes 31–40",
    title: "THE AFFAIR SURFACES",
    color: "#e05c8a",
    tagline: "The lie was always bigger than one secret.",
    desc: "Tonya follows Michael and sees him meeting Renee. Michael confesses the affair — during their marriage. Calvin questions Renee. Jada leaves home. Michael tells Tonya Renee was pregnant.",
    cliffhanger: "Tonya asks: 'Is Darius your son?'",
  },
  {
    season: "Act 5",
    eps: "Episodes 41–50",
    title: "THE DNA QUESTION EXPLODES",
    color: "#D4AF37",
    tagline: "Renee refused once. She can't refuse twice.",
    desc: "Tonya realizes Jada may be dating Michael's child. Darius learns the truth and explodes. Renee refuses the DNA test again. Jada and Darius book the test themselves. Darius takes the swab.",
    cliffhanger: "All six sit in the clinic waiting room.",
  },
  {
    season: "Act 6",
    eps: "Episodes 51–60",
    title: "BLOODLINE RECKONING",
    color: "#8B0000",
    tagline: "The results don't end the story. They start a new one.",
    desc: "The results arrive. Darius is not Michael's son. Then the second page: he is not Calvin's either. The envelope disappears. Tonya reveals she requested a backup copy. Darius reads the truth.",
    cliffhanger: "Marcus appears. Renee freezes. Marcus says: 'Tell them why you put my son in Calvin's house.'",
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
    <section id="season-arc" ref={ref} className="resp-section" style={{ background: "#000" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Series Structure</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          Season Arc
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "4rem" }}>
          Six acts. Sixty episodes. One complete story, engineered for maximum retention and platform flexibility.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2px", background: "rgba(212,175,55,0.1)" }}>
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
