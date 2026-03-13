import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";

const tagColors: Record<string, string> = {
  Update: "bg-primary/20 text-primary",
  Guide: "bg-green-500/20 text-green-400",
  News: "bg-blue-500/20 text-blue-400",
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts" as any)
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Post Not Found</h1>
            <Button variant="hero" asChild><Link to="/">Go Home</Link></Button>
          </div>
        </section>
      </Layout>
    );
  }

  // Simple markdown-to-html renderer for headings, paragraphs, code blocks
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-heading font-bold mt-8 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-heading font-semibold mt-6 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <li key={i} className="text-muted-foreground ml-4 mb-1">{line.slice(2)}</li>;
      if (line.startsWith("```")) return null;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <Layout>
      <section className="py-24 relative">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Home</Link>
            </Button>

            <div className="flex items-center gap-3 mb-4">
              <Badge className={tagColors[post.tag] || "bg-primary/20 text-primary"}>{post.tag}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">{post.title}</h1>

            <div className="glass-card glow-border p-8">
              <p className="text-lg text-foreground mb-6 font-medium">{post.excerpt}</p>
              <hr className="border-border/50 mb-6" />
              <div className="prose-custom">{renderContent(post.content)}</div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
