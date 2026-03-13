import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Pencil, Trash2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ServiceStatus = { id: string; service_name: string; status: string; uptime: string; updated_at: string };

const statusIcon = (status: string) => {
  if (status === "operational") return <CheckCircle className="h-4 w-4 text-green-400" />;
  if (status === "degraded") return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
  return <XCircle className="h-4 w-4 text-red-400" />;
};

const AdminNetwork = () => {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ service_name: "", status: "operational", uptime: "100%" });
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchServices = async () => {
    const { data } = await supabase.from("network_status" as any).select("*").order("service_name");
    if (data) setServices(data as any[]);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSave = async () => {
    setSaving(true);
    let error;
    if (editId) {
      ({ error } = await supabase.from("network_status" as any).update(form as any).eq("id", editId));
    } else {
      ({ error } = await supabase.from("network_status" as any).insert(form as any));
    }
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Service status updated." });
      setDialogOpen(false);
      setForm({ service_name: "", status: "operational", uptime: "100%" });
      setEditId(null);
      fetchServices();
    }
    setSaving(false);
  };

  const handleEdit = (s: ServiceStatus) => {
    setForm({ service_name: s.service_name, status: s.status, uptime: s.uptime });
    setEditId(s.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("network_status" as any).delete().eq("id", id);
    fetchServices();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading font-semibold text-lg">Network Status</h2>
          <p className="text-sm text-muted-foreground">Manage service statuses shown on the status page</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setForm({ service_name: "", status: "operational", uptime: "100%" }); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button variant="hero" size="sm"><Plus className="h-4 w-4 mr-1" /> Add Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editId ? "Edit Service" : "Add Service"}</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input value={form.service_name} onChange={(e) => setForm({ ...form, service_name: e.target.value })} placeholder="e.g., Game Servers" className="bg-secondary/50" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="degraded">Degraded</SelectItem>
                    <SelectItem value="outage">Outage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Uptime</Label>
                <Input value={form.uptime} onChange={(e) => setForm({ ...form, uptime: e.target.value })} placeholder="99.99%" className="bg-secondary/50" />
              </div>
              <Button onClick={handleSave} variant="hero" disabled={saving || !form.service_name} className="w-full">
                {saving ? "Saving..." : editId ? "Update" : "Add Service"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card glow-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uptime</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.service_name}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">{statusIcon(s.status)} <span className="capitalize">{s.status}</span></span>
                </TableCell>
                <TableCell>{s.uptime}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(s.updated_at).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(s)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminNetwork;
