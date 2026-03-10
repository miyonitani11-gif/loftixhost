import { motion } from "framer-motion";
import { Server, Users, Globe, Clock } from "lucide-react";

const stats = [
  { icon: Server, value: "20+", label: "Active Servers", suffix: "" },
  { icon: Users, value: "500+", label: "Happy Players", suffix: "" },
  { icon: Globe, value: "12+", label: "Global Locations", suffix: "" },
  { icon: Clock, value: "99.9%", label: "Uptime Guaranteed", suffix: "" },
];

const StatsSection = () => (
  <section className="py-20 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-6 md:p-8 text-center group"
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
              whileHover={{ rotate: 10 }}
            >
              <stat.icon className="h-6 w-6" />
            </motion.div>
            <div className="font-heading text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
