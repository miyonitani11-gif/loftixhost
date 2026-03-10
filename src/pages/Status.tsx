import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const services = [
  { name: "Game Servers", status: "operational", uptime: "99.99%" },
  { name: "Control Panel", status: "operational", uptime: "99.97%" },
  { name: "API", status: "operational", uptime: "99.98%" },
  { name: "Website", status: "operational", uptime: "100%" },
  { name: "Billing System", status: "operational", uptime: "99.99%" },
  { name: "Support System", status: "operational", uptime: "100%" },
  { name: "DNS", status: "operational", uptime: "100%" },
  { name: "DDoS Protection", status: "operational", uptime: "100%" },
];

const statusIcon = (status: string) => {
  switch (status) {
    case "operational": return <CheckCircle className="h-5 w-5 text-green-400" />;
    case "degraded": return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
    default: return <XCircle className="h-5 w-5 text-red-400" />;
  }
};

const Status = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4" /> All Systems Operational
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">System Status</h1>
        </motion.div>

        <div className="space-y-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {statusIcon(s.status)}
                <span className="font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{s.uptime} uptime</span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400 capitalize">
                  {s.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Status;
