import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Plan {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  ram: string;
  cpu: string;
  storage: string;
  backups: string;
  features: string[];
  category: string;
  popular: boolean;
  enabled: boolean;
  sort_order: number;
  purchase_url: string;
}

const PricingSection = () => {
  const [tab, setTab] = useState<"budget" | "advanced">("budget");
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await supabase.from("hosting_plans").select("*").eq("enabled", true).order("sort_order");
      if (data) setAllPlans(data as any);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  const plans = allPlans.filter((p) => p.category === tab);

  return (
    <section className="py-24 relative" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your server. All plans include DDoS protection and instant setup.
          </p>
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
            <button onClick={() => setTab("budget")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${tab === "budget" ? "gradient-bg text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}>
              💰 Budget Plans
            </button>
            <button onClick={() => setTab("advanced")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${tab === "advanced" ? "gradient-bg text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}>
              <Crown className="h-3.5 w-3.5" /> Advanced Plans
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading plans...</div>
        ) : (
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(plans.length, 5)} gap-5`}>
            {plans.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} whileHover={{ y: -8 }}
                className={`glass-card p-6 flex flex-col relative group transition-all duration-300 ${plan.popular ? "glow-border" : "hover:glow-border"}`}>
                {plan.popular && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gradient-bg text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-[0_0_20px_hsl(265_85%_60%/0.4)]">
                      <Zap className="h-3 w-3" /> Most Popular
                    </span>
                  </motion.div>
                )}

                <h3 className="font-heading text-xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-4">
                  {plan.original_price && (
                    <span className="text-muted-foreground text-sm line-through mr-2">₹{plan.original_price.toLocaleString("en-IN")}</span>
                  )}
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
                  {(plan.features || []).map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Button variant={plan.popular ? "hero" : "heroOutline"} className="w-full" asChild>
                  <a href={plan.purchase_url} target="_blank" rel="noopener noreferrer">Buy Through Discord</a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
