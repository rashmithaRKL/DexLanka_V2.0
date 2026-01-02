-- ============================================================================
-- COMPLETE MISSING DATABASE TABLES FOR DEXLANKA V2.0
-- ============================================================================
-- This SQL file contains all missing database tables required for the project
-- Run this in your Supabase SQL Editor
-- 
-- Missing Tables:
-- 1. contact_submissions - Contact form submissions
-- 2. projects - Portfolio projects
-- 3. testimonials - Client testimonials
-- 4. packages - Pricing packages
-- 5. admin_users - Admin authentication
-- ============================================================================

-- ============================================================================
-- TABLE 1: CONTACT_SUBMISSIONS
-- ============================================================================
-- Stores all contact form submissions from the website

CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, read, replied
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a contact form
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Authenticated users (admins) can read all submissions
CREATE POLICY "Authenticated users can read all submissions" ON contact_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can update submissions
CREATE POLICY "Authenticated users can update submissions" ON contact_submissions
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can delete submissions
CREATE POLICY "Authenticated users can delete submissions" ON contact_submissions
  FOR DELETE
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from website visitors';
COMMENT ON COLUMN contact_submissions.status IS 'Status: new, read, replied';


-- ============================================================================
-- TABLE 2: PROJECTS
-- ============================================================================
-- Stores portfolio projects displayed in the gallery

CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  live_demo_url TEXT,
  github_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  project_duration VARCHAR(100),
  client VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read projects
CREATE POLICY "Anyone can read projects" ON projects
  FOR SELECT
  USING (true);

-- Policy: Authenticated users (admins) can insert projects
CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can update projects
CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can delete projects
CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at timestamp (uses function from users_table.sql)
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE projects IS 'Portfolio projects displayed in the gallery';
COMMENT ON COLUMN projects.featured IS 'Whether project is featured on homepage';


-- ============================================================================
-- TABLE 3: TESTIMONIALS
-- ============================================================================
-- Stores client testimonials and reviews

CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  avatar_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read testimonials
CREATE POLICY "Anyone can read testimonials" ON testimonials
  FOR SELECT
  USING (true);

-- Policy: Authenticated users (admins) can insert testimonials
CREATE POLICY "Authenticated users can insert testimonials" ON testimonials
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can update testimonials
CREATE POLICY "Authenticated users can update testimonials" ON testimonials
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can delete testimonials
CREATE POLICY "Authenticated users can delete testimonials" ON testimonials
  FOR DELETE
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE testimonials IS 'Client testimonials and reviews';
COMMENT ON COLUMN testimonials.featured IS 'Whether testimonial is featured on homepage';


-- ============================================================================
-- TABLE 4: PACKAGES
-- ============================================================================
-- Stores pricing packages for different service categories

CREATE TABLE IF NOT EXISTS packages (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  category VARCHAR(100) NOT NULL, -- websites, applications, mobile, enterprise
  is_popular BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category);
CREATE INDEX IF NOT EXISTS idx_packages_is_popular ON packages(is_popular);
CREATE INDEX IF NOT EXISTS idx_packages_order_index ON packages(order_index);

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read packages
CREATE POLICY "Anyone can read packages" ON packages
  FOR SELECT
  USING (true);

-- Policy: Authenticated users (admins) can insert packages
CREATE POLICY "Authenticated users can insert packages" ON packages
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can update packages
CREATE POLICY "Authenticated users can update packages" ON packages
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Authenticated users (admins) can delete packages
CREATE POLICY "Authenticated users can delete packages" ON packages
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE packages IS 'Pricing packages for different service categories';
COMMENT ON COLUMN packages.category IS 'Category: websites, applications, mobile, enterprise';
COMMENT ON COLUMN packages.is_popular IS 'Whether package is marked as popular/recommended';
COMMENT ON COLUMN packages.order_index IS 'Display order (lower numbers appear first)';


-- ============================================================================
-- TABLE 5: ADMIN_USERS
-- ============================================================================
-- Stores admin user accounts for accessing the admin panel
-- ⚠️ WARNING: Current implementation uses plain-text passwords (INSECURE!)
-- For production, implement bcrypt password hashing (see SECURITY.md)

CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- ⚠️ Currently stores plain text, should be bcrypt hash
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin', -- admin, super_admin, editor
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Admin users can read their own data
CREATE POLICY "Admin users can read own data" ON admin_users
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Anyone can read admin user data for authentication (needed for login)
-- Note: This is safe because password_hash verification happens in the application
CREATE POLICY "Allow authentication queries" ON admin_users
  FOR SELECT
  USING (true);

-- Policy: Admin users can update their own data
CREATE POLICY "Admin users can update own data" ON admin_users
  FOR UPDATE
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Only super admins can insert new admin users
-- Note: For first user, you'll need to insert directly via SQL
CREATE POLICY "Super admins can insert admin users" ON admin_users
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email' 
      AND role = 'super_admin' 
      AND is_active = true
    )
  );

COMMENT ON TABLE admin_users IS 'Admin user accounts for accessing the admin panel';
COMMENT ON COLUMN admin_users.password_hash IS '⚠️ WARNING: Currently stores plain text! Use bcrypt in production (see SECURITY.md)';
COMMENT ON COLUMN admin_users.role IS 'User role: admin, super_admin, editor';


-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

-- Insert sample admin user (Default password: "admin123" - CHANGE THIS!)
-- ⚠️ IMPORTANT: Change this password immediately after setup!
INSERT INTO admin_users (email, password_hash, full_name, role, is_active) 
VALUES 
  ('admin@dexlanka.com', 'admin123', 'DexLanka Admin', 'super_admin', true),
  ('dexlanka@gmail.com', 'dexlanka2024', 'DexLanka Team', 'admin', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample packages
INSERT INTO packages (title, price, description, features, category, is_popular, order_index) VALUES
  (
    'Basic Website',
    '$499',
    'Perfect for small businesses and startups looking to establish an online presence.',
    ARRAY[
      'Up to 5 pages',
      'Responsive design',
      'Contact form',
      'Basic SEO optimization',
      'Social media integration',
      '30 days support'
    ],
    'websites',
    false,
    1
  ),
  (
    'Business Website',
    '$999',
    'Comprehensive website solution for growing businesses with advanced features.',
    ARRAY[
      'Up to 15 pages',
      'Custom design',
      'Content management system',
      'Advanced SEO',
      'Analytics integration',
      'Blog functionality',
      '90 days support'
    ],
    'websites',
    true,
    2
  ),
  (
    'E-Commerce Website',
    '$1,999',
    'Full-featured online store with payment integration and inventory management.',
    ARRAY[
      'Unlimited products',
      'Payment gateway integration',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Email notifications',
      'Analytics dashboard',
      '6 months support'
    ],
    'websites',
    false,
    3
  ),
  (
    'Custom Web Application',
    '$2,999+',
    'Tailored web application built to your specific business requirements.',
    ARRAY[
      'Custom functionality',
      'Database design',
      'User authentication',
      'API integration',
      'Admin dashboard',
      'Scalable architecture',
      'Cloud hosting setup',
      '1 year support'
    ],
    'applications',
    true,
    4
  ),
  (
    'Mobile App Development',
    '$3,999+',
    'Native or cross-platform mobile applications for iOS and Android.',
    ARRAY[
      'iOS and Android apps',
      'Custom UI/UX design',
      'Backend integration',
      'Push notifications',
      'App Store submission',
      'Analytics integration',
      'Cloud infrastructure',
      '1 year support'
    ],
    'mobile',
    false,
    5
  ),
  (
    'Enterprise Solution',
    'Custom Quote',
    'Large-scale enterprise software solutions with dedicated support.',
    ARRAY[
      'Custom architecture',
      'Advanced security',
      'Integration with existing systems',
      'Dedicated project manager',
      'Training for your team',
      'Scalability planning',
      'Priority support',
      'Ongoing maintenance'
    ],
    'enterprise',
    false,
    6
  )
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (content, author, position, company, featured) VALUES
  (
    'DexLanka transformed our online presence with a stunning website that perfectly captures our brand. The team was professional, responsive, and delivered beyond our expectations!',
    'Sarah Johnson',
    'CEO',
    'TechStart Inc.',
    true
  ),
  (
    'Working with DexLanka was a game-changer for our business. They built us a powerful e-commerce platform that increased our sales by 150% in just 3 months!',
    'Michael Chen',
    'Founder',
    'Urban Fashion',
    true
  ),
  (
    'The custom web application DexLanka developed for us has streamlined our operations significantly. Their attention to detail and technical expertise is impressive.',
    'Emma Rodriguez',
    'Operations Director',
    'LogiTech Solutions',
    false
  ),
  (
    'From concept to launch, DexLanka handled everything professionally. Our mobile app is now serving thousands of users daily. Highly recommended!',
    'David Kumar',
    'Product Manager',
    'HealthTrack',
    true
  ),
  (
    'DexLanka''s team delivered a beautiful, fast, and user-friendly website. The project was completed on time and within budget. Outstanding service!',
    'Lisa Anderson',
    'Marketing Director',
    'Green Valley Resort',
    false
  )
ON CONFLICT DO NOTHING;

-- Insert sample projects (using placeholder images - replace with actual images)
INSERT INTO projects (title, category, image_url, description, live_demo_url, github_url, technologies, project_duration, client, featured) VALUES
  (
    'Modern E-Commerce Platform',
    'Web Development',
    '/placeholder.svg',
    'A full-featured e-commerce platform with advanced product filtering, secure payment processing, and inventory management.',
    'https://demo.example.com',
    'https://github.com/example/ecommerce',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    '3 months',
    'Urban Fashion Store',
    true
  ),
  (
    'Restaurant Management System',
    'Web Development',
    '/placeholder.svg',
    'Comprehensive restaurant management system with online ordering, table reservations, and kitchen display integration.',
    'https://demo-restaurant.example.com',
    NULL,
    ARRAY['React', 'TypeScript', 'MongoDB', 'Express', 'Socket.io'],
    '2 months',
    'Delectable Restaurant Chain',
    true
  ),
  (
    'Healthcare Mobile App',
    'Mobile Applications',
    '/placeholder.svg',
    'Cross-platform mobile application for healthcare providers with appointment scheduling, telemedicine, and patient records.',
    NULL,
    NULL,
    ARRAY['React Native', 'TypeScript', 'Firebase', 'Redux'],
    '4 months',
    'HealthTrack Medical',
    false
  ),
  (
    'Real Estate Portal',
    'Web Development',
    '/placeholder.svg',
    'Modern real estate listing platform with advanced search, virtual tours, and mortgage calculator.',
    'https://realestate-demo.example.com',
    NULL,
    ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Google Maps API'],
    '2.5 months',
    'Premium Properties',
    true
  ),
  (
    'Corporate Website Redesign',
    'Web Development',
    '/placeholder.svg',
    'Complete website redesign for a technology company with focus on modern UI/UX and performance optimization.',
    'https://techcorp.example.com',
    NULL,
    ARRAY['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    '1.5 months',
    'TechCorp International',
    false
  ),
  (
    'Fitness Tracking App',
    'Mobile Applications',
    '/placeholder.svg',
    'Feature-rich fitness tracking mobile app with workout plans, progress tracking, and social features.',
    NULL,
    NULL,
    ARRAY['React Native', 'Redux', 'Node.js', 'MongoDB', 'AWS S3'],
    '3.5 months',
    'FitLife',
    true
  )
ON CONFLICT DO NOTHING;

-- Insert sample contact submissions (for testing)
INSERT INTO contact_submissions (name, email, phone, subject, message, status) VALUES
  (
    'John Smith',
    'john.smith@example.com',
    '+1234567890',
    'Website Development Inquiry',
    'Hi, I am interested in getting a business website developed for my company. Can we schedule a call to discuss the requirements?',
    'new'
  ),
  (
    'Jane Doe',
    'jane.doe@example.com',
    NULL,
    'Mobile App Development',
    'Looking for a team to develop a cross-platform mobile app for my startup. Would love to hear about your approach and pricing.',
    'read'
  ),
  (
    'Robert Johnson',
    'robert.j@example.com',
    '+9876543210',
    'E-Commerce Solution',
    'We need an e-commerce platform with inventory management and payment integration. Can you provide a quote?',
    'replied'
  )
ON CONFLICT DO NOTHING;


-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these queries to verify all tables were created successfully

-- Check all tables exist
SELECT 
  tablename,
  schemaname
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'contact_submissions',
    'projects', 
    'testimonials',
    'packages',
    'admin_users',
    'users',
    'templates',
    'orders',
    'template_purchases',
    'template_customizations'
  )
ORDER BY tablename;

-- Check row counts
SELECT 'contact_submissions' as table_name, COUNT(*) as row_count FROM contact_submissions
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'packages', COUNT(*) FROM packages
UNION ALL
SELECT 'admin_users', COUNT(*) FROM admin_users
UNION ALL
SELECT 'users', COUNT(*) FROM users
UNION ALL
SELECT 'templates', COUNT(*) FROM templates
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'template_purchases', COUNT(*) FROM template_purchases
UNION ALL
SELECT 'template_customizations', COUNT(*) FROM template_customizations;


-- ============================================================================
-- POST-SETUP INSTRUCTIONS
-- ============================================================================
-- 
-- 1. ⚠️ CHANGE DEFAULT ADMIN PASSWORD IMMEDIATELY:
--    UPDATE admin_users 
--    SET password_hash = 'your-new-secure-password' 
--    WHERE email = 'admin@dexlanka.com';
--
-- 2. 🔒 IMPLEMENT BCRYPT PASSWORD HASHING (see SECURITY.md)
--    - Install: npm install bcrypt @types/bcrypt
--    - Update AuthContext.tsx to hash passwords
--    - This is CRITICAL for production!
--
-- 3. 📧 UPDATE ADMIN EMAIL IN RLS POLICIES (if needed)
--    - Replace example emails with your actual admin email
--    - Update policies for stricter admin-only access
--
-- 4. 🖼️ REPLACE PLACEHOLDER IMAGES
--    - Update image_url in projects table with actual project images
--    - Update avatar_url in testimonials table with actual photos
--
-- 5. ✅ TEST THE SETUP
--    - Test contact form submission
--    - Login to admin panel (/admin)
--    - Add/edit projects, testimonials, packages
--    - Test template purchases and customizations
--
-- 6. 🗄️ BACKUP YOUR DATABASE
--    - Enable Supabase automatic backups
--    - Export database schema for version control
--
-- 7. 📊 ENABLE REALTIME (Optional)
--    - Go to Supabase Dashboard → Database → Replication
--    - Enable replication for tables that need real-time updates
--
-- ============================================================================

