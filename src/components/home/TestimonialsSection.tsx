import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Alex M.", role: "SMP Owner", text: "Switched from Apex and the performance difference is night and day. Our TPS never drops below 19.5 even with 40+ players.", rating: 5 },
  { name: "Sarah K.", role: "Modpack Server", text: "Running ATM9 with 8GB and it's buttery smooth. The panel is super intuitive and support helped me configure everything.", rating: 5 },
  { name: "Mike R.", role: "Network Owner", text: "We run a 3-server network on EnderHost. The uptime is incredible and the DDoS protection has saved us multiple times.", rating: 5 },
  { name: "Jordan P.", role: "Pixelmon Server", text: "Best budget hosting I've found. $5/mo and my server runs perfectly with 20 regular players. Can't beat the value.", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Loved by <span className="gradient-text">Server Owners</span>
        </h2>
        <p className="text-muted-foreground text-lg">See what our community has to say.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-6"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
            <div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
