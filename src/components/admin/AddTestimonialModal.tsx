import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit } from 'lucide-react';
import { createTestimonial, updateTestimonial } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial } from '@/lib/supabase';

interface AddTestimonialModalProps {
  onTestimonialAdded: () => void;
  testimonial?: Testimonial | null;
  mode?: 'add' | 'edit';
}

const AddTestimonialModal: React.FC<AddTestimonialModalProps> = ({ onTestimonialAdded, testimonial = null, mode = 'add' }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: testimonial?.content || '',
    author: testimonial?.author || '',
    position: testimonial?.position || '',
    company: testimonial?.company || '',
    avatar_url: testimonial?.avatar_url || '',
    featured: testimonial?.featured || false
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'edit' && testimonial) {
        await updateTestimonial(testimonial.id, formData);
        toast({
          title: "Success",
          description: "Testimonial updated successfully!",
        });
      } else {
        await createTestimonial(formData);
        toast({
          title: "Success",
          description: "Testimonial created successfully!",
        });
      }
      setOpen(false);
      onTestimonialAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode === 'edit' ? 'update' : 'create'} testimonial. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-dexRed hover:bg-dexRed/90" size={mode === 'edit' ? 'sm' : 'default'} variant={mode === 'edit' ? 'outline' : 'default'}>
          {mode === 'edit' ? <Edit className="h-3 w-3" /> : <><Plus className="mr-2 h-4 w-4" />Add Testimonial</>}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">{mode === 'edit' ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="content" className="text-gray-300">Testimonial Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="bg-secondary border-border"
              rows={4}
              placeholder="Enter the testimonial text..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author" className="text-gray-300">Author Name</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="bg-secondary border-border"
                required
              />
            </div>

            <div>
              <Label htmlFor="position" className="text-gray-300">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="bg-secondary border-border"
                placeholder="e.g., CEO, CTO, Manager"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company" className="text-gray-300">Company (Optional)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="bg-secondary border-border"
              placeholder="Company name"
            />
          </div>

          <div>
            <Label htmlFor="avatar_url" className="text-gray-300">Avatar URL (Optional)</Label>
            <Input
              id="avatar_url"
              value={formData.avatar_url}
              onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
              className="bg-secondary border-border"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded border-border"
              title="Mark as featured testimonial"
            />
            <Label htmlFor="featured" className="text-gray-300">Featured Testimonial</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-dexRed hover:bg-dexRed/90">
              {loading ? (mode === 'edit' ? 'Updating...' : 'Creating...') : (mode === 'edit' ? 'Update Testimonial' : 'Create Testimonial')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTestimonialModal;
