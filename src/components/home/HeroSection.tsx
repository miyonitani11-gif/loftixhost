import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Globe, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => (
  <section className="relative overflow-hidden py-28 md:py-40">
    {/* Animated background */}
    <div className="hero-glow absolute inset-0 pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

    {/* Floating particles */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-primary/20"
        style={{
          width: 4 + i * 3,
          height: 4 + i * 3,
          left: `${15 + i * 18}%`,
          top: `${20 + i * 12}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 10 * (i % 2 === 0 ? 1 : -1), 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
      />
    ))}

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-3.5 w-3.5 animate-pulse-glow" />
            Instant server deployment in under 60 seconds
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Premium{" "}
          <span className="gradient-text">Minecraft</span>
          <br />
          Server Hosting
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Deploy your Minecraft server in seconds with enterprise-grade hardware,
          DDoS protection, and a powerful control panel. Starting at just $2/mo.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/pricing">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/features">View Features</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Globe, value: "99.9%", label: "Uptime SLA" },
          { icon: Zap, value: "<50ms", label: "Avg Latency" },
          { icon: Shield, value: "10Tbps", label: "DDoS Protection" },
          { icon: Globe, value: "12+", label: "Global Locations" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="glass-card p-6 text-center group cursor-default"
          >
            <stat.icon className="h-5 w-5 text-primary mx-auto mb-2 group-hover:animate-pulse-glow transition-all" />
            <div className="font-heading text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
