import { motion } from "framer-motion";
import { Package, Blocks, Flame, Sword, TreePine, Pickaxe } from "lucide-react";

const modpacks = [
  { name: "Vanilla", icon: Blocks, versions: "1.8 - 1.21+", desc: "Pure Minecraft experience with full version support." },
  { name: "Paper / Spigot", icon: Flame, versions: "1.8 - 1.21+", desc: "Optimized servers with plugin support for the best performance." },
  { name: "Forge", icon: Pickaxe, versions: "1.7 - 1.20+", desc: "Full mod support for complex modded experiences." },
  { name: "Fabric", icon: TreePine, versions: "1.14 - 1.21+", desc: "Lightweight modding platform with modern performance mods." },
  { name: "Bedrock", icon: Sword, versions: "Latest", desc: "Cross-platform play with Bedrock Edition support." },
  { name: "Modpacks", icon: Package, versions: "100+ Packs", desc: "One-click install for popular modpacks like ATM, RLCraft, and more." },
];

const ModpackSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Supported <span className="gradient-text">Platforms & Modpacks</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Run any Minecraft version, any modpack, any platform. We support them all.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {modpacks.map((mp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card p-5 text-center group hover:glow-border transition-all duration-300"
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-3 group-hover:bg-primary/20 transition-colors"
              whileHover={{ rotate: 10 }}
            >
              <mp.icon className="h-6 w-6" />
            </motion.div>
            <h3 className="font-heading font-semibold text-sm mb-1">{mp.name}</h3>
            <p className="text-xs text-primary mb-1">{mp.versions}</p>
            <p className="text-xs text-muted-foreground">{mp.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ModpackSection;
