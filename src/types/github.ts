// GitHub Storage Type Definitions
export interface GitHubRepository {
    name: string;
    full_name: string;
    html_url: string;
    clone_url: string;
    default_branch: string;
}

export interface GitHubFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    download_url: string;
}

export interface GitHubUploadResult {
    success: boolean;
    uploadedFiles: number;
    failedFiles: number;
    errors: string[];
    repositoryUrl?: string;
}

export interface GitHubConfig {
    token: string;
    owner: string;
    repoPrefix?: string;
}
