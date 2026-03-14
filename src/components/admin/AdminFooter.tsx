import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";

interface FooterLink {
  id: string;
  section: string;
  label: string;
  href: string;
  is_external: boolean;
  sort_order: number;
  enabled: boolean;
}

const SECTIONS = ["Product", "Company", "Support", "Legal"];

const AdminFooter = () => {
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FooterLink | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ section: "Product", label: "", href: "/", is_external: false, sort_order: 0, enabled: true });

  const fetchLinks = async () => {
    const { data } = await supabase.from("footer_links").select("*").order("section").order("sort_order");
    setLinks((data as any) || []);
    setLoading(false);
  };

  useEffect(() => { fetchLinks(); }, []);

  const startEdit = (link: FooterLink) => {
    setEditing(link);
    setForm({ section: link.section, label: link.label, href: link.href, is_external: link.is_external, sort_order: link.sort_order, enabled: link.enabled });
    setCreating(false);
  };

  const startCreate = () => {
    setEditing(null);
    setForm({ section: "Product", label: "", href: "/", is_external: false, sort_order: 0, enabled: true });
    setCreating(true);
  };

  const cancel = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    if (creating) {
      const { error } = await supabase.from("footer_links").insert(form as any);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Footer link created!" });
    } else if (editing) {
      const { error } = await supabase.from("footer_links").update(form as any).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Footer link updated!" });
    }
    cancel();
    fetchLinks();
  };

  const deleteLink = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    await supabase.from("footer_links").delete().eq("id", id);
    toast({ title: "Footer link deleted" });
    fetchLinks();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  if (creating || editing) {
    return (
      <div className="glass-card glow-border p-6 max-w-lg space-y-4">
        <h3 className="font-heading text-lg font-semibold">{creating ? "Add Footer Link" : "Edit Footer Link"}</h3>
        <div className="grid gap-4">
          <div>
            <Label>Section</Label>
            <Select value={form.section} onValueChange={(v) => setForm({ ...form, section: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {SECTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div><Label>Label</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} /></div>
          <div><Label>Link (href)</Label><Input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} /></div>
          <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><Switch checked={form.enabled} onCheckedChange={(v) => setForm({ ...form, enabled: v })} /><Label>Enabled</Label></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_external} onCheckedChange={(v) => setForm({ ...form, is_external: v })} /><Label>External</Label></div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save</Button>
          <Button variant="ghost" onClick={cancel} className="gap-2"><X className="h-4 w-4" /> Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-xl font-bold">Footer Links</h2>
        <Button onClick={startCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Link</Button>
      </div>
      {SECTIONS.map((section) => {
        const sectionLinks = links.filter((l) => l.section === section);
        if (!sectionLinks.length) return null;
        return (
          <div key={section} className="space-y-2">
            <h3 className="font-heading text-md font-semibold text-muted-foreground">{section}</h3>
            {sectionLinks.map((link) => (
              <div key={link.id} className={`glass-card p-3 flex items-center justify-between gap-4 ${!link.enabled ? "opacity-50" : ""}`}>
                <div>
                  <span className="font-medium text-sm">{link.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">{link.href}</span>
                  {link.is_external && <span className="text-xs text-primary ml-1">↗</span>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(link)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteLink(link.id)} className="text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AdminFooter;
