import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import LoglineSection from "@/components/LoglineSection";
import SeriesSummarySection from "@/components/SeriesSummarySection";
import LeadCharactersSection from "@/components/LeadCharactersSection";
import VerticalShowcaseSection from "@/components/VerticalShowcaseSection";
import ScriptsSection from "@/components/ScriptsSection";
import BeatSheetsSection from "@/components/BeatSheetsSection";
import SeasonArcSection from "@/components/SeasonArcSection";
import ComparablesSection from "@/components/ComparablesSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import ComplianceSection from "@/components/ComplianceSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", overflowX: "hidden" }}>
      <NavBar />
      <HeroSection />
      <LoglineSection />
      <SeriesSummarySection />
      <LeadCharactersSection />
      <VerticalShowcaseSection />
      <ScriptsSection />
      <BeatSheetsSection />
      <SeasonArcSection />
      <ComparablesSection />
      <AnalyticsSection />
      <ComplianceSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
