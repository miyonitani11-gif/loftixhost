import { motion } from "framer-motion";
import { Sword, Blocks, Map, Pickaxe, Wand2, Crown } from "lucide-react";

const serverTypes = [
  { icon: Sword, name: "Survival", desc: "Classic survival experience with friends", color: "from-green-500/20 to-emerald-500/20" },
  { icon: Blocks, name: "Creative", desc: "Build without limits in creative mode", color: "from-blue-500/20 to-cyan-500/20" },
  { icon: Pickaxe, name: "Skyblock", desc: "Challenge yourself on a floating island", color: "from-yellow-500/20 to-orange-500/20" },
  { icon: Map, name: "Factions", desc: "Build your faction and conquer enemies", color: "from-red-500/20 to-rose-500/20" },
  { icon: Wand2, name: "Modpacks", desc: "ATM, RLCraft, Pixelmon & 500+ more", color: "from-purple-500/20 to-violet-500/20" },
  { icon: Crown, name: "Networks", desc: "Run multi-server networks with BungeeCord", color: "from-amber-500/20 to-yellow-500/20" },
];

const ServerTypesSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Host Any <span className="gradient-text">Server Type</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Whether you're playing vanilla survival or running a modded network, we've got you covered.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {serverTypes.map((type, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="glass-card p-5 text-center group cursor-default"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} mx-auto mb-3 group-hover:shadow-lg transition-all duration-300`}>
              <type.icon className="h-7 w-7 text-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-sm mb-1">{type.name}</h3>
            <p className="text-xs text-muted-foreground">{type.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServerTypesSection;
