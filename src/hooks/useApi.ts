import { useState, useEffect } from 'react'
import { Project, Testimonial, Package, OrderRecord, TemplateItem, TemplatePurchase, TemplateCustomization } from '@/lib/supabase'
import { getProjects, getTestimonials, getPackages, getOrders, getTemplates, getTemplate, getFeaturedTemplates, getTemplatePurchases, getTemplateCustomizations } from '@/lib/api'

// Projects hook
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { projects, loading, error, refetch: fetchProjects }
}

// Testimonials hook
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  return { testimonials, loading, error, refetch: fetchTestimonials }
}

// Packages hook
export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const data = await getPackages()
      setPackages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch packages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  return { packages, loading, error, refetch: fetchPackages }
}

// Orders hook
export const useOrders = () => {
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await getOrders()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return { orders, loading, error, refetch: fetchOrders }
}

// Templates hook
export const useTemplates = () => {
  const [templates, setTemplates] = useState<TemplateItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const data = await getTemplates()
      setTemplates(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  return { templates, loading, error, refetch: fetchTemplates }
}

// Template hook (single)
export const useTemplate = (id: number | null) => {
  const [template, setTemplate] = useState<TemplateItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setTemplate(null)
      setLoading(false)
      return
    }

    const fetchTemplate = async () => {
      try {
        setLoading(true)
        const data = await getTemplate(id)
        setTemplate(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch template')
      } finally {
        setLoading(false)
      }
    }

    fetchTemplate()
  }, [id])

  return { template, loading, error }
}

// Template Purchases hook
export const useTemplatePurchases = () => {
  const [purchases, setPurchases] = useState<TemplatePurchase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPurchases = async () => {
    try {
      setLoading(true)
      const data = await getTemplatePurchases()
      setPurchases(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch template purchases')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPurchases()
  }, [])

  return { purchases, loading, error, refetch: fetchPurchases }
}

// Template Customizations hook
export const useTemplateCustomizations = () => {
  const [customizations, setCustomizations] = useState<TemplateCustomization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomizations = async () => {
    try {
      setLoading(true)
      const data = await getTemplateCustomizations()
      setCustomizations(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch template customizations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomizations()
  }, [])

  return { customizations, loading, error, refetch: fetchCustomizations }
}
