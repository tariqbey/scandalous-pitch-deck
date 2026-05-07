import { useEffect, useRef, useState, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie,
  LineChart, Line, CartesianGrid,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────────
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

// ── Animated number counter ───────────────────────────────────────────────────
function CountUp({ end, suffix = "", duration = 2000, delay = 0, trigger }: {
  end: number; suffix?: string; duration?: number; delay?: number; trigger: boolean;
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    const t = setTimeout(() => {
      started.current = true;
      const steps = 80;
      const step = end / steps;
      let cur = 0;
      const id = setInterval(() => {
        cur += step;
        if (cur >= end) { setVal(end); clearInterval(id); }
        else setVal(Math.floor(cur));
      }, duration / steps);
    }, delay);
    return () => clearTimeout(t);
  }, [trigger, end, duration, delay]);

  return <>{val.toLocaleString()}{suffix}</>;
}

// ── Animated bar (CSS-driven, no Recharts needed) ─────────────────────────────
function AnimatedBar({ label, value, maxValue, color, delay, trigger }: {
  label: string; value: number; maxValue: number; color: string; delay: number; trigger: boolean;
}) {
  const pct = (value / maxValue) * 100;
  const [width, setWidth] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    const t = setTimeout(() => {
      started.current = true;
      setWidth(pct);
    }, delay);
    return () => clearTimeout(t);
  }, [trigger, pct, delay]);

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", alignItems: "baseline" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color, fontWeight: 700 }}>
          {trigger ? <CountUp end={value} suffix="K" duration={1800} delay={delay} trigger={trigger} /> : "0K"}
        </span>
      </div>
      <div style={{ height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: 5,
          transition: `width 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          boxShadow: `0 0 16px ${color}80`,
          position: "relative",
        }}>
          {/* Shimmer sweep */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
            animation: trigger ? `shimmer 1.8s ease ${delay}ms 1` : "none",
          }} />
        </div>
      </div>
    </div>
  );
}

// ── Stat card with count-up and pulse ─────────────────────────────────────────
function StatCard({ stat, index, trigger }: { stat: { value: string; label: string; sub: string }; index: number; trigger: boolean }) {
  const [pulsed, setPulsed] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setPulsed(true), index * 150 + 400);
    return () => clearTimeout(t);
  }, [trigger, index]);

  // Parse numeric part for count-up
  const numMatch = stat.value.match(/^([\d.]+)/);
  const numPart = numMatch ? parseFloat(numMatch[1]) : null;
  const suffix = numMatch ? stat.value.slice(numMatch[1].length) : stat.value;

  return (
    <div style={{
      background: "#060606",
      padding: "2rem 1.5rem",
      opacity: trigger ? 1 : 0,
      transform: trigger ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
      transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.12}s`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Gold flash on arrival */}
      {pulsed && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(212,175,55,0.08)",
          animation: "goldPulse 0.6s ease forwards",
          pointerEvents: "none",
        }} />
      )}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
        fontWeight: 900,
        color: "#D4AF37",
        marginBottom: "0.5rem",
        lineHeight: 1,
        textShadow: trigger ? "0 0 30px rgba(212,175,55,0.5)" : "none",
        transition: "text-shadow 1s ease",
      }}>
        {numPart !== null
          ? <CountUp end={numPart} suffix={suffix} duration={2000} delay={index * 150 + 200} trigger={trigger} />
          : stat.value
        }
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: "0.35rem" }}>
        {stat.label}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
        {stat.sub}
      </div>
    </div>
  );
}

// ── Custom tooltips ───────────────────────────────────────────────────────────
const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111", border: "1px solid rgba(212,175,55,0.4)", padding: "0.75rem 1.25rem", borderRadius: 4 }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#D4AF37", marginBottom: "0.25rem" }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#fff" }}>{payload[0].value.toLocaleString()}K views</div>
    </div>
  );
};

const LineTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111", border: "1px solid rgba(212,175,55,0.4)", padding: "0.75rem 1.25rem", borderRadius: 4 }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#D4AF37", marginBottom: "0.25rem" }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#fff" }}>{payload[0].value.toLocaleString()}K cumulative views</div>
    </div>
  );
};

// ── Gender bar ────────────────────────────────────────────────────────────────
function GenderBar({ label, pct, color, delay, trigger }: { label: string; pct: number; color: string; delay: number; trigger: boolean }) {
  const [width, setWidth] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!trigger || started.current) return;
    const t = setTimeout(() => { started.current = true; setWidth(pct); }, delay);
    return () => clearTimeout(t);
  }, [trigger, pct, delay]);
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color, fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color, fontWeight: 700 }}>
          {trigger ? <CountUp end={pct} suffix="%" duration={1600} delay={delay} trigger={trigger} /> : "0%"}
        </span>
      </div>
      <div style={{ height: 14, background: "rgba(255,255,255,0.06)", borderRadius: 7, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 7,
          transition: `width 2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          boxShadow: `0 0 20px ${color}80`,
        }} />
      </div>
    </div>
  );
}

// ── Keyframe injection ────────────────────────────────────────────────────────
const KEYFRAMES = `
@keyframes goldPulse {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 20px rgba(212,175,55,0.3); }
  50%       { text-shadow: 0 0 60px rgba(212,175,55,0.9), 0 0 120px rgba(212,175,55,0.4); }
}
@keyframes borderGlow {
  0%, 100% { border-color: rgba(212,175,55,0.15); }
  50%       { border-color: rgba(212,175,55,0.6); }
}
@keyframes countFlash {
  0%   { color: #fff; }
  40%  { color: #F0D060; text-shadow: 0 0 40px rgba(240,208,96,0.9); }
  100% { color: #D4AF37; }
}
`;

// ── Main section ──────────────────────────────────────────────────────────────
export default function AnalyticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        setTimeout(() => setChartsReady(true), 400);
      }
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const STATS = [
    { value: "7M+",    label: "Total Cross-Platform Views",  sub: "Documented across TikTok, YouTube, Facebook, Instagram, X" },
    { value: "3.2M+",  label: "TikTok Views",                sub: "@lonniemauricehill flagship videos" },
    { value: "1M+",    label: "YouTube Views",               sub: "Shorts + reaction content" },
    { value: "950K+",  label: "Facebook Engagement",         sub: "Views + shares on original posts" },
    { value: "62%",    label: "Female Audience",             sub: "Primary demographic 25–44" },
    { value: "7 Days", label: "To Viral Status",             sub: "Organic, zero paid promotion" },
  ];

  return (
    <>
      <style>{KEYFRAMES}</style>
      <section id="analytics" ref={sectionRef} className="resp-section" style={{ background: "#000" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* ── HEADER ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <div className="section-label" style={{ fontSize: "0.85rem" }}>Social Proof</div>
            <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
            <h2 className="display-heading" style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              marginBottom: "1rem",
              animation: visible ? "glowPulse 3s ease 0.5s 3" : "none",
            }}>
              The Audience Already Exists
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 760,
              lineHeight: 1.9,
              marginBottom: "3rem",
            }}>
              Before a single episode is produced, the source story has generated over{" "}
              <strong style={{
                color: "#D4AF37",
                animation: visible ? "glowPulse 2s ease 1s 4" : "none",
              }}>
                7 million documented views
              </strong>{" "}
              across platforms — with zero paid promotion. This is not a pitch for an audience. This is a pitch to serve one that already exists.
            </p>
          </div>

          {/* ── SOURCE ATTRIBUTION ── */}
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
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            animation: visible ? "borderGlow 3s ease 1s 2" : "none",
          }}>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                Source Story
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.75)" }}>
                @lonniemauricehill — "My daughter's fiancé is my biological son" — TikTok, YouTube, Facebook, Instagram
              </div>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
              Data collected April 2026 · Organic reach only
            </div>
          </div>

          {/* ── STAT COUNTERS (count up from zero) ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1px",
            background: "rgba(212,175,55,0.12)",
            marginBottom: "4rem",
          }}>
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} trigger={visible} />
            ))}
          </div>

          {/* ── PLATFORM BAR CHART (CSS animated bars, no Recharts needed) ── */}
          <div style={{
            background: "#0A0A0A",
            border: "1px solid rgba(212,175,55,0.15)",
            padding: "2.5rem",
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.4rem" }}>
              Views by Platform
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>
              In thousands (000s) — bars animate on scroll
            </div>
            {PLATFORM_DATA.map((d, i) => (
              <AnimatedBar
                key={d.platform}
                label={d.platform}
                value={d.views}
                maxValue={3200}
                color={d.color}
                delay={i * 180}
                trigger={chartsReady}
              />
            ))}
          </div>

          {/* ── CHARTS ROW (Recharts with animation) ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s",
          }}>

            {/* Demographic pie chart */}
            <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.15)", padding: "2rem" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.4rem" }}>
                Audience Age Demographics
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>
                Percentage of total audience
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ flex: "0 0 160px", width: 160, height: 160, flexShrink: 0 }}>
                  <PieChart width={160} height={160}>
                    <Pie
                      data={DEMO_DATA}
                      cx="50%" cy="50%"
                      innerRadius={40} outerRadius={70}
                      dataKey="value"
                      strokeWidth={0}
                      isAnimationActive={chartsReady}
                      animationBegin={0}
                      animationDuration={1800}
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
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{d.name}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: d.color, marginLeft: "auto", fontWeight: 700 }}>{d.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Growth line chart */}
            <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.15)", padding: "2rem" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.4rem" }}>
                Viral Growth Curve
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>
                Cumulative views — first 10 days (000s)
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={GROWTH_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<LineTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#D4AF37"
                    strokeWidth={3}
                    dot={{ fill: "#D4AF37", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: "#F0D060", strokeWidth: 0 }}
                    isAnimationActive={chartsReady}
                    animationBegin={0}
                    animationDuration={2200}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── GENDER SPLIT ── */}
          <div style={{
            background: "#0A0A0A",
            border: "1px solid rgba(212,175,55,0.15)",
            padding: "2.5rem",
            marginBottom: "3rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s",
          }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "2rem" }}>
              Gender Split
            </div>
            <GenderBar label="Female" pct={62} color="#e05c8a" delay={1000} trigger={visible} />
            <GenderBar label="Male"   pct={38} color="#4ecdc4" delay={1400} trigger={visible} />
          </div>

          {/* ── SOAP OPERA PARALLEL ── */}
          <div style={{
            padding: "2.5rem",
            border: "1px solid rgba(212,175,55,0.2)",
            background: "rgba(212,175,55,0.03)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 1s, transform 0.8s ease 1s",
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
    </>
  );
}
