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