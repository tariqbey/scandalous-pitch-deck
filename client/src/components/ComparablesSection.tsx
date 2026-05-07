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
    title: "Tyler Perry's Sistas",
    img: "/manus-storage/WjyqgXLcwu7R_21243f5a.jpg",
    platform: "BET · Tyler Perry",
    note: "Relationship drama with Black women at the center — one of BET's highest-rated series. BLOODLINE LIES matches this audience with a story ripped straight from viral reality.",
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
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: "3rem", lineHeight: 1.8 }}>
          SCANDALOUS: BLOODLINE LIES sits at the intersection of premium family drama and viral social content — a market position no current title occupies.
        </p>

        {/* Poster grid — text BELOW each poster, nothing overlaid on the image */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 170px), 1fr))",
          gap: "2rem",
        }}>
          {COMPS.map((comp, i) => (
            <div
              key={comp.title}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Poster image — full, uncropped, no overlay */}
              <div style={{
                borderRadius: "0.5rem",
                overflow: "hidden",
                border: "1px solid rgba(212,175,55,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                flexShrink: 0,
              }}>
                <img
                  src={comp.img}
                  alt={comp.title}
                  style={{
                    width: "100%",
                    display: "block",
                    aspectRatio: "2/3",
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                />
              </div>

              {/* Text block — sits BELOW the poster */}
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.2rem",
                  lineHeight: 1.3,
                }}>
                  {comp.title}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: "#D4AF37",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}>
                  {comp.platform}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                }}>
                  {comp.note}
                </div>
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
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "0.25rem" }}>
              3–5M+ documented views on the source story before a single episode is shot.
            </div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "0.5rem" }}>What We Have</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#D4AF37" }}>
              Proven format
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "0.25rem" }}>
              Vertical micro-drama is the fastest-growing content format on every major platform.
            </div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "0.5rem" }}>What We Have</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#D4AF37" }}>
              Complete package
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "0.25rem" }}>
              60 episodes written, beat sheets locked, characters cast-ready, compliance documented.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
