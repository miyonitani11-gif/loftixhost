import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, LogIn, UserPlus, KeyRound, ArrowLeft } from "lucide-react";

type AuthMode = "login" | "register" | "forgot";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast({
          title: "Reset email sent!",
          description: "Check your inbox for a password reset link.",
        });
        setMode("login");
      } else if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Log login activity
        if (data.user) {
          await supabase.from("login_activity" as any).insert({
            user_id: data.user.id,
            user_email: data.user.email || email,
            user_agent: navigator.userAgent,
          } as any);
        }
        toast({ title: "Welcome back!", description: "You've been logged in successfully." });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<AuthMode, { h: string; p: string }> = {
    login: { h: "Welcome Back", p: "Sign in to manage your support tickets" },
    register: { h: "Create Account", p: "Sign up to create support tickets" },
    forgot: { h: "Reset Password", p: "Enter your email to receive a reset link" },
  };

  return (
    <Layout>
      <section className="py-24 relative">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card glow-border p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">{titles[mode].h}</h1>
              <p className="text-muted-foreground">{titles[mode].p}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border"
                    required
                  />
                </div>
              </div>

              {mode !== "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-secondary/50 border-border"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? (
                  "Please wait..."
                ) : mode === "login" ? (
                  <><LogIn className="h-4 w-4 mr-2" /> Sign In</>
                ) : mode === "register" ? (
                  <><UserPlus className="h-4 w-4 mr-2" /> Sign Up</>
                ) : (
                  <><KeyRound className="h-4 w-4 mr-2" /> Send Reset Link</>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              {mode === "forgot" ? (
                <button
                  onClick={() => setMode("login")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mx-auto"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to sign in
                </button>
              ) : (
                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
