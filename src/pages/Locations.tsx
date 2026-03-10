import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Globe, CheckCircle } from "lucide-react";

const locations = [
  { city: "New York", country: "USA", region: "North America", status: "online" },
  { city: "Los Angeles", country: "USA", region: "North America", status: "online" },
  { city: "Dallas", country: "USA", region: "North America", status: "online" },
  { city: "London", country: "UK", region: "Europe", status: "online" },
  { city: "Frankfurt", country: "Germany", region: "Europe", status: "online" },
  { city: "Paris", country: "France", region: "Europe", status: "online" },
  { city: "Singapore", country: "Singapore", region: "Asia", status: "online" },
  { city: "Tokyo", country: "Japan", region: "Asia", status: "online" },
  { city: "Sydney", country: "Australia", region: "Oceania", status: "online" },
  { city: "São Paulo", country: "Brazil", region: "South America", status: "online" },
  { city: "Mumbai", country: "India", region: "Asia", status: "coming soon" },
  { city: "Toronto", country: "Canada", region: "North America", status: "online" },
];

const Locations = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Global <span className="gradient-text">Locations</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            12+ data centers worldwide ensuring low-latency connections for players everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">{loc.city}, {loc.country}</div>
                  <div className="text-xs text-muted-foreground">{loc.region}</div>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                loc.status === "online"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}>
                {loc.status === "online" ? "Online" : "Coming Soon"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Locations;
