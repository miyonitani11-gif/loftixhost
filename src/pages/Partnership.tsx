import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Handshake,
  Youtube,
  Gamepad2,
  MessageCircle,
  Server,
  ArrowRight,
  CheckCircle2,
  Star,
  Ticket,
} from "lucide-react";

const DISCORD_LINK = "https://discord.gg/h9kYJGDMTC";

const partnerTypes = [
  {
    icon: Youtube,
    title: "YouTube Creators",
    subtitle: "Recording & Content Servers",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    requirements: [
      "Minimum 1,000 subscribers on YouTube",
      "Minimum 2,000 – 3,000 views per video",
      "Active & consistent upload schedule",
      "Willingness to feature LoftixHost in content",
    ],
    benefit: "Free recording server for your YouTube content",
  },
  {
    icon: Gamepad2,
    title: "Minecraft Networks",
    subtitle: "Network Partnership",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    requirements: [
      "Minimum 50 active players on your network",
      "Established and running Minecraft network",
      "Professional server management",
      "Willingness to co-promote LoftixHost",
    ],
    benefit: "Dedicated server resources for your Minecraft network",
  },
  {
    icon: MessageCircle,
    title: "Discord Communities",
    subtitle: "Community Partnership",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    requirements: [
      "Minimum 500 members in your Discord server",
      "Active and engaged community",
      "Gaming or tech-related community",
      "Willingness to promote LoftixHost",
    ],
    benefit: "Exclusive hosting benefits for your community",
  },
  {
    icon: Server,
    title: "Other Servers",
    subtitle: "Custom Partnership",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    requirements: [
      "Open a ticket in our Discord server",
      "Describe your project and requirements",
      "Provide proof of audience or community",
      "Discuss partnership terms with our team",
    ],
    benefit: "Custom partnership tailored to your needs",
  },
];

const steps = [
  { step: "01", title: "Join Our Discord", desc: "Head to our Discord server and join the community." },
  { step: "02", title: "Open a Ticket", desc: "Create a partnership ticket in the designated channel." },
  { step: "03", title: "Provide Details", desc: "Share your channel/server details and meet the requirements." },
  { step: "04", title: "Get Approved", desc: "Our team reviews your application and sets you up!" },
];

const Partnership = () => (
  <Layout>
    {/* Hero */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <motion.div
        className="absolute -right-32 top-1/4 w-72 h-72 rounded-full bg-primary/8 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Handshake className="h-4 w-4" />
            Partner With Us
          </motion.div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Become a <span className="gradient-text">LoftixHost</span> Partner
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Are you a content creator, network owner, or community leader? Partner with us and get premium hosting — completely free.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
              Apply via Discord <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          {partnerTypes.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card glow-border p-8 relative group overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                i === 0 ? "from-red-500 to-red-400" :
                i === 1 ? "from-emerald-500 to-emerald-400" :
                i === 2 ? "from-indigo-500 to-indigo-400" :
                "from-amber-500 to-amber-400"
              } opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-center gap-4 mb-5">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${type.bgColor} border ${type.borderColor}`}>
                  <type.icon className={`h-7 w-7 ${type.color}`} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {type.requirements.map((req, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${type.color}`} />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>

              <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${type.bgColor} border ${type.borderColor}`}>
                <Star className={`h-4 w-4 ${type.color}`} />
                <span className="text-sm font-medium">{type.benefit}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How to Apply */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            How to <span className="gradient-text">Apply</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Getting started is simple — just follow these steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center relative"
            >
              <span className="text-4xl font-heading font-bold gradient-text opacity-40">{s.step}</span>
              <h4 className="font-heading text-lg font-semibold mt-2 mb-2">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-border p-12 text-center max-w-3xl mx-auto"
        >
          <Ticket className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold mb-3">Ready to Partner?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Open a ticket in our Discord server and our team will review your application within 24 hours.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
              Open a Ticket <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Partnership;
