/**
 * ZIP Utility Functions
 * Handles ZIP file extraction and validation for template uploads
 */

import { uploadTemplateFiles } from './templateStorage';

export interface ExtractedFile {
    name: string;
    path: string;
    content: Blob;
    size: number;
}

export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
    totalSize: number;
    fileCount: number;
}

export interface UploadResult {
    success: boolean;
    uploadedFiles: number;
    failedFiles: number;
    errors: string[];
    indexFilePath?: string; // Path to index.html if found
}

// Maximum file size: 100MB
const MAX_FILE_SIZE = 100 * 1024 * 1024;
// Maximum total ZIP size: 500MB
const MAX_TOTAL_SIZE = 500 * 1024 * 1024;
// Maximum number of files
const MAX_FILE_COUNT = 1000;

// Allowed file extensions
const ALLOWED_EXTENSIONS = [
    // Web files
    '.html', '.htm', '.css', '.js', '.jsx', '.ts', '.tsx', '.json', '.xml',
    // Images
    '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico',
    // Fonts
    '.woff', '.woff2', '.ttf', '.eot', '.otf',
    // Documents
    '.md', '.txt', '.pdf',
    // Config files
    '.yml', '.yaml', '.toml', '.env.example',
    // Package files
    'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
    // Build configs
    'vite.config.js', 'vite.config.ts', 'webpack.config.js', 'tsconfig.json',
    '.gitignore', 'README.md', 'LICENSE',
];

// Blocked file patterns (for security)
const BLOCKED_PATTERNS = [
    /\.exe$/i,
    /\.dll$/i,
    /\.bat$/i,
    /\.sh$/i,
    /\.cmd$/i,
    /\.env$/i, // Block actual .env files (allow .env.example)
    /node_modules/i,
    /\.git\//i,
];

/**
 * Extract files from a ZIP archive
 */
export async function extractZipFile(zipFile: File): Promise<ExtractedFile[]> {
    try {
        // Dynamic import JSZip
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();

        // Load the ZIP file
        const zipData = await zip.loadAsync(zipFile);
        const extractedFiles: ExtractedFile[] = [];

        // Extract all files
        const filePromises: Promise<void>[] = [];

        zipData.forEach((relativePath, zipEntry) => {
            // Skip directories and system files
            if (zipEntry.dir || relativePath.startsWith('__MACOSX/') || relativePath.startsWith('.')) {
                return;
            }

            const promise = zipEntry.async('blob').then((content) => {
                extractedFiles.push({
                    name: relativePath.split('/').pop() || relativePath,
                    path: relativePath,
                    content,
                    size: content.size,
                });
            });

            filePromises.push(promise);
        });

        // Wait for all files to be extracted
        await Promise.all(filePromises);

        return extractedFiles;
    } catch (error) {
        throw new Error(`Failed to extract ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Validate extracted files
 */
export function validateZipContents(files: ExtractedFile[]): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let totalSize = 0;

    // Check file count
    if (files.length === 0) {
        errors.push('ZIP file is empty');
    }

    if (files.length > MAX_FILE_COUNT) {
        errors.push(`Too many files. Maximum ${MAX_FILE_COUNT} files allowed, found ${files.length}`);
    }

    // Validate each file
    files.forEach((file) => {
        totalSize += file.size;

        // Check individual file size
        if (file.size > MAX_FILE_SIZE) {
            errors.push(`File "${file.name}" exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        }

        // Check for blocked patterns
        const isBlocked = BLOCKED_PATTERNS.some((pattern) => pattern.test(file.path));
        if (isBlocked) {
            errors.push(`File "${file.path}" is not allowed for security reasons`);
        }

        // Check file extension
        const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) => {
            if (ext.startsWith('.')) {
                return file.name.toLowerCase().endsWith(ext);
            }
            return file.name.toLowerCase() === ext.toLowerCase();
        });

        if (!hasAllowedExtension) {
            warnings.push(`File "${file.name}" has an uncommon extension and may not be supported`);
        }
    });

    // Check total size
    if (totalSize > MAX_TOTAL_SIZE) {
        errors.push(`Total size exceeds maximum of ${MAX_TOTAL_SIZE / 1024 / 1024}MB`);
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        totalSize,
        fileCount: files.length,
    };
}

/**
 * Find index.html file in extracted files
 * Prioritizes root-level index.html over nested ones
 */
export function findIndexFile(files: ExtractedFile[]): string | null {
    // First, look for index.html in the root
    const rootIndex = files.find(file =>
        file.name.toLowerCase() === 'index.html' &&
        !file.path.includes('/')
    );

    if (rootIndex) {
        return rootIndex.path;
    }

    // If not in root, look for any index.html
    const anyIndex = files.find(file =>
        file.name.toLowerCase() === 'index.html'
    );

    return anyIndex ? anyIndex.path : null;
}

/**
 * Upload extracted files to Supabase Storage
 */
export async function uploadExtractedFiles(
    templateId: number,
    files: ExtractedFile[],
    folder: 'source' | 'demo' = 'source',
    onProgress?: (progress: number) => void
): Promise<UploadResult> {
    const errors: string[] = [];
    let uploadedFiles = 0;
    let failedFiles = 0;

    // Find index.html file before uploading
    const indexFilePath = findIndexFile(files);

    try {
        // Helper function to get MIME type from file extension
        const getMimeType = (filename: string): string => {
            const ext = filename.toLowerCase().split('.').pop();
            const mimeTypes: Record<string, string> = {
                'html': 'text/html',
                'htm': 'text/html',
                'css': 'text/css',
                'js': 'application/javascript',
                'json': 'application/json',
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'svg': 'image/svg+xml',
                'ico': 'image/x-icon',
                'woff': 'font/woff',
                'woff2': 'font/woff2',
                'ttf': 'font/ttf',
                'eot': 'application/vnd.ms-fontobject',
                'txt': 'text/plain',
                'xml': 'application/xml',
                'pdf': 'application/pdf',
                'zip': 'application/zip',
            };
            return mimeTypes[ext || ''] || 'application/octet-stream';
        };

        // Convert ExtractedFile[] to File[] for upload
        const fileObjects = files.map((file) => {
            // Get correct MIME type based on file extension
            const mimeType = getMimeType(file.name);
            // Create a File object from the blob with correct MIME type
            return new File([file.content], file.path, { type: mimeType });
        });

        // Upload files in batches to avoid overwhelming the server
        const batchSize = 10;
        const totalBatches = Math.ceil(fileObjects.length / batchSize);

        for (let i = 0; i < totalBatches; i++) {
            const start = i * batchSize;
            const end = Math.min(start + batchSize, fileObjects.length);
            const batch = fileObjects.slice(start, end);

            try {
                const results = await uploadTemplateFiles(
                    templateId,
                    batch,
                    folder,
                    (progress) => {
                        // Calculate overall progress
                        const batchProgress = (i / totalBatches) * 100 + (progress.percentage / totalBatches);
                        onProgress?.(Math.round(batchProgress));
                    }
                );

                // Count successes and failures
                results.forEach((result) => {
                    if (result.error) {
                        failedFiles++;
                        errors.push(`Failed to upload ${result.path || 'file'}: ${result.error}`);
                    } else {
                        uploadedFiles++;
                    }
                });
            } catch (error) {
                failedFiles += batch.length;
                errors.push(`Batch upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }

        onProgress?.(100);

        return {
            success: failedFiles === 0,
            uploadedFiles,
            failedFiles,
            errors,
            indexFilePath, // Return the index file path
        };
    } catch (error) {
        return {
            success: false,
            uploadedFiles,
            failedFiles: files.length - uploadedFiles,
            errors: [error instanceof Error ? error.message : 'Upload failed'],
            indexFilePath,
        };
    }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Generate public URL for a template file
 */
export function generatePublicUrl(templateId: number, filePath: string, folder: 'source' | 'demo' = 'source'): string {
    // Get Supabase URL from environment or use default
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const bucketName = 'template-files';

    // Construct the public URL
    return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${templateId}/${folder}/${filePath}`;
}

