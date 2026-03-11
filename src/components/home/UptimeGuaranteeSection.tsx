import { motion } from "framer-motion";
import { Activity, Server, ShieldCheck, Clock } from "lucide-react";

const metrics = [
  { icon: Activity, value: "99.9%", label: "Uptime Guarantee" },
  { icon: Server, value: "<50ms", label: "Average Latency" },
  { icon: ShieldCheck, value: "24/7", label: "DDoS Protection" },
  { icon: Clock, value: "<5min", label: "Setup Time" },
];

const UptimeGuaranteeSection = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Built for <span className="gradient-text">Reliability</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Enterprise-grade infrastructure you can count on.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="glass-card glow-border p-6 text-center"
          >
            <m.icon className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="font-heading text-3xl font-bold gradient-text mb-1">{m.value}</div>
            <p className="text-sm text-muted-foreground">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UptimeGuaranteeSection;
