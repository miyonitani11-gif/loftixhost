import { motion } from "framer-motion";
import { Terminal, FileText, RotateCcw, BarChart3, Shield, Settings } from "lucide-react";

const panelFeatures = [
  { icon: Terminal, title: "Live Console", desc: "Full server console access with real-time log streaming and command execution." },
  { icon: FileText, title: "File Manager", desc: "Browse, edit, and upload files directly from your browser. No FTP needed." },
  { icon: RotateCcw, title: "One-Click Backups", desc: "Create and restore backups instantly. Automatic daily backups included." },
  { icon: BarChart3, title: "Resource Monitor", desc: "Track CPU, RAM, and disk usage in real-time with detailed graphs." },
  { icon: Shield, title: "Sub-Users", desc: "Grant staff access with granular permissions for each team member." },
  { icon: Settings, title: "Server Config", desc: "Edit server.properties, JVM flags, and startup parameters with ease." },
];

const GamePanelSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 hero-glow pointer-events-none opacity-50" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Powerful <span className="gradient-text">Panel Features</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to manage your server, all in one place.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {panelFeatures.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 group hover:glow-border transition-all duration-300"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="h-6 w-6" />
            </div>
            <h4 className="font-heading text-lg font-semibold mb-2">{f.title}</h4>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GamePanelSection;
