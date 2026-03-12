import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Ticket, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import loftixLogo from "@/assets/loftix-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Features", href: "/features" },
  { label: "Locations", href: "/locations" },
  { label: "Partnership", href: "/partnership" },
  { label: "Status", href: "/status" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" },
];

const DISCORD_LINK = "https://discord.gg/h9kYJGDMTC";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 hover-scale">
          <img src={loftixLogo} alt="LoftixHost" className="h-9 w-9 rounded-lg" />
          <span className="font-heading text-xl font-bold">
            <span className="gradient-text">Loftix</span>Host
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hidden items-center gap-3 md:flex"
        >
          <Button variant="heroOutline" size="sm" asChild>
            <Link to={user ? "/tickets" : "/auth"}>
              <Ticket className="h-4 w-4 mr-1" /> Tickets
            </Link>
          </Button>
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          ) : (
            <Button variant="hero" size="sm" asChild>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">Join Discord</a>
            </Button>
          )}
        </motion.div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-b border-border/50 bg-background/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-border/50">
                <Button variant="heroOutline" size="sm" asChild className="flex-1">
                  <Link to={user ? "/tickets" : "/auth"} onClick={() => setMobileOpen(false)}>
                    <Ticket className="h-4 w-4 mr-1" /> Tickets
                  </Link>
                </Button>
                {user ? (
                  <Button variant="ghost" size="sm" onClick={() => { signOut(); setMobileOpen(false); }} className="flex-1">
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                ) : (
                  <Button variant="hero" size="sm" asChild className="flex-1">
                    <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">Join Discord</a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
