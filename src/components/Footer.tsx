import { Link } from "react-router-dom";
import { Server, Github, Twitter, MessageCircle } from "lucide-react";

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

const Footer = () => (
  <footer className="border-t border-border/50 bg-muted/30">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <Server className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">
              <span className="gradient-text">Ender</span>Host
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Premium Minecraft server hosting with instant deployment, DDoS protection, and 24/7 support.
          </p>
          <div className="flex gap-3">
            {[Github, Twitter, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Icon className="h-4 w-4" />
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
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
          © 2026 EnderHost. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Powered by enterprise-grade infrastructure
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
