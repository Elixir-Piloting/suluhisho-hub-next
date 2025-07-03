-- Ensure users table exists and has proper structure
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraints if they don't exist
DO $$ 
BEGIN
  -- Add foreign key for challenges.user_id -> users.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'challenges_user_id_fkey' 
    AND table_name = 'challenges'
  ) THEN
    ALTER TABLE challenges 
    ADD CONSTRAINT challenges_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
  
  -- Add foreign key for solutions.user_id -> users.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'solutions_user_id_fkey' 
    AND table_name = 'solutions'
  ) THEN
    ALTER TABLE solutions 
    ADD CONSTRAINT solutions_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
  
  -- Add foreign key for challenge_votes.user_id -> users.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'challenge_votes_user_id_fkey' 
    AND table_name = 'challenge_votes'
  ) THEN
    ALTER TABLE challenge_votes 
    ADD CONSTRAINT challenge_votes_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
  
  -- Add foreign key for solution_votes.user_id -> users.id
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'solution_votes_user_id_fkey' 
    AND table_name = 'solution_votes'
  ) THEN
    ALTER TABLE solution_votes 
    ADD CONSTRAINT solution_votes_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);
CREATE INDEX IF NOT EXISTS idx_challenge_votes_user_id ON challenge_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_solution_votes_user_id ON solution_votes(user_id);

-- Enable realtime for users table
alter publication supabase_realtime add table users;
