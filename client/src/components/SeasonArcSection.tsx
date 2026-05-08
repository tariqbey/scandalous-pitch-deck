import { useEffect, useRef, useState } from "react";

const SEASON_ARCS = [
  {
    season: "Act 1",
    eps: "Episodes 1–10",
    title: "DISCOVERY & MUTUAL GUILT",
    color: "#D4AF37",
    tagline: "He recognized her. She reminded him he was just as guilty.",
    desc: "Michael meets Darius and sees Renee's photo. He calls her from the bathroom. Renee is defensive — until she learns their children are dating. She reminds Michael he was married too. They agree on one thing: keep both spouses out of it. Then the spouses start noticing anyway.",
    cliffhanger: "Tonya asks why Michael is acting strange. Calvin asks why Renee suddenly fears Darius dating.",
  },
  {
    season: "Act 2",
    eps: "Episodes 11–20",
    title: "TWO HOUSES START TO CRACK",
    color: "#8B0000",
    tagline: "Two marriages. Two secrets. Both cracking from the inside.",
    desc: "Tonya asks why Michael is acting strange. Calvin asks why Renee suddenly fears Darius dating. Jada demands a reason. Darius asks why Renee dislikes Jada. Old affair flashbacks surface — both removing wedding rings, Renee telling Michael she is pregnant, and the block that followed.",
    cliffhanger: "Tonya finds Renee's name in Michael's phone. Calvin sees deleted calls.",
  },
  {
    season: "Act 3",
    eps: "Episodes 21–30",
    title: "THE COVER-UP GETS MESSY",
    color: "#4ecdc4",
    tagline: "Every lie requires three more to hold it up.",
    desc: "Tonya finds Renee's name in Michael's phone. Calvin sees deleted calls. Michael lies: old friend. Renee lies: school fundraiser. Jada visits Darius's house and Renee nearly breaks. Then Jada and Darius announce they may move in together.",
    cliffhanger: "Both parents forbid the move. The kids compare notes and realize both families are acting strange.",
  },
  {
    season: "Act 4",
    eps: "Episodes 31–40",
    title: "SPOUSES ENTER THE WAR",
    color: "#e05c8a",
    tagline: "The lie was always bigger than one secret.",
    desc: "Both parents forbid the move. Tonya confronts Renee woman-to-woman. Calvin calls Michael directly. Tonya follows Michael and catches him meeting Renee. The affair comes out in a parking lot explosion.",
    cliffhanger: "Tonya: 'Is Darius your son?' Michael cannot answer.",
  },
  {
    season: "Act 5",
    eps: "Episodes 41–50",
    title: "PATERNITY BECOMES FAMILY WAR",
    color: "#D4AF37",
    tagline: "Renee refused once. The kids won't let her refuse twice.",
    desc: "Calvin learns Renee cheated during their marriage. Tonya learns about the pregnancy. Darius realizes this is about him. Jada hears the fear: Darius might be Michael's son. Both marriages break. The kids separate in horror. Renee and Michael both try to delay the DNA test — but Jada and Darius take control and swab themselves.",
    cliffhanger: "All six sit in the clinic waiting room.",
  },
  {
    season: "Act 6",
    eps: "Episodes 51–60",
    title: "BLOODLINE RECKONING",
    color: "#8B0000",
    tagline: "The results don't end the story. They start a new one.",
    desc: "Results arrive. Darius is not Michael's son. Then the second page: he is not Calvin's either. Renee tries to run. Michael stops her. Then Marcus appears.",
    cliffhanger: "Marcus: 'Tell them why you put my son in Calvin's house.'",
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
