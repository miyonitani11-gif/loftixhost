
-- Site settings table (single row)
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text NOT NULL DEFAULT 'LoftixHost',
  site_description text NOT NULL DEFAULT 'Premium Minecraft Server Hosting',
  logo_url text NOT NULL DEFAULT '',
  discord_link text NOT NULL DEFAULT 'https://discord.gg/h9kYJGDMTC',
  meta_title text NOT NULL DEFAULT 'LoftixHost - Premium Minecraft Hosting',
  meta_description text NOT NULL DEFAULT 'Premium Minecraft server hosting with instant deployment, DDoS protection, and 24/7 support.',
  copyright_text text NOT NULL DEFAULT '© 2026 LoftixHost by OG ANKIT. All rights reserved.',
  footer_tagline text NOT NULL DEFAULT 'Powered by enterprise-grade infrastructure',
  announcement_bar_text text NOT NULL DEFAULT '',
  announcement_bar_enabled boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings" ON public.site_settings FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']))
  WITH CHECK ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

-- Insert default settings
INSERT INTO public.site_settings (site_name) VALUES ('LoftixHost');

-- Hosting plans table
CREATE TABLE public.hosting_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  original_price numeric,
  ram text NOT NULL DEFAULT '2 GB DDR4',
  cpu text NOT NULL DEFAULT '100% Allocation',
  storage text NOT NULL DEFAULT '5 GB SSD',
  backups text NOT NULL DEFAULT '2',
  features text[] NOT NULL DEFAULT ARRAY['DDoS Protected'],
  category text NOT NULL DEFAULT 'budget',
  popular boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  purchase_url text NOT NULL DEFAULT 'https://discord.gg/h9kYJGDMTC',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hosting_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read enabled hosting plans" ON public.hosting_plans FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage hosting plans" ON public.hosting_plans FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']))
  WITH CHECK ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

-- Nav items table
CREATE TABLE public.nav_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  href text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  enabled boolean NOT NULL DEFAULT true,
  is_external boolean NOT NULL DEFAULT false,
  parent_id uuid REFERENCES public.nav_items(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read nav items" ON public.nav_items FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage nav items" ON public.nav_items FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']))
  WITH CHECK ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

-- Insert default nav items
INSERT INTO public.nav_items (label, href, sort_order) VALUES
  ('Home', '/', 0),
  ('Pricing', '/pricing', 1),
  ('Features', '/features', 2),
  ('Locations', '/locations', 3),
  ('Partnership', '/partnership', 4),
  ('Status', '/status', 5),
  ('Policies', '/policies', 6),
  ('Contact', '/contact', 7);

-- Footer links table
CREATE TABLE public.footer_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL DEFAULT 'Product',
  label text NOT NULL,
  href text NOT NULL,
  is_external boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  enabled boolean NOT NULL DEFAULT true
);

ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read footer links" ON public.footer_links FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage footer links" ON public.footer_links FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']))
  WITH CHECK ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

-- Insert default footer links
INSERT INTO public.footer_links (section, label, href, is_external, sort_order) VALUES
  ('Product', 'Pricing', '/pricing', false, 0),
  ('Product', 'Features', '/features', false, 1),
  ('Product', 'Locations', '/locations', false, 2),
  ('Product', 'Control Panel', 'https://gp.loftix.host/', true, 3),
  ('Company', 'About Us', '/about', false, 0),
  ('Company', 'Contact', '/contact', false, 1),
  ('Company', 'Status', '/status', false, 2),
  ('Support', 'Knowledgebase', '/knowledgebase', false, 0),
  ('Support', 'Discord', 'https://discord.gg/h9kYJGDMTC', true, 1),
  ('Legal', 'Terms of Service', '/policies', false, 0),
  ('Legal', 'Privacy Policy', '/policies', false, 1),
  ('Legal', 'SLA', '/policies', false, 2);

-- Insert default hosting plans
INSERT INTO public.hosting_plans (name, price, ram, cpu, storage, backups, category, popular, sort_order) VALUES
  ('Starter', 69, '2 GB DDR4', '100% Allocation', '5 GB SSD', '2', 'budget', false, 0),
  ('Advanced', 139, '4 GB DDR4', '100% Allocation', '10 GB SSD', '4', 'budget', true, 1),
  ('Pro', 279, '8 GB DDR4', '200% Allocation', '40 GB SSD', '8', 'budget', false, 2),
  ('Elite', 419, '12 GB DDR4', '400% Allocation', '120 GB SSD', '12', 'budget', false, 3),
  ('Ultra', 559, '16 GB DDR4', '600% Allocation', '160 GB SSD', '16', 'budget', false, 4),
  ('Starter+', 99, '2 GB DDR4', '100% Allocation', '5 GB NVMe SSD', '2', 'advanced', false, 0),
  ('Advanced+', 199, '4 GB DDR4', '100% Allocation', '10 GB NVMe SSD', '4', 'advanced', false, 1),
  ('Pro+', 399, '8 GB DDR4', '200% Allocation', '40 GB NVMe SSD', '8', 'advanced', true, 2),
  ('Elite+', 599, '12 GB DDR4', '300% Allocation', '120 GB NVMe SSD', '12', 'advanced', false, 3),
  ('Ultra+', 799, '16 GB DDR4', '400% Allocation', '160 GB NVMe SSD', '16', 'advanced', false, 4),
  ('Omega+', 1599, '32 GB DDR4', '800% Allocation', '320 GB NVMe SSD', '32', 'advanced', false, 5);

-- Homepage sections table (for toggling/reordering)
CREATE TABLE public.homepage_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read homepage sections" ON public.homepage_sections FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage homepage sections" ON public.homepage_sections FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']))
  WITH CHECK ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

INSERT INTO public.homepage_sections (section_key, title, sort_order) VALUES
  ('hero', 'Hero Banner', 0),
  ('trusted_by', 'Trusted By', 1),
  ('live_counter', 'Live Counter', 2),
  ('stats', 'Stats', 3),
  ('features', 'Features', 4),
  ('security', 'Security', 5),
  ('why_choose', 'Why Choose Us', 6),
  ('how_it_works', 'How It Works', 7),
  ('modpack', 'Modpack Support', 8),
  ('server_types', 'Server Types', 9),
  ('control_panel', 'Control Panel', 10),
  ('game_panel', 'Game Panel', 11),
  ('uptime', 'Uptime Guarantee', 12),
  ('comparison', 'Comparison', 13),
  ('pricing', 'Pricing', 14),
  ('testimonials', 'Testimonials', 15),
  ('blog', 'Blog', 16),
  ('partnership', 'Partnership Banner', 17),
  ('faq', 'FAQ', 18),
  ('cta', 'Call to Action', 19);
