-- Template purchases table to track customer purchases
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS template_purchases (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  template_id BIGINT REFERENCES templates(id) ON DELETE CASCADE,
  order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  price_paid DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, cancelled
  download_url TEXT, -- URL to download template files
  download_expires_at TIMESTAMPTZ, -- Optional: set expiration for download links
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_template_purchases_user_id ON template_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_template_purchases_template_id ON template_purchases(template_id);
CREATE INDEX IF NOT EXISTS idx_template_purchases_order_id ON template_purchases(order_id);
CREATE INDEX IF NOT EXISTS idx_template_purchases_customer_email ON template_purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_template_purchases_status ON template_purchases(status);

-- Enable Row Level Security
ALTER TABLE template_purchases ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own purchases
CREATE POLICY "Users can read own purchases" ON template_purchases
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' = customer_email OR
    (user_id IS NOT NULL AND auth.uid()::text = user_id::text)
  );

-- Policy: Authenticated users can insert (for checkout process)
CREATE POLICY "Authenticated users can create purchases" ON template_purchases
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Admins can manage all purchases
CREATE POLICY "Admins can manage all purchases" ON template_purchases
  FOR ALL
  USING (auth.role() = 'authenticated'); -- Adjust based on your admin role check

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_template_purchases_updated_at BEFORE UPDATE ON template_purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add trigger to update template sales count when purchase is completed
CREATE OR REPLACE FUNCTION update_template_sales_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE templates
    SET sales = sales + 1
    WHERE id = NEW.template_id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_template_sales_on_purchase
  AFTER INSERT OR UPDATE ON template_purchases
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION update_template_sales_count();

