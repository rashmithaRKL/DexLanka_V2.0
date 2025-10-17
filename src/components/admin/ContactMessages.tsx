import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Phone, Calendar, User, Eye, Trash2, Reply } from 'lucide-react';
import { getContactSubmissions, updateContactSubmissionStatus, deleteContactSubmission } from '@/lib/api';
import { ContactSubmission } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import ReplyModal from './ReplyModal';

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await getContactSubmissions();
      setMessages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: 'new' | 'read' | 'replied') => {
    try {
      await updateContactSubmissionStatus(id, status);
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));
      toast({
        title: "Success",
        description: `Message marked as ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await deleteContactSubmission(id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const handleReply = (message: ContactSubmission) => {
    setReplyMessage(message);
    setReplyModalOpen(true);
  };

  const handleReplySent = () => {
    // Update the message status to "replied" when reply is sent
    if (replyMessage) {
      handleStatusChange(replyMessage.id, 'replied');
    }
    setReplyModalOpen(false);
    setReplyMessage(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'read': return 'bg-blue-500';
      case 'replied': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'read': return 'Read';
      case 'replied': return 'Replied';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading messages...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <Card className="glass border-white/10">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No messages yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Messages from your contact form will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Message List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {messages.map((message) => (
          <Card 
            key={message.id} 
            className={`glass border-white/10 hover:border-dexRed/50 transition-all cursor-pointer ${
              selectedMessage?.id === message.id ? 'border-dexRed/50 bg-dexRed/5' : ''
            }`}
            onClick={() => setSelectedMessage(message)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-white">{message.name}</span>
                  <Badge className={`${getStatusColor(message.status)} text-white text-xs`}>
                    {getStatusText(message.status)}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 text-blue-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(message);
                    }}
                    title="Reply to message"
                  >
                    <Reply className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(message.id, message.status === 'new' ? 'read' : 'replied');
                    }}
                    title="Mark as read"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message.id);
                    }}
                    title="Delete message"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-300">{message.email}</span>
                </div>
                
                {message.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">{message.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-300">{formatDate(message.created_at)}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <Badge variant="outline" className="mb-2 text-xs">
                  {message.subject}
                </Badge>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {message.message}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <Card className="glass border-white/10">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {selectedMessage.name}
                </CardTitle>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {selectedMessage.email}
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {selectedMessage.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedMessage.created_at)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={`${getStatusColor(selectedMessage.status)} text-white`}>
                  {getStatusText(selectedMessage.status)}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReply(selectedMessage)}
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  {selectedMessage.subject}
                </Badge>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2">Message:</h4>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(selectedMessage.id, 'read')}
                  disabled={selectedMessage.status === 'read'}
                >
                  Mark as Read
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                  disabled={selectedMessage.status === 'replied'}
                >
                  Mark as Replied
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-400"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reply Modal */}
      <ReplyModal
        message={replyMessage}
        open={replyModalOpen}
        onClose={() => {
          setReplyModalOpen(false);
          setReplyMessage(null);
        }}
        onReplySent={handleReplySent}
      />
    </div>
  );
};

export default ContactMessages;
