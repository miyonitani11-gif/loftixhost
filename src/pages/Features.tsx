import Layout from "@/components/Layout";
import FeaturesSection from "@/components/home/FeaturesSection";
import { motion } from "framer-motion";
import { Server, Cpu, HardDrive, Shield, Globe, Zap } from "lucide-react";

const detailedFeatures = [
  {
    icon: Cpu,
    title: "AMD EPYC Processors",
    desc: "Our servers run on AMD EPYC processors, delivering industry-leading performance for smooth gameplay even with heavy modpacks.",
  },
  {
    icon: HardDrive,
    title: "NVMe SSD Storage",
    desc: "Enterprise-grade NVMe SSDs provide blazing fast read/write speeds, ensuring rapid world loading, chunk generation, and plugin operations.",
  },
  {
    icon: Shield,
    title: "Enterprise DDoS Protection",
    desc: "Our DDoS mitigation network automatically detects and filters malicious traffic, keeping your server online and your players safe.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    desc: "With 12+ data center locations across North America, Europe, Asia, and Oceania, your players enjoy low-latency connections worldwide.",
  },
  {
    icon: Server,
    title: "Custom Control Panel",
    desc: "Our intuitive panel gives you full control with server console, file manager, backup management, plugin installer, and resource monitoring.",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    desc: "Your server is automatically provisioned and online within 60 seconds. Choose your version, install modpacks, and start playing immediately.",
  },
];

const Features = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run a professional Minecraft server, backed by enterprise-grade infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-8 hover:glow-border transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Features;
