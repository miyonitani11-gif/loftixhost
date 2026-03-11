-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ticket replies table
CREATE TABLE public.ticket_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_replies ENABLE ROW LEVEL SECURITY;

-- Tickets: users see own tickets, admins see all
CREATE POLICY "Users can view their own tickets"
  ON public.tickets FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' IN ('fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com'));

CREATE POLICY "Users can create their own tickets"
  ON public.tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update any ticket"
  ON public.tickets FOR UPDATE
  USING (auth.jwt()->>'email' IN ('fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com'));

CREATE POLICY "Users can update their own tickets"
  ON public.tickets FOR UPDATE
  USING (auth.uid() = user_id);

-- Ticket replies: users see replies on own tickets, admins see all
CREATE POLICY "Users can view replies on their tickets"
  ON public.ticket_replies FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = ticket_replies.ticket_id AND tickets.user_id = auth.uid())
    OR auth.jwt()->>'email' IN ('fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com')
  );

CREATE POLICY "Users can create replies on their tickets"
  ON public.ticket_replies FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND (
      EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = ticket_replies.ticket_id AND tickets.user_id = auth.uid())
      OR auth.jwt()->>'email' IN ('fightergamerofficial1@gmail.com', 'ankitsarkarmukerjee123@gmail.com', 'og.fighterplayz@gmail.com')
    )
  );

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();