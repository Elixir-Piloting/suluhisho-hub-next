-- Fix foreign key relationships and publication issues

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

-- Only add tables to realtime publication if they're not already there
DO $$
BEGIN
    -- Check and add challenges table
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'challenges'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE challenges;
    END IF;
    
    -- Check and add solutions table
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'solutions'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE solutions;
    END IF;
    
    -- Check and add challenge_votes table
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'challenge_votes'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE challenge_votes;
    END IF;
    
    -- Check and add solution_votes table
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'solution_votes'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE solution_votes;
    END IF;
END $$;
