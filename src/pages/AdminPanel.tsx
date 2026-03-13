import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { isAdmin } from "@/lib/admin";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LayoutDashboard, Users, Newspaper, Wifi, Ticket } from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminNetwork from "@/components/admin/AdminNetwork";
import AdminTickets from "@/components/admin/AdminTickets";

const AdminPanel = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const admin = isAdmin(user?.email ?? undefined);

  useEffect(() => {
    if (!authLoading && (!user || !admin)) navigate("/");
  }, [user, authLoading, admin, navigate]);

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!admin) return null;

  return (
    <Layout>
      <section className="py-24 relative">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-heading font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground mb-8">Manage your entire LoftixHost platform</p>

            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="bg-secondary/50 border border-border/50 flex-wrap h-auto gap-1 p-1">
                <TabsTrigger value="dashboard" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard</TabsTrigger>
                <TabsTrigger value="users" className="gap-2"><Users className="h-4 w-4" /> Users</TabsTrigger>
                <TabsTrigger value="tickets" className="gap-2"><Ticket className="h-4 w-4" /> Tickets</TabsTrigger>
                <TabsTrigger value="blog" className="gap-2"><Newspaper className="h-4 w-4" /> Blog</TabsTrigger>
                <TabsTrigger value="network" className="gap-2"><Wifi className="h-4 w-4" /> Network Status</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard"><AdminDashboard /></TabsContent>
              <TabsContent value="users"><AdminUsers /></TabsContent>
              <TabsContent value="tickets"><AdminTickets /></TabsContent>
              <TabsContent value="blog"><AdminBlog /></TabsContent>
              <TabsContent value="network"><AdminNetwork /></TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminPanel;
