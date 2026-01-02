-- Template customizations table to track customer customization requests
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS template_customizations (
  id BIGSERIAL PRIMARY KEY,
  purchase_id BIGINT REFERENCES template_purchases(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  template_id BIGINT REFERENCES templates(id) ON DELETE CASCADE,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  request_title VARCHAR(255) NOT NULL,
  request_description TEXT NOT NULL,
  customization_type VARCHAR(100), -- color_change, layout_modification, feature_add, content_update, etc.
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high, urgent
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed, cancelled
  estimated_completion_date TIMESTAMPTZ,
  actual_completion_date TIMESTAMPTZ,
  developer_notes TEXT,
  customer_feedback TEXT,
  attachments TEXT[], -- URLs to uploaded files/images
  quoted_price DECIMAL(10, 2),
  final_price DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_template_customizations_purchase_id ON template_customizations(purchase_id);
CREATE INDEX IF NOT EXISTS idx_template_customizations_user_id ON template_customizations(user_id);
CREATE INDEX IF NOT EXISTS idx_template_customizations_template_id ON template_customizations(template_id);
CREATE INDEX IF NOT EXISTS idx_template_customizations_status ON template_customizations(status);
CREATE INDEX IF NOT EXISTS idx_template_customizations_customer_email ON template_customizations(customer_email);

-- Enable Row Level Security
ALTER TABLE template_customizations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own customization requests
CREATE POLICY "Users can read own customizations" ON template_customizations
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' = customer_email OR
    (user_id IS NOT NULL AND auth.uid()::text = user_id::text)
  );

-- Policy: Users can create customization requests
CREATE POLICY "Users can create customizations" ON template_customizations
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'email' = customer_email OR
    (user_id IS NOT NULL AND auth.uid()::text = user_id::text)
  );

-- Policy: Users can update their own customization requests (for feedback)
CREATE POLICY "Users can update own customizations" ON template_customizations
  FOR UPDATE
  USING (
    auth.jwt() ->> 'email' = customer_email OR
    (user_id IS NOT NULL AND auth.uid()::text = user_id::text)
  );

-- Policy: Admins can manage all customizations
CREATE POLICY "Admins can manage all customizations" ON template_customizations
  FOR ALL
  USING (auth.role() = 'authenticated'); -- Adjust based on your admin role check

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_template_customizations_updated_at BEFORE UPDATE ON template_customizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

