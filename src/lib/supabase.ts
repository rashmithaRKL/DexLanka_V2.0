import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface ContactSubmission {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
  status: 'new' | 'read' | 'replied'
}

export interface Project {
  id: number
  title: string
  category: string
  image_url: string
  description: string
  live_demo_url?: string
  github_url?: string
  technologies: string[]
  project_duration?: string
  client?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  content: string
  author: string
  position: string
  company?: string
  avatar_url?: string
  featured: boolean
  created_at: string
}

export interface Package {
  id: number
  title: string
  price: string
  description: string
  features: string[]
  category: 'websites' | 'applications' | 'mobile' | 'enterprise'
  is_popular: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: number
  email: string
  password_hash: string
  full_name: string
  role: string
  last_login: string | null
  is_active: boolean
  created_at: string
}

export interface AdminSession {
  id: number
  admin_user_id: number
  token: string
  expires_at: string
  created_at: string
}

export interface OrderRecord {
  id: number
  stripe_session_id: string
  customer_email?: string
  customer_name?: string
  status?: string
  amount_total?: number
  currency?: string
  items?: any
  created_at: string
  updated_at: string
}

export interface TemplateItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  preview_url?: string
  thumbnail_url?: string
  features: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
  // New fields for storage and demo system
  demo_type?: string
  storage_path?: string | null
  demo_config?: Record<string, any>
  download_enabled?: boolean
  file_count?: number
  total_size?: number
  full_description?: string
  screenshots?: string[]
  tags?: string[]
  rating?: number
  sales?: number
  live_preview_url?: string
  technologies?: string[]
  compatibility?: string[]
  order_index?: number
  is_active?: boolean
  // GitHub storage fields
  storage_type?: 'supabase' | 'github'
  github_repo_url?: string
  github_repo_name?: string
}

export interface TemplatePurchase {
  id: number
  user_id?: string | null
  template_id: number
  order_id?: number | null
  customer_email: string
  customer_name?: string | null
  price_paid: number
  currency?: string
  status: string
  download_url?: string | null
  download_expires_at?: string | null
  notes?: string | null
  created_at: string
  updated_at?: string
  // New fields for download tracking
  download_count?: number
  last_downloaded_at?: string | null
  download_limit?: number | null
}

export interface TemplateCustomization {
  id: number
  purchase_id: number
  customization_data: any
  status: string
  created_at: string
  updated_at: string
}