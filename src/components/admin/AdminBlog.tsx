import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tag: string;
  published: boolean;
  author_email: string;
  created_at: string;
};

const emptyPost = { title: "", slug: "", excerpt: "", content: "", tag: "News", published: false };

const AdminBlog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyPost);
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts" as any).select("*").order("created_at", { ascending: false });
    if (data) setPosts(data as any[]);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    setSaving(true);
    const slug = form.slug || generateSlug(form.title);
    const payload = { ...form, slug, author_email: user?.email || "" };

    let error;
    if (editId) {
      ({ error } = await supabase.from("blog_posts" as any).update(payload as any).eq("id", editId));
    } else {
      ({ error } = await supabase.from("blog_posts" as any).insert(payload as any));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editId ? "Updated!" : "Created!", description: "Blog post saved." });
      setDialogOpen(false);
      setForm(emptyPost);
      setEditId(null);
      fetchPosts();
    }
    setSaving(false);
  };

  const handleEdit = (post: BlogPost) => {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, tag: post.tag, published: post.published });
    setEditId(post.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Blog post removed." });
      fetchPosts();
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading font-semibold text-lg">Blog Management</h2>
          <p className="text-sm text-muted-foreground">{posts.length} posts</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setForm(emptyPost); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button variant="hero" size="sm"><Plus className="h-4 w-4 mr-1" /> New Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Post" : "New Post"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" className="bg-secondary/50" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated-from-title" className="bg-secondary/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tag</Label>
                  <Select value={form.tag} onValueChange={(v) => setForm({ ...form, tag: v })}>
                    <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="Update">Update</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Published</Label>
                  <div className="pt-2">
                    <Switch checked={form.published} onCheckedChange={(c) => setForm({ ...form, published: c })} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Short summary..." className="bg-secondary/50" rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Content (Markdown)</Label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Full post content..." className="bg-secondary/50 font-mono text-sm" rows={10} />
              </div>
              <Button onClick={handleSave} variant="hero" disabled={saving || !form.title} className="w-full">
                {saving ? "Saving..." : editId ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card glow-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium max-w-[250px] truncate">{p.title}</TableCell>
                <TableCell><Badge variant="outline">{p.tag}</Badge></TableCell>
                <TableCell>
                  {p.published ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBlog;
