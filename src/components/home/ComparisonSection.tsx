import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "AMD EPYC CPUs", us: true, others: false },
  { feature: "NVMe SSD Storage", us: true, others: false },
  { feature: "DDoS Protection", us: true, others: true },
  { feature: "Instant Setup (<60s)", us: true, others: false },
  { feature: "Custom Game Panel", us: true, others: false },
  { feature: "24/7 Discord Support", us: true, others: false },
  { feature: "Auto Backups", us: true, others: true },
  { feature: "Plans from ₹69/mo", us: true, others: false },
];

const ComparisonSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          LoftixHost vs <span className="gradient-text">Others</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          See why server owners are switching to LoftixHost.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card overflow-hidden max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-3 text-center font-heading font-semibold text-sm md:text-base border-b border-border/30 bg-primary/5">
          <div className="p-4 text-left">Feature</div>
          <div className="p-4 gradient-text">LoftixHost</div>
          <div className="p-4 text-muted-foreground">Others</div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-3 text-center border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors"
          >
            <div className="p-4 text-left text-sm">{row.feature}</div>
            <div className="p-4 flex justify-center">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div className="p-4 flex justify-center">
              {row.others ? (
                <Check className="h-5 w-5 text-muted-foreground/50" />
              ) : (
                <X className="h-5 w-5 text-destructive/60" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ComparisonSection;
