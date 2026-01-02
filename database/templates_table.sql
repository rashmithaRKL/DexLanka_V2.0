-- Templates table for managing template catalog
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS templates (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  image TEXT NOT NULL,
  screenshots TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  rating DECIMAL(3, 2) DEFAULT 0.00,
  sales INTEGER DEFAULT 0,
  preview_url TEXT,
  live_preview_url TEXT, -- URL for embedded live preview
  is_featured BOOLEAN DEFAULT FALSE,
  features TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  compatibility TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_is_featured ON templates(is_featured);
CREATE INDEX IF NOT EXISTS idx_templates_is_active ON templates(is_active);
CREATE INDEX IF NOT EXISTS idx_templates_order_index ON templates(order_index);

-- Enable Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active templates
CREATE POLICY "Anyone can read active templates" ON templates
  FOR SELECT
  USING (is_active = TRUE);

-- Policy: Only admins can insert/update/delete (you'll need to set up admin auth)
-- For now, allow authenticated users (you can restrict this later)
CREATE POLICY "Authenticated users can manage templates" ON templates
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

