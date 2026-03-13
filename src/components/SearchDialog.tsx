import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, FileText, Newspaper, HelpCircle, MapPin, DollarSign, Shield } from "lucide-react";

const sitePages = [
  { title: "Home", path: "/", icon: FileText, keywords: "home landing main" },
  { title: "Pricing", path: "/pricing", icon: DollarSign, keywords: "pricing plans cost price" },
  { title: "Features", path: "/features", icon: FileText, keywords: "features capabilities" },
  { title: "Locations", path: "/locations", icon: MapPin, keywords: "locations servers regions data center" },
  { title: "Status", path: "/status", icon: Shield, keywords: "status uptime network services" },
  { title: "About Us", path: "/about", icon: FileText, keywords: "about company team" },
  { title: "Contact", path: "/contact", icon: FileText, keywords: "contact support help" },
  { title: "Partnership", path: "/partnership", icon: FileText, keywords: "partnership affiliate" },
  { title: "Policies", path: "/policies", icon: Shield, keywords: "policies terms privacy legal" },
  { title: "Knowledgebase", path: "/knowledgebase", icon: HelpCircle, keywords: "knowledgebase help faq guide" },
  { title: "Support Tickets", path: "/tickets", icon: FileText, keywords: "tickets support help" },
  { title: "My Account", path: "/account", icon: FileText, keywords: "account profile settings" },
];

type BlogResult = { title: string; slug: string; tag: string };

const SearchDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) => {
  const [query, setQuery] = useState("");
  const [blogResults, setBlogResults] = useState<BlogResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) { setBlogResults([]); return; }
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from("blog_posts" as any)
        .select("title, slug, tag")
        .eq("published", true)
        .ilike("title", `%${query}%`)
        .limit(5);
      if (data) setBlogResults(data as any[]);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredPages = query.trim()
    ? sitePages.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.keywords.toLowerCase().includes(query.toLowerCase())
      )
    : sitePages;

  const goTo = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-lg">
        <div className="flex items-center gap-3 p-4 border-b border-border/50">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, articles..."
            className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto text-base"
            autoFocus
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredPages.length > 0 && (
            <div className="mb-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-1.5">Pages</div>
              {filteredPages.map((p) => (
                <button
                  key={p.path}
                  onClick={() => goTo(p.path)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm hover:bg-secondary/50 transition-colors text-left"
                >
                  <p.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{p.title}</span>
                </button>
              ))}
            </div>
          )}
          {blogResults.length > 0 && (
            <div>
              <div className="text-xs font-medium text-muted-foreground px-3 py-1.5">Blog Posts</div>
              {blogResults.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => goTo(`/blog/${b.slug}`)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm hover:bg-secondary/50 transition-colors text-left"
                >
                  <Newspaper className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{b.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{b.tag}</span>
                </button>
              ))}
            </div>
          )}
          {filteredPages.length === 0 && blogResults.length === 0 && query.trim() && (
            <div className="text-center py-8 text-muted-foreground text-sm">No results found</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
