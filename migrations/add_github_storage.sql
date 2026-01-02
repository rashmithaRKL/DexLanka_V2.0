-- GitHub Storage Integration - Database Migration
-- Add columns to support GitHub as storage backend

-- Add storage type column (default to 'supabase' for existing templates)
ALTER TABLE templates 
ADD COLUMN IF NOT EXISTS storage_type VARCHAR(20) DEFAULT 'supabase';

-- Add GitHub repository URL
ALTER TABLE templates 
ADD COLUMN IF NOT EXISTS github_repo_url TEXT;

-- Add GitHub repository name
ALTER TABLE templates 
ADD COLUMN IF NOT EXISTS github_repo_name TEXT;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_templates_storage_type ON templates(storage_type);

-- Add check constraint to ensure valid storage types
ALTER TABLE templates 
ADD CONSTRAINT chk_storage_type CHECK (storage_type IN ('supabase', 'github'));

-- Update existing templates to explicitly set storage_type
UPDATE templates 
SET storage_type = 'supabase' 
WHERE storage_type IS NULL;
