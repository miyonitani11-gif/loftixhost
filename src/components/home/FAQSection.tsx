import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How fast is server deployment?", a: "Your server is automatically provisioned and online within 60 seconds of payment. No manual setup required." },
  { q: "What Minecraft versions do you support?", a: "We support all versions from 1.7.10 to the latest release, including Bedrock. We also support Forge, Fabric, Spigot, Paper, Purpur, and more." },
  { q: "Can I install modpacks?", a: "Yes! Our panel supports one-click modpack installation for popular packs, or you can upload your own custom modpack." },
  { q: "Do you offer DDoS protection?", a: "All servers include enterprise-grade DDoS protection with up to 10Tbps mitigation capacity at no extra cost." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. You can upgrade or downgrade your plan at any time from the billing dashboard. Changes take effect immediately." },
  { q: "What payment methods do you accept?", a: "We accept credit/debit cards via Stripe and PayPal. All payments are processed securely." },
];

const FAQSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-0">
            <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
