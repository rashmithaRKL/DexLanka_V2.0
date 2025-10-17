import { supabase, ContactSubmission, Project, Testimonial, Package } from './supabase'
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
