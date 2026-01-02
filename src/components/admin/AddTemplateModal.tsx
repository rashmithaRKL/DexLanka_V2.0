import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, FileArchive } from 'lucide-react';
import { createTemplate, updateTemplate } from '@/lib/api';
import { TemplateItem } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import TemplateFileUpload from './TemplateFileUpload';
import TemplateZipUpload from './TemplateZipUpload';
import StorageTypeSelector from './StorageTypeSelector';

interface AddTemplateModalProps {
  onTemplateAdded: () => void;
  template?: TemplateItem | null;
  mode?: 'add' | 'edit';
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({ onTemplateAdded, template = null, mode = 'add' }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useZipUpload, setUseZipUpload] = useState(false);
  const [createdTemplateId, setCreatedTemplateId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: template?.title || '',
    category: template?.category || 'website',
    price: template?.price?.toString() || '',
    description: template?.description || '',
    full_description: template?.full_description || '',
    image: template?.thumbnail_url || '',
    screenshots: template?.screenshots || [] as string[],
    tags: template?.tags || [] as string[],
    preview_url: template?.preview_url || '',
    live_preview_url: template?.live_preview_url || '',
    is_featured: template?.is_featured || false,
    features: template?.features || [] as string[],
    technologies: template?.technologies || [] as string[],
    compatibility: template?.compatibility || [] as string[],
    order_index: template?.order_index || 0,
    rating: template?.rating?.toString() || '0.00',
    demo_type: template?.demo_type || 'static_html',
    download_enabled: template?.download_enabled !== false,
    storage_type: template?.storage_type || 'supabase',
  });
  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newCompatibility, setNewCompatibility] = useState('');
  const [newScreenshot, setNewScreenshot] = useState('');
  const { toast } = useToast();

  const categories = [
    { value: 'website', label: 'Website' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'blog', label: 'Blog' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'landing', label: 'Landing Page' },
    { value: 'applications', label: 'Applications' },
  ];

  const demoTypes = [
    { value: 'static_html', label: 'Static HTML' },
    { value: 'react', label: 'React Component' },
    { value: 'java_web', label: 'Java Web' },
    { value: 'kotlin_android', label: 'Kotlin Android' },
    { value: 'flutter_web', label: 'Flutter Web' },
    { value: 'flutter_mobile', label: 'Flutter Mobile' },
    { value: 'react_native_web', label: 'React Native Web' },
    { value: 'react_native_mobile', label: 'React Native Mobile' },
    { value: 'desktop', label: 'Desktop Application' },
    { value: 'external', label: 'External URL' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateData: any = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        full_description: formData.full_description || undefined,
        image: formData.image,
        screenshots: formData.screenshots,
        tags: formData.tags,
        preview_url: formData.preview_url || undefined,
        live_preview_url: formData.live_preview_url || undefined,
        is_featured: formData.is_featured,
        features: formData.features,
        technologies: formData.technologies,
        compatibility: formData.compatibility,
        order_index: formData.order_index,
        rating: parseFloat(formData.rating) || 0,
        demo_type: formData.demo_type,
        download_enabled: formData.download_enabled,
        storage_path: template?.id ? `template-files/${template.id}/` : undefined,
      };

      if (mode === 'edit' && template) {
        await updateTemplate(template.id, templateData);
        toast({
          title: "Success",
          description: "Template updated successfully!",
        });
        setOpen(false);
        resetForm();
        onTemplateAdded();
      } else {
        // Create template
        const newTemplate = await createTemplate(templateData);

        if (useZipUpload) {
          // Store the created template ID to show ZIP upload UI
          setCreatedTemplateId(newTemplate.id);
          toast({
            title: "Template Created",
            description: "Now upload your project files as a ZIP",
          });
          // Don't close the modal - let user upload ZIP
        } else {
          toast({
            title: "Success",
            description: "Template created successfully!",
          });
          setOpen(false);
          resetForm();
          onTemplateAdded();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode === 'edit' ? 'update' : 'create'} template. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'website',
      price: '',
      description: '',
      full_description: '',
      image: '',
      screenshots: [],
      tags: [],
      preview_url: '',
      live_preview_url: '',
      is_featured: false,
      features: [],
      technologies: [],
      compatibility: [],
      order_index: 0,
      rating: '0.00',
      demo_type: 'static_html',
      download_enabled: true,
      storage_type: 'supabase',
    });
  };

  const addItem = (field: 'tags' | 'features' | 'technologies' | 'compatibility' | 'screenshots', value: string) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      if (field === 'tags') setNewTag('');
      if (field === 'features') setNewFeature('');
      if (field === 'technologies') setNewTech('');
      if (field === 'compatibility') setNewCompatibility('');
      if (field === 'screenshots') setNewScreenshot('');
    }
  };

  const removeItem = (field: 'tags' | 'features' | 'technologies' | 'compatibility' | 'screenshots', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-dexRed hover:bg-dexRed/90">
          {mode === 'edit' ? (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Template
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Template
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === 'edit' ? 'Edit Template' : 'Add New Template'}
          </DialogTitle>
        </DialogHeader>

        {/* ZIP Upload Toggle - Only show for new templates */}
        {mode === 'add' && !createdTemplateId && (
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <FileArchive className="h-5 w-5 text-dexRed" />
              <div>
                <p className="text-white font-medium">Upload from ZIP</p>
                <p className="text-gray-400 text-sm">Upload a complete web project as a ZIP file</p>
              </div>
            </div>
            <Button
              type="button"
              variant={useZipUpload ? "default" : "outline"}
              onClick={() => setUseZipUpload(!useZipUpload)}
              className={useZipUpload ? "bg-dexRed hover:bg-dexRed/90" : ""}
            >
              {useZipUpload ? 'Switch to Manual' : 'Use ZIP Upload'}
            </Button>
          </div>
        )}

        {/* Storage Type Selector - Show when using ZIP upload */}
        {mode === 'add' && useZipUpload && !createdTemplateId && (
          <StorageTypeSelector
            value={formData.storage_type as 'supabase' | 'github'}
            onChange={(value) => setFormData(prev => ({ ...prev, storage_type: value }))}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Template Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-secondary border-border"
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-300">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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
          </div>

          {/* Only show detailed fields when NOT using ZIP upload */}
          {!useZipUpload && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price" className="text-gray-300">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating" className="text-gray-300">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="order_index" className="text-gray-300">Display Order</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image" className="text-gray-300">Main Image URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="bg-secondary border-border"
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-secondary border-border"
                  rows={2}
                  required
                />
              </div>
            </>
          )}

          {/* Show simplified fields when using ZIP upload */}
          {useZipUpload && !createdTemplateId && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-gray-300">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image" className="text-gray-300">Main Image URL *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="bg-secondary border-border"
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-secondary border-border"
                  rows={2}
                  required
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-400 text-sm">
                  <strong>Note:</strong> After creating the template, you'll be able to upload your project files as a ZIP. The ZIP should contain all your web project files with their folder structure intact.
                </p>
              </div>
            </>
          )}

          {/* Continue with rest of form for non-ZIP mode */}
          {!useZipUpload && (
            <>
              <div>
                <Label htmlFor="full_description" className="text-gray-300">Full Description</Label>
                <Textarea
                  id="full_description"
                  value={formData.full_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_description: e.target.value }))}
                  className="bg-secondary border-border"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preview_url" className="text-gray-300">Preview URL</Label>
                  <Input
                    id="preview_url"
                    value={formData.preview_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, preview_url: e.target.value }))}
                    className="bg-secondary border-border"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="live_preview_url" className="text-gray-300">Live Preview URL (for embedded preview) *</Label>
                  <Input
                    id="live_preview_url"
                    value={formData.live_preview_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, live_preview_url: e.target.value }))}
                    className="bg-secondary border-border"
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-gray-300">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-secondary border-border"
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('tags', newTag))}
                  />
                  <Button type="button" onClick={() => addItem('tags', newTag)} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('tags', tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <Label className="text-gray-300">Features</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="bg-secondary border-border"
                    placeholder="Add feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('features', newFeature))}
                  />
                  <Button type="button" onClick={() => addItem('features', newFeature)} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('features', feature)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <Label className="text-gray-300">Technologies</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="bg-secondary border-border"
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('technologies', newTech))}
                  />
                  <Button type="button" onClick={() => addItem('technologies', newTech)} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('technologies', tech)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Compatibility */}
              <div>
                <Label className="text-gray-300">Compatibility</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newCompatibility}
                    onChange={(e) => setNewCompatibility(e.target.value)}
                    className="bg-secondary border-border"
                    placeholder="Add compatibility item"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('compatibility', newCompatibility))}
                  />
                  <Button type="button" onClick={() => addItem('compatibility', newCompatibility)} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.compatibility.map((item) => (
                    <Badge key={item} variant="secondary" className="flex items-center gap-1">
                      {item}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('compatibility', item)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Screenshots */}
              <div>
                <Label className="text-gray-300">Screenshots (URLs)</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newScreenshot}
                    onChange={(e) => setNewScreenshot(e.target.value)}
                    className="bg-secondary border-border"
                    placeholder="Add screenshot URL"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('screenshots', newScreenshot))}
                  />
                  <Button type="button" onClick={() => addItem('screenshots', newScreenshot)} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.screenshots.map((screenshot, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      Screenshot {idx + 1}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem('screenshots', screenshot)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Demo Type */}
              <div>
                <Label htmlFor="demo_type" className="text-gray-300">Template Demo Type *</Label>
                <Select
                  value={formData.demo_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, demo_type: value }))}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select demo type" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Select the type of template. This determines how the demo will be displayed.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="rounded border-border"
                />
                <Label htmlFor="is_featured" className="text-gray-300">Featured Template</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="download_enabled"
                  checked={formData.download_enabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, download_enabled: e.target.checked }))}
                  className="rounded border-border"
                />
                <Label htmlFor="download_enabled" className="text-gray-300">Enable Download</Label>
              </div>
            </>
          )}

          {/* File Upload Section - Only show when editing existing template */}
          {mode === 'edit' && template && (
            <div className="border-t border-gray-700 pt-6 mt-6">
              <Label className="text-gray-300 text-lg font-semibold mb-4 block">
                Template Files
              </Label>
              <TemplateFileUpload
                template={template}
                onUploadComplete={() => {
                  toast({
                    title: "Files Updated",
                    description: "Template files have been updated successfully.",
                  });
                }}
              />
            </div>
          )}

          {/* ZIP Upload Section - Show when ZIP upload is enabled and template is created */}
          {useZipUpload && createdTemplateId && (
            <div className="border-t border-gray-700 pt-6 mt-6">
              <Label className="text-gray-300 text-lg font-semibold mb-4 block">
                Upload Project Files
              </Label>
              <TemplateZipUpload
                templateId={createdTemplateId}
                templateTitle={formData.title}
                folder="source"
                storageType={formData.storage_type as 'supabase' | 'github'}
                onUploadComplete={(fileCount, totalSize) => {
                  toast({
                    title: "Upload Complete",
                    description: `${fileCount} files uploaded successfully`,
                  });
                  setOpen(false);
                  resetForm();
                  onTemplateAdded();
                }}
              />
            </div>
          )}

          {/* Submit buttons - Hide when ZIP upload is showing */}
          {!(useZipUpload && createdTemplateId) && (
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-dexRed hover:bg-dexRed/90">
                {loading ? (mode === 'edit' ? 'Updating...' : 'Creating...') : (mode === 'edit' ? 'Update Template' : 'Create Template')}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog >
  );
};

export default AddTemplateModal;

