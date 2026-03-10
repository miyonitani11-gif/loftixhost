import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Headphones } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg">We're here to help. Reach out through any channel below.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { icon: Mail, title: "Email", desc: "support@enderhost.com", action: "Send Email" },
              { icon: MessageCircle, title: "Discord", desc: "Join our community", action: "Join Discord" },
              { icon: Headphones, title: "Live Chat", desc: "Available 24/7", action: "Start Chat" },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <c.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
                <Button variant="heroOutline" size="sm">{c.action}</Button>
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 max-w-2xl mx-auto space-y-4"
          >
            <h2 className="font-heading text-2xl font-bold mb-4">Send a Message</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <input
              className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
            <textarea
              className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            <Button variant="hero" type="submit" className="w-full">Send Message</Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
