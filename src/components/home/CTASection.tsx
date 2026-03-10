import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const DISCORD_LINK = "https://discord.gg/h9kYJGDMTC";

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 hero-glow pointer-events-none rotate-180" />

    <motion.div
      className="absolute -left-20 top-1/2 w-40 h-40 rounded-full bg-primary/10 blur-[80px]"
      animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
    <motion.div
      className="absolute -right-20 top-1/3 w-60 h-60 rounded-full bg-accent/10 blur-[100px]"
      animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
    />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card glow-border p-12 md:p-16 text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex h-14 w-14 items-center justify-center rounded-xl gradient-bg mx-auto mb-6"
        >
          <Sparkles className="h-7 w-7 text-primary-foreground" />
        </motion.div>

        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Ready to Launch Your Server?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Join our Discord community and get your server deployed in minutes.
        </p>
        <Button variant="hero" size="lg" asChild>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            Buy Through Discord <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
