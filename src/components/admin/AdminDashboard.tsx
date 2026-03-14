import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Ticket, Newspaper, Wifi, CreditCard } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, tickets: 0, openTickets: 0, posts: 0, services: 0, plans: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [loginRes, ticketsRes, openRes, postsRes, servicesRes, plansRes] = await Promise.all([
        supabase.from("login_activity").select("user_email"),
        supabase.from("tickets").select("*", { count: "exact", head: true }),
        supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("network_status").select("*", { count: "exact", head: true }),
        supabase.from("hosting_plans").select("*", { count: "exact", head: true }),
      ]);
      const uniqueEmails = new Set((loginRes.data || []).map((r: any) => r.user_email));
      setStats({
        users: uniqueEmails.size,
        tickets: ticketsRes.count || 0,
        openTickets: openRes.count || 0,
        posts: postsRes.count || 0,
        services: servicesRes.count || 0,
        plans: plansRes.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Users", value: stats.users, icon: Users, color: "text-blue-400" },
    { label: "Total Tickets", value: stats.tickets, icon: Ticket, color: "text-primary" },
    { label: "Open Tickets", value: stats.openTickets, icon: Ticket, color: "text-yellow-400" },
    { label: "Blog Posts", value: stats.posts, icon: Newspaper, color: "text-green-400" },
    { label: "Services", value: stats.services, icon: Wifi, color: "text-cyan-400" },
    { label: "Hosting Plans", value: stats.plans, icon: CreditCard, color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="glass-card glow-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <c.icon className={`h-5 w-5 ${c.color}`} />
            <span className="text-sm text-muted-foreground">{c.label}</span>
          </div>
          <div className="text-3xl font-heading font-bold">{c.value}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
