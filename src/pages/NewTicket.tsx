import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

const categories = [
  { value: "general", label: "General Support" },
  { value: "billing", label: "Billing & Payments" },
  { value: "technical", label: "Technical Issue" },
  { value: "server_setup", label: "Server Setup" },
  { value: "downtime", label: "Downtime / Outage" },
  { value: "abuse_report", label: "Abuse Report" },
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "feature_request", label: "Feature Request" },
  { value: "account", label: "Account Issues" },
  { value: "refund", label: "Refund Request" },
  { value: "other", label: "Other" },
];

const priorities = [
  { value: "low", label: "Low – Not urgent" },
  { value: "medium", label: "Medium – Needs attention" },
  { value: "high", label: "High – Affecting service" },
  { value: "urgent", label: "Urgent – Service down" },
];

const NewTicket = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (subject.trim().length < 5) {
      toast({ title: "Subject too short", description: "Please provide a more detailed subject.", variant: "destructive" });
      return;
    }
    if (message.trim().length < 10) {
      toast({ title: "Message too short", description: "Please provide more details.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // Create ticket
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          user_id: user.id,
          user_email: user.email!,
          subject: subject.trim(),
          category,
          priority,
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Add initial message as first reply
      const { error: replyError } = await supabase.from("ticket_replies").insert({
        ticket_id: ticket.id,
        user_id: user.id,
        user_email: user.email!,
        message: message.trim(),
        is_admin: false,
      });

      if (replyError) throw replyError;

      toast({ title: "Ticket created!", description: "Our team will review it shortly." });
      navigate(`/tickets/${ticket.id}`);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
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
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-heading font-bold mb-2">Create a New Ticket</h1>
            <p className="text-muted-foreground mb-8">
              Describe your issue and our team will get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="glass-card glow-border p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-secondary/50 border-border"
                  required
                  maxLength={200}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide as much detail as possible about your issue..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-secondary/50 border-border min-h-[160px]"
                  required
                  maxLength={5000}
                />
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
                {submitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="h-4 w-4 mr-2" /> Submit Ticket</>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NewTicket;
