/**
 * GitHub Storage Integration
 * Provides functions to manage template files on GitHub
 */

import { Octokit } from '@octokit/rest';
import type { ExtractedFile } from './zipUtils';
import type { GitHubRepository, GitHubFile, GitHubUploadResult, GitHubConfig } from '@/types/github';

// Get GitHub configuration from environment variables
const getGitHubConfig = (): GitHubConfig => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const owner = import.meta.env.VITE_GITHUB_OWNER || 'dexlanka-templates';

    if (!token) {
        throw new Error('GitHub token not configured. Please set VITE_GITHUB_TOKEN in .env file');
    }

    return {
        token,
        owner,
        repoPrefix: 'template-',
    };
};

// Initialize Octokit client
const getOctokit = () => {
    const config = getGitHubConfig();
    return new Octokit({ auth: config.token });
};

/**
 * Generate repository name from template ID and title
 */
export function generateRepoName(templateId: number, templateTitle: string): string {
    const config = getGitHubConfig();
    const slug = templateTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `${config.repoPrefix}${templateId}-${slug}`;
}

/**
 * Create a new public repository for a template
 */
export async function createTemplateRepository(
    templateId: number,
    templateTitle: string,
    description?: string
): Promise<GitHubRepository> {
    const octokit = getOctokit();
    const config = getGitHubConfig();
    const repoName = generateRepoName(templateId, templateTitle);

    try {
        // Check if repository already exists
        try {
            const { data: existingRepo } = await octokit.repos.get({
                owner: config.owner,
                repo: repoName,
            });
            console.log(`Repository ${repoName} already exists`);
            return existingRepo as GitHubRepository;
        } catch (error: any) {
            // Repository doesn't exist, create it
            if (error.status !== 404) {
                throw error;
            }
        }

        // Create new repository
        const { data } = await octokit.repos.createInOrg({
            org: config.owner,
            name: repoName,
            description: description || `Template: ${templateTitle}`,
            private: false,
            auto_init: true,
            has_issues: false,
            has_projects: false,
            has_wiki: false,
        });

        console.log(`Created repository: ${data.html_url}`);
        return data as GitHubRepository;
    } catch (error: any) {
        console.error('Failed to create repository:', error);
        throw new Error(`Failed to create GitHub repository: ${error.message}`);
    }
}

/**
 * Upload files to GitHub repository
 */
export async function uploadFilesToGitHub(
    repoName: string,
    files: ExtractedFile[],
    onProgress?: (progress: number) => void
): Promise<GitHubUploadResult> {
    const octokit = getOctokit();
    const config = getGitHubConfig();

    const result: GitHubUploadResult = {
        success: true,
        uploadedFiles: 0,
        failedFiles: 0,
        errors: [],
    };

    try {
        // Upload files one by one
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            try {
                // Read file content as base64
                const content = await file.content.arrayBuffer();
                const base64Content = btoa(
                    String.fromCharCode(...new Uint8Array(content))
                );

                // Create or update file
                await octokit.repos.createOrUpdateFileContents({
                    owner: config.owner,
                    repo: repoName,
                    path: file.path,
                    message: `Add ${file.name}`,
                    content: base64Content,
                });

                result.uploadedFiles++;
                onProgress?.(Math.round(((i + 1) / files.length) * 100));
            } catch (error: any) {
                result.failedFiles++;
                result.errors.push(`Failed to upload ${file.path}: ${error.message}`);
                console.error(`Failed to upload ${file.path}:`, error);
            }
        }

        result.success = result.failedFiles === 0;
        result.repositoryUrl = `https://github.com/${config.owner}/${repoName}`;

        return result;
    } catch (error: any) {
        throw new Error(`Failed to upload files to GitHub: ${error.message}`);
    }
}

/**
 * Get raw file URL from GitHub
 */
export function getGitHubRawUrl(repoName: string, filePath: string, branch: string = 'main'): string {
    const config = getGitHubConfig();
    return `https://raw.githubusercontent.com/${config.owner}/${repoName}/${branch}/${filePath}`;
}

/**
 * Get repository URL
 */
export function getGitHubRepoUrl(repoName: string): string {
    const config = getGitHubConfig();
    return `https://github.com/${config.owner}/${repoName}`;
}

/**
 * Download repository as ZIP
 * Downloads files individually and creates ZIP client-side to avoid CORS issues
 */
export async function downloadGitHubRepoAsZip(repoName: string): Promise<Blob> {
    const config = getGitHubConfig();
    const octokit = getOctokit();

    try {
        // Import JSZip dynamically
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();

        // Get repository tree
        const { data: tree } = await octokit.git.getTree({
            owner: config.owner,
            repo: repoName,
            tree_sha: 'main',
            recursive: '1',
        });

        // Filter only files (not trees/folders)
        const files = tree.tree.filter(item => item.type === 'blob' && item.path);

        // Download each file
        for (const file of files) {
            if (!file.path) continue;

            try {
                // Get file content
                const { data: fileData } = await octokit.repos.getContent({
                    owner: config.owner,
                    repo: repoName,
                    path: file.path,
                });

                // Decode base64 content
                if ('content' in fileData && typeof fileData.content === 'string') {
                    const content = atob(fileData.content.replace(/\n/g, ''));
                    zip.file(file.path, content, { binary: true });
                }
            } catch (error) {
                console.warn(`Failed to download ${file.path}:`, error);
            }
        }

        // Generate ZIP blob
        return await zip.generateAsync({ type: 'blob' });
    } catch (error: any) {
        console.error('GitHub download error:', error);
        throw new Error(`Failed to download repository: ${error.message}`);
    }
}

/**
 * List files in repository
 */
export async function listGitHubFiles(repoName: string, path: string = ''): Promise<GitHubFile[]> {
    const octokit = getOctokit();
    const config = getGitHubConfig();

    try {
        const { data } = await octokit.repos.getContent({
            owner: config.owner,
            repo: repoName,
            path,
        });

        if (Array.isArray(data)) {
            return data as GitHubFile[];
        }

        return [data as GitHubFile];
    } catch (error: any) {
        throw new Error(`Failed to list files: ${error.message}`);
    }
}

/**
 * Delete repository
 */
export async function deleteTemplateRepository(repoName: string): Promise<void> {
    const octokit = getOctokit();
    const config = getGitHubConfig();

    try {
        await octokit.repos.delete({
            owner: config.owner,
            repo: repoName,
        });

        console.log(`Deleted repository: ${repoName}`);
    } catch (error: any) {
        throw new Error(`Failed to delete repository: ${error.message}`);
    }
}

/**
 * Check if repository exists
 */
export async function repositoryExists(repoName: string): Promise<boolean> {
    const octokit = getOctokit();
    const config = getGitHubConfig();

    try {
        await octokit.repos.get({
            owner: config.owner,
            repo: repoName,
        });
        return true;
    } catch (error: any) {
        if (error.status === 404) {
            return false;
        }
        throw error;
    }
}
