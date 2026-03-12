import { motion } from "framer-motion";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  { title: "LoftixHost 2.0 Launch — What's New?", date: "Mar 10, 2026", excerpt: "Discover the latest features including our new game panel, improved DDoS protection, and global expansion.", tag: "Update" },
  { title: "How to Optimize Your Minecraft Server", date: "Mar 5, 2026", excerpt: "Tips and tricks to reduce lag, optimize chunk loading, and get the best performance from your server.", tag: "Guide" },
  { title: "New Locations: Asia Pacific Expansion", date: "Feb 28, 2026", excerpt: "We're expanding to Singapore and Tokyo for ultra-low latency gaming in the Asia Pacific region.", tag: "News" },
];

const tagColors: Record<string, string> = {
  Update: "bg-primary/20 text-primary",
  Guide: "bg-green-500/20 text-green-400",
  News: "bg-blue-500/20 text-blue-400",
};

const BlogSection = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Latest <span className="gradient-text">News & Updates</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Stay up to date with LoftixHost announcements, guides, and tips.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 group hover:glow-border transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${tagColors[post.tag]}`}>{post.tag}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {post.date}
              </span>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-sm text-muted-foreground flex-1">{post.excerpt}</p>
            <div className="mt-4">
              <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
