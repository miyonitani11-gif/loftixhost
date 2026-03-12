import Layout from "@/components/Layout";
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
import TeamSection from "@/components/home/TeamSection";
import BlogSection from "@/components/home/BlogSection";
import LiveCounterSection from "@/components/home/LiveCounterSection";
import ModpackSection from "@/components/home/ModpackSection";
import SecuritySection from "@/components/home/SecuritySection";

const Index = () => (
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
    <TeamSection />
    <BlogSection />
    <PartnershipBanner />
    <FAQSection />
    <CTASection />
  </Layout>
);

export default Index;
