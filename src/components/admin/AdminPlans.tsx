import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Loader2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Plan {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  ram: string;
  cpu: string;
  storage: string;
  backups: string;
  features: string[];
  category: string;
  popular: boolean;
  enabled: boolean;
  sort_order: number;
  purchase_url: string;
}

const emptyPlan: Omit<Plan, "id"> = {
  name: "", price: 0, original_price: null, ram: "2 GB DDR4", cpu: "100% Allocation",
  storage: "5 GB SSD", backups: "2", features: ["DDoS Protected"], category: "budget",
  popular: false, enabled: true, sort_order: 0, purchase_url: "https://discord.gg/h9kYJGDMTC",
};

const AdminPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Plan, "id">>(emptyPlan);
  const [featuresText, setFeaturesText] = useState("DDoS Protected");

  const fetchPlans = async () => {
    const { data } = await supabase.from("hosting_plans").select("*").order("category").order("sort_order");
    setPlans((data as any) || []);
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const startEdit = (plan: Plan) => {
    setEditing(plan);
    setForm({ ...plan });
    setFeaturesText((plan.features || []).join(", "));
    setCreating(false);
  };

  const startCreate = () => {
    setEditing(null);
    setForm({ ...emptyPlan });
    setFeaturesText("DDoS Protected");
    setCreating(true);
  };

  const cancel = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    const payload = { ...form, features: featuresText.split(",").map((f) => f.trim()).filter(Boolean) };

    if (creating) {
      const { error } = await supabase.from("hosting_plans").insert(payload as any);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Plan created!" });
    } else if (editing) {
      const { error } = await supabase.from("hosting_plans").update({ ...payload, updated_at: new Date().toISOString() } as any).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Plan updated!" });
    }
    cancel();
    fetchPlans();
  };

  const deletePlan = async (id: string) => {
    if (!confirm("Delete this plan?")) return;
    await supabase.from("hosting_plans").delete().eq("id", id);
    toast({ title: "Plan deleted" });
    fetchPlans();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  if (creating || editing) {
    return (
      <div className="glass-card glow-border p-6 max-w-2xl space-y-4">
        <h3 className="font-heading text-lg font-semibold">{creating ? "Create Plan" : "Edit Plan"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
          <div><Label>Original Price (₹, for discount)</Label><Input type="number" value={form.original_price ?? ""} onChange={(e) => setForm({ ...form, original_price: e.target.value ? Number(e.target.value) : null })} placeholder="Leave empty for no discount" /></div>
          <div><Label>RAM</Label><Input value={form.ram} onChange={(e) => setForm({ ...form, ram: e.target.value })} /></div>
          <div><Label>CPU</Label><Input value={form.cpu} onChange={(e) => setForm({ ...form, cpu: e.target.value })} /></div>
          <div><Label>Storage</Label><Input value={form.storage} onChange={(e) => setForm({ ...form, storage: e.target.value })} /></div>
          <div><Label>Backups</Label><Input value={form.backups} onChange={(e) => setForm({ ...form, backups: e.target.value })} /></div>
          <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
          <div><Label>Purchase URL</Label><Input value={form.purchase_url} onChange={(e) => setForm({ ...form, purchase_url: e.target.value })} /></div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="advanced">Advanced (NVMe)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div><Label>Features (comma-separated)</Label><Input value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2"><Switch checked={form.popular} onCheckedChange={(v) => setForm({ ...form, popular: v })} /><Label>Popular</Label></div>
          <div className="flex items-center gap-2"><Switch checked={form.enabled} onCheckedChange={(v) => setForm({ ...form, enabled: v })} /><Label>Enabled</Label></div>
        </div>
        <div className="flex gap-3">
          <Button onClick={save} className="gap-2"><Save className="h-4 w-4" /> Save</Button>
          <Button variant="ghost" onClick={cancel} className="gap-2"><X className="h-4 w-4" /> Cancel</Button>
        </div>
      </div>
    );
  }

  const budgetPlans = plans.filter((p) => p.category === "budget");
  const advPlans = plans.filter((p) => p.category === "advanced");

  const renderPlanList = (list: Plan[], title: string) => (
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      {list.map((plan) => (
        <div key={plan.id} className={`glass-card p-4 flex items-center justify-between gap-4 ${!plan.enabled ? "opacity-50" : ""}`}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{plan.name}</span>
                {plan.popular && <Badge variant="default" className="text-xs"><Star className="h-3 w-3 mr-1" /> Popular</Badge>}
                {!plan.enabled && <Badge variant="secondary" className="text-xs">Disabled</Badge>}
              </div>
              <div className="text-sm text-muted-foreground">
                ₹{plan.price} · {plan.ram} · {plan.cpu} · {plan.storage}
                {plan.original_price && <span className="ml-2 line-through text-destructive">₹{plan.original_price}</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => startEdit(plan)}><Pencil className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => deletePlan(plan.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-xl font-bold">Hosting Plans</h2>
        <Button onClick={startCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Plan</Button>
      </div>
      {renderPlanList(budgetPlans, "💰 Budget Plans")}
      {renderPlanList(advPlans, "👑 Advanced Plans (NVMe)")}
    </div>
  );
};

export default AdminPlans;
