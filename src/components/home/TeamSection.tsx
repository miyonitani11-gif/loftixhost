import { motion } from "framer-motion";
import { Users, Crown, Headphones, Code } from "lucide-react";

const team = [
  { name: "AnkitPlayz", role: "Founder & CEO", icon: Crown, desc: "Visionary behind LoftixHost, ensuring top-tier hosting." },
  { name: "FighterGamer", role: "Co-Founder & CTO", icon: Code, desc: "Leading technical infrastructure and server optimization." },
  { name: "OG FighterPlayz", role: "Operations Lead", icon: Users, desc: "Managing day-to-day operations and partnerships." },
  { name: "Support Team", role: "24/7 Support Staff", icon: Headphones, desc: "Dedicated team providing round-the-clock assistance." },
];

const TeamSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Meet the <span className="gradient-text">Team</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The passionate people behind LoftixHost who make it all happen.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card p-6 text-center group hover:glow-border transition-all duration-300"
          >
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <member.icon className="h-7 w-7" />
            </motion.div>
            <h3 className="font-heading text-lg font-semibold mb-1">{member.name}</h3>
            <p className="text-sm text-primary mb-2">{member.role}</p>
            <p className="text-sm text-muted-foreground">{member.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
