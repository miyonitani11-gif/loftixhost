import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <Layout>
    <HeroSection />
    <FeaturesSection />
    <PricingSection />
    <TestimonialsSection />
    <FAQSection />
    <CTASection />
  </Layout>
);

export default Index;
