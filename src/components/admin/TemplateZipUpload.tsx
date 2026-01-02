import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Upload,
    FileArchive,
    CheckCircle,
    AlertCircle,
    Loader2,
    X,
    FolderTree,
    File,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
    extractZipFile,
    validateZipContents,
    uploadExtractedFiles,
    formatFileSize,
    generatePublicUrl,
    type ExtractedFile,
    type ValidationResult,
} from '@/lib/zipUtils';
import { updateTemplate } from '@/lib/api';
import { uploadTemplateFiles } from '@/lib/storageAdapter';
import { generateRepoName, getGitHubRawUrl } from '@/lib/githubStorage';

interface TemplateZipUploadProps {
    templateId: number;
    templateTitle: string;
    onUploadComplete?: (fileCount: number, totalSize: number) => void;
    folder?: 'source' | 'demo';
    storageType?: 'supabase' | 'github';
}

const TemplateZipUpload: React.FC<TemplateZipUploadProps> = ({
    templateId,
    templateTitle,
    onUploadComplete,
    folder = 'source',
    storageType = 'supabase',
}) => {
    const { toast } = useToast();
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
    const [validation, setValidation] = useState<ValidationResult | null>(null);
    const [extracting, setExtracting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const [showFileList, setShowFileList] = useState(false);

    const handleFileSelect = (file: File | null) => {
        if (!file) return;

        // Check if it's a ZIP file
        if (!file.name.toLowerCase().endsWith('.zip')) {
            toast({
                title: 'Invalid File',
                description: 'Please select a ZIP file.',
                variant: 'destructive',
            });
            return;
        }

        setZipFile(file);
        setExtractedFiles([]);
        setValidation(null);
        setShowFileList(false);
    };

    const handleExtract = async () => {
        if (!zipFile) return;

        setExtracting(true);
        try {
            const files = await extractZipFile(zipFile);
            setExtractedFiles(files);

            const validationResult = validateZipContents(files);
            setValidation(validationResult);

            if (validationResult.valid) {
                toast({
                    title: 'ZIP Extracted Successfully',
                    description: `Found ${validationResult.fileCount} files (${formatFileSize(validationResult.totalSize)})`,
                });
                setShowFileList(true);
            } else {
                toast({
                    title: 'Validation Failed',
                    description: validationResult.errors[0],
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Extraction Failed',
                description: error instanceof Error ? error.message : 'Failed to extract ZIP file',
                variant: 'destructive',
            });
        } finally {
            setExtracting(false);
        }
    };

    const handleUpload = async () => {
        if (!validation?.valid || extractedFiles.length === 0) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            // Use unified storage adapter
            const result = await uploadTemplateFiles(
                templateId,
                templateTitle,
                extractedFiles,
                storageType,
                (progress) => {
                    setUploadProgress(progress);
                }
            );

            if (result.success) {
                // Update template with demo URL and storage info
                const updateData: any = {
                    demo_type: 'static_html',
                };

                if (storageType === 'github') {
                    // For GitHub storage
                    const repoName = generateRepoName(templateId, templateTitle);
                    updateData.storage_type = 'github';
                    updateData.github_repo_name = repoName;
                    updateData.github_repo_url = result.repositoryUrl;

                    if (result.indexFilePath) {
                        updateData.live_preview_url = getGitHubRawUrl(repoName, result.indexFilePath);
                    }
                } else {
                    // For Supabase storage
                    updateData.storage_type = 'supabase';
                    if (result.indexFilePath) {
                        const demoUrl = generatePublicUrl(templateId, result.indexFilePath, folder);
                        updateData.live_preview_url = demoUrl;
                    }
                }

                try {
                    await updateTemplate(templateId, updateData);

                    toast({
                        title: 'Upload Complete',
                        description: `Successfully uploaded ${result.uploadedFiles} files${storageType === 'github' ? ' to GitHub' : ''}. Demo URL set automatically!`,
                    });
                } catch (error) {
                    toast({
                        title: 'Upload Complete',
                        description: `${result.uploadedFiles} files uploaded, but failed to update template`,
                        variant: 'destructive',
                    });
                }

                onUploadComplete?.(validation.fileCount, validation.totalSize);

                // Reset state
                setZipFile(null);
                setExtractedFiles([]);
                setValidation(null);
                setShowFileList(false);
            } else {
                toast({
                    title: 'Upload Incomplete',
                    description: `${result.uploadedFiles} files uploaded, ${result.failedFiles} failed`,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Upload Failed',
                description: error instanceof Error ? error.message : 'Failed to upload files',
                variant: 'destructive',
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
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

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    }, []);

    const reset = () => {
        setZipFile(null);
        setExtractedFiles([]);
        setValidation(null);
        setShowFileList(false);
    };

    return (
        <div className="space-y-4">
            {/* File Selection */}
            {!zipFile && (
                <div className="space-y-4">
                    {/* Drag and Drop Area */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive
                            ? 'border-dexRed bg-dexRed/10 scale-[1.02]'
                            : 'border-gray-700 hover:border-gray-600'
                            }`}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className={`p-4 rounded-full transition-all ${dragActive ? 'bg-dexRed/30 scale-110' : 'bg-dexRed/20'
                                }`}>
                                <FileArchive className="h-8 w-8 text-dexRed" />
                            </div>
                            <div>
                                <p className="text-white font-medium mb-1">
                                    {dragActive ? 'Drop ZIP file here' : 'Drag and drop your ZIP file here'}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    or use the button below to browse
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* File Input Button */}
                    <div className="flex justify-center">
                        <input
                            type="file"
                            id="zip-upload"
                            accept=".zip"
                            className="hidden"
                            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                        />
                        <label htmlFor="zip-upload">
                            <Button
                                type="button"
                                className="bg-dexRed hover:bg-dexRed/90 cursor-pointer"
                                asChild
                            >
                                <span>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose ZIP File
                                </span>
                            </Button>
                        </label>
                    </div>
                </div>
            )}

            {/* ZIP File Selected */}
            {zipFile && !extractedFiles.length && (
                <div className="border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <FileArchive className="h-6 w-6 text-dexRed" />
                            <div>
                                <p className="text-white font-medium">{zipFile.name}</p>
                                <p className="text-gray-400 text-sm">{formatFileSize(zipFile.size)}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={reset}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button
                        onClick={handleExtract}
                        disabled={extracting}
                        className="w-full bg-dexRed hover:bg-dexRed/90"
                    >
                        {extracting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Extracting...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4 mr-2" />
                                Extract ZIP File
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* Validation Results */}
            {validation && (
                <div className="space-y-4">
                    {/* Summary */}
                    <div className={`border rounded-lg p-4 ${validation.valid ? 'border-green-500/20 bg-green-500/10' : 'border-red-500/20 bg-red-500/10'
                        }`}>
                        <div className="flex items-start gap-3">
                            {validation.valid ? (
                                <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                                <p className={`font-medium mb-2 ${validation.valid ? 'text-green-400' : 'text-red-400'}`}>
                                    {validation.valid ? 'Validation Passed' : 'Validation Failed'}
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                                    <div>
                                        <span className="text-gray-400">Files:</span> {validation.fileCount}
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Total Size:</span> {formatFileSize(validation.totalSize)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Errors */}
                    {validation.errors.length > 0 && (
                        <div className="border border-red-500/20 bg-red-500/10 rounded-lg p-4">
                            <p className="text-red-400 font-medium mb-2">Errors:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                                {validation.errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Warnings */}
                    {validation.warnings.length > 0 && (
                        <div className="border border-yellow-500/20 bg-yellow-500/10 rounded-lg p-4">
                            <p className="text-yellow-400 font-medium mb-2">Warnings:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                                {validation.warnings.map((warning, idx) => (
                                    <li key={idx}>{warning}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* File List Toggle */}
                    {extractedFiles.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={() => setShowFileList(!showFileList)}
                            className="w-full"
                        >
                            <FolderTree className="h-4 w-4 mr-2" />
                            {showFileList ? 'Hide' : 'Show'} File List ({extractedFiles.length} files)
                        </Button>
                    )}

                    {/* File List */}
                    {showFileList && (
                        <div className="border border-gray-700 rounded-lg max-h-64 overflow-y-auto">
                            <div className="divide-y divide-gray-700">
                                {extractedFiles.slice(0, 100).map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-800/50">
                                        <File className="h-4 w-4 text-gray-400 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm truncate">{file.path}</p>
                                            <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                                        </div>
                                    </div>
                                ))}
                                {extractedFiles.length > 100 && (
                                    <div className="p-3 text-center text-gray-400 text-sm">
                                        ... and {extractedFiles.length - 100} more files
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Upload Button */}
                    {validation.valid && (
                        <div className="space-y-2">
                            <Button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="w-full bg-dexRed hover:bg-dexRed/90"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Uploading... {uploadProgress}%
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload {validation.fileCount} Files to {folder === 'source' ? 'Source' : 'Demo'} Folder
                                    </>
                                )}
                            </Button>

                            {uploading && (
                                <Progress value={uploadProgress} className="w-full" />
                            )}

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={reset} disabled={uploading} className="flex-1">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TemplateZipUpload;
