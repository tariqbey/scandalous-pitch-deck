import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{
      background: "#000",
      padding: "8rem 1.5rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 600,
        background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>Ready to Move</div>
        <h2 className="display-heading" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", marginBottom: "1.5rem" }}>
          Let's Make<br />This Series.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "3rem" }}>
          The audience exists. The scripts are written. The story is proven. All that's missing is the right platform partner.
        </p>

        <div className="gold-rule" style={{ maxWidth: 200, margin: "0 auto 3rem" }} />

        {/* Contact details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <div>
            <div className="section-label" style={{ marginBottom: "0.25rem" }}>Producer</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff" }}>Malik Davis</div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "0.25rem" }}>Company</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#D4AF37" }}>Upscale Promotions & Entertainment, Inc.</div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "0.25rem" }}>For Inquiries</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
              Full script package, production bible, and budget breakdown available upon request.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <button className="gold-btn" style={{ fontSize: "0.8rem", padding: "1rem 3rem" }}>
            Request Full Package
          </button>
        </div>
      </div>
    </section>
  );
}
