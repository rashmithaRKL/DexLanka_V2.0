/**
 * Unified Storage Adapter
 * Provides a single interface for both Supabase and GitHub storage
 */

import type { ExtractedFile } from './zipUtils';
import type { TemplateItem } from './supabase';
import { uploadExtractedFiles as uploadToSupabase } from './zipUtils';
import {
    createTemplateRepository,
    uploadFilesToGitHub,
    downloadGitHubRepoAsZip,
    getGitHubRawUrl,
    getGitHubRepoUrl,
    generateRepoName,
} from './githubStorage';
import { createTemplateZipBlob } from './clientDownload';

export interface StorageUploadResult {
    success: boolean;
    uploadedFiles: number;
    failedFiles: number;
    errors: string[];
    repositoryUrl?: string;
    indexFilePath?: string;
}

/**
 * Upload template files to either Supabase or GitHub
 */
export async function uploadTemplateFiles(
    templateId: number,
    templateTitle: string,
    files: ExtractedFile[],
    storageType: 'supabase' | 'github',
    onProgress?: (progress: number) => void
): Promise<StorageUploadResult> {
    if (storageType === 'github') {
        // Upload to GitHub
        const repoName = generateRepoName(templateId, templateTitle);

        // Create repository
        await createTemplateRepository(templateId, templateTitle);

        // Upload files
        const result = await uploadFilesToGitHub(repoName, files, onProgress);

        // Find index.html
        const indexFile = files.find(f => f.name.toLowerCase() === 'index.html');

        return {
            ...result,
            indexFilePath: indexFile?.path,
        };
    } else {
        // Upload to Supabase
        const result = await uploadToSupabase(templateId, files, 'source', onProgress);
        return result;
    }
}

/**
 * Download template files as ZIP
 */
export async function downloadTemplateAsZip(
    template: TemplateItem
): Promise<Blob> {
    if (template.storage_type === 'github' && template.github_repo_name) {
        return downloadGitHubRepoAsZip(template.github_repo_name);
    } else {
        // Use Supabase download that returns Blob
        return createTemplateZipBlob(template.id, template.title);
    }
}

/**
 * Get live preview URL for template
 */
export function getTemplateLivePreviewUrl(template: TemplateItem): string | null {
    // If explicitly set, use that
    if (template.live_preview_url) {
        return template.live_preview_url;
    }

    // For GitHub storage, construct URL
    if (template.storage_type === 'github' && template.github_repo_name) {
        return getGitHubRawUrl(template.github_repo_name, 'index.html');
    }

    return null;
}

/**
 * Get repository/storage URL
 */
export function getTemplateStorageUrl(template: TemplateItem): string | null {
    if (template.storage_type === 'github' && template.github_repo_name) {
        return getGitHubRepoUrl(template.github_repo_name);
    }

    return null;
}
