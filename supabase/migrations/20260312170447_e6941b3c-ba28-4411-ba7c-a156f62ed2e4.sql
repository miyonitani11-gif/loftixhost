
CREATE TABLE public.login_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  ip_address text,
  user_agent text,
  logged_in_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.login_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own login activity"
ON public.login_activity
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own login activity"
ON public.login_activity
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
