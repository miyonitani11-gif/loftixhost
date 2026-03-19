import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Save, Loader2, Globe, Palette, Type, Image, Mail, Shield, BarChart3, MessageSquare, Ticket, CreditCard, Layout, Code, Megaphone, Link2, Users } from "lucide-react";

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="glass-card glow-border p-6 space-y-5">
    <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" /> {title}
    </h3>
    <div className="grid gap-4">{children}</div>
  </div>
);

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <div>
    <Label>{label}</Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </div>
);

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).single();
      if (data) setSettings(data as any);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const set = (key: string, value: any) => setSettings((s) => ({ ...s, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const { id, ...rest } = settings;
    const { error } = await supabase.from("site_settings").update({ ...rest, updated_at: new Date().toISOString() } as any).eq("id", id);
    setSaving(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Settings saved!" });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* General */}
      <Section title="General Settings" icon={Globe}>
        <Field label="Site Name"><Input value={settings.site_name || ""} onChange={(e) => set("site_name", e.target.value)} /></Field>
        <Field label="Site Description"><Input value={settings.site_description || ""} onChange={(e) => set("site_description", e.target.value)} /></Field>
        <Field label="Logo URL" hint="Leave empty for default logo"><Input value={settings.logo_url || ""} onChange={(e) => set("logo_url", e.target.value)} /></Field>
        <Field label="Favicon URL" hint="URL to custom favicon (.ico or .png)"><Input value={settings.favicon_url || ""} onChange={(e) => set("favicon_url", e.target.value)} /></Field>
        <Field label="OG Image URL" hint="Default social share image"><Input value={settings.og_image_url || ""} onChange={(e) => set("og_image_url", e.target.value)} /></Field>
      </Section>

      {/* Theme & Appearance */}
      <Section title="Theme & Appearance" icon={Palette}>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Primary Color"><Input value={settings.primary_color || ""} onChange={(e) => set("primary_color", e.target.value)} /></Field>
          <Field label="Secondary Color"><Input value={settings.secondary_color || ""} onChange={(e) => set("secondary_color", e.target.value)} /></Field>
          <Field label="Accent Color"><Input value={settings.accent_color || ""} onChange={(e) => set("accent_color", e.target.value)} /></Field>
        </div>
        <Field label="Font Family" hint="e.g. Inter, Poppins, Space Grotesk"><Input value={settings.font_family || ""} onChange={(e) => set("font_family", e.target.value)} /></Field>
        <Field label="Border Radius" hint="e.g. 8px, 12px, 0px"><Input value={settings.border_radius || ""} onChange={(e) => set("border_radius", e.target.value)} /></Field>
      </Section>

      {/* Hero Section */}
      <Section title="Homepage Hero" icon={Layout}>
        <Field label="Hero Title"><Input value={settings.hero_title || ""} onChange={(e) => set("hero_title", e.target.value)} /></Field>
        <Field label="Hero Subtitle"><Textarea value={settings.hero_subtitle || ""} onChange={(e) => set("hero_subtitle", e.target.value)} rows={2} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="CTA Button Text"><Input value={settings.hero_cta_text || ""} onChange={(e) => set("hero_cta_text", e.target.value)} /></Field>
          <Field label="CTA Button Link"><Input value={settings.hero_cta_link || ""} onChange={(e) => set("hero_cta_link", e.target.value)} /></Field>
        </div>
        <Field label="Hero Image URL" hint="Background or feature image"><Input value={settings.hero_image_url || ""} onChange={(e) => set("hero_image_url", e.target.value)} /></Field>
      </Section>

      {/* SEO */}
      <Section title="SEO & Meta" icon={BarChart3}>
        <Field label="Meta Title"><Input value={settings.meta_title || ""} onChange={(e) => set("meta_title", e.target.value)} /></Field>
        <Field label="Meta Description"><Textarea value={settings.meta_description || ""} onChange={(e) => set("meta_description", e.target.value)} rows={3} /></Field>
        <Field label="Google Analytics ID" hint="e.g. G-XXXXXXXXXX"><Input value={settings.google_analytics_id || ""} onChange={(e) => set("google_analytics_id", e.target.value)} /></Field>
      </Section>

      {/* Social Links */}
      <Section title="Social Media Links" icon={Link2}>
        <Field label="Discord"><Input value={settings.discord_link || ""} onChange={(e) => set("discord_link", e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Twitter / X"><Input value={settings.twitter_link || ""} onChange={(e) => set("twitter_link", e.target.value)} /></Field>
          <Field label="YouTube"><Input value={settings.youtube_link || ""} onChange={(e) => set("youtube_link", e.target.value)} /></Field>
          <Field label="Instagram"><Input value={settings.instagram_link || ""} onChange={(e) => set("instagram_link", e.target.value)} /></Field>
          <Field label="TikTok"><Input value={settings.tiktok_link || ""} onChange={(e) => set("tiktok_link", e.target.value)} /></Field>
          <Field label="GitHub"><Input value={settings.github_link || ""} onChange={(e) => set("github_link", e.target.value)} /></Field>
        </div>
      </Section>

      {/* Contact Info */}
      <Section title="Contact Information" icon={Mail}>
        <Field label="Contact Email"><Input value={settings.contact_email || ""} onChange={(e) => set("contact_email", e.target.value)} /></Field>
        <Field label="Contact Phone"><Input value={settings.contact_phone || ""} onChange={(e) => set("contact_phone", e.target.value)} /></Field>
        <Field label="Contact Address"><Textarea value={settings.contact_address || ""} onChange={(e) => set("contact_address", e.target.value)} rows={2} /></Field>
      </Section>

      {/* Auth & Email */}
      <Section title="Authentication & Email" icon={Shield}>
        <div className="flex items-center gap-3">
          <Switch checked={settings.registration_enabled ?? true} onCheckedChange={(v) => set("registration_enabled", v)} />
          <Label>Enable User Registration</Label>
        </div>
        <Field label="Login Page Message" hint="Shown on login/register page"><Input value={settings.login_page_message || ""} onChange={(e) => set("login_page_message", e.target.value)} /></Field>
        <Field label="Auth Redirect URL" hint="Where to redirect after login"><Input value={settings.auth_redirect_url || ""} onChange={(e) => set("auth_redirect_url", e.target.value)} /></Field>
        <Field label="Email Confirmation Redirect" hint="Where to redirect after email verification"><Input value={settings.email_confirmation_redirect || ""} onChange={(e) => set("email_confirmation_redirect", e.target.value)} /></Field>
        <Field label="Sender Name" hint="Display name in outgoing emails"><Input value={settings.sender_name || ""} onChange={(e) => set("sender_name", e.target.value)} /></Field>
      </Section>

      {/* Tickets */}
      <Section title="Support & Tickets" icon={Ticket}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Max Tickets Per User"><Input type="number" value={settings.max_tickets_per_user ?? 10} onChange={(e) => set("max_tickets_per_user", parseInt(e.target.value) || 0)} /></Field>
          <Field label="Default Ticket Priority">
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={settings.default_ticket_priority || "medium"} onChange={(e) => set("default_ticket_priority", e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </Field>
        </div>
      </Section>

      {/* Pricing */}
      <Section title="Pricing & Plans" icon={CreditCard}>
        <Field label="Currency Symbol"><Input value={settings.currency_symbol || ""} onChange={(e) => set("currency_symbol", e.target.value)} /></Field>
        <Field label="Pricing Page Title"><Input value={settings.pricing_page_title || ""} onChange={(e) => set("pricing_page_title", e.target.value)} /></Field>
        <Field label="Pricing Page Subtitle"><Input value={settings.pricing_page_subtitle || ""} onChange={(e) => set("pricing_page_subtitle", e.target.value)} /></Field>
        <div className="flex items-center gap-3">
          <Switch checked={settings.show_original_prices ?? true} onCheckedChange={(v) => set("show_original_prices", v)} />
          <Label>Show Original Prices (Strikethrough)</Label>
        </div>
        <Field label="Default Plan Category" hint="e.g. budget, premium, enterprise">
          <Input value={settings.default_plan_category || ""} onChange={(e) => set("default_plan_category", e.target.value)} />
        </Field>
      </Section>

      {/* Pages */}
      <Section title="Page Settings" icon={Type}>
        <Field label="Features Page Title"><Input value={settings.features_page_title || ""} onChange={(e) => set("features_page_title", e.target.value)} /></Field>
        <Field label="Features Page Subtitle"><Input value={settings.features_page_subtitle || ""} onChange={(e) => set("features_page_subtitle", e.target.value)} /></Field>
        <div className="flex items-center gap-3">
          <Switch checked={settings.knowledgebase_enabled ?? true} onCheckedChange={(v) => set("knowledgebase_enabled", v)} />
          <Label>Enable Knowledgebase</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={settings.blog_enabled ?? true} onCheckedChange={(v) => set("blog_enabled", v)} />
          <Label>Enable Blog</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={settings.status_page_enabled ?? true} onCheckedChange={(v) => set("status_page_enabled", v)} />
          <Label>Enable Status Page</Label>
        </div>
      </Section>

      {/* Live Chat */}
      <Section title="Live Chat Integration" icon={MessageSquare}>
        <div className="flex items-center gap-3">
          <Switch checked={settings.enable_live_chat ?? false} onCheckedChange={(v) => set("enable_live_chat", v)} />
          <Label>Enable Live Chat Widget</Label>
        </div>
        <Field label="Chat Widget ID" hint="Tawk.to, Crisp, or other widget ID"><Input value={settings.live_chat_widget_id || ""} onChange={(e) => set("live_chat_widget_id", e.target.value)} /></Field>
      </Section>

      {/* Announcement Bar */}
      <Section title="Announcement Bar" icon={Megaphone}>
        <div className="flex items-center gap-3">
          <Switch checked={settings.announcement_bar_enabled ?? false} onCheckedChange={(v) => set("announcement_bar_enabled", v)} />
          <Label>Enable Announcement Bar</Label>
        </div>
        <Field label="Announcement Text"><Input value={settings.announcement_bar_text || ""} onChange={(e) => set("announcement_bar_text", e.target.value)} /></Field>
      </Section>

      {/* Maintenance Mode */}
      <Section title="Maintenance Mode" icon={Shield}>
        <div className="flex items-center gap-3">
          <Switch checked={settings.maintenance_mode ?? false} onCheckedChange={(v) => set("maintenance_mode", v)} />
          <Label>Enable Maintenance Mode</Label>
        </div>
        <Field label="Maintenance Message"><Textarea value={settings.maintenance_message || ""} onChange={(e) => set("maintenance_message", e.target.value)} rows={3} /></Field>
      </Section>

      {/* Footer */}
      <Section title="Footer Settings" icon={Layout}>
        <Field label="Copyright Text"><Input value={settings.copyright_text || ""} onChange={(e) => set("copyright_text", e.target.value)} /></Field>
        <Field label="Footer Tagline"><Input value={settings.footer_tagline || ""} onChange={(e) => set("footer_tagline", e.target.value)} /></Field>
      </Section>

      {/* Custom Code */}
      <Section title="Custom Code Injection" icon={Code}>
        <Field label="Custom CSS" hint="Injected into the page <head>"><Textarea value={settings.custom_css || ""} onChange={(e) => set("custom_css", e.target.value)} rows={4} className="font-mono text-xs" /></Field>
        <Field label="Custom Head Scripts" hint="Analytics, tracking, or meta tags"><Textarea value={settings.custom_head_scripts || ""} onChange={(e) => set("custom_head_scripts", e.target.value)} rows={4} className="font-mono text-xs" /></Field>
      </Section>

      <Button onClick={handleSave} disabled={saving} className="gap-2 w-full sm:w-auto">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save All Settings
      </Button>
    </div>
  );
};

export default AdminSettings;
