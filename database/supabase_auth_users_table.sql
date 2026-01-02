-- Update users table to work with Supabase Auth
-- Run this SQL in your Supabase SQL Editor

-- First, modify the users table to use UUID for id (matching Supabase Auth)
ALTER TABLE users 
DROP CONSTRAINT IF EXISTS users_pkey CASCADE;

ALTER TABLE users 
ALTER COLUMN id TYPE UUID USING id::uuid,
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE users 
ADD PRIMARY KEY (id);

-- Add new columns for OAuth and email verification
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS provider VARCHAR(50) DEFAULT 'email',
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;

-- Remove password_hash column as Supabase Auth handles this
ALTER TABLE users 
DROP COLUMN IF EXISTS password_hash;

-- Create or replace function to sync with auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, provider, email_verified, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture'),
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email'),
    NEW.email_confirmed_at IS NOT NULL,
    TRUE
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url),
    provider = EXCLUDED.provider,
    email_verified = EXCLUDED.email_verified,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies to work with auth.uid()
DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Anyone can register" ON users;
-- Remove insert policy as trigger handles creation

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);

-- Update existing users to have proper UUIDs (if needed)
-- Note: This is for migration only, remove if starting fresh
-- UPDATE users SET id = gen_random_uuid() WHERE id IS NULL OR id::text !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

COMMENT ON COLUMN users.provider IS 'OAuth provider: email, google, facebook, github';
COMMENT ON COLUMN users.email_verified IS 'Whether email has been verified';

