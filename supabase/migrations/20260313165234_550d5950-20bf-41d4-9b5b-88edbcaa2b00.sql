
-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  tag text NOT NULL DEFAULT 'News',
  published boolean NOT NULL DEFAULT false,
  author_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com'])) WITH CHECK ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com']));
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  display_name text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com']));
CREATE POLICY "Admins can delete profiles" ON public.profiles FOR DELETE TO authenticated USING ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com']));

-- Network status table
CREATE TABLE public.network_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name text NOT NULL,
  status text NOT NULL DEFAULT 'operational',
  uptime text NOT NULL DEFAULT '100%',
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.network_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read network status" ON public.network_status FOR SELECT USING (true);
CREATE POLICY "Admins can manage network status" ON public.network_status FOR ALL TO authenticated USING ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com'])) WITH CHECK ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com']));
CREATE TRIGGER update_network_status_updated_at BEFORE UPDATE ON public.network_status FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default network statuses
INSERT INTO public.network_status (service_name, status, uptime) VALUES
  ('Game Servers', 'operational', '99.99%'),
  ('Control Panel', 'operational', '99.97%'),
  ('API', 'operational', '99.98%'),
  ('Website', 'operational', '100%'),
  ('Billing System', 'operational', '99.99%'),
  ('Support System', 'operational', '100%'),
  ('DNS', 'operational', '100%'),
  ('DDoS Protection', 'operational', '100%');

-- Admins can view all login activity
CREATE POLICY "Admins can view all login activity" ON public.login_activity FOR SELECT TO authenticated USING ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com']));

-- Insert default blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, tag, published, author_email) VALUES
  ('LoftixHost 2.0 Launch — What''s New?', 'loftixhost-2-launch', 'Discover the latest features including our new game panel, improved DDoS protection, and global expansion.', 'We are excited to announce the launch of LoftixHost 2.0! This major update brings a completely redesigned game panel, enhanced DDoS protection powered by enterprise-grade infrastructure, and expansion to new global locations.', 'Update', true, 'fightergamerofficial1@gmail.com'),
  ('How to Optimize Your Minecraft Server', 'optimize-minecraft-server', 'Tips and tricks to reduce lag, optimize chunk loading, and get the best performance from your server.', '## 1. Choose the Right Server Software\nPaper and Purpur are optimized forks that offer significantly better performance with built-in optimizations.\n\n## 2. Optimize server.properties\n- Set view-distance to 8-10\n- Set simulation-distance to 6-8\n- Enable use-native-transport=true on Linux\n\n## 3. JVM Flags\nUse Aikar''s optimized flags for better garbage collection.\n\n## 4. Plugin Optimization\n- Remove unused plugins\n- Use Spark profiler to identify lag sources\n- Limit entity counts with mob stacking plugins\n\n## 5. World Pre-generation\nPre-generate chunks using Chunky to prevent lag spikes.', 'Guide', true, 'fightergamerofficial1@gmail.com'),
  ('New Locations: Asia Pacific Expansion', 'asia-pacific-expansion', 'We''re expanding to Singapore and Tokyo for ultra-low latency gaming in the Asia Pacific region.', 'We''re thrilled to announce our expansion into the Asia Pacific region with new server locations in Singapore and Tokyo!\n\n## Singapore Data Center\nExcellent coverage for Southeast Asian players with average latencies under 20ms.\n\n## Tokyo Data Center\nServes Japan, South Korea, and nearby regions with ultra-low latency.\n\n## Migration Support\nExisting customers can migrate with zero downtime using our one-click migration tool.', 'News', true, 'fightergamerofficial1@gmail.com');
