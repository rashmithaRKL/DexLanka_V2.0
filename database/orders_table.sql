-- Orders table to track Stripe checkout sessions and payments
-- Run this SQL in your Supabase SQL Editor
-- This table is populated by the Stripe webhook function

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  customer_email VARCHAR(255),
  customer_name VARCHAR(255),
  status VARCHAR(50), -- paid, unpaid, etc. (from Stripe payment_status)
  amount_total DECIMAL(10, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  items JSONB DEFAULT '[]'::jsonb, -- Array of line items from Stripe
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own orders
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' = customer_email
  );

-- Policy: Service role can insert/update (for webhook)
-- Note: This is handled by service role key, not RLS
-- But we'll allow authenticated inserts for webhook
CREATE POLICY "Allow webhook to insert orders" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Policy: Service role can update orders
CREATE POLICY "Allow webhook to update orders" ON orders
  FOR UPDATE
  USING (true);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

