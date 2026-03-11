import { motion } from "framer-motion";
import { Cpu, Shield, Headphones, Zap, Globe, Clock } from "lucide-react";

const reasons = [
  { icon: Cpu, title: "AMD EPYC Hardware", desc: "Enterprise-grade processors for maximum performance on every server." },
  { icon: Shield, title: "Advanced DDoS Protection", desc: "Multi-layered protection keeps your server safe from attacks 24/7." },
  { icon: Headphones, title: "Human Support", desc: "Real people helping you — no bots, no ticket queues, just fast help." },
  { icon: Zap, title: "Instant Deployment", desc: "Your server is live within minutes of purchase, fully configured." },
  { icon: Globe, title: "Global Network", desc: "Strategically placed nodes for low-latency gameplay worldwide." },
  { icon: Clock, title: "99.9% Uptime", desc: "We guarantee your server stays online with enterprise infrastructure." },
];

const WhyChooseSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Why Choose <span className="gradient-text">LoftixHost</span>?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Built by gamers, for gamers. Here's what sets us apart.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-6 group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg mb-4 group-hover:scale-110 transition-transform">
              <r.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
