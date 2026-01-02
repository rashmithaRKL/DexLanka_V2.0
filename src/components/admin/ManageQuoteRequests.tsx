import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getCustomQuoteRequests,
  adminUpdateQuote,
  deleteCustomQuoteRequest,
  getQuoteRequestStats,
  CustomQuoteRequest,
} from '@/lib/api';
import {
  Eye,
  Trash2,
  DollarSign,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Filter,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ManageQuoteRequests: React.FC = () => {
  const [quotes, setQuotes] = useState<CustomQuoteRequest[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<CustomQuoteRequest[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<CustomQuoteRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, reviewing: 0, quoted: 0, accepted: 0 });
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Quote form
  const [quotePrice, setQuotePrice] = useState('');
  const [quoteTimeline, setQuoteTimeline] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [quoteStatus, setQuoteStatus] = useState<CustomQuoteRequest['status']>('reviewing');
  const [quotePriority, setQuotePriority] = useState<CustomQuoteRequest['priority']>('normal');

  useEffect(() => {
    loadQuotes();
    loadStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [quotes, statusFilter, categoryFilter, priorityFilter]);

  const loadQuotes = async () => {
    try {
      setIsLoading(true);
      const data = await getCustomQuoteRequests();
      setQuotes(data);
    } catch (error) {
      console.error('Error loading quotes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load quote requests',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await getQuoteRequestStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...quotes];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((q) => q.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((q) => q.category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter((q) => q.priority === priorityFilter);
    }

    setFilteredQuotes(filtered);
  };

  const handleViewQuote = (quote: CustomQuoteRequest) => {
    setSelectedQuote(quote);
    setQuotePrice(quote.quoted_price?.toString() || '');
    setQuoteTimeline(quote.quoted_timeline || '');
    setAdminNotes(quote.admin_notes || '');
    setQuoteStatus(quote.status || 'reviewing');
    setQuotePriority(quote.priority || 'normal');
  };

  const handleUpdateQuote = async () => {
    if (!selectedQuote) return;

    try {
      await adminUpdateQuote(selectedQuote.id!, {
        quoted_price: quotePrice ? parseFloat(quotePrice) : undefined,
        quoted_timeline: quoteTimeline || undefined,
        admin_notes: adminNotes || undefined,
        status: quoteStatus,
        priority: quotePriority,
      });

      toast({
        title: 'Success',
        description: 'Quote request updated successfully',
      });

      setSelectedQuote(null);
      loadQuotes();
      loadStats();
    } catch (error) {
      console.error('Error updating quote:', error);
      toast({
        title: 'Error',
        description: 'Failed to update quote request',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteQuote = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;

    try {
      await deleteCustomQuoteRequest(id);
      toast({
        title: 'Success',
        description: 'Quote request deleted successfully',
      });
      loadQuotes();
      loadStats();
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete quote request',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-500';
      case 'reviewing':
        return 'text-yellow-500';
      case 'quoted':
        return 'text-purple-500';
      case 'accepted':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'normal':
        return 'text-blue-500';
      case 'low':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      website: 'Website',
      web_application: 'Web App',
      enterprise_application: 'Enterprise',
      mobile_app: 'Mobile App',
      desktop_system: 'Desktop',
    };
    return labels[category] || category;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dexRed mx-auto mb-4"></div>
          <p className="text-gray-400">Loading quote requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'bg-blue-500/10 border-blue-500' },
          { label: 'New', value: stats.new, color: 'bg-green-500/10 border-green-500' },
          { label: 'Reviewing', value: stats.reviewing, color: 'bg-yellow-500/10 border-yellow-500' },
          { label: 'Quoted', value: stats.quoted, color: 'bg-purple-500/10 border-purple-500' },
          { label: 'Accepted', value: stats.accepted, color: 'bg-emerald-500/10 border-emerald-500' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} border rounded-lg p-4 text-center`}>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="quoted">Quoted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="all">All Categories</option>
              <option value="website">Website</option>
              <option value="web_application">Web Application</option>
              <option value="enterprise_application">Enterprise</option>
              <option value="mobile_app">Mobile App</option>
              <option value="desktop_system">Desktop System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quote Requests Table */}
      <div className="glass rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800/50 border-b border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Project</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Budget</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No quote requests found
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-gray-800 hover:bg-dark-800/30">
                    <td className="px-4 py-3 text-sm">
                      {new Date(quote.created_at!).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium">{quote.full_name}</div>
                      <div className="text-xs text-gray-400">{quote.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium max-w-xs truncate">{quote.project_title}</div>
                      <div className="text-xs text-gray-400">{quote.timeline}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm px-2 py-1 bg-blue-500/10 text-blue-500 rounded">
                        {getCategoryLabel(quote.category)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{quote.budget_range}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${getPriorityColor(quote.priority)}`}>
                        {quote.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewQuote(quote)}
                          className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors"
                          title="View & Edit"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuote(quote.id!)}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail/Edit Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-darkBlue border border-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold">Quote Request Details</h2>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
              {/* Customer Information */}
              <section className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-dexRed">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">Name</div>
                      <div>{selectedQuote.full_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">Email</div>
                      <div>{selectedQuote.email}</div>
                    </div>
                  </div>
                  {selectedQuote.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Phone</div>
                        <div>{selectedQuote.phone}</div>
                      </div>
                    </div>
                  )}
                  {selectedQuote.company_name && (
                    <div className="flex items-center gap-2">
                      <Building size={18} className="text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Company</div>
                        <div>{selectedQuote.company_name}</div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Project Details */}
              <section className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-dexRed">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Category</div>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded">
                      {getCategoryLabel(selectedQuote.category)}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Project Title</div>
                    <div className="font-medium">{selectedQuote.project_title}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Description</div>
                    <div className="text-gray-300">{selectedQuote.project_description}</div>
                  </div>
                  {selectedQuote.project_goals && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Goals</div>
                      <div className="text-gray-300">{selectedQuote.project_goals}</div>
                    </div>
                  )}
                </div>
              </section>

              {/* Technical Requirements */}
              {(selectedQuote.features || selectedQuote.integrations || selectedQuote.platform) && (
                <section className="glass rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 text-dexRed">Technical Requirements</h3>
                  <div className="space-y-3">
                    {selectedQuote.platform && (
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Platform</div>
                        <div>{selectedQuote.platform}</div>
                      </div>
                    )}
                    {selectedQuote.features && selectedQuote.features.length > 0 && (
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Features</div>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedQuote.features.map((feature, i) => (
                            <li key={i} className="text-gray-300">{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedQuote.integrations && selectedQuote.integrations.length > 0 && (
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Integrations</div>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedQuote.integrations.map((integration, i) => (
                            <li key={i} className="text-gray-300">{integration}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Project Scope */}
              <section className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-dexRed">Project Scope</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedQuote.has_admin_panel && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Admin Panel</div>}
                  {selectedQuote.has_user_authentication && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> User Authentication</div>}
                  {selectedQuote.has_payment_integration && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Payment Integration</div>}
                  {selectedQuote.has_database && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Database</div>}
                  {selectedQuote.has_api && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> API</div>}
                  {selectedQuote.has_cms && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> CMS</div>}
                </div>
              </section>

              {/* Timeline & Budget */}
              <section className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-dexRed">Timeline & Budget</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Timeline</div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{selectedQuote.timeline}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Budget Range</div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-gray-400" />
                      <span>{selectedQuote.budget_range}</span>
                    </div>
                  </div>
                  {selectedQuote.deadline && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Deadline</div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{new Date(selectedQuote.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Admin Response Section */}
              <section className="glass rounded-lg p-4 border-2 border-dexRed/30">
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Admin Response</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Quoted Price ($)</label>
                      <input
                        type="number"
                        value={quotePrice}
                        onChange={(e) => setQuotePrice(e.target.value)}
                        placeholder="e.g., 2500"
                        className="w-full px-4 py-2 bg-dark-800/50 border border-gray-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Timeline</label>
                      <input
                        type="text"
                        value={quoteTimeline}
                        onChange={(e) => setQuoteTimeline(e.target.value)}
                        placeholder="e.g., 6-8 weeks"
                        className="w-full px-4 py-2 bg-dark-800/50 border border-gray-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Status</label>
                      <select
                        value={quoteStatus}
                        onChange={(e) => setQuoteStatus(e.target.value as CustomQuoteRequest['status'])}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="quoted">Quoted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Priority</label>
                      <select
                        value={quotePriority}
                        onChange={(e) => setQuotePriority(e.target.value as CustomQuoteRequest['priority'])}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Admin Notes</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={4}
                      placeholder="Add internal notes about this quote..."
                      className="w-full px-4 py-2 bg-dark-800/50 border border-gray-700 rounded-lg resize-none"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-800">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateQuote}
                className="px-6 py-3 bg-dexRed text-white rounded-lg hover:bg-dexRed/90 transition-colors"
              >
                Update Quote
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageQuoteRequests;

