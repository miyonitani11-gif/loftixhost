import { motion } from "framer-motion";
import { ShoppingCart, Settings, Rocket, Gamepad2 } from "lucide-react";

const steps = [
  { icon: ShoppingCart, step: "01", title: "Choose Your Plan", desc: "Select a hosting plan that fits your server's needs and budget." },
  { icon: Settings, step: "02", title: "Configure Server", desc: "Pick your Minecraft version, modpack, and server settings." },
  { icon: Rocket, step: "03", title: "Instant Deploy", desc: "Your server is automatically provisioned and online in 60 seconds." },
  { icon: Gamepad2, step: "04", title: "Start Playing", desc: "Share your server IP with friends and start your adventure!" },
];

const HowItWorksSection = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Get Started in <span className="gradient-text">4 Easy Steps</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From purchase to playing — it only takes a minute.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Connection line */}
        <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50" />

        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="text-center relative"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg mx-auto mb-4 shadow-[0_0_30px_hsl(265_85%_60%/0.3)]"
            >
              <s.icon className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <div className="text-xs font-bold text-primary mb-2">{s.step}</div>
            <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
