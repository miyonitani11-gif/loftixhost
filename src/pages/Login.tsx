import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Server, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPw, setShowPw] = useState(false);

  return (
    <Layout>
      <section className="py-24 flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card glow-border p-8 w-full max-w-md mx-4"
        >
          <div className="text-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg mx-auto mb-4">
              <Server className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input className="bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Email" type="email" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input className="bg-muted/50 border border-border rounded-lg pl-10 pr-10 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Password" type={showPw ? "text" : "password"} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3.5 text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            </div>
            <Button variant="hero" className="w-full" type="submit">Sign In</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Login;
