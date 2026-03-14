
-- Allow admins to delete hosting plans
CREATE POLICY "Admins can delete hosting plans" ON public.hosting_plans FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

-- Allow admins to delete nav items
CREATE POLICY "Admins can delete nav items" ON public.nav_items FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

-- Allow admins to delete footer links
CREATE POLICY "Admins can delete footer links" ON public.footer_links FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));

-- Allow admins to delete homepage sections
CREATE POLICY "Admins can delete homepage sections" ON public.homepage_sections FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email'::text) = ANY (ARRAY['fightergamerofficial1@gmail.com','ankitsarkarmukerjee123@gmail.com','og.fighterplayz@gmail.com']));
