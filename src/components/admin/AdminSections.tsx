import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, GripVertical } from "lucide-react";

interface Section {
  id: string;
  section_key: string;
  title: string;
  enabled: boolean;
  sort_order: number;
}

const AdminSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    const { data } = await supabase.from("homepage_sections").select("*").order("sort_order");
    setSections((data as any) || []);
    setLoading(false);
  };

  useEffect(() => { fetchSections(); }, []);

  const toggleSection = async (id: string, enabled: boolean) => {
    await supabase.from("homepage_sections").update({ enabled } as any).eq("id", id);
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, enabled } : s)));
    toast({ title: `Section ${enabled ? "enabled" : "disabled"}` });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="font-heading text-xl font-bold">Homepage Sections</h2>
      <p className="text-sm text-muted-foreground">Toggle sections on/off to show or hide them on the homepage.</p>
      {sections.map((section) => (
        <div key={section.id} className={`glass-card p-4 flex items-center justify-between gap-4 ${!section.enabled ? "opacity-50" : ""}`}>
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{section.title}</span>
            <span className="text-xs text-muted-foreground">({section.section_key})</span>
          </div>
          <Switch checked={section.enabled} onCheckedChange={(v) => toggleSection(section.id, v)} />
        </div>
      ))}
    </div>
  );
};

export default AdminSections;
