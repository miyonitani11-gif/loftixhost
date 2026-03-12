import { motion } from "framer-motion";
import { Shield, Lock, Eye, AlertTriangle, Server, Fingerprint } from "lucide-react";

const features = [
  { icon: Shield, title: "DDoS Mitigation", desc: "Enterprise-grade protection filtering up to 1Tbps of malicious traffic." },
  { icon: Lock, title: "Encrypted Connections", desc: "All data transfers secured with TLS/SSL encryption." },
  { icon: Fingerprint, title: "2FA Support", desc: "Two-factor authentication for panel access security." },
  { icon: Eye, title: "Real-Time Monitoring", desc: "24/7 network monitoring with instant threat detection." },
  { icon: AlertTriangle, title: "Firewall Rules", desc: "Custom firewall configurations to block unwanted traffic." },
  { icon: Server, title: "Isolated Containers", desc: "Each server runs in isolated containers for maximum security." },
];

const SecuritySection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Enterprise-Grade <span className="gradient-text">Security</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your server's safety is our top priority. Multiple layers of protection keep your world secure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 group hover:glow-border transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <f.icon className="h-6 w-6" />
              </motion.div>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SecuritySection;
