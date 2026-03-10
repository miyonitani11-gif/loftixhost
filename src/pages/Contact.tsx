import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Headphones, ExternalLink } from "lucide-react";

const DISCORD_LINK = "https://discord.gg/h9kYJGDMTC";

const Contact = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg">We're here to help. Reach out through Discord — our primary support channel.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            {[
              { icon: MessageCircle, title: "Discord", desc: "Join our community & get support", action: "Join Discord", href: DISCORD_LINK },
              { icon: Headphones, title: "Live Support", desc: "Available 24/7 on Discord", action: "Get Help", href: DISCORD_LINK },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-8 text-center">
                <c.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{c.desc}</p>
                <Button variant="hero" asChild>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    {c.action} <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card glow-border p-8 md:p-12 max-w-2xl mx-auto text-center"
          >
            <h2 className="font-heading text-2xl font-bold mb-4">Need to buy a plan?</h2>
            <p className="text-muted-foreground mb-6">
              All purchases are handled through our Discord server. Join us and our team will help you get started!
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                Buy Through Discord <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
