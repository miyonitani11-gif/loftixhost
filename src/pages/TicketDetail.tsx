import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { isAdmin } from "@/lib/admin";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, ArrowLeft, Shield, User } from "lucide-react";

type TicketRow = {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  user_email: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

type ReplyRow = {
  id: string;
  message: string;
  user_email: string;
  is_admin: boolean;
  created_at: string;
};

const statusColors: Record<string, string> = {
  open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  in_progress: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<TicketRow | null>(null);
  const [replies, setReplies] = useState<ReplyRow[]>([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const admin = isAdmin(user?.email ?? undefined);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    if (!id) return;
    const [ticketRes, repliesRes] = await Promise.all([
      supabase.from("tickets").select("*").eq("id", id).single(),
      supabase.from("ticket_replies").select("*").eq("ticket_id", id).order("created_at", { ascending: true }),
    ]);
    if (ticketRes.data) setTicket(ticketRes.data);
    if (repliesRes.data) setReplies(repliesRes.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user, id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ticket || newReply.trim().length < 2) return;
    setSending(true);
    try {
      const { error } = await supabase.from("ticket_replies").insert({
        ticket_id: ticket.id,
        user_id: user.id,
        user_email: user.email!,
        message: newReply.trim(),
        is_admin: admin,
      });
      if (error) throw error;
      setNewReply("");
      fetchData();
      toast({ title: "Reply sent!" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!ticket) return;
    const { error } = await supabase.from("tickets").update({ status }).eq("id", ticket.id);
    if (!error) {
      setTicket({ ...ticket, status });
      toast({ title: "Status updated" });
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Ticket not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24 relative">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <Button variant="ghost" className="mb-4" onClick={() => navigate("/tickets")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tickets
            </Button>

            <div className="glass-card glow-border p-6 mb-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-heading font-bold">{ticket.subject}</h1>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
                    <span>#{ticket.id.slice(0, 8)}</span>
                    <span>•</span>
                    <span>{ticket.user_email}</span>
                    <span>•</span>
                    <span>{new Date(ticket.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">{ticket.category.replace("_", " ")}</Badge>
                  <Badge variant="outline" className={statusColors[ticket.status]}>
                    {ticket.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              {/* Admin status control */}
              {admin && (
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Change Status:</span>
                  <Select value={ticket.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-40 bg-secondary/50 border-border h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Replies */}
            <div className="space-y-4 mb-6">
              {replies.map((reply, i) => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-card p-5 ${
                    reply.is_admin ? "border-l-4 border-l-primary" : "border-l-4 border-l-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {reply.is_admin ? (
                      <Shield className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-semibold text-foreground">
                      {reply.is_admin ? "LoftixHost Team" : reply.user_email}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(reply.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-foreground/90 whitespace-pre-wrap">{reply.message}</p>
                </motion.div>
              ))}
            </div>

            {/* Reply form */}
            {ticket.status !== "closed" && (
              <form onSubmit={handleReply} className="glass-card glow-border p-5">
                <Textarea
                  placeholder={admin ? "Reply as LoftixHost Team..." : "Write your reply..."}
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="bg-secondary/50 border-border min-h-[100px] mb-4"
                  required
                  maxLength={5000}
                />
                <Button type="submit" variant="hero" disabled={sending || newReply.trim().length < 2}>
                  {sending ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" /> Send Reply</>
                  )}
                </Button>
              </form>
            )}

            {ticket.status === "closed" && (
              <div className="glass-card p-5 text-center text-muted-foreground">
                This ticket has been closed. Create a new ticket if you need further assistance.
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TicketDetail;
