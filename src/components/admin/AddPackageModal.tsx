import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit } from 'lucide-react';
import { createPackage, updatePackage } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { Package } from '@/lib/supabase';

interface AddPackageModalProps {
  onPackageAdded: () => void;
  package?: Package | null;
  mode?: 'add' | 'edit';
}

const AddPackageModal: React.FC<AddPackageModalProps> = ({ onPackageAdded, package: pkg = null, mode = 'add' }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: pkg?.title || '',
    price: pkg?.price || '',
    description: pkg?.description || '',
    features: pkg?.features || [],
    category: (pkg?.category || 'websites') as 'websites' | 'applications' | 'mobile' | 'enterprise',
    is_popular: pkg?.is_popular || false,
    order_index: pkg?.order_index || 0
  });
  const [newFeature, setNewFeature] = useState('');
  const { toast } = useToast();

  const categories = [
    { value: 'websites', label: 'Websites' },
    { value: 'applications', label: 'Applications' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'enterprise', label: 'Enterprise Solutions' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'edit' && pkg) {
        await updatePackage(pkg.id, formData);
        toast({
          title: "Success",
          description: "Package updated successfully!",
        });
      } else {
        await createPackage(formData);
        toast({
          title: "Success",
          description: "Package created successfully!",
        });
      }
      setOpen(false);
      onPackageAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode === 'edit' ? 'update' : 'create'} package. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-dexRed hover:bg-dexRed/90" size={mode === 'edit' ? 'sm' : 'default'} variant={mode === 'edit' ? 'outline' : 'default'}>
          {mode === 'edit' ? <Edit className="h-3 w-3" /> : <><Plus className="mr-2 h-4 w-4" />Add Package</>}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{mode === 'edit' ? 'Edit Package' : 'Add New Package'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Package Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-secondary border-border"
                required
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-gray-300">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="bg-secondary border-border"
                placeholder="e.g., $25, $100, Custom"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-gray-300">Category</Label>
            <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-secondary border-border"
              rows={3}
              required
            />
          </div>

          <div>
            <Label className="text-gray-300">Features</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="bg-secondary border-border"
                placeholder="Add feature"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFeature(feature)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="order_index" className="text-gray-300">Display Order</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                className="bg-secondary border-border"
                min="0"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="is_popular"
                checked={formData.is_popular}
                onChange={(e) => setFormData(prev => ({ ...prev, is_popular: e.target.checked }))}
                className="rounded border-border"
                title="Mark as popular package"
              />
              <Label htmlFor="is_popular" className="text-gray-300">Popular Package</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-dexRed hover:bg-dexRed/90">
              {loading ? (mode === 'edit' ? 'Updating...' : 'Creating...') : (mode === 'edit' ? 'Update Package' : 'Create Package')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPackageModal;
