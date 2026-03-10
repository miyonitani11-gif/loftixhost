import { motion } from "framer-motion";

const brands = [
  "Paper", "Spigot", "Forge", "Fabric", "Purpur", "Velocity", "BungeeCord", "Waterfall"
];

const TrustedBySection = () => (
  <section className="py-16 border-y border-border/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground mb-8 uppercase tracking-widest font-medium">
          Supporting all major platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.1 }}
              className="font-heading text-lg md:text-xl font-bold text-muted-foreground/50 hover:text-primary/70 transition-colors duration-300 cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrustedBySection;
