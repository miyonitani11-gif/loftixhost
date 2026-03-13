import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";

const statusIcon = (status: string) => {
  switch (status) {
    case "operational": return <CheckCircle className="h-5 w-5 text-green-400" />;
    case "degraded": return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
    default: return <XCircle className="h-5 w-5 text-red-400" />;
  }
};

const statusColor = (status: string) => {
  switch (status) {
    case "operational": return "bg-green-500/10 text-green-400";
    case "degraded": return "bg-yellow-500/10 text-yellow-400";
    default: return "bg-red-500/10 text-red-400";
  }
};

const Status = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("network_status" as any).select("*").order("service_name");
      if (data) setServices(data as any[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const allOperational = services.every((s) => s.status === "operational");

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${allOperational ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
              {allOperational ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {allOperational ? "All Systems Operational" : "Some Systems Degraded"}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">System Status</h1>
          </motion.div>

          <div className="space-y-3">
            {services.map((s: any, i: number) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {statusIcon(s.status)}
                  <span className="font-medium">{s.service_name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{s.uptime} uptime</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColor(s.status)}`}>
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
};

export default Status;
