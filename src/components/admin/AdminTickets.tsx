import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  in_progress: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

const AdminTickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTickets = async () => {
    const { data } = await supabase.from("tickets").select("*").order("created_at", { ascending: false });
    if (data) setTickets(data);
    setLoading(false);
  };

  useEffect(() => { fetchTickets(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("tickets").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Ticket status changed to ${status}` });
      fetchTickets();
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="glass-card glow-border overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-heading font-semibold text-lg">Ticket Management</h2>
        <p className="text-sm text-muted-foreground">{tickets.length} total tickets</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-medium max-w-[200px] truncate">{t.subject}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{t.user_email}</TableCell>
              <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
              <TableCell><Badge variant="outline">{t.priority}</Badge></TableCell>
              <TableCell>
                <Select defaultValue={t.status} onValueChange={(v) => updateStatus(t.id, v)}>
                  <SelectTrigger className="w-[130px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/tickets/${t.id}`}><ExternalLink className="h-4 w-4" /></Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTickets;
