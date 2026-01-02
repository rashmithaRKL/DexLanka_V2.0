-- Migration: Add demo system fields to templates table
-- Run this SQL in your Supabase SQL Editor

-- Add new columns for demo system
ALTER TABLE templates 
ADD COLUMN IF NOT EXISTS demo_type VARCHAR(20) DEFAULT 'external',
ADD COLUMN IF NOT EXISTS demo_path TEXT,
ADD COLUMN IF NOT EXISTS demo_files JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS platform_type VARCHAR(50) DEFAULT 'web';

-- Add comment for documentation
COMMENT ON COLUMN templates.demo_type IS 'Type of demo: static, react, external, mobile, desktop';
COMMENT ON COLUMN templates.demo_path IS 'Path to demo files or component name';
COMMENT ON COLUMN templates.demo_files IS 'Array of uploaded file paths/URLs';
COMMENT ON COLUMN templates.platform_type IS 'Platform: web, mobile, desktop';

-- Create index for demo_type for faster filtering
CREATE INDEX IF NOT EXISTS idx_templates_demo_type ON templates(demo_type);
CREATE INDEX IF NOT EXISTS idx_templates_platform_type ON templates(platform_type);

-- Update existing templates to have default values
UPDATE templates 
SET demo_type = 'external' 
WHERE demo_type IS NULL;

UPDATE templates 
SET platform_type = 'web' 
WHERE platform_type IS NULL;

