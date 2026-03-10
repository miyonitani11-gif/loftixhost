import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden py-24 md:py-36">
    {/* Background glow */}
    <div className="hero-glow absolute inset-0 pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
          <Zap className="h-3.5 w-3.5" />
          Instant server deployment in under 60 seconds
        </div>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Premium{" "}
          <span className="gradient-text">Minecraft</span>
          <br />
          Server Hosting
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Deploy your Minecraft server in seconds with enterprise-grade hardware,
          DDoS protection, and a powerful control panel. Starting at just $2/mo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/pricing">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/features">View Features</Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Globe, value: "99.9%", label: "Uptime SLA" },
          { icon: Zap, value: "<50ms", label: "Avg Latency" },
          { icon: Shield, value: "10Tbps", label: "DDoS Protection" },
          { icon: Globe, value: "12+", label: "Global Locations" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
