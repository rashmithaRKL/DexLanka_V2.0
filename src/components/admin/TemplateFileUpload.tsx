import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, Upload, File, Folder, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  uploadTemplateFiles,
  listTemplateFiles,
  deleteTemplateFile,
  deleteTemplateFolder,
  getTemplateFolderSize,
  type TemplateFile,
} from '@/lib/templateStorage';
import { updateTemplate } from '@/lib/api';
import { TemplateItem } from '@/lib/supabase';

interface TemplateFileUploadProps {
  template: TemplateItem;
  onUploadComplete?: () => void;
}

type UploadFolder = 'source' | 'demo' | 'screenshots';

const TemplateFileUpload: React.FC<TemplateFileUploadProps> = ({
  template,
  onUploadComplete,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<UploadFolder>('source');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sourceFiles, setSourceFiles] = useState<TemplateFile[]>([]);
  const [demoFiles, setDemoFiles] = useState<TemplateFile[]>([]);
  const [screenshotFiles, setScreenshotFiles] = useState<TemplateFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Load files on mount and when template changes
  React.useEffect(() => {
    if (template.id) {
      loadFiles();
    }
  }, [template.id]);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const [source, demo, screenshots] = await Promise.all([
        listTemplateFiles(template.id, 'source').catch(() => []),
        listTemplateFiles(template.id, 'demo').catch(() => []),
        listTemplateFiles(template.id, 'screenshots').catch(() => []),
      ]);
      setSourceFiles(source);
      setDemoFiles(demo);
      setScreenshotFiles(screenshots);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null, folder: UploadFolder) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const fileArray = Array.from(files);
      const results = await uploadTemplateFiles(
        template.id,
        fileArray,
        folder,
        (progress) => {
          setUploadProgress(progress.percentage);
        }
      );

      const successCount = results.filter((r) => !r.error).length;
      const errorCount = results.filter((r) => r.error).length;

      if (successCount > 0) {
        toast({
          title: 'Upload Successful',
          description: `${successCount} file(s) uploaded successfully.`,
        });
        await loadFiles();
        await updateTemplateMetadata();
        onUploadComplete?.();
      }

      if (errorCount > 0) {
        toast({
          title: 'Upload Errors',
          description: `${errorCount} file(s) failed to upload.`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload files.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const updateTemplateMetadata = async () => {
    try {
      const [sourceSize, demoSize] = await Promise.all([
        getTemplateFolderSize(template.id, 'source').catch(() => 0),
        getTemplateFolderSize(template.id, 'demo').catch(() => 0),
      ]);

      await updateTemplate(template.id, {
        storage_path: `template-files/${template.id}/`,
        file_count: sourceFiles.length + demoFiles.length + screenshotFiles.length,
        total_size: sourceSize + demoSize,
      });
    } catch (error) {
      console.error('Failed to update template metadata:', error);
    }
  };

  const handleDeleteFile = async (fileName: string, folder: UploadFolder) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;

    try {
      await deleteTemplateFile(template.id, fileName, folder);
      toast({
        title: 'File Deleted',
        description: `${fileName} has been deleted.`,
      });
      await loadFiles();
      await updateTemplateMetadata();
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: error instanceof Error ? error.message : 'Failed to delete file.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFolder = async (folder: UploadFolder) => {
    const folderName = folder === 'source' ? 'Source' : folder === 'demo' ? 'Demo' : 'Screenshots';
    if (!confirm(`Are you sure you want to delete all files in the ${folderName} folder?`)) return;

    try {
      await deleteTemplateFolder(template.id, folder);
      toast({
        title: 'Folder Cleared',
        description: `All files in ${folderName} folder have been deleted.`,
      });
      await loadFiles();
      await updateTemplateMetadata();
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: error instanceof Error ? error.message : 'Failed to delete folder.',
        variant: 'destructive',
      });
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files, activeTab);
      }
    },
    [activeTab]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getCurrentFiles = () => {
    switch (activeTab) {
      case 'source':
        return sourceFiles;
      case 'demo':
        return demoFiles;
      case 'screenshots':
        return screenshotFiles;
      default:
        return [];
    }
  };

  const currentFiles = getCurrentFiles();

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('source')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'source'
              ? 'border-b-2 border-dexRed text-dexRed'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Source Files ({sourceFiles.length})
        </button>
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'demo'
              ? 'border-b-2 border-dexRed text-dexRed'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Demo Files ({demoFiles.length})
        </button>
        <button
          onClick={() => setActiveTab('screenshots')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'screenshots'
              ? 'border-b-2 border-dexRed text-dexRed'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Screenshots ({screenshotFiles.length})
        </button>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-dexRed bg-dexRed/10'
            : 'border-gray-700 hover:border-gray-600'
        }`}
      >
        <input
          type="file"
          id={`file-upload-${activeTab}`}
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files, activeTab)}
          disabled={uploading}
        />
        <label
          htmlFor={`file-upload-${activeTab}`}
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="p-4 rounded-full bg-dexRed/20">
            {uploading ? (
              <Loader2 className="h-8 w-8 text-dexRed animate-spin" />
            ) : (
              <Upload className="h-8 w-8 text-dexRed" />
            )}
          </div>
          <div>
            <p className="text-white font-medium mb-1">
              {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-gray-400 text-sm">
              {activeTab === 'source'
                ? 'Upload source files for customer download'
                : activeTab === 'demo'
                ? 'Upload demo files for public viewing'
                : 'Upload screenshots for mobile/desktop templates'}
            </p>
          </div>
        </label>

        {uploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-400 mt-2">{uploadProgress}% uploaded</p>
          </div>
        )}
      </div>

      {/* File List */}
      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
          <p className="text-gray-400 mt-2">Loading files...</p>
        </div>
      ) : currentFiles.length > 0 ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-white font-medium">
              {activeTab === 'source'
                ? 'Source Files'
                : activeTab === 'demo'
                ? 'Demo Files'
                : 'Screenshots'}{' '}
              ({currentFiles.length})
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteFolder(activeTab)}
              className="text-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
          <div className="border border-gray-700 rounded-lg divide-y divide-gray-700">
            {currentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="h-5 w-5 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{file.name}</p>
                    <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteFile(file.name, activeTab)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border border-gray-700 rounded-lg">
          <Folder className="h-12 w-12 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-400">No files uploaded yet</p>
          <p className="text-gray-500 text-sm mt-1">
            {activeTab === 'source'
              ? 'Upload source files that customers will download'
              : activeTab === 'demo'
              ? 'Upload demo files for public preview'
              : 'Upload screenshots for mobile/desktop templates'}
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <p className="font-medium text-white mb-1">Folder Information:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>
                <strong>Source Files:</strong> These are the files customers will download as ZIP
                after purchase
              </li>
              <li>
                <strong>Demo Files:</strong> These are publicly viewable files for template
                previews
              </li>
              <li>
                <strong>Screenshots:</strong> Use for mobile/desktop app templates to show app
                screens
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateFileUpload;

