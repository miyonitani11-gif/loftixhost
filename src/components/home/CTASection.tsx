import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 hero-glow pointer-events-none rotate-180" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card glow-border p-12 md:p-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Ready to Launch Your Server?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Join thousands of server owners who trust EnderHost. Deploy in under 60 seconds.
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/pricing">
            Get Started Now <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
