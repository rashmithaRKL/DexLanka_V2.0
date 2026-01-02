-- Custom Quote Requests Table
-- This table stores custom project quote requests from customers

CREATE TABLE IF NOT EXISTS custom_quote_requests (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Customer Information
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company_name VARCHAR(255),
  
  -- Project Category
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'website',
    'web_application',
    'enterprise_application',
    'mobile_app',
    'desktop_system'
  )),
  
  -- Project Details
  project_title VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  project_goals TEXT,
  
  -- Technical Requirements
  platform VARCHAR(100), -- e.g., 'iOS', 'Android', 'Web', 'Windows', 'macOS', 'Linux'
  features TEXT[], -- Array of required features
  integrations TEXT[], -- Array of required integrations (payment, APIs, etc.)
  design_preference VARCHAR(50), -- 'minimal', 'modern', 'corporate', 'creative', 'custom'
  
  -- Project Scope
  number_of_pages INTEGER, -- For websites
  user_roles TEXT[], -- Different user types needed
  has_admin_panel BOOLEAN DEFAULT false,
  has_user_authentication BOOLEAN DEFAULT false,
  has_payment_integration BOOLEAN DEFAULT false,
  has_database BOOLEAN DEFAULT false,
  has_api BOOLEAN DEFAULT false,
  has_cms BOOLEAN DEFAULT false,
  
  -- Timeline and Budget
  timeline VARCHAR(50), -- 'urgent', '1-2 weeks', '1 month', '2-3 months', '3+ months', 'flexible'
  budget_range VARCHAR(50), -- 'under_500', '500-1000', '1000-2500', '2500-5000', '5000+', 'flexible'
  deadline DATE,
  
  -- Additional Information
  reference_websites TEXT[], -- URLs of websites they like
  existing_assets BOOLEAN DEFAULT false, -- Do they have logos, content, etc.
  hosting_preference VARCHAR(50), -- 'managed_by_dexlanka', 'own_hosting', 'not_decided'
  maintenance_required BOOLEAN DEFAULT false,
  
  -- Additional notes
  additional_notes TEXT,
  attachment_urls TEXT[], -- URLs to any uploaded documents/mockups
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'quoted', 'accepted', 'rejected', 'archived')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Quote information (filled by admin)
  quoted_price DECIMAL(10, 2),
  quoted_timeline VARCHAR(100),
  admin_notes TEXT,
  quote_sent_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_custom_quote_requests_user_id ON custom_quote_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_quote_requests_status ON custom_quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_custom_quote_requests_category ON custom_quote_requests(category);
CREATE INDEX IF NOT EXISTS idx_custom_quote_requests_created_at ON custom_quote_requests(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_custom_quote_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER custom_quote_requests_updated_at
  BEFORE UPDATE ON custom_quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_custom_quote_requests_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE custom_quote_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own quote requests
CREATE POLICY "Users can view own quote requests"
  ON custom_quote_requests
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own quote requests
CREATE POLICY "Users can create quote requests"
  ON custom_quote_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own quote requests (only if status is 'new' or 'reviewing')
CREATE POLICY "Users can update own new quote requests"
  ON custom_quote_requests
  FOR UPDATE
  USING (auth.uid() = user_id AND status IN ('new', 'reviewing'))
  WITH CHECK (auth.uid() = user_id);

-- Admin users can view all quote requests (you'll need to create an admin role)
-- CREATE POLICY "Admins can view all quote requests"
--   ON custom_quote_requests
--   FOR ALL
--   USING (auth.jwt()->>'role' = 'admin');

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON custom_quote_requests TO authenticated;
GRANT SELECT ON custom_quote_requests TO anon; -- Remove this in production if you don't want anonymous access

-- Sample insert for testing
-- INSERT INTO custom_quote_requests (
--   user_id, full_name, email, phone, category, project_title, project_description,
--   timeline, budget_range, status
-- ) VALUES (
--   'your-user-uuid', 'John Doe', 'john@example.com', '+1234567890',
--   'web_application', 'E-commerce Platform', 'Need a custom e-commerce platform with inventory management',
--   '2-3 months', '2500-5000', 'new'
-- );
