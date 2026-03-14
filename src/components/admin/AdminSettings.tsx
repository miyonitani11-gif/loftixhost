import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    id: "",
    site_name: "LoftixHost",
    site_description: "Premium Minecraft Server Hosting",
    logo_url: "",
    discord_link: "https://discord.gg/h9kYJGDMTC",
    meta_title: "LoftixHost - Premium Minecraft Hosting",
    meta_description: "",
    copyright_text: "© 2026 LoftixHost by OG ANKIT. All rights reserved.",
    footer_tagline: "Powered by enterprise-grade infrastructure",
    announcement_bar_text: "",
    announcement_bar_enabled: false,
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).single();
      if (data) setSettings(data as any);
      setLoading(false);
    };
    fetch();
  }, []);

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
    <div className="space-y-6 max-w-2xl">
      <div className="glass-card glow-border p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold">General Settings</h3>

        <div className="grid gap-4">
          <div>
            <Label>Site Name</Label>
            <Input value={settings.site_name} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} />
          </div>
          <div>
            <Label>Site Description</Label>
            <Input value={settings.site_description} onChange={(e) => setSettings({ ...settings, site_description: e.target.value })} />
          </div>
          <div>
            <Label>Logo URL</Label>
            <Input value={settings.logo_url} onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })} placeholder="Leave empty for default logo" />
          </div>
          <div>
            <Label>Discord Link</Label>
            <Input value={settings.discord_link} onChange={(e) => setSettings({ ...settings, discord_link: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="glass-card glow-border p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold">SEO Settings</h3>
        <div className="grid gap-4">
          <div>
            <Label>Meta Title</Label>
            <Input value={settings.meta_title} onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })} />
          </div>
          <div>
            <Label>Meta Description</Label>
            <Textarea value={settings.meta_description} onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })} rows={3} />
          </div>
        </div>
      </div>

      <div className="glass-card glow-border p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold">Footer</h3>
        <div className="grid gap-4">
          <div>
            <Label>Copyright Text</Label>
            <Input value={settings.copyright_text} onChange={(e) => setSettings({ ...settings, copyright_text: e.target.value })} />
          </div>
          <div>
            <Label>Footer Tagline</Label>
            <Input value={settings.footer_tagline} onChange={(e) => setSettings({ ...settings, footer_tagline: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="glass-card glow-border p-6 space-y-5">
        <h3 className="font-heading text-lg font-semibold">Announcement Bar</h3>
        <div className="flex items-center gap-3">
          <Switch checked={settings.announcement_bar_enabled} onCheckedChange={(v) => setSettings({ ...settings, announcement_bar_enabled: v })} />
          <Label>Enable Announcement Bar</Label>
        </div>
        <div>
          <Label>Announcement Text</Label>
          <Input value={settings.announcement_bar_text} onChange={(e) => setSettings({ ...settings, announcement_bar_text: e.target.value })} />
        </div>
      </div>

      <Button onClick={handleSave} disabled={saving} className="gap-2">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save Settings
      </Button>
    </div>
  );
};

export default AdminSettings;
