import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { getAnalytics } from '@/hooks/useVisitorTracking'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Globe,
  MessageSquare,
  FolderOpen,
  Star,
  Package,
  Plus,
  Edit,
  Trash2,
  Download,
  LogOut,
  Settings,
  Home,
  ShoppingCart
} from 'lucide-react'
import { useProjects, useTestimonials, usePackages, useOrders, useTemplates, useTemplatePurchases, useTemplateCustomizations } from '@/hooks/useApi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AddProjectModal from '@/components/admin/AddProjectModal'
import AddTestimonialModal from '@/components/admin/AddTestimonialModal'
import AddPackageModal from '@/components/admin/AddPackageModal'
import AddTemplateModal from '@/components/admin/AddTemplateModal'
import ContactMessages from '@/components/admin/ContactMessages'
import ManagePackageRequests from '@/components/admin/ManagePackageRequests'
import ManageQuoteRequests from '@/components/admin/ManageQuoteRequests'
import { deleteTemplate, deleteProject, deleteTestimonial, deletePackage } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

const Admin = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('analytics')
  const [analytics, setAnalytics] = useState<ReturnType<typeof getAnalytics> | null>(null)
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('daily')

  const { projects, loading: projectsLoading, refetch: refetchProjects } = useProjects()
  const { testimonials, loading: testimonialsLoading, refetch: refetchTestimonials } = useTestimonials()
  const { packages, loading: packagesLoading, refetch: refetchPackages } = usePackages()
  const { orders, loading: ordersLoading, refetch: refetchOrders } = useOrders()
  const { templates, loading: templatesLoading, refetch: refetchTemplates } = useTemplates()
  const { purchases, loading: purchasesLoading, refetch: refetchPurchases } = useTemplatePurchases()
  const { customizations, loading: customizationsLoading, refetch: refetchCustomizations } = useTemplateCustomizations()
  const { toast } = useToast()

  useEffect(() => {
    const data = getAnalytics()
    setAnalytics(data)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleExportData = () => {
    const data = {
      projects,
      testimonials,
      packages,
      templates,
      purchases,
      customizations,
      analytics,
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dexlanka-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const handleDeleteTemplate = async (id: number) => {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      await deleteTemplate(id)
      toast({
        title: "Success",
        description: "Template deleted successfully!",
      })
      refetchTemplates()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await deleteProject(id)
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      })
      refetchProjects()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      await deleteTestimonial(id)
      toast({
        title: "Success",
        description: "Testimonial deleted successfully!",
      })
      refetchTestimonials()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial.",
        variant: "destructive",
      })
    }
  }

  const handleDeletePackage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return

    try {
      await deletePackage(id)
      toast({
        title: "Success",
        description: "Package deleted successfully!",
      })
      refetchPackages()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete package.",
        variant: "destructive",
      })
    }
  }

  const currentStats = analytics?.[timeframe] || { visitors: 0, pageViews: 0 }

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkBg via-darkBlue to-darkBg">
      {/* Header */}
      <div className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="dex-span">Dex</span>
                <span className="lanka-span">Lanka</span> Admin
              </h1>
              <p className="text-sm text-gray-400">Welcome back, {user?.full_name}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{projects.length}</div>
              <p className="text-xs text-gray-400 mt-1">Active projects</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Testimonials</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{testimonials.length}</div>
              <p className="text-xs text-gray-400 mt-1">Client reviews</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Packages</CardTitle>
              <Package className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{packages.length}</div>
              <p className="text-xs text-gray-400 mt-1">Service packages</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Visits</CardTitle>
              <TrendingUp className="h-4 w-4 text-dexRed" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{analytics?.totalVisits || 0}</div>
              <p className="text-xs text-gray-400 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Templates</CardTitle>
              <Package className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{templates.length}</div>
              <p className="text-xs text-gray-400 mt-1">Active templates</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Purchases</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{purchases.length}</div>
              <p className="text-xs text-gray-400 mt-1">Total purchases</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-11 glass border-white/10">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="package-requests">Package Requests</TabsTrigger>
            <TabsTrigger value="quote-requests">Quote Requests</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="customizations">Customizations</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Timeframe Selector */}
            <Card className="glass border-white/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Visitor Analytics</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your website traffic and engagement
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={timeframe === 'daily' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeframe('daily')}
                      className={timeframe === 'daily' ? 'bg-dexRed' : ''}
                    >
                      Daily
                    </Button>
                    <Button
                      variant={timeframe === 'monthly' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeframe('monthly')}
                      className={timeframe === 'monthly' ? 'bg-dexRed' : ''}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={timeframe === 'yearly' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeframe('yearly')}
                      className={timeframe === 'yearly' ? 'bg-dexRed' : ''}
                    >
                      Yearly
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-300">Unique Visitors</h3>
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-4xl font-bold text-white">{currentStats.visitors}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {timeframe === 'daily' && 'Today'}
                      {timeframe === 'monthly' && 'This month'}
                      {timeframe === 'yearly' && 'This year'}
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-300">Page Views</h3>
                      <Eye className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-4xl font-bold text-white">{currentStats.pageViews}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {timeframe === 'daily' && 'Today'}
                      {timeframe === 'monthly' && 'This month'}
                      {timeframe === 'yearly' && 'This year'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Last 7 Days Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Last 7 Days Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics?.last7Days?.map((day: { date: string; visitors: number; pageViews: number }, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400 w-24">
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-dexRed to-pink-500 h-full"
                            style={{ width: `${(day.visitors / Math.max(...(analytics.last7Days || []).map((d) => d.visitors), 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white w-12 text-right">{day.visitors}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Popular Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics?.popularPages?.map((page: { url: string; views: number }, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{page.url}</span>
                        </div>
                        <Badge variant="outline" className="text-dexRed border-dexRed/50">
                          {page.views} views
                        </Badge>
                      </div>
                    ))}
                    {(!analytics?.popularPages || analytics.popularPages.length === 0) && (
                      <p className="text-gray-400 text-sm">No page data available yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Data */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Data Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Export your data for backup or analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleExportData} className="bg-dexRed hover:bg-dexRed/90">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data (JSON)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Templates</h2>
                <p className="text-gray-400 text-sm">Manage your template catalog</p>
              </div>
              <AddTemplateModal onTemplateAdded={refetchTemplates} />
            </div>

            {templatesLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading templates...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price (USD)</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((t) => (
                      <TableRow key={t.id} className="hover:bg-white/5">
                        <TableCell className="font-mono text-xs">{t.id}</TableCell>
                        <TableCell className="font-medium text-white">{t.title}</TableCell>
                        <TableCell><Badge variant="outline" className="border-white/20">{t.category}</Badge></TableCell>
                        <TableCell className="text-right">${t.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{t.sales || 0}</TableCell>
                        <TableCell>
                          <Badge variant={t.is_featured ? 'default' : 'secondary'} className={t.is_featured ? 'bg-dexRed' : ''}>
                            {t.is_featured ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <AddTemplateModal
                              template={t}
                              mode="edit"
                              onTemplateAdded={refetchTemplates}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-400"
                              onClick={() => handleDeleteTemplate(t.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {templates.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-400">No templates found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Orders</h2>
                <p className="text-gray-400 text-sm">Payment orders (latest first)</p>
              </div>
              <Button variant="outline" size="sm" onClick={refetchOrders}>Refresh</Button>
            </div>

            {ordersLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading orders...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-56">Created</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Session</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o.id} className="align-top">
                        <TableCell className="text-sm text-gray-300">{new Date(o.created_at).toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{o.customer_email || '-'}</TableCell>
                        <TableCell>
                          <Badge variant={o.status === 'paid' ? 'default' : 'secondary'} className={o.status === 'paid' ? 'bg-green-600' : ''}>
                            {o.status || 'unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell className="uppercase text-xs text-gray-400">{o.currency || '-'}</TableCell>
                        <TableCell className="text-right font-medium">{typeof o.amount_total === 'number' ? `$${o.amount_total.toFixed(2)}` : '-'}</TableCell>
                        <TableCell>
                          <code className="text-xs break-all">{o.stripe_session_id || o.order_id || 'N/A'}</code>
                        </TableCell>
                      </TableRow>
                    ))}
                    {orders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-400">No orders yet</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Projects</h2>
                <p className="text-gray-400 text-sm">Manage your portfolio projects</p>
              </div>
              <AddProjectModal onProjectAdded={refetchProjects} />
            </div>

            {projectsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading projects...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="glass border-white/10 hover:border-dexRed/50 transition-all">
                    <CardContent className="p-6">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                        <div className="flex space-x-1">
                          <AddProjectModal
                            project={project}
                            mode="edit"
                            onProjectAdded={refetchProjects}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-400"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant="outline" className="mb-2 border-blue-500/50 text-blue-300">
                        {project.category}
                      </Badge>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies?.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Badge variant={project.featured ? 'default' : 'secondary'} className={project.featured ? 'bg-dexRed' : ''}>
                        {project.featured ? 'Featured' : 'Regular'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Testimonials</h2>
                <p className="text-gray-400 text-sm">Manage client testimonials</p>
              </div>
              <AddTestimonialModal onTestimonialAdded={refetchTestimonials} />
            </div>

            {testimonialsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading testimonials...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="glass border-white/10 hover:border-dexRed/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg">{testimonial.author}</h3>
                          <p className="text-sm text-gray-400">{testimonial.position}</p>
                          {testimonial.company && (
                            <p className="text-xs text-gray-500">{testimonial.company}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={testimonial.featured ? 'default' : 'secondary'} className={testimonial.featured ? 'bg-dexRed' : ''}>
                            {testimonial.featured ? 'Featured' : 'Regular'}
                          </Badge>
                          <AddTestimonialModal
                            testimonial={testimonial}
                            mode="edit"
                            onTestimonialAdded={refetchTestimonials}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-400"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Service Packages</h2>
                <p className="text-gray-400 text-sm">Manage pricing and packages</p>
              </div>
              <AddPackageModal onPackageAdded={refetchPackages} />
            </div>

            {packagesLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading packages...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <Card key={pkg.id} className="glass border-white/10 hover:border-dexRed/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-1">{pkg.title}</h3>
                          <p className="text-3xl font-bold text-dexRed">{pkg.price}</p>
                        </div>
                        <div className="flex space-x-1">
                          <AddPackageModal
                            package={pkg}
                            mode="edit"
                            onPackageAdded={refetchPackages}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-400"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant="outline" className="mb-3 border-purple-500/50 text-purple-300">
                        {pkg.category}
                      </Badge>
                      <p className="text-sm text-gray-400 mb-3">{pkg.description}</p>
                      <div className="space-y-1 mb-3">
                        {pkg.features?.slice(0, 3).map((feature, idx) => (
                          <p key={idx} className="text-xs text-gray-500">• {feature}</p>
                        ))}
                        {pkg.features?.length > 3 && (
                          <p className="text-xs text-gray-500">+ {pkg.features.length - 3} more features</p>
                        )}
                      </div>
                      <Badge variant={pkg.is_popular ? 'default' : 'secondary'} className={pkg.is_popular ? 'bg-dexRed' : ''}>
                        {pkg.is_popular ? 'Popular' : 'Standard'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Package Requests Tab */}
          <TabsContent value="package-requests" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Package Purchase Requests</h2>
              <p className="text-gray-400 text-sm">View and manage customer package purchase requests. Contact customers directly from here.</p>
            </div>
            <ManagePackageRequests />
          </TabsContent>

          {/* Custom Quote Requests Tab */}
          <TabsContent value="quote-requests" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Custom Quote Requests</h2>
              <p className="text-gray-400 text-sm">View and manage customer custom project quote requests. Review, quote, and respond to customers.</p>
            </div>
            <ManageQuoteRequests />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Contact Messages</h2>
              <p className="text-gray-400 text-sm">View and manage customer inquiries</p>
            </div>

            <ContactMessages />
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Template Purchases</h2>
                <p className="text-gray-400 text-sm">View all template purchases</p>
              </div>
              <Button variant="outline" size="sm" onClick={refetchPurchases}>Refresh</Button>
            </div>

            {purchasesLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading purchases...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Template ID</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Order ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.map((purchase) => (
                      <TableRow key={purchase.id} className="hover:bg-white/5">
                        <TableCell className="text-sm text-gray-300">{new Date(purchase.created_at).toLocaleString()}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-white">{purchase.customer_name || purchase.customer_email}</div>
                            <div className="text-xs text-gray-400">{purchase.customer_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{purchase.template_id}</TableCell>
                        <TableCell className="font-medium">${purchase.price_paid.toFixed(2)} {purchase.currency}</TableCell>
                        <TableCell>
                          <Badge
                            variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                            className={purchase.status === 'completed' ? 'bg-green-600' : ''}
                          >
                            {purchase.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{purchase.order_id || '-'}</TableCell>
                      </TableRow>
                    ))}
                    {purchases.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-400">No purchases yet</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Customizations Tab */}
          <TabsContent value="customizations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Customization Requests</h2>
                <p className="text-gray-400 text-sm">Manage customer customization requests</p>
              </div>
              <Button variant="outline" size="sm" onClick={refetchCustomizations}>Refresh</Button>
            </div>

            {customizationsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading customizations...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customizations.map((customization) => (
                  <Card key={customization.id} className="glass border-white/10 hover:border-dexRed/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-1">{customization.request_title}</h3>
                          <p className="text-sm text-gray-400">Template ID: {customization.template_id}</p>
                          <p className="text-sm text-gray-400">Customer: {customization.customer_name || customization.customer_email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              customization.status === 'completed' ? 'default' :
                                customization.status === 'in_progress' ? 'default' :
                                  'secondary'
                            }
                            className={
                              customization.status === 'completed' ? 'bg-green-600' :
                                customization.status === 'in_progress' ? 'bg-blue-600' :
                                  ''
                            }
                          >
                            {customization.status}
                          </Badge>
                          <Badge variant="outline" className="border-white/20">
                            {customization.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{customization.request_description}</p>
                      {customization.developer_notes && (
                        <div className="mb-3 p-3 bg-white/5 rounded-lg">
                          <p className="text-sm font-medium text-gray-400 mb-1">Developer Notes:</p>
                          <p className="text-sm text-gray-300">{customization.developer_notes}</p>
                        </div>
                      )}
                      {customization.quoted_price && (
                        <p className="text-sm text-gray-400">Quoted Price: ${customization.quoted_price.toFixed(2)}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Created: {new Date(customization.created_at).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                {customizations.length === 0 && (
                  <div className="text-center py-12 text-gray-400">No customization requests yet</div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin

