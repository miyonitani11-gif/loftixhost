import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ServerTypesSection from "@/components/home/ServerTypesSection";
import ControlPanelSection from "@/components/home/ControlPanelSection";
import GamePanelSection from "@/components/home/GamePanelSection";
import UptimeGuaranteeSection from "@/components/home/UptimeGuaranteeSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnershipBanner from "@/components/home/PartnershipBanner";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import BlogSection from "@/components/home/BlogSection";
import LiveCounterSection from "@/components/home/LiveCounterSection";
import ModpackSection from "@/components/home/ModpackSection";
import SecuritySection from "@/components/home/SecuritySection";

const sectionComponents: Record<string, React.ComponentType> = {
  hero: HeroSection,
  trusted_by: TrustedBySection,
  live_counter: LiveCounterSection,
  stats: StatsSection,
  features: FeaturesSection,
  security: SecuritySection,
  why_choose: WhyChooseSection,
  how_it_works: HowItWorksSection,
  modpack: ModpackSection,
  server_types: ServerTypesSection,
  control_panel: ControlPanelSection,
  game_panel: GamePanelSection,
  uptime: UptimeGuaranteeSection,
  comparison: ComparisonSection,
  pricing: PricingSection,
  testimonials: TestimonialsSection,
  blog: BlogSection,
  partnership: PartnershipBanner,
  faq: FAQSection,
  cta: CTASection,
};

interface SectionConfig {
  section_key: string;
  enabled: boolean;
  sort_order: number;
}

const Index = () => {
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("homepage_sections").select("section_key, enabled, sort_order").order("sort_order");
      if (data && data.length > 0) setSections(data as any);
      setLoaded(true);
    };
    fetch();
  }, []);

  // Fallback while loading or if no DB data
  if (!loaded) {
    return (
      <Layout>
        <HeroSection />
        <TrustedBySection />
        <LiveCounterSection />
        <StatsSection />
        <FeaturesSection />
        <SecuritySection />
        <WhyChooseSection />
        <HowItWorksSection />
        <ModpackSection />
        <ServerTypesSection />
        <ControlPanelSection />
        <GamePanelSection />
        <UptimeGuaranteeSection />
        <ComparisonSection />
        <PricingSection />
        <TestimonialsSection />
        <BlogSection />
        <PartnershipBanner />
        <FAQSection />
        <CTASection />
      </Layout>
    );
  }

  const enabledSections = sections.filter((s) => s.enabled);

  return (
    <Layout>
      {enabledSections.map((s) => {
        const Component = sectionComponents[s.section_key];
        return Component ? <Component key={s.section_key} /> : null;
      })}
    </Layout>
  );
};

export default Index;
