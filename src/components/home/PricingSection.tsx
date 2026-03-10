import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Dirt",
    price: 2,
    ram: "2 GB",
    cpu: "1 vCore",
    storage: "10 GB NVMe",
    players: "10",
    features: ["DDoS Protection", "Daily Backups", "Custom Panel", "24/7 Support"],
    popular: false,
  },
  {
    name: "Iron",
    price: 5,
    ram: "4 GB",
    cpu: "2 vCores",
    storage: "25 GB NVMe",
    players: "30",
    features: ["DDoS Protection", "Daily Backups", "Custom Panel", "24/7 Support", "Modpack Support", "MySQL Database"],
    popular: true,
  },
  {
    name: "Diamond",
    price: 10,
    ram: "8 GB",
    cpu: "3 vCores",
    storage: "50 GB NVMe",
    players: "60",
    features: ["DDoS Protection", "Hourly Backups", "Custom Panel", "Priority Support", "Modpack Support", "MySQL Database", "Dedicated IP"],
    popular: false,
  },
  {
    name: "Netherite",
    price: 20,
    ram: "16 GB",
    cpu: "4 vCores",
    storage: "100 GB NVMe",
    players: "Unlimited",
    features: ["DDoS Protection", "Hourly Backups", "Custom Panel", "Priority Support", "Modpack Support", "MySQL Database", "Dedicated IP", "Custom JAR"],
    popular: false,
  },
];

const PricingSection = () => (
  <section className="py-24 relative" id="pricing">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose the perfect plan for your server. All plans include DDoS protection and instant setup.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
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
              <span className="font-heading text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground text-sm">/mo</span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex justify-between"><span>RAM</span><span className="text-foreground font-medium">{plan.ram}</span></div>
              <div className="flex justify-between"><span>CPU</span><span className="text-foreground font-medium">{plan.cpu}</span></div>
              <div className="flex justify-between"><span>Storage</span><span className="text-foreground font-medium">{plan.storage}</span></div>
              <div className="flex justify-between"><span>Players</span><span className="text-foreground font-medium">{plan.players}</span></div>
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
              <Link to="/register">Get Started</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
