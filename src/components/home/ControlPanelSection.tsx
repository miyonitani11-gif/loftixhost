import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Monitor, Terminal, FileText, RotateCcw, BarChart3, Shield } from "lucide-react";

const PANEL_URL = "https://gp.loftix.host/";

const panelFeatures = [
  { icon: Terminal, title: "Live Console" },
  { icon: FileText, title: "File Manager" },
  { icon: RotateCcw, title: "One-Click Backups" },
  { icon: BarChart3, title: "Resource Monitor" },
  { icon: Shield, title: "Sub-Users" },
  { icon: Monitor, title: "Server Config" },
];

const ControlPanelSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 hero-glow pointer-events-none opacity-40" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Our <span className="gradient-text">Control Panel</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Manage your servers with our powerful, intuitive game panel. Full control at your fingertips.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Panel preview */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card glow-border p-1 rounded-2xl"
        >
          <div className="rounded-xl bg-background/80 p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(38 92% 50% / 0.6)" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(142 71% 45% / 0.6)" }} />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                gp.loftix.host
              </div>
            </div>

            <div className="bg-muted/60 rounded-lg p-4 font-mono text-xs space-y-1.5 h-48 overflow-hidden">
              <div className="text-muted-foreground">[00:00:01] <span className="text-primary">INFO</span>: Starting Minecraft server on *:25565</div>
              <div className="text-muted-foreground">[00:00:02] <span className="text-primary">INFO</span>: Loading properties</div>
              <div className="text-muted-foreground">[00:00:02] <span className="text-primary">INFO</span>: Default game type: SURVIVAL</div>
              <div className="text-muted-foreground">[00:00:03] <span className="text-primary">INFO</span>: Preparing level "world"</div>
              <div className="text-muted-foreground">[00:00:05] <span className="text-primary">INFO</span>: Preparing start region for dimension minecraft:overworld</div>
              <div className="text-muted-foreground">[00:00:08] <span style={{ color: "hsl(142 71% 45%)" }}>INFO</span>: Done (7.234s)! For help, type "help"</div>
              <div className="text-muted-foreground">[00:00:08] <span style={{ color: "hsl(142 71% 45%)" }}>INFO</span>: Server is running on Paper 1.21.4</div>
              <div className="animate-pulse text-primary">▌</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "CPU", value: "12%" },
                { label: "RAM", value: "1.2 / 4 GB" },
                { label: "Players", value: "3 / 30" },
              ].map((stat, i) => (
                <div key={i} className="bg-muted/40 rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-sm font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-4 mb-8">
            {panelFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass-card p-4 flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="font-heading text-sm font-semibold">{f.title}</span>
              </motion.div>
            ))}
          </div>

          <Button variant="hero" size="lg" asChild className="w-full">
            <a href={PANEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              Open Control Panel <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ControlPanelSection;
