import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { useUserAuth } from '@/context/UserAuthContext';
import { supabase } from '@/lib/supabase';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'website',
}) => {
  const { user, isAuthenticated } = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information (pre-filled from user profile)
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company_name: '',
    
    // Project Category
    category: initialCategory,
    
    // Project Details
    project_title: '',
    project_description: '',
    project_goals: '',
    
    // Technical Requirements
    platform: '',
    design_preference: 'modern',
    
    // Project Scope
    number_of_pages: '',
    has_admin_panel: false,
    has_user_authentication: false,
    has_payment_integration: false,
    has_database: false,
    has_api: false,
    has_cms: false,
    
    // Timeline and Budget
    timeline: '1-2 months',
    budget_range: 'flexible',
    deadline: '',
    
    // Additional Information
    existing_assets: false,
    hosting_preference: 'not_decided',
    maintenance_required: false,
    additional_notes: '',
  });

  // Dynamic arrays
  const [features, setFeatures] = useState<string[]>(['']);
  const [integrations, setIntegrations] = useState<string[]>(['']);
  const [userRoles, setUserRoles] = useState<string[]>(['']);
  const [referenceWebsites, setReferenceWebsites] = useState<string[]>(['']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    array: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

  const addArrayItem = (array: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter([...array, '']);
  };

  const removeArrayItem = (
    index: number,
    array: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (array.length > 1) {
      const newArray = array.filter((_, i) => i !== index);
      setter(newArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit a custom quote request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Filter out empty strings from arrays
      const filteredFeatures = features.filter(f => f.trim() !== '');
      const filteredIntegrations = integrations.filter(i => i.trim() !== '');
      const filteredUserRoles = userRoles.filter(r => r.trim() !== '');
      const filteredReferenceWebsites = referenceWebsites.filter(r => r.trim() !== '');

      // Prepare data for submission
      const quoteData = {
        user_id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || null,
        company_name: formData.company_name || null,
        category: formData.category,
        project_title: formData.project_title,
        project_description: formData.project_description,
        project_goals: formData.project_goals || null,
        platform: formData.platform || null,
        features: filteredFeatures.length > 0 ? filteredFeatures : null,
        integrations: filteredIntegrations.length > 0 ? filteredIntegrations : null,
        design_preference: formData.design_preference,
        number_of_pages: formData.number_of_pages ? parseInt(formData.number_of_pages) : null,
        user_roles: filteredUserRoles.length > 0 ? filteredUserRoles : null,
        has_admin_panel: formData.has_admin_panel,
        has_user_authentication: formData.has_user_authentication,
        has_payment_integration: formData.has_payment_integration,
        has_database: formData.has_database,
        has_api: formData.has_api,
        has_cms: formData.has_cms,
        timeline: formData.timeline,
        budget_range: formData.budget_range,
        deadline: formData.deadline || null,
        reference_websites: filteredReferenceWebsites.length > 0 ? filteredReferenceWebsites : null,
        existing_assets: formData.existing_assets,
        hosting_preference: formData.hosting_preference,
        maintenance_required: formData.maintenance_required,
        additional_notes: formData.additional_notes || null,
        status: 'new',
        priority: 'normal',
      };

      const { data, error } = await supabase
        .from('custom_quote_requests')
        .insert([quoteData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your request and get back to you within 24-48 hours.",
      });

      onClose();
      
      // Reset form
      setFormData({
        full_name: user?.full_name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        company_name: '',
        category: 'website',
        project_title: '',
        project_description: '',
        project_goals: '',
        platform: '',
        design_preference: 'modern',
        number_of_pages: '',
        has_admin_panel: false,
        has_user_authentication: false,
        has_payment_integration: false,
        has_database: false,
        has_api: false,
        has_cms: false,
        timeline: '1-2 months',
        budget_range: 'flexible',
        deadline: '',
        existing_assets: false,
        hosting_preference: 'not_decided',
        maintenance_required: false,
        additional_notes: '',
      });
      setFeatures(['']);
      setIntegrations(['']);
      setUserRoles(['']);
      setReferenceWebsites(['']);
      
    } catch (error: any) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-darkBlue border border-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
            <h2 className="text-2xl font-bold">Request Custom Quote</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 min-h-0">
            <div className="space-y-6">
              {/* Personal Information */}
              <section>
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                    />
                  </div>
                </div>
              </section>

              {/* Project Category */}
              <section>
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Project Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { value: 'website', label: 'Website' },
                    { value: 'web_application', label: 'Web Application' },
                    { value: 'enterprise_application', label: 'Enterprise App' },
                    { value: 'mobile_app', label: 'Mobile App' },
                    { value: 'desktop_system', label: 'Desktop System' },
                  ].map((cat) => (
                    <label
                      key={cat.value}
                      className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                        formData.category === cat.value
                          ? 'border-dexRed bg-dexRed/10 text-dexRed'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={formData.category === cat.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Project Details */}
              <section>
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title *</label>
                    <input
                      type="text"
                      name="project_title"
                      value={formData.project_title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., E-commerce Platform for Fashion Brand"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Description *</label>
                    <textarea
                      name="project_description"
                      value={formData.project_description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Describe your project in detail..."
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Goals</label>
                    <textarea
                      name="project_goals"
                      value={formData.project_goals}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="What are you trying to achieve with this project?"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* Technical Requirements */}
              <section>
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Technical Requirements</h3>
                <div className="space-y-4">
                  {formData.category === 'mobile_app' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Platform</label>
                      <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed relative z-10"
                      >
                        <option value="">Select Platform</option>
                        <option value="iOS">iOS Only</option>
                        <option value="Android">Android Only</option>
                        <option value="iOS,Android">Both iOS & Android</option>
                        <option value="Cross-platform">Cross-platform (React Native/Flutter)</option>
                      </select>
                    </div>
                  )}

                  {formData.category === 'desktop_system' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Operating System</label>
                      <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed relative z-10"
                      >
                        <option value="">Select OS</option>
                        <option value="Windows">Windows Only</option>
                        <option value="macOS">macOS Only</option>
                        <option value="Linux">Linux Only</option>
                        <option value="Cross-platform">Cross-platform</option>
                      </select>
                    </div>
                  )}

                  {formData.category === 'website' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Pages</label>
                      <input
                        type="number"
                        name="number_of_pages"
                        value={formData.number_of_pages}
                        onChange={handleInputChange}
                        min="1"
                        placeholder="e.g., 5"
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Design Preference</label>
                    <select
                      name="design_preference"
                      value={formData.design_preference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed relative z-10"
                    >
                      <option value="minimal">Minimal</option>
                      <option value="modern">Modern</option>
                      <option value="corporate">Corporate</option>
                      <option value="creative">Creative</option>
                      <option value="custom">Custom Design</option>
                    </select>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Features</label>
                    {features.map((feature, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayChange(index, e.target.value, features, setFeatures)}
                          placeholder="e.g., User registration, Product search"
                          className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                        />
                        {features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem(index, features, setFeatures)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem(features, setFeatures)}
                      className="flex items-center gap-2 px-4 py-2 text-dexRed border border-dexRed rounded-lg hover:bg-dexRed/10 transition-colors"
                    >
                      <Plus size={18} />
                      Add Feature
                    </button>
                  </div>

                  {/* Integrations */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Integrations</label>
                    {integrations.map((integration, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={integration}
                          onChange={(e) => handleArrayChange(index, e.target.value, integrations, setIntegrations)}
                          placeholder="e.g., PayPal, Stripe, Google Analytics"
                          className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                        />
                        {integrations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem(index, integrations, setIntegrations)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem(integrations, setIntegrations)}
                      className="flex items-center gap-2 px-4 py-2 text-dexRed border border-dexRed rounded-lg hover:bg-dexRed/10 transition-colors"
                    >
                      <Plus size={18} />
                      Add Integration
                    </button>
                  </div>
                </div>
              </section>

              {/* Project Scope Checkboxes */}
              <section>
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Project Scope</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: 'has_admin_panel', label: 'Admin Panel' },
                    { name: 'has_user_authentication', label: 'User Authentication' },
                    { name: 'has_payment_integration', label: 'Payment Integration' },
                    { name: 'has_database', label: 'Database' },
                    { name: 'has_api', label: 'API Development' },
                    { name: 'has_cms', label: 'Content Management System' },
                  ].map((item) => (
                    <label key={item.name} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                      <input
                        type="checkbox"
                        name={item.name}
                        checked={formData[item.name as keyof typeof formData] as boolean}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-dexRed rounded focus:ring-dexRed focus:ring-offset-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                {/* User Roles */}
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">User Roles/Types</label>
                  {userRoles.map((role, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => handleArrayChange(index, e.target.value, userRoles, setUserRoles)}
                        placeholder="e.g., Admin, Customer, Vendor"
                        className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                      />
                      {userRoles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, userRoles, setUserRoles)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem(userRoles, setUserRoles)}
                    className="flex items-center gap-2 px-4 py-2 text-dexRed border border-dexRed rounded-lg hover:bg-dexRed/10 transition-colors"
                  >
                    <Plus size={18} />
                    Add User Role
                  </button>
                </div>
              </section>

              {/* Timeline and Budget */}
              <section>
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Timeline & Budget</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed relative z-10"
                    >
                      <option value="urgent">Urgent (1-2 weeks)</option>
                      <option value="1 month">1 Month</option>
                      <option value="1-2 months">1-2 Months</option>
                      <option value="2-3 months">2-3 Months</option>
                      <option value="3+ months">3+ Months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed relative z-10"
                    >
                      <option value="under_500">Under $500</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Preferred Deadline (Optional)</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                    />
                  </div>
                </div>
              </section>

              {/* Additional Information */}
              <section>
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Additional Information</h3>
                <div className="space-y-4">
                  {/* Reference Websites */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Reference Websites/Apps</label>
                    <p className="text-xs text-gray-400 mb-2">Add URLs of websites or apps you like for design inspiration</p>
                    {referenceWebsites.map((website, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="url"
                          value={website}
                          onChange={(e) => handleArrayChange(index, e.target.value, referenceWebsites, setReferenceWebsites)}
                          placeholder="https://example.com"
                          className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed"
                        />
                        {referenceWebsites.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem(index, referenceWebsites, setReferenceWebsites)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem(referenceWebsites, setReferenceWebsites)}
                      className="flex items-center gap-2 px-4 py-2 text-dexRed border border-dexRed rounded-lg hover:bg-dexRed/10 transition-colors"
                    >
                      <Plus size={18} />
                      Add Reference
                    </button>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="existing_assets"
                        checked={formData.existing_assets}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-dexRed rounded focus:ring-dexRed focus:ring-offset-0"
                      />
                      <span>I have existing assets (logo, content, images, etc.)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="maintenance_required"
                        checked={formData.maintenance_required}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-dexRed rounded focus:ring-dexRed focus:ring-offset-0"
                      />
                      <span>I need ongoing maintenance and support</span>
                    </label>
                  </div>

                  {/* Hosting Preference */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Hosting Preference</label>
                    <select
                      name="hosting_preference"
                      value={formData.hosting_preference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed relative z-10"
                    >
                      <option value="managed_by_dexlanka">Managed by DexLanka</option>
                      <option value="own_hosting">I have my own hosting</option>
                      <option value="not_decided">Not decided yet</option>
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Notes</label>
                    <textarea
                      name="additional_notes"
                      value={formData.additional_notes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Any other information you'd like to share..."
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:border-dexRed resize-none"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-dexRed text-white rounded-lg hover:bg-dexRed/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomQuoteModal;

