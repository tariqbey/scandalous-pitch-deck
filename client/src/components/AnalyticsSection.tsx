import { useEffect, useRef, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
  LineChart, Line, CartesianGrid,
} from "recharts";

// ── Virality data ─────────────────────────────────────────────────────────────
const PLATFORM_DATA = [
  { platform: "TikTok",      views: 3200, color: "#D4AF37" },
  { platform: "YouTube",     views: 1800, color: "#8B0000" },
  { platform: "Facebook",    views: 950,  color: "#4ecdc4" },
  { platform: "Instagram",   views: 620,  color: "#e05c8a" },
  { platform: "X / Twitter", views: 430,  color: "#a0a0a0" },
];

const DEMO_DATA = [
  { name: "18–24", value: 28, color: "#D4AF37" },
  { name: "25–34", value: 34, color: "#8B0000" },
  { name: "35–44", value: 22, color: "#4ecdc4" },
  { name: "45–54", value: 11, color: "#e05c8a" },
  { name: "55+",   value: 5,  color: "#a0a0a0" },
];

const GROWTH_DATA = [
  { day: "Day 1",  views: 180  },
  { day: "Day 2",  views: 420  },
  { day: "Day 3",  views: 890  },
  { day: "Day 4",  views: 1400 },
  { day: "Day 5",  views: 2100 },
  { day: "Day 6",  views: 2900 },
  { day: "Day 7",  views: 3800 },
  { day: "Day 8",  views: 5200 },
  { day: "Day 9",  views: 6100 },
  { day: "Day 10", views: 7000 },
];

const STATS = [
  { value: "7M+",    label: "Total Cross-Platform Views",  sub: "Documented across TikTok, YouTube, Facebook, Instagram, X" },
  { value: "3.2M+",  label: "TikTok Views",                sub: "@lonniemauricehill flagship videos" },
  { value: "1M+",    label: "YouTube Views",               sub: "Shorts + reaction content" },
  { value: "950K+",  label: "Facebook Engagement",         sub: "Views + shares on original posts" },
  { value: "62%",    label: "Female Audience",             sub: "Primary demographic 25–44" },
  { value: "7 Days", label: "To Viral Status",             sub: "Organic, zero paid promotion" },
];

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111", border: "1px solid rgba(212,175,55,0.4)", padding: "0.75rem 1.25rem", borderRadius: 4 }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#D4AF37", marginBottom: "0.25rem" }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#fff" }}>
        {payload[0].value.toLocaleString()}K views
      </div>
    </div>
  );
};

const LineTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111", border: "1px solid rgba(212,175,55,0.4)", padding: "0.75rem 1.25rem", borderRadius: 4 }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#D4AF37", marginBottom: "0.25rem" }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#fff" }}>
        {payload[0].value.toLocaleString()}K cumulative views
      </div>
    </div>
  );
};

// ── Animated gender bar ───────────────────────────────────────────────────────
function GenderBar({ label, pct, color, delay, visible }: { label: string; pct: number; color: string; delay: number; visible: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [visible, pct, delay]);
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color, fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 12, background: "rgba(255,255,255,0.08)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: color,
          borderRadius: 6,
          transition: `width 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          boxShadow: `0 0 12px ${color}66`,
        }} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AnalyticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        // Delay chart animation slightly so the section has fully entered view
        setTimeout(() => setChartsReady(true), 300);
      }
    }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="analytics" ref={sectionRef} className="resp-section" style={{ background: "#000" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div className="section-label" style={{ fontSize: "0.85rem" }}>Social Proof</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", marginBottom: "1rem" }}>
          The Audience Already Exists
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.65)", maxWidth: 760, lineHeight: 1.85, marginBottom: "3rem" }}>
          Before a single episode is produced, the source story has generated over{" "}
          <strong style={{ color: "#D4AF37" }}>7 million documented views</strong> across platforms — with zero paid promotion.
          This is not a pitch for an audience. This is a pitch to serve one that already exists.
        </p>

        {/* Source attribution */}
        <div style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.2)",
          padding: "1.5rem 2rem",
          marginBottom: "3rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Source Story
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.7)" }}>
              @lonniemauricehill — "My daughter's fiancé is my biological son" — TikTok, YouTube, Facebook, Instagram
            </div>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
            Data collected April 2026 · Organic reach only
          </div>
        </div>

        {/* Big stat counters */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1px",
          background: "rgba(212,175,55,0.1)",
          marginBottom: "4rem",
        }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{
              background: "#060606",
              padding: "2rem 1.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`,
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#D4AF37", marginBottom: "0.5rem" }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: "0.35rem" }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row — all animate on scroll */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "2rem",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
        }}>

          {/* Platform bar chart — bars animate up */}
          <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.15)", padding: "2rem", borderRadius: 2 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.5rem" }}>
              Views by Platform
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>
              In thousands (000s)
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PLATFORM_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="platform" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="views"
                  radius={[3, 3, 0, 0]}
                  isAnimationActive={chartsReady}
                  animationBegin={0}
                  animationDuration={1400}
                  animationEasing="ease-out"
                >
                  {PLATFORM_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Demographic pie chart — spins in */}
          <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.15)", padding: "2rem", borderRadius: 2 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.5rem" }}>
              Audience Age Demographics
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>
              Percentage of total audience
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 160px", width: 160, height: 160 }}>
                <PieChart width={160} height={160}>
                    <Pie
                      data={DEMO_DATA}
                      cx="50%" cy="50%"
                      innerRadius={42} outerRadius={72}
                      dataKey="value"
                      strokeWidth={0}
                      isAnimationActive={chartsReady}
                      animationBegin={200}
                      animationDuration={1600}
                      animationEasing="ease-out"
                    >
                      {DEMO_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                </PieChart>
              </div>
              <div style={{ flex: 1, minWidth: 120 }}>
                {DEMO_DATA.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.65rem" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)" }}>{d.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: d.color, marginLeft: "auto", fontWeight: 700 }}>{d.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Growth line chart — line draws itself */}
          <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.15)", padding: "2rem", borderRadius: 2 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.5rem" }}>
              Viral Growth Curve
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>
              Cumulative views — first 10 days (000s)
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={GROWTH_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<LineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#D4AF37"
                  strokeWidth={2.5}
                  dot={{ fill: "#D4AF37", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#F0D060", strokeWidth: 0 }}
                  isAnimationActive={chartsReady}
                  animationBegin={400}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender split — bars animate in */}
        <div style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.15)",
          padding: "2.5rem",
          marginBottom: "3rem",
          borderRadius: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "2rem" }}>
            Gender Split
          </div>
          <GenderBar label="Female" pct={62} color="#e05c8a" delay={600} visible={visible} />
          <GenderBar label="Male"   pct={38} color="#4ecdc4" delay={900} visible={visible} />
        </div>

        {/* The Soap Opera Parallel */}
        <div style={{
          padding: "2.5rem",
          border: "1px solid rgba(212,175,55,0.2)",
          background: "rgba(212,175,55,0.03)",
          borderRadius: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s",
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "1rem" }}>
            The Historical Parallel
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", color: "#fff", marginBottom: "1rem", lineHeight: 1.35 }}>
            Procter & Gamble Invented Soap Operas to Sell Soap.<br />
            <span style={{ color: "#D4AF37" }}>Vertical Micro-Drama Is the New Soap Opera.</span>
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, maxWidth: 820 }}>
            In the 1930s, P&G funded serialized radio dramas to build daily audience habits and sell products. The format worked because it was emotional, addictive, and built into daily routines. Today, vertical micro-drama on TikTok, YouTube Shorts, and Instagram Reels occupies the same psychological space — but with 100x the distribution reach and zero gatekeeping. SCANDALOUS: BLOODLINE LIES is engineered for exactly this moment.
          </p>
        </div>

      </div>
    </section>
  );
}
