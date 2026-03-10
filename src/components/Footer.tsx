import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Server, Github, Twitter, MessageCircle, Youtube } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Pricing", href: "/pricing" },
    { label: "Features", href: "/features" },
    { label: "Locations", href: "/locations" },
    { label: "Game Panel", href: "/panel" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Status", href: "/status" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Knowledgebase", href: "/knowledgebase" },
    { label: "Support Tickets", href: "/support" },
    { label: "Discord", href: "#" },
    { label: "API Docs", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "SLA", href: "#" },
    { label: "AUP", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => (
  <footer className="border-t border-border/50 bg-muted/30 relative overflow-hidden">
    {/* Subtle grid background */}
    <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4 hover-scale inline-flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <Server className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">
              <span className="gradient-text">Loftix</span>Host
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Premium Minecraft server hosting by ankitplayz. Instant deployment, DDoS protection, and 24/7 support.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-heading text-sm font-semibold mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 LoftixHost by ankitplayz. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Powered by enterprise-grade infrastructure
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
