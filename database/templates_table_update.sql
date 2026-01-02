-- Template Storage and Demo System - Database Updates
-- Run this SQL in your Supabase SQL Editor to add new columns for template storage and demo system

-- Add columns for template storage and demo configuration
ALTER TABLE templates ADD COLUMN IF NOT EXISTS demo_type VARCHAR(50) DEFAULT 'static_html';
-- Values: 'static_html', 'react', 'java_web', 'kotlin_android', 'flutter_web', 
--         'flutter_mobile', 'react_native_web', 'react_native_mobile', 'desktop', 'external'

ALTER TABLE templates ADD COLUMN IF NOT EXISTS storage_path TEXT;
-- Supabase Storage path: 'template-files/{template-id}/'

ALTER TABLE templates ADD COLUMN IF NOT EXISTS demo_config JSONB DEFAULT '{}'::jsonb;
-- Configuration for demo viewing:
-- {
--   "entryPoint": "index.html",
--   "devicePreview": true,
--   "screenshots": ["url1", "url2"],
--   "videoUrl": "url",
--   "apkUrl": "url",
--   "packageName": "com.example.app"
-- }

ALTER TABLE templates ADD COLUMN IF NOT EXISTS download_enabled BOOLEAN DEFAULT TRUE;
-- Whether template can be downloaded

ALTER TABLE templates ADD COLUMN IF NOT EXISTS file_count INTEGER DEFAULT 0;
-- Number of files in the template

ALTER TABLE templates ADD COLUMN IF NOT EXISTS total_size BIGINT DEFAULT 0;
-- Total size of template files in bytes

-- Add index for demo_type for faster filtering
CREATE INDEX IF NOT EXISTS idx_templates_demo_type ON templates(demo_type);

-- Add index for storage_path
CREATE INDEX IF NOT EXISTS idx_templates_storage_path ON templates(storage_path);

-- Update template_purchases table for download tracking
ALTER TABLE template_purchases ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE template_purchases ADD COLUMN IF NOT EXISTS last_downloaded_at TIMESTAMPTZ;
ALTER TABLE template_purchases ADD COLUMN IF NOT EXISTS download_limit INTEGER DEFAULT NULL;
-- NULL = unlimited downloads, or set a number for limited downloads

-- Add index for download tracking
CREATE INDEX IF NOT EXISTS idx_template_purchases_download_count ON template_purchases(download_count);

-- Function to update template file count and size
CREATE OR REPLACE FUNCTION update_template_file_info()
RETURNS TRIGGER AS $$
BEGIN
  -- This will be called when files are uploaded/updated
  -- The actual file count and size will be calculated by the application
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.download_count > OLD.download_count THEN
    NEW.last_downloaded_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last_downloaded_at
CREATE TRIGGER update_template_purchase_download_timestamp
  BEFORE UPDATE ON template_purchases
  FOR EACH ROW
  WHEN (NEW.download_count IS DISTINCT FROM OLD.download_count)
  EXECUTE FUNCTION increment_download_count();

-- Comments for documentation
COMMENT ON COLUMN templates.demo_type IS 'Type of template demo: static_html, react, java_web, kotlin_android, flutter_web, flutter_mobile, react_native_web, react_native_mobile, desktop, external';
COMMENT ON COLUMN templates.storage_path IS 'Path to template files in Supabase Storage: template-files/{template-id}/';
COMMENT ON COLUMN templates.demo_config IS 'JSON configuration for demo viewing including entry points, screenshots, videos, etc.';
COMMENT ON COLUMN templates.download_enabled IS 'Whether customers can download this template after purchase';
COMMENT ON COLUMN template_purchases.download_count IS 'Number of times the template has been downloaded';
COMMENT ON COLUMN template_purchases.download_limit IS 'Maximum number of downloads allowed (NULL = unlimited)';

