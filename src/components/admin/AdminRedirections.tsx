import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Loader2 } from "lucide-react";

type Redirection = {
  id: string;
  from_path: string;
  to_path: string;
  permanent: boolean;
  enabled: boolean;
};

const AdminRedirections = () => {
  const [items, setItems] = useState<Redirection[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [permanent, setPermanent] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from("redirections" as any).select("*").order("created_at", { ascending: false });
    if (data) setItems(data as any);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async () => {
    if (!fromPath || !toPath) return toast({ title: "Both paths are required", variant: "destructive" });
    const { error } = await supabase.from("redirections" as any).insert({ from_path: fromPath, to_path: toPath, permanent } as any);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setFromPath("");
    setToPath("");
    setPermanent(false);
    toast({ title: "Redirect added!" });
    fetch();
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    await supabase.from("redirections" as any).update({ enabled } as any).eq("id", id);
    fetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("redirections" as any).delete().eq("id", id);
    toast({ title: "Redirect deleted" });
    fetch();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="glass-card glow-border p-6 space-y-4">
        <h3 className="font-heading text-lg font-semibold">Add Redirect</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input placeholder="/old-page" value={fromPath} onChange={(e) => setFromPath(e.target.value)} />
          <Input placeholder="/new-page or https://..." value={toPath} onChange={(e) => setToPath(e.target.value)} />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={permanent} onCheckedChange={setPermanent} />
              <span className="text-sm">301</span>
            </div>
            <Button onClick={handleAdd} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
          </div>
        </div>
      </div>

      <div className="glass-card glow-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Enabled</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-sm">{r.from_path}</TableCell>
                <TableCell className="font-mono text-sm">{r.to_path}</TableCell>
                <TableCell>{r.permanent ? "301 Permanent" : "302 Temporary"}</TableCell>
                <TableCell><Switch checked={r.enabled} onCheckedChange={(v) => handleToggle(r.id, v)} /></TableCell>
                <TableCell><Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No redirections configured</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRedirections;
