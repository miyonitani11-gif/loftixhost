import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Server, Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (!agreed) {
      toast({ title: "Error", description: "Please agree to the Terms of Service.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulated registration — replace with real auth when Cloud is enabled
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Account created!", description: "Welcome to LoftixHost! Please check your email to verify." });
      navigate("/login");
    }, 1500);
  };

  return (
    <Layout>
      <section className="py-24 flex items-center justify-center min-h-[80vh] relative">
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card glow-border p-8 w-full max-w-md mx-4 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-bg mx-auto mb-4 shadow-[0_0_30px_hsl(265_85%_60%/0.3)]">
              <Server className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Start hosting on LoftixHost in 60 seconds</p>
          </motion.div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
              <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                className="bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                className="bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                className="bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                placeholder="Password (min 6 characters)"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-muted-foreground">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="rounded mt-0.5 accent-primary" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span>I agree to the <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link></span>
              </label>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button variant="hero" className="w-full" type="submit" disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</> : "Create Account"}
              </Button>
            </motion.div>
          </form>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </motion.p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Register;
