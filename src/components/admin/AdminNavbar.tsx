import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Loader2, GripVertical } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  sort_order: number;
  enabled: boolean;
  is_external: boolean;
}

const AdminNavbar = () => {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NavItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ label: "", href: "/", sort_order: 0, enabled: true, is_external: false });

  const fetchItems = async () => {
    const { data } = await supabase.from("nav_items").select("*").order("sort_order");
    setItems((data as any) || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const startEdit = (item: NavItem) => {
    setEditing(item);
    setForm({ label: item.label, href: item.href, sort_order: item.sort_order, enabled: item.enabled, is_external: item.is_external });
    setCreating(false);
  };

  const startCreate = () => {
    setEditing(null);
    setForm({ label: "", href: "/", sort_order: items.length, enabled: true, is_external: false });
    setCreating(true);
  };

  const cancel = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    if (creating) {
      const { error } = await supabase.from("nav_items").insert(form as any);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Nav item created!" });
    } else if (editing) {
      const { error } = await supabase.from("nav_items").update(form as any).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Nav item updated!" });
    }
    cancel();
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this nav item?")) return;
    await supabase.from("nav_items").delete().eq("id", id);
    toast({ title: "Nav item deleted" });
    fetchItems();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  if (creating || editing) {
    return (
      <div className="glass-card glow-border p-6 max-w-lg space-y-4">
        <h3 className="font-heading text-lg font-semibold">{creating ? "Add Nav Item" : "Edit Nav Item"}</h3>
        <div className="grid gap-4">
          <div><Label>Label</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} /></div>
          <div><Label>Link (href)</Label><Input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} /></div>
          <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><Switch checked={form.enabled} onCheckedChange={(v) => setForm({ ...form, enabled: v })} /><Label>Enabled</Label></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_external} onCheckedChange={(v) => setForm({ ...form, is_external: v })} /><Label>External Link</Label></div>
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-xl font-bold">Navigation Menu</h2>
        <Button onClick={startCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Item</Button>
      </div>
      {items.map((item) => (
        <div key={item.id} className={`glass-card p-4 flex items-center justify-between gap-4 ${!item.enabled ? "opacity-50" : ""}`}>
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="font-medium">{item.label}</span>
              <span className="text-sm text-muted-foreground ml-2">{item.href}</span>
              {item.is_external && <span className="text-xs text-primary ml-2">↗ External</span>}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => startEdit(item)}><Pencil className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNavbar;
