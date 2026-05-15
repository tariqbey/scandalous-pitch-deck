import { lazy, Suspense } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import TrailerSection from "@/components/TrailerSection";

// Lazy-load all sections below the fold — they only download when needed
const LoglineSection = lazy(() => import("@/components/LoglineSection"));
const LeadCharactersSection = lazy(() => import("@/components/LeadCharactersSection"));
const SeriesSummarySection = lazy(() => import("@/components/SeriesSummarySection"));
const VerticalShowcaseSection = lazy(() => import("@/components/VerticalShowcaseSection"));
const ScriptsSection = lazy(() => import("@/components/ScriptsSection"));
const BeatSheetsSection = lazy(() => import("@/components/BeatSheetsSection"));
const SeasonArcSection = lazy(() => import("@/components/SeasonArcSection"));
const ComparablesSection = lazy(() => import("@/components/ComparablesSection"));
const AnalyticsSection = lazy(() => import("@/components/AnalyticsSection"));
const ComplianceSection = lazy(() => import("@/components/ComplianceSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

// Minimal placeholder while a section loads in
function SectionFallback() {
  return <div style={{ minHeight: 200, background: "#000" }} />;
}

export default function Home() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", overflowX: "hidden" }}>
      <NavBar />
      {/* Hero loads immediately — no lazy */}
      <HeroSection />
      {/* Trailer — loads eagerly, right below hero */}
      <TrailerSection />
      {/* Everything below the fold loads on demand */}
      <Suspense fallback={<SectionFallback />}>
        <LoglineSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LeadCharactersSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SeriesSummarySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <VerticalShowcaseSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ScriptsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BeatSheetsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SeasonArcSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ComparablesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AnalyticsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ComplianceSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
