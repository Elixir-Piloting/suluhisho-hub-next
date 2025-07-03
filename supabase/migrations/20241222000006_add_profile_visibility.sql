ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS show_name BOOLEAN DEFAULT true;

alter publication supabase_realtime add table users;
