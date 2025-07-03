CREATE TABLE IF NOT EXISTS challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  solutions_count INTEGER DEFAULT 0,
  votes_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS solutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  votes_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS challenge_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vote_type INTEGER CHECK (vote_type IN (-1, 1)) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(challenge_id, user_id)
);

CREATE TABLE IF NOT EXISTS solution_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  solution_id UUID REFERENCES solutions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vote_type INTEGER CHECK (vote_type IN (-1, 1)) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(solution_id, user_id)
);

CREATE OR REPLACE FUNCTION update_challenge_solutions_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE challenges 
    SET solutions_count = solutions_count + 1 
    WHERE id = NEW.challenge_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE challenges 
    SET solutions_count = solutions_count - 1 
    WHERE id = OLD.challenge_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_challenge_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE challenges 
    SET votes_count = votes_count + NEW.vote_type 
    WHERE id = NEW.challenge_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE challenges 
    SET votes_count = votes_count + (NEW.vote_type - OLD.vote_type) 
    WHERE id = NEW.challenge_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE challenges 
    SET votes_count = votes_count - OLD.vote_type 
    WHERE id = OLD.challenge_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_solution_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE solutions 
    SET votes_count = votes_count + NEW.vote_type 
    WHERE id = NEW.solution_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE solutions 
    SET votes_count = votes_count + (NEW.vote_type - OLD.vote_type) 
    WHERE id = NEW.solution_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE solutions 
    SET votes_count = votes_count - OLD.vote_type 
    WHERE id = OLD.solution_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_challenge_solutions_count
  AFTER INSERT OR DELETE ON solutions
  FOR EACH ROW EXECUTE FUNCTION update_challenge_solutions_count();

CREATE TRIGGER trigger_update_challenge_votes_count
  AFTER INSERT OR UPDATE OR DELETE ON challenge_votes
  FOR EACH ROW EXECUTE FUNCTION update_challenge_votes_count();

CREATE TRIGGER trigger_update_solution_votes_count
  AFTER INSERT OR UPDATE OR DELETE ON solution_votes
  FOR EACH ROW EXECUTE FUNCTION update_solution_votes_count();

CREATE INDEX idx_challenges_user_id ON challenges(user_id);
CREATE INDEX idx_challenges_created_at ON challenges(created_at DESC);
CREATE INDEX idx_solutions_challenge_id ON solutions(challenge_id);
CREATE INDEX idx_solutions_user_id ON solutions(user_id);
CREATE INDEX idx_challenge_votes_challenge_id ON challenge_votes(challenge_id);
CREATE INDEX idx_solution_votes_solution_id ON solution_votes(solution_id);

alter publication supabase_realtime add table challenges;
alter publication supabase_realtime add table solutions;
alter publication supabase_realtime add table challenge_votes;
alter publication supabase_realtime add table solution_votes;