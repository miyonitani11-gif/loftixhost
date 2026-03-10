import { motion } from "framer-motion";
import { Server, Shield, Zap, Globe, Cpu, HardDrive, Headphones, RotateCcw } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Setup", desc: "Your server is online within 60 seconds of purchase. No waiting, no manual setup." },
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade 10Tbps DDoS mitigation keeps your server safe from attacks." },
  { icon: Cpu, title: "Ryzen 9 CPUs", desc: "AMD Ryzen 9 7950X processors for maximum single-thread performance." },
  { icon: HardDrive, title: "NVMe Storage", desc: "Blazing fast NVMe SSDs ensure rapid world loading and chunk generation." },
  { icon: Globe, title: "Global Network", desc: "12+ locations worldwide with low-latency routing for the best player experience." },
  { icon: Server, title: "Custom Panel", desc: "Full-featured game panel with console, file manager, backups, and more." },
  { icon: RotateCcw, title: "Auto Backups", desc: "Automatic daily backups with one-click restore to keep your data safe." },
  { icon: Headphones, title: "24/7 Support", desc: "Expert support team available round the clock via tickets and live chat." },
];

const FeaturesSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Why Choose <span className="gradient-text">LoftixHost</span>?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Built for performance, designed for gamers. Everything you need to run the perfect Minecraft server.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="glass-card p-6 group hover:glow-border transition-all duration-300"
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <f.icon className="h-6 w-6" />
            </motion.div>
            <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
