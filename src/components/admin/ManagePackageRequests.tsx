import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getPackageRequests,
  updatePackageRequest,
  deletePackageRequest,
  getPackageRequestStats,
  type PackageRequest,
} from '@/lib/api';
import {
  Eye,
  Trash2,
  Mail,
  Phone,
  User,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Filter,
  Edit,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const ManagePackageRequests: React.FC = () => {
  const { user: adminUser } = useAuth();
  const [requests, setRequests] = useState<PackageRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PackageRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PackageRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, in_progress: 0, completed: 0 });
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Update form
  const [requestStatus, setRequestStatus] = useState<PackageRequest['status']>('new');
  const [requestPriority, setRequestPriority] = useState<PackageRequest['priority']>('normal');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    loadRequests();
    loadStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [requests, statusFilter, categoryFilter, priorityFilter]);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const data = await getPackageRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error loading package requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load package requests',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await getPackageRequestStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...requests];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((r) => r.package_category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter((r) => r.priority === priorityFilter);
    }

    setFilteredRequests(filtered);
  };

  const handleViewRequest = (request: PackageRequest) => {
    setSelectedRequest(request);
    setRequestStatus(request.status || 'new');
    setRequestPriority(request.priority || 'normal');
    setAdminNotes(request.admin_notes || '');
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest || !adminUser) return;

    try {
      await updatePackageRequest(selectedRequest.id!, {
        status: requestStatus,
        priority: requestPriority,
        admin_notes: adminNotes,
        contacted_at: requestStatus === 'contacted' && !selectedRequest.contacted_at 
          ? new Date().toISOString() 
          : selectedRequest.contacted_at || undefined,
        contacted_by: requestStatus === 'contacted' ? adminUser.id : selectedRequest.contacted_by || undefined,
      });

      toast({
        title: 'Success',
        description: 'Package request updated successfully',
      });

      setSelectedRequest(null);
      loadRequests();
      loadStats();
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: 'Error',
        description: 'Failed to update package request',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteRequest = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package request?')) return;

    try {
      await deletePackageRequest(id);
      toast({
        title: 'Success',
        description: 'Package request deleted successfully',
      });
      loadRequests();
      loadStats();
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete package request',
        variant: 'destructive',
      });
    }
  };

  const handleContactCustomer = (request: PackageRequest) => {
    const emailSubject = encodeURIComponent(`Regarding Your ${request.package_title} Package Request`);
    const emailBody = encodeURIComponent(`Hello ${request.customer_name},\n\nThank you for your interest in our ${request.package_title} package.\n\nWe'll be in touch shortly to discuss your project details.\n\nBest regards,\nDexLanka Team`);
    
    window.location.href = `mailto:${request.customer_email}?subject=${emailSubject}&body=${emailBody}`;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'contacted':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'in_progress':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/30';
      case 'completed':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dexRed mx-auto mb-4"></div>
          <p className="text-gray-400">Loading package requests...</p>
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
          { label: 'Contacted', value: stats.contacted, color: 'bg-yellow-500/10 border-yellow-500' },
          { label: 'In Progress', value: stats.in_progress, color: 'bg-purple-500/10 border-purple-500' },
          { label: 'Completed', value: stats.completed, color: 'bg-emerald-500/10 border-emerald-500' },
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
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
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

      {/* Package Requests Table */}
      <div className="glass rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800/50 border-b border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Package</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No package requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-800 hover:bg-dark-800/30">
                    <td className="px-4 py-3 text-sm">
                      {new Date(request.created_at!).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium">{request.customer_name}</div>
                      <div className="text-xs text-gray-400">{request.customer_email}</div>
                      {request.customer_phone && (
                        <div className="text-xs text-gray-400">{request.customer_phone}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium max-w-xs truncate">{request.package_title}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm px-2 py-1 bg-blue-500/10 text-blue-500 rounded capitalize">
                        {request.package_category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{request.package_price}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm px-2 py-1 rounded border ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewRequest(request)}
                          className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors"
                          title="View & Edit"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleContactCustomer(request)}
                          className="p-2 hover:bg-green-500/10 text-green-500 rounded-lg transition-colors"
                          title="Contact Customer"
                        >
                          <Mail size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(request.id!)}
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
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-darkBlue border border-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
              <h2 className="text-2xl font-bold">Package Request Details</h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 min-h-0 space-y-6">
              {/* Customer Information */}
              <section className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-dexRed">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">Name</div>
                      <div className="font-medium">{selectedRequest.customer_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">Email</div>
                      <div className="font-medium">{selectedRequest.customer_email}</div>
                    </div>
                  </div>
                  {selectedRequest.customer_phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Phone</div>
                        <div className="font-medium">{selectedRequest.customer_phone}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-400">Requested</div>
                      <div className="font-medium">
                        {new Date(selectedRequest.created_at!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleContactCustomer(selectedRequest)}
                    className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Contact Customer
                  </button>
                  {selectedRequest.customer_phone && (
                    <a
                      href={`tel:${selectedRequest.customer_phone}`}
                      className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2"
                    >
                      <Phone size={16} />
                      Call Customer
                    </a>
                  )}
                </div>
              </section>

              {/* Package Information */}
              <section className="glass rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-dexRed">Package Information</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Package Title</div>
                    <div className="font-medium text-lg">{selectedRequest.package_title}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Category</div>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded capitalize">
                        {selectedRequest.package_category.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Price</div>
                      <div className="font-medium flex items-center gap-1">
                        <DollarSign size={16} />
                        {selectedRequest.package_price}
                      </div>
                    </div>
                  </div>
                  {selectedRequest.package_description && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Description</div>
                      <div className="text-gray-300">{selectedRequest.package_description}</div>
                    </div>
                  )}
                  {selectedRequest.additional_notes && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Additional Notes</div>
                      <div className="text-gray-300">{selectedRequest.additional_notes}</div>
                    </div>
                  )}
                </div>
              </section>

              {/* Admin Response Section */}
              <section className="glass rounded-lg p-4 border-2 border-dexRed/30">
                <h3 className="text-lg font-semibold mb-4 text-dexRed">Update Request</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Status</label>
                      <select
                        value={requestStatus}
                        onChange={(e) => setRequestStatus(e.target.value as PackageRequest['status'])}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Priority</label>
                      <select
                        value={requestPriority}
                        onChange={(e) => setRequestPriority(e.target.value as PackageRequest['priority'])}
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
                      placeholder="Add internal notes about this request..."
                      className="w-full px-4 py-2 bg-dark-800/50 border border-gray-700 rounded-lg resize-none"
                    />
                  </div>
                  {selectedRequest.contacted_at && (
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="text-sm text-blue-400">
                        <Clock size={16} className="inline mr-1" />
                        Contacted on: {new Date(selectedRequest.contacted_at).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-800 flex-shrink-0">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRequest}
                className="px-6 py-3 bg-dexRed text-white rounded-lg hover:bg-dexRed/90 transition-colors"
              >
                Update Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManagePackageRequests;

