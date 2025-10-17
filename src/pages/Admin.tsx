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
  Home
} from 'lucide-react'
import { useProjects, useTestimonials, usePackages } from '@/hooks/useApi'
import AddProjectModal from '@/components/admin/AddProjectModal'
import AddTestimonialModal from '@/components/admin/AddTestimonialModal'
import AddPackageModal from '@/components/admin/AddPackageModal'
import ContactMessages from '@/components/admin/ContactMessages'

const Admin = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('analytics')
  const [analytics, setAnalytics] = useState<ReturnType<typeof getAnalytics> | null>(null)
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('daily')
  
  const { projects, loading: projectsLoading, refetch: refetchProjects } = useProjects()
  const { testimonials, loading: testimonialsLoading, refetch: refetchTestimonials } = useTestimonials()
  const { packages, loading: packagesLoading, refetch: refetchPackages } = usePackages()

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
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 glass border-white/10">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
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
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-400">
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
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-400">
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
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-400">
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

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Contact Messages</h2>
              <p className="text-gray-400 text-sm">View and manage customer inquiries</p>
            </div>

            <ContactMessages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin

