
-- Add 30+ new settings columns to site_settings
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS primary_color text NOT NULL DEFAULT '#10b981',
  ADD COLUMN IF NOT EXISTS secondary_color text NOT NULL DEFAULT '#6366f1',
  ADD COLUMN IF NOT EXISTS accent_color text NOT NULL DEFAULT '#f59e0b',
  ADD COLUMN IF NOT EXISTS font_family text NOT NULL DEFAULT 'Inter',
  ADD COLUMN IF NOT EXISTS border_radius text NOT NULL DEFAULT '8px',
  ADD COLUMN IF NOT EXISTS hero_title text NOT NULL DEFAULT 'Premium Minecraft Server Hosting',
  ADD COLUMN IF NOT EXISTS hero_subtitle text NOT NULL DEFAULT 'Deploy your Minecraft server in seconds with enterprise-grade hardware.',
  ADD COLUMN IF NOT EXISTS hero_cta_text text NOT NULL DEFAULT 'Get Started',
  ADD COLUMN IF NOT EXISTS hero_cta_link text NOT NULL DEFAULT '/pricing',
  ADD COLUMN IF NOT EXISTS hero_image_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS contact_email text NOT NULL DEFAULT 'support@loftixhost.com',
  ADD COLUMN IF NOT EXISTS contact_phone text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS contact_address text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS twitter_link text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS youtube_link text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS instagram_link text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS tiktok_link text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS github_link text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS google_analytics_id text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS custom_head_scripts text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS custom_css text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS maintenance_mode boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS maintenance_message text NOT NULL DEFAULT 'We are currently performing maintenance. Please check back soon.',
  ADD COLUMN IF NOT EXISTS currency_symbol text NOT NULL DEFAULT '₹',
  ADD COLUMN IF NOT EXISTS pricing_page_title text NOT NULL DEFAULT 'Simple, Transparent Pricing',
  ADD COLUMN IF NOT EXISTS pricing_page_subtitle text NOT NULL DEFAULT 'Choose the perfect plan for your Minecraft server.',
  ADD COLUMN IF NOT EXISTS features_page_title text NOT NULL DEFAULT 'Powerful Features',
  ADD COLUMN IF NOT EXISTS features_page_subtitle text NOT NULL DEFAULT 'Everything you need for the ultimate Minecraft experience.',
  ADD COLUMN IF NOT EXISTS auth_redirect_url text NOT NULL DEFAULT '/',
  ADD COLUMN IF NOT EXISTS email_confirmation_redirect text NOT NULL DEFAULT '/',
  ADD COLUMN IF NOT EXISTS sender_name text NOT NULL DEFAULT 'LoftixHost',
  ADD COLUMN IF NOT EXISTS og_image_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS favicon_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS max_tickets_per_user integer NOT NULL DEFAULT 10,
  ADD COLUMN IF NOT EXISTS default_ticket_priority text NOT NULL DEFAULT 'medium',
  ADD COLUMN IF NOT EXISTS registration_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS login_page_message text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS default_plan_category text NOT NULL DEFAULT 'budget',
  ADD COLUMN IF NOT EXISTS show_original_prices boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS enable_live_chat boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS live_chat_widget_id text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS knowledgebase_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS blog_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS status_page_enabled boolean NOT NULL DEFAULT true;

-- Create redirections table
CREATE TABLE public.redirections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text NOT NULL,
  to_path text NOT NULL,
  permanent boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.redirections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage redirections" ON public.redirections
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']))
  WITH CHECK ((auth.jwt() ->> 'email') = ANY(ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

CREATE POLICY "Anyone can read redirections" ON public.redirections
  FOR SELECT TO public
  USING (true);
