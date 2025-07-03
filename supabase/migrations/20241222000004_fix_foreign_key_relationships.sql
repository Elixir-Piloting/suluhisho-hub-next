-- Fix foreign key relationships and constraints

-- First, ensure the users table has the correct structure
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);

-- Add foreign key constraint for challenges table
ALTER TABLE public.challenges DROP CONSTRAINT IF EXISTS challenges_user_id_fkey;
ALTER TABLE public.challenges ADD CONSTRAINT challenges_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key constraint for solutions table
ALTER TABLE public.solutions DROP CONSTRAINT IF EXISTS solutions_user_id_fkey;
ALTER TABLE public.solutions ADD CONSTRAINT solutions_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key constraint for challenge_votes table
ALTER TABLE public.challenge_votes DROP CONSTRAINT IF EXISTS challenge_votes_user_id_fkey;
ALTER TABLE public.challenge_votes ADD CONSTRAINT challenge_votes_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key constraint for solution_votes table
ALTER TABLE public.solution_votes DROP CONSTRAINT IF EXISTS solution_votes_user_id_fkey;
ALTER TABLE public.solution_votes ADD CONSTRAINT solution_votes_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable realtime for tables (skip users since it's already added)
alter publication supabase_realtime add table challenges;
alter publication supabase_realtime add table solutions;
alter publication supabase_realtime add table challenge_votes;
alter publication supabase_realtime add table solution_votes;