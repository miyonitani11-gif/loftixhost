import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ServerTypesSection from "@/components/home/ServerTypesSection";
import ControlPanelSection from "@/components/home/ControlPanelSection";
import GamePanelSection from "@/components/home/GamePanelSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <Layout>
    <HeroSection />
    <TrustedBySection />
    <StatsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <ServerTypesSection />
    <ControlPanelSection />
    <GamePanelSection />
    <ComparisonSection />
    <PricingSection />
    <TestimonialsSection />
    <FAQSection />
    <CTASection />
  </Layout>
);

export default Index;
