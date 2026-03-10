import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Users, Server, Shield, Globe, Heart } from "lucide-react";

const About = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">LoftixHost</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Founded by OG ANKIT — a team of Minecraft enthusiasts and infrastructure engineers on a mission to make premium game server hosting accessible to everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {[
            { icon: Users, title: "20+", desc: "Active Servers" },
            { icon: Server, title: "500+", desc: "Happy Players" },
            { icon: Shield, title: "99.9%", desc: "Uptime Guarantee" },
            { icon: Globe, title: "12+", desc: "Global Locations" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-8 text-center"
            >
              <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="font-heading text-3xl font-bold mb-1">{s.title}</div>
              <div className="text-muted-foreground">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 md:p-12 max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            LoftixHost was born from frustration with overpriced, underperforming game server hosts. We believe every server owner deserves enterprise-grade hardware without enterprise prices.
          </p>
          <p className="text-muted-foreground">
            Our infrastructure is built on AMD EPYC processors, NVMe storage, and a global network of data centers. Combined with our custom control panel and 24/7 expert support, we provide the best Minecraft hosting experience available.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card glow-border p-8 md:p-12 max-w-3xl mx-auto text-center">
          <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-4">Built with passion by OG ANKIT</h2>
          <p className="text-muted-foreground">
            LoftixHost is more than a hosting company — it's a community-driven platform built by gamers, for gamers. Every feature we ship is designed to make your server experience smoother, faster, and more enjoyable.
          </p>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default About;
