-- Package Purchase Requests Table
-- This table stores package purchase requests from customers
-- Admins can view these and contact customers

CREATE TABLE IF NOT EXISTS package_requests (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Customer Information
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  
  -- Package Information
  package_title VARCHAR(255) NOT NULL,
  package_price VARCHAR(50) NOT NULL,
  package_category VARCHAR(50) NOT NULL,
  package_description TEXT,
  
  -- Request Details
  additional_notes TEXT,
  preferred_contact_method VARCHAR(50), -- email, phone, both
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Admin fields
  admin_notes TEXT,
  contacted_at TIMESTAMP,
  contacted_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_package_requests_user_id ON package_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_package_requests_status ON package_requests(status);
CREATE INDEX IF NOT EXISTS idx_package_requests_category ON package_requests(package_category);
CREATE INDEX IF NOT EXISTS idx_package_requests_created_at ON package_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_package_requests_customer_email ON package_requests(customer_email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_package_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER package_requests_updated_at
  BEFORE UPDATE ON package_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_package_requests_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE package_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own package requests
CREATE POLICY "Users can view own package requests"
  ON package_requests
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own package requests
CREATE POLICY "Users can create package requests"
  ON package_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own package requests (only if status is 'new')
CREATE POLICY "Users can update own new package requests"
  ON package_requests
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'new')
  WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON package_requests TO authenticated;
GRANT SELECT ON package_requests TO anon; -- Remove this in production if you don't want anonymous access

