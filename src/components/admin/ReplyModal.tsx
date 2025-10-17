import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, X } from 'lucide-react';
import { ContactSubmission } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

interface ReplyModalProps {
  message: ContactSubmission | null;
  open: boolean;
  onClose: () => void;
  onReplySent: () => void;
}

const ReplyModal: React.FC<ReplyModalProps> = ({ message, open, onClose, onReplySent }) => {
  const [loading, setLoading] = useState(false);
  const [replyData, setReplyData] = useState({
    subject: '',
    content: '',
    template: 'custom'
  });
  const { toast } = useToast();

  // EmailJS configuration
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const replyTemplates = {
    'thank_you': {
      subject: 'Thank you for contacting DexLanka',
      content: `Dear ${message?.name},

Thank you for reaching out to DexLanka! We have received your message and appreciate your interest in our services.

We will review your inquiry and get back to you within 24 hours. If you have any urgent questions, please don't hesitate to call us at +94 70 558 8789.

Best regards,
DexLanka Team`
    },
    'project_inquiry': {
      subject: 'Project Inquiry - DexLanka',
      content: `Dear ${message?.name},

Thank you for your project inquiry! We're excited to learn more about your requirements.

Our team will carefully review your project details and prepare a comprehensive proposal for you. We'll contact you within 24 hours to discuss:

• Project scope and timeline
• Technology recommendations
• Pricing and package options
• Next steps

If you have any specific questions or urgent requirements, please feel free to contact us directly.

Best regards,
DexLanka Development Team`
    },
    'support': {
      subject: 'Support Request - DexLanka',
      content: `Dear ${message?.name},

Thank you for contacting DexLanka support! We have received your support request and will prioritize resolving your issue.

Our technical team will review your request and provide assistance within 24 hours. For urgent technical issues, you can also reach us at +94 70 558 8789.

We appreciate your patience and look forward to resolving your concern quickly.

Best regards,
DexLanka Support Team`
    },
    'custom': {
      subject: '',
      content: ''
    }
  };

  const handleTemplateChange = (template: string) => {
    if (template !== 'custom' && replyTemplates[template as keyof typeof replyTemplates]) {
      const templateData = replyTemplates[template as keyof typeof replyTemplates];
      setReplyData({
        subject: templateData.subject,
        content: templateData.content,
        template
      });
    } else {
      setReplyData({
        subject: `Re: ${message?.subject || 'Your Inquiry'}`,
        content: '',
        template: 'custom'
      });
    }
  };

  const handleSendReply = async () => {
    if (!message || !replyData.subject || !replyData.content) {
      toast({
        title: "Error",
        description: "Please fill in both subject and content",
        variant: "destructive",
      });
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast({
        title: "Email Configuration Required",
        description: "Please set up EmailJS configuration to send replies",
        variant: "destructive",
      });
      return;
    }

    // Confirm email direction before sending
    if (!confirm(`Are you sure you want to send this reply?\n\nFROM: dexlanka@gmail.com (DexLanka)\nTO: ${message.email} (${message.name})\n\nThis will send the email TO the customer who contacted you.`)) {
      return;
    }

    setLoading(true);

    try {
      // Prepare email template parameters
      const templateParams = {
        // Sender information (DexLanka)
        from_name: 'DexLanka Team',
        from_email: 'dexlanka@gmail.com',
        
        // Recipient information (The person who contacted you)
        to_email: message.email,        // This is the customer's email
        to_name: message.name,          // This is the customer's name
        
        // Reply content
        reply_subject: replyData.subject,
        reply_content: replyData.content,
        
        // Original message context
        original_subject: message.subject,
        original_message: message.message,
        
        // Email settings
        reply_to: 'dexlanka@gmail.com',  // Where customer can reply to
        message_id: message.id.toString()
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        console.log('Reply sent successfully:', {
          to: message.email,
          from: 'dexlanka@gmail.com',
          subject: replyData.subject,
          template: TEMPLATE_ID
        });
        
        toast({
          title: "Reply Sent Successfully!",
          description: `Your reply has been sent to ${message.name} (${message.email})`,
        });
        onReplySent();
        onClose();
        setReplyData({
          subject: '',
          content: '',
          template: 'custom'
        });
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Reply to {message.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Original Message Info */}
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Original Message:</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-400">From:</span> {message.email}</p>
              <p><span className="text-gray-400">Subject:</span> {message.subject}</p>
              <p><span className="text-gray-400">Date:</span> {new Date(message.created_at).toLocaleString()}</p>
            </div>
            <div className="mt-2 p-2 bg-background rounded border-l-4 border-dexRed">
              <p className="text-gray-300 text-sm">{message.message}</p>
            </div>
          </div>

          {/* Reply Template Selection */}
          <div>
            <Label className="text-gray-300">Reply Template</Label>
            <Select value={replyData.template} onValueChange={handleTemplateChange}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thank_you">Thank You (General)</SelectItem>
                <SelectItem value="project_inquiry">Project Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="custom">Custom Reply</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reply Subject */}
          <div>
            <Label htmlFor="reply-subject" className="text-gray-300">Subject</Label>
            <Input
              id="reply-subject"
              value={replyData.subject}
              onChange={(e) => setReplyData(prev => ({ ...prev, subject: e.target.value }))}
              className="bg-secondary border-border"
              placeholder="Reply subject"
              required
            />
          </div>

          {/* Reply Content */}
          <div>
            <Label htmlFor="reply-content" className="text-gray-300">Reply Message</Label>
            <Textarea
              id="reply-content"
              value={replyData.content}
              onChange={(e) => setReplyData(prev => ({ ...prev, content: e.target.value }))}
              className="bg-secondary border-border"
              rows={8}
              placeholder="Type your reply message here..."
              required
            />
          </div>

          {/* Preview */}
          {replyData.content && (
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Preview:</h4>
              <div className="text-sm text-gray-300 whitespace-pre-wrap">
                {replyData.content}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendReply}
              disabled={loading || !replyData.subject || !replyData.content}
              className="bg-dexRed hover:bg-dexRed/90"
            >
              {loading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyModal;
