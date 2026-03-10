import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink, ShieldCheck, Clock, Users } from "lucide-react";

const DISCORD_LINK = "https://discord.gg/h9kYJGDMTC";

const Contact = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            All support, sales, and community interaction happens on our Discord server.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card glow-border p-10 md:p-14 max-w-2xl mx-auto text-center mb-16"
        >
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-5" />
          <h2 className="font-heading text-2xl font-bold mb-3">Join Our Discord</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Get instant support, buy plans, report issues, and connect with the LoftixHost community — all in one place.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              Join Discord <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Clock, title: "24/7 Support", desc: "Our team is always online to help you with any issues." },
            { icon: ShieldCheck, title: "Secure Payments", desc: "All purchases are handled safely through our Discord." },
            { icon: Users, title: "Active Community", desc: "Join 500+ players and server owners in our community." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center"
            >
              <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
