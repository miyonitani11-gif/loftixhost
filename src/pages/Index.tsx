import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ServerTypesSection from "@/components/home/ServerTypesSection";
import GamePanelSection from "@/components/home/GamePanelSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <Layout>
    <HeroSection />
    <TrustedBySection />
    <FeaturesSection />
    <HowItWorksSection />
    <ServerTypesSection />
    <GamePanelSection />
    <PricingSection />
    <TestimonialsSection />
    <FAQSection />
    <CTASection />
  </Layout>
);

export default Index;
