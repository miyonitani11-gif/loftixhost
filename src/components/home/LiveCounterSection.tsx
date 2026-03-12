import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Users, Wifi, Activity } from "lucide-react";

const LiveCounterSection = () => {
  const [counters, setCounters] = useState({ servers: 847, players: 12340, uptime: 99.97, regions: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        servers: prev.servers + Math.floor(Math.random() * 3) - 1,
        players: prev.players + Math.floor(Math.random() * 50) - 25,
        uptime: 99.97,
        regions: 12,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { icon: Server, label: "Active Servers", value: counters.servers.toLocaleString(), pulse: true },
    { icon: Users, label: "Players Online", value: counters.players.toLocaleString(), pulse: true },
    { icon: Activity, label: "Uptime", value: `${counters.uptime}%`, pulse: false },
    { icon: Wifi, label: "Active Regions", value: counters.regions.toString(), pulse: false },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Live Stats</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Real-Time <span className="gradient-text">Network Status</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="glass-card glow-border p-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-3">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="font-heading text-3xl md:text-4xl font-bold mb-1 tabular-nums">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
              {item.pulse && <div className="mt-2 h-1 w-12 mx-auto rounded-full bg-emerald-500/50 animate-pulse" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveCounterSection;
