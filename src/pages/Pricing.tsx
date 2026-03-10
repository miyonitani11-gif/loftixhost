import Layout from "@/components/Layout";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";

const Pricing = () => (
  <Layout>
    <div className="py-12">
      <PricingSection />
      <FAQSection />
    </div>
  </Layout>
);

export default Pricing;
