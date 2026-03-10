import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    name: "Getting Started",
    articles: [
      { q: "How do I create a server?", a: "After purchasing a plan, your server is automatically created. Visit the dashboard to access your server controls." },
      { q: "How do I connect to my server?", a: "Copy the server IP from your dashboard and paste it into Minecraft's multiplayer menu. The default port is 25565." },
      { q: "How do I install plugins?", a: "Navigate to File Manager in your control panel, upload .jar files to the /plugins folder, then restart your server." },
    ],
  },
  {
    name: "Server Management",
    articles: [
      { q: "How do I change Minecraft version?", a: "Go to your server settings in the panel, select the desired version from the dropdown, and reinstall. Your world data will be preserved." },
      { q: "How do I create a backup?", a: "Click the Backups tab in your control panel. You can create manual backups or enable automatic daily backups." },
      { q: "How do I add a custom domain?", a: "Create an SRV record pointing to your server IP. Our support team can help you configure this." },
    ],
  },
  {
    name: "Billing",
    articles: [
      { q: "How do I upgrade my plan?", a: "Go to Billing > Upgrade Plan in your dashboard. You'll only be charged the prorated difference." },
      { q: "What payment methods do you accept?", a: "We accept credit/debit cards via Stripe and PayPal. Cryptocurrency payments coming soon." },
      { q: "Can I get a refund?", a: "We offer a 48-hour money-back guarantee on all plans. Contact support to request a refund." },
    ],
  },
];

const Knowledgebase = () => {
  const [search, setSearch] = useState("");

  const filtered = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(a =>
      a.q.toLowerCase().includes(search.toLowerCase()) || a.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.articles.length > 0);

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Knowledgebase</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">Find answers to common questions</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                className="bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>

          <div className="space-y-8">
            {filtered.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <h2 className="font-heading text-xl font-bold mb-4">{cat.name}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {cat.articles.map((a, j) => (
                    <AccordionItem key={j} value={`${i}-${j}`} className="glass-card px-6 border-0">
                      <AccordionTrigger className="text-left font-medium hover:no-underline text-sm">{a.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">{a.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Knowledgebase;
