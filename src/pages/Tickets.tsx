import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { isAdmin } from "@/lib/admin";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Ticket, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const statusColors: Record<string, string> = {
  open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  in_progress: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

const statusIcons: Record<string, React.ReactNode> = {
  open: <AlertCircle className="h-3.5 w-3.5" />,
  in_progress: <Clock className="h-3.5 w-3.5" />,
  resolved: <CheckCircle className="h-3.5 w-3.5" />,
  closed: <CheckCircle className="h-3.5 w-3.5" />,
};

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-blue-500/20 text-blue-400",
  high: "bg-orange-500/20 text-orange-400",
  urgent: "bg-red-500/20 text-red-400",
};

type TicketRow = {
  id: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  user_email: string;
  created_at: string;
  updated_at: string;
};

const Tickets = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(true);
  const admin = isAdmin(user?.email ?? undefined);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchTickets = async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setTickets(data);
      setLoading(false);
    };
    fetchTickets();
  }, [user]);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24 relative">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-heading font-bold">
                  {admin ? "All Support Tickets" : "My Tickets"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {admin ? "Manage and respond to customer tickets" : "Track your support requests"}
                </p>
              </div>
              <Button variant="hero" asChild>
                <Link to="/tickets/new">
                  <Plus className="h-4 w-4 mr-2" /> New Ticket
                </Link>
              </Button>
            </div>

            {tickets.length === 0 ? (
              <div className="glass-card glow-border p-12 text-center">
                <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tickets yet</h3>
                <p className="text-muted-foreground mb-6">Create your first support ticket to get help.</p>
                <Button variant="hero" asChild>
                  <Link to="/tickets/new">
                    <Plus className="h-4 w-4 mr-2" /> Create Ticket
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map((ticket, i) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="glass-card block p-5 hover:border-primary/40 transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                            {ticket.subject}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span>#{ticket.id.slice(0, 8)}</span>
                            {admin && <span>• {ticket.user_email}</span>}
                            <span>• {new Date(ticket.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className={priorityColors[ticket.priority]}>
                            {ticket.priority}
                          </Badge>
                          <Badge variant="outline" className={`${statusColors[ticket.status]} flex items-center gap-1`}>
                            {statusIcons[ticket.status]}
                            {ticket.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Tickets;
