import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ShieldAlert, Ban, AlertTriangle, Scale, FileWarning, MessageSquareWarning } from "lucide-react";

const policies = [
  {
    icon: ShieldAlert,
    title: "Service Abuse Policy",
    description:
      "Any misuse of our hosting services — including but not limited to illegal activities, resource abuse, DDoS attacks originating from our servers, cryptocurrency mining, or hosting malicious content — will result in immediate suspension or termination of services without prior notice.",
  },
  {
    icon: MessageSquareWarning,
    title: "Staff Abuse Policy",
    description:
      "We maintain a zero-tolerance policy for any form of harassment, threats, hate speech, or disrespectful behavior directed toward our staff members. Any user found abusing, intimidating, or mistreating our team will have their services suspended immediately without refund. We believe in mutual respect.",
  },
  {
    icon: Ban,
    title: "Suspension & Termination",
    description:
      "LoftixHost reserves the right to suspend or terminate any service at any time if a user is found violating our policies. Suspended services may not be reinstated, and refunds are not guaranteed in cases of policy violation. Users will not be notified prior to suspension in cases of severe abuse.",
  },
  {
    icon: AlertTriangle,
    title: "Fair Usage Policy",
    description:
      "All plans come with fair usage limits. Excessive resource consumption that impacts other users on shared infrastructure may result in throttling or suspension. Dedicated plans are exempt from shared resource limits but are still subject to all other policies.",
  },
  {
    icon: Scale,
    title: "Refund Policy",
    description:
      "Refunds are handled on a case-by-case basis. Services terminated due to policy violations are not eligible for refunds. For legitimate refund requests, please open a ticket in our Discord server within 48 hours of purchase.",
  },
  {
    icon: FileWarning,
    title: "Content Policy",
    description:
      "Users are solely responsible for the content hosted on their servers. LoftixHost does not monitor content proactively but will act upon reports. Content that violates laws or our terms will be removed and may result in account termination.",
  },
];

const Policies = () => (
  <Layout>
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/10 text-destructive text-sm font-medium mb-6"
          >
            <ShieldAlert className="h-4 w-4" />
            Read Carefully
          </motion.div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Policies</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            By using LoftixHost services, you agree to abide by the following policies. We maintain these rules to ensure a safe and respectful environment for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {policies.map((policy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card glow-border p-8 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20 group-hover:bg-destructive/20 transition-colors">
                  <policy.icon className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{policy.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{policy.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card border-destructive/20 p-8 mt-12 max-w-3xl mx-auto text-center"
        >
          <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold mb-2">Important Notice</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            LoftixHost reserves the right to modify these policies at any time. Continued use of our services after policy changes constitutes acceptance of the updated terms. If you have questions about our policies, please open a ticket in our Discord server.
          </p>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Policies;
