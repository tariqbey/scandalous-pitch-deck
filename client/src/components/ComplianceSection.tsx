import { useEffect, useRef, useState } from "react";

const COMPLIANCE_ITEMS = [
  {
    category: "Story Origin",
    status: "CLEAR",
    color: "#4ecdc4",
    items: [
      { label: "Source material", note: "Adapted from real, publicly documented events shared voluntarily on social media by Lonnie Maurice Hill." },
      { label: "Fictionalization", note: "All character names, locations, and identifying details have been changed. This is a fictional drama inspired by real events." },
      { label: "No defamation risk", note: "No real persons are depicted. Story is a dramatization of a publicly shared narrative." },
    ],
  },
  {
    category: "Content",
    status: "COMPLIANT",
    color: "#D4AF37",
    items: [
      { label: "Incest depiction", note: "No incestuous acts depicted. The relationship is ended before biological connection is confirmed. Story is about the horror of discovery, not the act." },
      { label: "Platform guidelines", note: "Content is designed to comply with TikTok, YouTube, Instagram, and Facebook community standards." },
      { label: "Age ratings", note: "Series targets TV-14 / MA-L rating. No explicit sexual content. Mature themes handled with dramatic restraint." },
    ],
  },
  {
    category: "IP & Rights",
    status: "OWNED",
    color: "#D4AF37",
    items: [
      { label: "Script ownership", note: "All 60 episodes written by Malik Davis. Full copyright held by Upscale Promotions & Entertainment, Inc." },
      { label: "Character IP", note: "All characters are original fictional creations. No real persons depicted." },
      { label: "Title", note: "SCANDALOUS: BLOODLINE BETRAYAL is an original title. Trademark search recommended before production." },
    ],
  },
  {
    category: "Production",
    status: "READY",
    color: "#e05c8a",
    items: [
      { label: "Format", note: "9:16 vertical, 90-second episodes. 4 standing sets. Lean production model." },
      { label: "Script package", note: "60 episodes complete. Beat sheets locked. Production bible available upon request." },
      { label: "Budget tier", note: "Designed for micro-budget vertical drama production. Estimated $800–1,200 per episode at scale." },
    ],
  },
];

export default function ComplianceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="compliance" ref={ref} style={{ background: "#050505", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Due Diligence</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          Compliance & Rights
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "3rem" }}>
          This project has been structured to address the key legal and platform compliance questions upfront.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(212,175,55,0.1)" }}>
          {COMPLIANCE_ITEMS.map((section, i) => (
            <div key={section.category} style={{
              background: "#060606",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
            }}>
              {/* Header */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: section.color,
                    background: `${section.color}15`,
                    border: `1px solid ${section.color}40`,
                    padding: "0.25rem 0.75rem",
                    textTransform: "uppercase",
                  }}>
                    {section.status}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                    {section.category}
                  </div>
                </div>
                <div style={{ color: "#D4AF37", fontSize: "1rem", transition: "transform 0.3s", transform: expanded === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                  +
                </div>
              </button>

              {/* Expanded content */}
              {expanded === i && (
                <div style={{ padding: "0 2rem 1.5rem" }}>
                  {section.items.map((item) => (
                    <div key={item.label} style={{
                      display: "grid",
                      gridTemplateColumns: "160px 1fr",
                      gap: "1.5rem",
                      paddingBottom: "1rem",
                      marginBottom: "1rem",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                        {item.note}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legal disclaimer */}
        <div style={{
          marginTop: "2.5rem",
          padding: "1.5rem 2rem",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "rgba(255,255,255,0.5)" }}>Legal Disclaimer:</strong> SCANDALOUS: BLOODLINE BETRAYAL is a work of fiction. All characters, events, and locations depicted are fictional. Any resemblance to real persons, living or dead, is coincidental. The series is inspired by publicly documented social media content. Full legal review recommended prior to production. All rights reserved © 2025 Upscale Promotions & Entertainment, Inc.
          </p>
        </div>
      </div>
    </section>
  );
}
