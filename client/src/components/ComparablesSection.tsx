import { useEffect, useRef, useState } from "react";

const COMPS = [
  {
    title: "Scandal",
    img: "/manus-storage/9vMOHyvWAvQk_6008d993.jpg",
    platform: "ABC · Shonda Rhimes",
    note: "The gold standard for Black-led primetime drama. BLOODLINE LIES delivers the same explosive secrets and moral complexity — engineered for the vertical scroll generation.",
  },
  {
    title: "How to Get Away with Murder",
    img: "/manus-storage/I7Q2GnqSrhFF_fa677c02.jpg",
    platform: "ABC · Shonda Rhimes",
    note: "Secrets, lies, and a Black woman at the center of every storm. BLOODLINE LIES shares the same DNA — but the twist is ripped from a real viral story with 5M+ pre-built views.",
  },
  {
    title: "Empire",
    img: "/manus-storage/RP9zuPDsxhji_26c06638.jpg",
    platform: "Fox · Lee Daniels",
    note: "Family power, betrayal, and empire-level stakes. BLOODLINE LIES delivers the same dynasty-destroying drama in 60-second episodes built for today's audience.",
  },
  {
    title: "Insecure",
    img: "/manus-storage/rG7SuIf5yLfa_1c496064.jpg",
    platform: "HBO · Issa Rae",
    note: "Authentic Black storytelling that built a massive loyal audience. BLOODLINE LIES targets the same demographic with higher-stakes drama and a viral origin story.",
  },
  {
    title: "Power",
    img: "/manus-storage/1FwgMn0HCj5Z_a68006a4.jpg",
    platform: "Starz · 50 Cent",
    note: "Secrets, double lives, and consequences that destroy families. BLOODLINE LIES mirrors this intensity — with a DNA test as the weapon that levels everything.",
  },
  {
    title: "Greenleaf",
    img: "/manus-storage/DXzH2d3ZoYqH_35f36ea9.jpg",
    platform: "OWN · Oprah Winfrey",
    note: "Family secrets hidden behind respectability. BLOODLINE LIES is this story — but the secret isn't in the church. It's in the bloodline.",
  },
];

export default function ComparablesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="comparables" ref={ref} className="resp-section" style={{ background: "#050505" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Market Position</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          Comparable Titles
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "3rem" }}>
          SCANDALOUS: BLOODLINE LIES sits at the intersection of premium family drama and viral social content — a market position no current title occupies.
        </p>

        {/* Poster grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
          gap: "1.5rem",
        }}>
          {COMPS.map((comp, i) => (
            <div
              key={comp.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`,
              }}
            >
              <img
                src={comp.img}
                alt={comp.title}
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "9/16",
                  objectFit: "cover",
                  objectPosition: "top",
                  transition: "transform 0.4s ease",
                  transform: hovered === i ? "scale(1.03)" : "scale(1)",
                }}
              />
              {/* Hover overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                opacity: hovered === i ? 1 : 0.6,
                transition: "opacity 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1rem",
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>
                  {comp.title}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "#D4AF37", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: hovered === i ? "0.5rem" : 0 }}>
                  {comp.platform}
                </div>
                {hovered === i && (
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                    {comp.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Differentiation callout */}
        <div style={{
          marginTop: "3rem",
          padding: "2.5rem",
          border: "1px solid rgba(212,175,55,0.2)",
          background: "rgba(212,175,55,0.03)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: "0.5rem" }}>What We Have</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#D4AF37" }}>
              Pre-existing audience
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginTop: "0.25rem" }}>
              3–5M+ documented views on the source story before a single episode is shot.
            </div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "0.5rem" }}>What We Have</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#D4AF37" }}>
              Proven format
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginTop: "0.25rem" }}>
              Vertical micro-drama is the fastest-growing content format on every major platform.
            </div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "0.5rem" }}>What We Have</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#D4AF37" }}>
              Complete package
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginTop: "0.25rem" }}>
              60 episodes written, beat sheets locked, characters cast-ready, compliance documented.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
