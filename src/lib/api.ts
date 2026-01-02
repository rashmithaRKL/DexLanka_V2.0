import { supabase, ContactSubmission, Project, Testimonial, Package, TemplateItem, TemplatePurchase, TemplateCustomization, OrderRecord } from './supabase'
import { sendContactEmail } from './emailService'

// Contact Form API
export const submitContactForm = async (formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) => {
  try {
    // Save to database first
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select()

    if (error) {
      throw new Error(`Failed to save contact form: ${error.message}`)
    }

    // Try to send email notification to dexlanka@gmail.com
    try {
      await sendContactEmail(formData)
    } catch (emailError) {
      // Email failed but database save succeeded - this is okay
      console.warn('Email sending failed, but form was saved:', emailError)
    }

    return data?.[0] || { success: true }
  } catch (error) {
    // If database save fails
    console.error('Contact form submission failed:', error)
    throw new Error(`Failed to submit contact form: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch contact submissions: ${error.message}`)
  }

  return data || []
}

export const updateContactSubmissionStatus = async (id: number, status: 'new' | 'read' | 'replied') => {
  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to update contact submission: ${error.message}`)
  }
}

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`)
  }

  return data || []
}

export const getProject = async (id: number): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Project not found
    }
    throw new Error(`Failed to fetch project: ${error.message}`)
  }

  return data
}

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`)
  }

  return data
}

export const updateProject = async (id: number, updates: Partial<Project>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`)
  }

  return data
}

export const deleteProject = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`)
  }
}

// Testimonials API
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch testimonials: ${error.message}`)
  }

  return data || []
}

export const getFeaturedTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch featured testimonials: ${error.message}`)
  }

  return data || []
}

export const createTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create testimonial: ${error.message}`)
  }

  return data
}

export const updateTestimonial = async (id: number, updates: Partial<Testimonial>): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update testimonial: ${error.message}`)
  }

  return data
}

export const deleteTestimonial = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete testimonial: ${error.message}`)
  }
}

// Packages API
export const getPackages = async (): Promise<Package[]> => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch packages: ${error.message}`)
  }

  return data || []
}

export const getPackagesByCategory = async (category: string): Promise<Package[]> => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('category', category)
    .order('order_index', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch packages by category: ${error.message}`)
  }

  return data || []
}

export const createPackage = async (pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'>): Promise<Package> => {
  const { data, error } = await supabase
    .from('packages')
    .insert([pkg])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create package: ${error.message}`)
  }

  return data
}

export const updatePackage = async (id: number, updates: Partial<Package>): Promise<Package> => {
  const { data, error } = await supabase
    .from('packages')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update package: ${error.message}`)
  }

  return data
}

export const deletePackage = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete package: ${error.message}`)
  }
}

// Contact Messages API
export const deleteContactSubmission = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete contact submission: ${error.message}`)
  }
}

// Orders API
export const getOrders = async (): Promise<OrderRecord[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`)
  }

  return data || []
}

// Get user's orders by email
export const getUserOrders = async (userEmail: string): Promise<OrderRecord[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', userEmail)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch user orders: ${error.message}`)
  }

  return data || []
}

// Templates API
export const getTemplates = async (): Promise<TemplateItem[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch templates: ${error.message}`)
  }

  return data || []
}

export const getTemplate = async (id: number): Promise<TemplateItem> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch template: ${error.message}`)
  }

  return data
}

export const getFeaturedTemplates = async (): Promise<TemplateItem[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch featured templates: ${error.message}`)
  }

  return data || []
}

export const getTemplatePurchases = async (): Promise<TemplatePurchase[]> => {
  const { data, error } = await supabase
    .from('template_purchases')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch template purchases: ${error.message}`)
  }

  return data || []
}

// Get user's template purchases
export const getUserTemplatePurchases = async (userEmail: string): Promise<TemplatePurchase[]> => {
  const { data, error } = await supabase
    .from('template_purchases')
    .select('*')
    .eq('customer_email', userEmail)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch user template purchases: ${error.message}`)
  }

  return data || []
}

export const getTemplateCustomizations = async (): Promise<TemplateCustomization[]> => {
  const { data, error } = await supabase
    .from('template_customizations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch template customizations: ${error.message}`)
  }

  return data || []
}

export const createTemplatePurchase = async (purchaseData: Omit<TemplatePurchase, 'id' | 'created_at'>): Promise<TemplatePurchase> => {
  const { data, error } = await supabase
    .from('template_purchases')
    .insert([purchaseData])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create template purchase: ${error.message}`)
  }

  return data
}

export const createTemplate = async (templateData: Omit<TemplateItem, 'id' | 'created_at' | 'updated_at'>): Promise<TemplateItem> => {
  const { data, error } = await supabase
    .from('templates')
    .insert([templateData])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create template: ${error.message}`)
  }

  return data
}

export const updateTemplate = async (id: number, updates: Partial<TemplateItem>): Promise<TemplateItem> => {
  const { data, error } = await supabase
    .from('templates')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update template: ${error.message}`)
  }

  return data
}

export const deleteTemplate = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete template: ${error.message}`)
  }
}

// Custom Quote Requests API
export interface CustomQuoteRequest {
  id?: number
  user_id: string
  full_name: string
  email: string
  phone?: string | null
  company_name?: string | null
  category: 'website' | 'web_application' | 'enterprise_application' | 'mobile_app' | 'desktop_system'
  project_title: string
  project_description: string
  project_goals?: string | null
  platform?: string | null
  features?: string[] | null
  integrations?: string[] | null
  design_preference?: string
  number_of_pages?: number | null
  user_roles?: string[] | null
  has_admin_panel?: boolean
  has_user_authentication?: boolean
  has_payment_integration?: boolean
  has_database?: boolean
  has_api?: boolean
  has_cms?: boolean
  timeline?: string
  budget_range?: string
  deadline?: string | null
  reference_websites?: string[] | null
  existing_assets?: boolean
  hosting_preference?: string
  maintenance_required?: boolean
  additional_notes?: string | null
  status?: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'archived'
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  quoted_price?: number | null
  quoted_timeline?: string | null
  admin_notes?: string | null
  quote_sent_at?: string | null
  created_at?: string
  updated_at?: string
}

// Get all custom quote requests (admin)
export const getCustomQuoteRequests = async (): Promise<CustomQuoteRequest[]> => {
  const { data, error } = await supabase
    .from('custom_quote_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch custom quote requests: ${error.message}`)
  }

  return data || []
}

// Get custom quote requests by user (customer)
export const getUserQuoteRequests = async (userId: string): Promise<CustomQuoteRequest[]> => {
  const { data, error } = await supabase
    .from('custom_quote_requests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch user quote requests: ${error.message}`)
  }

  return data || []
}

// Get a single custom quote request
export const getCustomQuoteRequest = async (id: number): Promise<CustomQuoteRequest> => {
  const { data, error } = await supabase
    .from('custom_quote_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch custom quote request: ${error.message}`)
  }

  return data
}

// Create a new custom quote request
export const createCustomQuoteRequest = async (quoteData: Omit<CustomQuoteRequest, 'id' | 'created_at' | 'updated_at'>): Promise<CustomQuoteRequest> => {
  const { data, error } = await supabase
    .from('custom_quote_requests')
    .insert([quoteData])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create custom quote request: ${error.message}`)
  }

  return data
}

// Update custom quote request (customer - limited fields)
export const updateCustomQuoteRequest = async (
  id: number,
  updates: Partial<CustomQuoteRequest>
): Promise<CustomQuoteRequest> => {
  const { data, error } = await supabase
    .from('custom_quote_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update custom quote request: ${error.message}`)
  }

  return data
}

// Admin: Update quote with pricing and timeline
export const adminUpdateQuote = async (
  id: number,
  updates: {
    quoted_price?: number
    quoted_timeline?: string
    admin_notes?: string
    status?: CustomQuoteRequest['status']
    priority?: CustomQuoteRequest['priority']
  }
): Promise<CustomQuoteRequest> => {
  const updateData = {
    ...updates,
    quote_sent_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('custom_quote_requests')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update quote: ${error.message}`)
  }

  return data
}

// Delete custom quote request
export const deleteCustomQuoteRequest = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('custom_quote_requests')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete custom quote request: ${error.message}`)
  }
}

// Get quote request statistics (admin)
export const getQuoteRequestStats = async (): Promise<{
  total: number
  new: number
  reviewing: number
  quoted: number
  accepted: number
}> => {
  const { data, error } = await supabase
    .from('custom_quote_requests')
    .select('status')

  if (error) {
    throw new Error(`Failed to fetch quote request stats: ${error.message}`)
  }

  const stats = {
    total: data.length,
    new: data.filter(q => q.status === 'new').length,
    reviewing: data.filter(q => q.status === 'reviewing').length,
    quoted: data.filter(q => q.status === 'quoted').length,
    accepted: data.filter(q => q.status === 'accepted').length,
  }

  return stats
}

// Package Purchase Requests API
export interface PackageRequest {
  id?: number
  user_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string | null
  package_title: string
  package_price: string
  package_category: string
  package_description?: string | null
  additional_notes?: string | null
  preferred_contact_method?: string | null
  status?: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  admin_notes?: string | null
  contacted_at?: string | null
  contacted_by?: number | null
  created_at?: string
  updated_at?: string
}

// Create a package purchase request
export const createPackageRequest = async (requestData: Omit<PackageRequest, 'id' | 'created_at' | 'updated_at'>): Promise<PackageRequest> => {
  const { data, error } = await supabase
    .from('package_requests')
    .insert([requestData])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create package request: ${error.message}`)
  }

  return data
}

// Get all package requests (admin)
export const getPackageRequests = async (): Promise<PackageRequest[]> => {
  const { data, error } = await supabase
    .from('package_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch package requests: ${error.message}`)
  }

  return data || []
}

// Get user's package requests
export const getUserPackageRequests = async (userId: string): Promise<PackageRequest[]> => {
  const { data, error } = await supabase
    .from('package_requests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch user package requests: ${error.message}`)
  }

  return data || []
}

// Update package request status (admin)
export const updatePackageRequest = async (
  id: number,
  updates: {
    status?: PackageRequest['status']
    priority?: PackageRequest['priority']
    admin_notes?: string
    contacted_at?: string
    contacted_by?: number
  }
): Promise<PackageRequest> => {
  const { data, error } = await supabase
    .from('package_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update package request: ${error.message}`)
  }

  return data
}

// Delete package request
export const deletePackageRequest = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('package_requests')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete package request: ${error.message}`)
  }
}

// Get package request statistics (admin)
export const getPackageRequestStats = async (): Promise<{
  total: number
  new: number
  contacted: number
  in_progress: number
  completed: number
}> => {
  const { data, error } = await supabase
    .from('package_requests')
    .select('status')

  if (error) {
    throw new Error(`Failed to fetch package request stats: ${error.message}`)
  }

  const stats = {
    total: data.length,
    new: data.filter(p => p.status === 'new').length,
    contacted: data.filter(p => p.status === 'contacted').length,
    in_progress: data.filter(p => p.status === 'in_progress').length,
    completed: data.filter(p => p.status === 'completed').length,
  }

  return stats
}
