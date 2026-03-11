import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Handshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PartnershipBanner = () => (
  <section className="py-20 relative overflow-hidden">
    <motion.div
      className="absolute -left-20 top-1/3 w-52 h-52 rounded-full bg-primary/8 blur-[100px]"
      animate={{ x: [0, 30, 0] }}
      transition={{ duration: 7, repeat: Infinity }}
    />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card glow-border p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl gradient-bg">
          <Handshake className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-heading text-2xl font-bold mb-2">Become a Partner</h3>
          <p className="text-muted-foreground">
            Are you a YouTuber, network owner, or community leader? Get free premium hosting through our partnership program.
          </p>
        </div>
        <Button variant="hero" size="lg" asChild>
          <Link to="/partnership">
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default PartnershipBanner;
