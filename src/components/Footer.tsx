import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import loftixLogo from "@/assets/loftix-logo.png";

interface FooterLink {
  id: string;
  section: string;
  label: string;
  href: string;
  is_external: boolean;
  enabled: boolean;
  sort_order: number;
}

interface SiteSettings {
  discord_link: string;
  copyright_text: string;
  footer_tagline: string;
}

const Footer = () => {
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    discord_link: "https://discord.gg/h9kYJGDMTC",
    copyright_text: "© 2026 LoftixHost by OG ANKIT. All rights reserved.",
    footer_tagline: "Powered by enterprise-grade infrastructure",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [linksRes, settingsRes] = await Promise.all([
        supabase.from("footer_links").select("*").eq("enabled", true).order("section").order("sort_order"),
        supabase.from("site_settings").select("discord_link, copyright_text, footer_tagline").limit(1).single(),
      ]);
      if (linksRes.data) setLinks(linksRes.data as any);
      if (settingsRes.data) setSettings(settingsRes.data as any);
    };
    fetchData();
  }, []);

  const sections = [...new Set(links.map((l) => l.section))];

  const socialLinks = [
    { icon: MessageCircle, href: settings.discord_link, label: "Discord" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-border/50 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 hover-scale inline-flex">
              <img src={loftixLogo} alt="LoftixHost" className="h-9 w-9 rounded-lg" />
              <span className="font-heading text-lg font-bold">
                <span className="gradient-text">Loftix</span>Host
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Premium Minecraft server hosting by OG ANKIT. Instant deployment, DDoS protection, and 24/7 support.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section}>
              <h4 className="font-heading text-sm font-semibold mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.filter((l) => l.section === section).map((link) => (
                  <li key={link.id}>
                    {link.is_external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{link.label}</a>
                    ) : (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{settings.copyright_text}</p>
          <p className="text-sm text-muted-foreground">{settings.footer_tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
