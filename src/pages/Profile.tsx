import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  User, Mail, Phone, Calendar, LogOut, Save, Edit2, X, Upload,
  ShoppingBag, FileText, Package, Code, CreditCard, Download,
  CheckCircle, Clock, XCircle, Eye, DollarSign, MessageSquare
} from 'lucide-react';
import { useUserAuth } from '@/context/UserAuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProtectedRoute from '@/components/UserProtectedRoute';
import { 
  getUserTemplatePurchases, 
  getUserOrders, 
  getUserQuoteRequests,
  getUserPackageRequests,
  getTemplates,
  type CustomQuoteRequest,
  type PackageRequest
} from '@/lib/api';
import { TemplatePurchase, OrderRecord, TemplateItem } from '@/lib/supabase';
import TemplateDownload from '@/components/TemplateDownload/TemplateDownload';

const Profile = () => {
  const { user, logout, updateProfile, isAuthenticated, isNewUser, sessionExpiresAt } = useUserAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Data states
  const [templatePurchases, setTemplatePurchases] = useState<TemplatePurchase[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [customQuotes, setCustomQuotes] = useState<CustomQuoteRequest[]>([]);
  const [packageRequests, setPackageRequests] = useState<PackageRequest[]>([]);
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [profileRef, profileInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadUserData = async () => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      // Load all user data in parallel
      const [purchases, userOrders, quotes, requests, allTemplates] = await Promise.all([
        getUserTemplatePurchases(user.email).catch(() => []),
        getUserOrders(user.email).catch(() => []),
        getUserQuoteRequests(user.id).catch(() => []),
        getUserPackageRequests(user.id).catch(() => []),
        getTemplates().catch(() => [])
      ]);
      
      setTemplatePurchases(purchases);
      setOrders(userOrders);
      setCustomQuotes(quotes);
      setPackageRequests(requests);
      setTemplates(allTemplates);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your data. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await updateProfile({
        full_name: formData.fullName,
        phone: formData.phone,
      });
      
      setIsEditing(false);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      if (user) {
        setFormData({
          fullName: user.full_name || '',
          email: user.email || '',
          phone: user.phone || '',
        });
      }
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout failed',
        description: 'Please try again. If the issue persists, clear site data and sign in again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <UserProtectedRoute>
        <div className="bg-background text-foreground min-h-screen">
          <Navbar />
          <section className="pt-36 pb-20 min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400">Please sign in to view your profile.</p>
            </div>
          </section>
          <Footer />
        </div>
      </UserProtectedRoute>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getTemplateName = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    return template?.title || `Template #${templateId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'paid':
      case 'accepted':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'pending':
      case 'reviewing':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'cancelled':
      case 'rejected':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'quoted':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  // Extract package purchases from orders
  interface OrderItem {
    description?: string;
    price?: {
      metadata?: {
        type?: string;
      };
    };
  }
  
  const packagePurchases = orders.filter(order => {
    const items = (order.items || []) as OrderItem[];
    return items?.some((item) => 
      item.description?.toLowerCase().includes('package') ||
      item.price?.metadata?.type === 'package'
    );
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="My Profile"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Manage Your Account"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="View and manage your purchases, projects, and account settings."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section ref={profileRef} className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8 glass p-1">
                <TabsTrigger value="profile" className="text-sm">
                  <User size={16} className="mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="purchases" className="text-sm">
                  <ShoppingBag size={16} className="mr-2" />
                  Purchases
                </TabsTrigger>
                <TabsTrigger value="quotes" className="text-sm">
                  <FileText size={16} className="mr-2" />
                  Quotes
                </TabsTrigger>
                <TabsTrigger value="packages" className="text-sm">
                  <Package size={16} className="mr-2" />
                  Packages
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-sm">
                  <Code size={16} className="mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="payments" className="text-sm">
                  <CreditCard size={16} className="mr-2" />
                  Payments
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={profileInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  className="glass rounded-2xl p-8"
                >
                  {/* Profile Header */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-800">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-dexRed to-pink-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-dexRed rounded-full hover:bg-dexRed/90 transition-colors">
                          <Upload size={16} className="text-white" />
                        </button>
                      )}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      {isEditing ? (
                        <div className="space-y-4 w-full">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                            <Input
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              className=""
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-3xl font-bold mb-2">{user.full_name}</h2>
                          <p className="text-gray-400 mb-4">{user.email}</p>
                          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar size={16} />
                              <span>Member since {formatDate(user.created_at)}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-white/10"
                          >
                            <X size={16} className="mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-dexRed hover:bg-dexRed/90"
                          >
                            <Save size={16} className="mr-2" />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-white/10"
                        >
                          <Edit2 size={16} className="mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Account Information</h3>
                      {isNewUser && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                          🎉 New Customer
                        </span>
                      )}
                      {!isNewUser && (
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                          👋 Welcome Back
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-400 flex items-center gap-2">
                          <Mail size={16} />
                          Email Address
                        </label>
                        {isEditing ? (
                          <Input
                            value={formData.email}
                            disabled
                            className="cursor-not-allowed"
                          />
                        ) : (
                          <p className="text-white">{user.email}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-400 flex items-center gap-2">
                          <User size={16} />
                          Full Name
                        </label>
                        {isEditing ? (
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className=""
                          />
                        ) : (
                          <p className="text-white">{user.full_name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-400 flex items-center gap-2">
                          <Phone size={16} />
                          Phone Number
                        </label>
                        {isEditing ? (
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Not provided"
                            className=""
                          />
                        ) : (
                          <p className="text-white">{user.phone || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-400 flex items-center gap-2">
                          <Calendar size={16} />
                          Account Created
                        </label>
                        <p className="text-white">{formatDate(user.created_at)}</p>
                      </div>
                    </div>

                    {/* Session Information */}
                    {sessionExpiresAt && (
                      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-400 mb-2">🔐 Session Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-green-400 font-medium">✅ Active</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Session Expires:</span>
                            <span className="text-white font-medium">{formatDate(sessionExpiresAt.toISOString())}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-8 border-t border-gray-800">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
              disabled={isLoggingOut}
                    >
              <LogOut size={16} className="mr-2" />
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Purchases Tab */}
              <TabsContent value="purchases">
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingBag size={24} />
                    My Purchases
                  </h3>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dexRed mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading purchases...</p>
                    </div>
                  ) : templatePurchases.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag size={48} className="mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400 text-lg mb-2">No purchases yet</p>
                      <p className="text-gray-500 text-sm">Browse our templates to get started!</p>
                      <Button onClick={() => navigate('/templates')} className="mt-4 bg-dexRed hover:bg-dexRed/90">
                        Browse Templates
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {templatePurchases.map((purchase) => {
                        const isFree = purchase.price_paid === 0 || !purchase.price_paid;
                        const template = templates.find(t => t.id === purchase.template_id);
                        
                        return (
                          <div key={purchase.id} className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-lg font-semibold">
                                    {template?.title || getTemplateName(purchase.template_id)}
                                  </h4>
                                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(purchase.status)}`}>
                                    {purchase.status}
                                  </span>
                                  {isFree ? (
                                    <span className="px-2 py-1 text-xs font-medium rounded bg-green-500/20 text-green-400 border border-green-500/30">
                                      FREE
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 text-xs font-medium rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                      PAID
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                  Purchased on {formatDate(purchase.created_at)}
                                </p>
                                {!isFree && (
                                  <p className="text-gray-300">
                                    <DollarSign size={16} className="inline mr-1" />
                                    {formatCurrency(purchase.price_paid || 0, purchase.currency || 'USD')}
                                  </p>
                                )}
                                {(() => {
                                  const template = templates.find(t => t.id === purchase.template_id);
                                  return template?.description && (
                                    <p className="text-gray-400 text-sm mt-2">
                                      {template.description}
                                    </p>
                                  );
                                })()}
                              </div>
                              <div className="flex flex-col gap-2 min-w-[200px]">
                                {template && template.storage_path && purchase.status === 'completed' && (
                                  <TemplateDownload 
                                    template={template} 
                                    customerEmail={user?.email}
                                  />
                                )}
                                {purchase.download_url && !template?.storage_path && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(purchase.download_url, '_blank')}
                                    className="border-gray-700"
                                  >
                                    <Download size={16} className="mr-2" />
                                    Download
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/template/${purchase.template_id}`)}
                                  className="border-gray-700"
                                >
                                  <Eye size={16} className="mr-2" />
                                  View Details
                                </Button>
                                {purchase.download_count !== undefined && purchase.download_count > 0 && (
                                  <p className="text-xs text-gray-400 text-center">
                                    Downloaded {purchase.download_count} time{purchase.download_count !== 1 ? 's' : ''}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Custom Quotes Tab */}
              <TabsContent value="quotes">
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText size={24} />
                    Custom Quote Requests
                  </h3>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dexRed mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading quotes...</p>
                    </div>
                  ) : customQuotes.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400 text-lg mb-2">No custom quotes requested</p>
                      <p className="text-gray-500 text-sm">Request a custom quote for your project!</p>
                      <Button onClick={() => navigate('/packages')} className="mt-4 bg-dexRed hover:bg-dexRed/90">
                        Request Quote
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {customQuotes.map((quote) => (
                        <div key={quote.id} className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-semibold">{quote.project_title}</h4>
                                <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(quote.status || 'new')}`}>
                                  {quote.status || 'new'}
                                </span>
                                {quote.quoted_price && (
                                  <span className="px-2 py-1 text-xs font-medium rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                    {formatCurrency(quote.quoted_price)}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm mb-2">
                                Category: <span className="text-white capitalize">{quote.category.replace('_', ' ')}</span>
                              </p>
                              <p className="text-gray-400 text-sm mb-2">
                                Requested on {formatDate(quote.created_at || '')}
                              </p>
                              {quote.quoted_timeline && (
                                <p className="text-gray-300 text-sm">
                                  <Clock size={16} className="inline mr-1" />
                                  Timeline: {quote.quoted_timeline}
                                </p>
                              )}
                              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                                {quote.project_description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Could navigate to quote detail page
                                  toast({
                                    title: 'Quote Details',
                                    description: `Status: ${quote.status}. ${quote.quoted_price ? `Price: ${formatCurrency(quote.quoted_price)}` : 'Awaiting quote.'}`,
                                  });
                                }}
                                className="border-gray-700"
                              >
                                <Eye size={16} className="mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Packages Tab */}
              <TabsContent value="packages">
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Package size={24} />
                    Package Purchases & Requests
                  </h3>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dexRed mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading packages...</p>
                    </div>
                  ) : packagePurchases.length === 0 && packageRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <Package size={48} className="mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400 text-lg mb-2">No package purchases or requests yet</p>
                      <p className="text-gray-500 text-sm">Browse our packages to get started!</p>
                      <Button onClick={() => navigate('/packages')} className="mt-4 bg-dexRed hover:bg-dexRed/90">
                        Browse Packages
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Package Requests Section */}
                      {packageRequests.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-gray-300">My Package Requests</h4>
                          <div className="space-y-4">
                            {packageRequests.map((request) => (
                              <div key={request.id} className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <h4 className="text-lg font-semibold">{request.package_title}</h4>
                                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(request.status || 'new')}`}>
                                        {request.status || 'new'}
                                      </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">
                                      Requested on {formatDate(request.created_at || '')}
                                    </p>
                                    <p className="text-gray-300 mb-2">
                                      <DollarSign size={16} className="inline mr-1" />
                                      Price: {request.package_price}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                      Category: <span className="text-white capitalize">{request.package_category.replace('_', ' ')}</span>
                                    </p>
                                    {request.admin_notes && (
                                      <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <p className="text-sm text-blue-400">
                                          <MessageSquare size={16} className="inline mr-1" />
                                          Admin Note: {request.admin_notes}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Package Purchases Section */}
                      {packagePurchases.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-gray-300">Completed Purchases</h4>
                          <div className="space-y-4">
                            {packagePurchases.map((order) => {
                              const items = (order.items || []) as Array<{ description?: string; price?: { metadata?: { type?: string } } }>;
                              return (
                                <div key={order.id} className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-semibold">Package Order #{order.id}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(order.status || 'pending')}`}>
                                          {order.status || 'pending'}
                                        </span>
                                      </div>
                                      <p className="text-gray-400 text-sm mb-2">
                                        Ordered on {formatDate(order.created_at)}
                                      </p>
                                      {order.amount_total && (
                                        <p className="text-gray-300 mb-2">
                                          <DollarSign size={16} className="inline mr-1" />
                                          Total: {formatCurrency(order.amount_total, order.currency || 'USD')}
                                        </p>
                                      )}
                                      {items && items.length > 0 && (
                                        <div className="mt-2">
                                          <p className="text-gray-400 text-sm mb-1">Items:</p>
                                          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                            {items.map((item, idx: number) => (
                                              <li key={idx}>{item.description || `Item ${idx + 1}`}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          toast({
                                            title: 'Order Details',
                                            description: `Order #${order.id} - Status: ${order.status}`,
                                          });
                                        }}
                                        className="border-gray-700"
                                      >
                                        <Eye size={16} className="mr-2" />
                                        View Details
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects">
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Code size={24} />
                    Development Projects
                  </h3>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dexRed mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading projects...</p>
                    </div>
                  ) : customQuotes.filter(q => q.status === 'accepted' || q.status === 'quoted').length === 0 ? (
                    <div className="text-center py-12">
                      <Code size={48} className="mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400 text-lg mb-2">No active projects</p>
                      <p className="text-gray-500 text-sm">Accepted quotes will appear here with real-time development progress.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {customQuotes
                        .filter(q => q.status === 'accepted' || q.status === 'quoted')
                        .map((quote) => {
                          // Simulate project progress (in real app, this would come from a projects table)
                          const progress = quote.status === 'accepted' ? 65 : 0;
                          interface Milestone {
                            name: string;
                            completed: boolean;
                          }
                          const milestones: Milestone[] = [
                            { name: 'Planning', completed: progress > 0 },
                            { name: 'Design', completed: progress > 25 },
                            { name: 'Development', completed: progress > 50 },
                            { name: 'Testing', completed: progress > 75 },
                            { name: 'Delivery', completed: progress >= 100 },
                          ];
                          
                          return (
                            <div key={quote.id} className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                              <div className="mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-lg font-semibold">{quote.project_title}</h4>
                                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(quote.status || 'new')}`}>
                                    {quote.status}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                  Started on {formatDate(quote.created_at || '')}
                                </p>
                              </div>
                              
                              {/* Progress Bar */}
                              <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-gray-400">Overall Progress</span>
                                  <span className="text-sm font-semibold text-white">{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                  <div 
                                    className="bg-dexRed h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {/* Milestones */}
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-400 mb-2">Milestones:</p>
                                {milestones.map((milestone, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    {milestone.completed ? (
                                      <CheckCircle size={16} className="text-green-400" />
                                    ) : (
                                      <Clock size={16} className="text-gray-600" />
                                    )}
                                    <span className={`text-sm ${milestone.completed ? 'text-white' : 'text-gray-500'}`}>
                                      {milestone.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              {quote.quoted_timeline && (
                                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                  <p className="text-sm text-blue-400">
                                    <Clock size={16} className="inline mr-1" />
                                    Estimated completion: {quote.quoted_timeline}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payments">
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard size={24} />
                    Payment Methods
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-800 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Saved Payment Methods</h4>
                        <Button 
                          onClick={() => {
                            toast({
                              title: 'Coming Soon',
                              description: 'Payment method management will be available soon.',
                            });
                          }}
                          className="bg-dexRed hover:bg-dexRed/90"
                        >
                          Add Payment Method
                        </Button>
                      </div>
                      <div className="text-center py-8">
                        <CreditCard size={48} className="mx-auto mb-4 text-gray-600" />
                        <p className="text-gray-400 text-lg mb-2">No payment methods saved</p>
                        <p className="text-gray-500 text-sm">Add a payment method for faster checkout</p>
                      </div>
                    </div>
                    
                    <div className="border border-gray-800 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">Payment History</h4>
                      {orders.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No payment history</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {orders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                              <div>
                                <p className="text-white font-medium">Order #{order.id}</p>
                                <p className="text-gray-400 text-sm">{formatDate(order.created_at)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-white font-semibold">
                                  {order.amount_total ? formatCurrency(order.amount_total, order.currency || 'USD') : 'N/A'}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status || 'pending')}`}>
                                  {order.status || 'pending'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
