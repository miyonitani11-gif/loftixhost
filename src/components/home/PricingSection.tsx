import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown } from "lucide-react";
import { useState } from "react";

const budgetPlans = [
  {
    name: "Starter",
    price: 69,
    ram: "2 GB DDR4",
    cpu: "100% Allocation",
    storage: "5 GB SSD",
    backups: "2",
    features: ["DDoS Protected"],
    popular: false,
  },
  {
    name: "Advanced",
    price: 139,
    ram: "4 GB DDR4",
    cpu: "100% Allocation",
    storage: "10 GB SSD",
    backups: "4",
    features: ["DDoS Protected"],
    popular: true,
  },
  {
    name: "Pro",
    price: 279,
    ram: "8 GB DDR4",
    cpu: "200% Allocation",
    storage: "40 GB SSD",
    backups: "8",
    features: ["DDoS Protected"],
    popular: false,
  },
  {
    name: "Elite",
    price: 419,
    ram: "12 GB DDR4",
    cpu: "400% Allocation",
    storage: "120 GB SSD",
    backups: "12",
    features: ["DDoS Protected"],
    popular: false,
  },
  {
    name: "Ultra",
    price: 559,
    ram: "16 GB DDR4",
    cpu: "600% Allocation",
    storage: "160 GB SSD",
    backups: "16",
    features: ["DDoS Protected"],
    popular: false,
  },
];

const advancedPlans = [
  {
    name: "Starter+",
    price: 99,
    ram: "2 GB DDR4",
    cpu: "100% Allocation",
    storage: "5 GB NVMe SSD",
    backups: "2",
    features: ["DDoS Protected"],
    popular: false,
  },
  {
    name: "Advanced+",
    price: 199,
    ram: "4 GB DDR4",
    cpu: "100% Allocation",
    storage: "10 GB NVMe SSD",
    backups: "4",
    features: ["DDoS Protected"],
    popular: false,
  },
  {
    name: "Pro+",
    price: 399,
    ram: "8 GB DDR4",
    cpu: "200% Allocation",
    storage: "40 GB NVMe SSD",
    backups: "8",
    features: ["DDoS Protected"],
    popular: true,
  },
  {
    name: "Elite+",
    price: 599,
    ram: "12 GB DDR4",
    cpu: "300% Allocation",
    storage: "120 GB NVMe SSD",
    backups: "12",
    features: ["DDoS Protected"],
    popular: false,
  },
  {
    name: "Ultra+",
    price: 799,
    ram: "16 GB DDR4",
    cpu: "400% Allocation",
    storage: "160 GB NVMe SSD",
    backups: "16",
    features: ["DDoS Protected"],
    popular: false,
  },
  {
    name: "Omega+",
    price: 1599,
    ram: "32 GB DDR4",
    cpu: "800% Allocation",
    storage: "320 GB NVMe SSD",
    backups: "32",
    features: ["DDoS Protected"],
    popular: false,
  },
];

const DISCORD_LINK = "https://discord.gg/h9kYJGDMTC";

const PricingSection = () => {
  const [tab, setTab] = useState<"budget" | "advanced">("budget");
  const plans = tab === "budget" ? budgetPlans : advancedPlans;

  return (
    <section className="py-24 relative" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your server. All plans include DDoS protection and instant setup.
          </p>

          {/* Tab switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
            <button
              onClick={() => setTab("budget")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                tab === "budget"
                  ? "gradient-bg text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              💰 Budget Plans
            </button>
            <button
              onClick={() => setTab("advanced")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                tab === "advanced"
                  ? "gradient-bg text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Crown className="h-3.5 w-3.5" /> Advanced Plans
            </button>
          </div>
        </motion.div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${tab === "budget" ? "5" : "3"} gap-5`}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={`glass-card p-6 flex flex-col relative group transition-all duration-300 ${
                plan.popular ? "glow-border" : "hover:glow-border"
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <span className="gradient-bg text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-[0_0_20px_hsl(265_85%_60%/0.4)]">
                    <Zap className="h-3 w-3" /> Most Popular
                  </span>
                </motion.div>
              )}

              <h3 className="font-heading text-xl font-bold mb-1">{plan.name}</h3>
              <div className="mb-4">
                <span className="font-heading text-3xl font-bold">₹{plan.price.toLocaleString("en-IN")}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex justify-between"><span>RAM</span><span className="text-foreground font-medium">{plan.ram}</span></div>
                <div className="flex justify-between"><span>CPU</span><span className="text-foreground font-medium">{plan.cpu}</span></div>
                <div className="flex justify-between"><span>Storage</span><span className="text-foreground font-medium">{plan.storage}</span></div>
                <div className="flex justify-between"><span>Backups</span><span className="text-foreground font-medium">{plan.backups}</span></div>
              </div>

              <div className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? "hero" : "heroOutline"}
                className="w-full"
                asChild
              >
                <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                  Buy Through Discord
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
