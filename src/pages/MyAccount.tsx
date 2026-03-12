import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Mail, Shield, Clock, Loader2, Monitor } from "lucide-react";

const MyAccount = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [loginActivity, setLoginActivity] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchActivity = async () => {
      const { data } = await supabase
        .from("login_activity" as any)
        .select("*")
        .eq("user_id", user.id)
        .order("logged_in_at", { ascending: false })
        .limit(10);
      if (data) setLoginActivity(data as any[]);
      setLoadingActivity(false);
    };
    fetchActivity();
  }, [user]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Password updated!", description: "Your password has been changed successfully." });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUpdating(false);
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
            <h1 className="text-3xl font-heading font-bold mb-8">My Account</h1>

            {/* Account Info */}
            <div className="glass-card glow-border p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-lg">Account Details</h2>
                  <p className="text-sm text-muted-foreground">Your account information</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-medium">{user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Account Created</div>
                    <div className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="glass-card glow-border p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-lg">Change Password</h2>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
              </div>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-secondary/50 border-border" required minLength={6} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-secondary/50 border-border" required minLength={6} />
                </div>
                <Button type="submit" variant="hero" disabled={updating}>
                  {updating ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </div>

            {/* Login Activity */}
            <div className="glass-card glow-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-lg">Recent Login Activity</h2>
                  <p className="text-sm text-muted-foreground">Your recent sign-in history</p>
                </div>
              </div>
              {loadingActivity ? (
                <div className="flex justify-center py-6"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : loginActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No login activity recorded yet.</p>
              ) : (
                <div className="space-y-2">
                  {loginActivity.map((activity: any, i: number) => (
                    <div key={activity.id || i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{new Date(activity.logged_in_at).toLocaleString()}</span>
                      </div>
                      <span className="text-muted-foreground text-xs truncate max-w-[200px]">
                        {activity.user_agent?.includes("Mobile") ? "📱 Mobile" : "💻 Desktop"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default MyAccount;
