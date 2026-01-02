/**
 * Client-Side Template Download
 * Downloads template files directly from Supabase Storage and creates ZIP on client
 */

import { supabase, TemplateItem } from './supabase';
import JSZip from 'jszip';
import { downloadTemplateAsZip } from './storageAdapter';

/**
 * Download template - automatically detects storage type
 */
export async function downloadTemplate(
    template: TemplateItem,
    onProgress?: (progress: number) => void
): Promise<void> {
    try {
        onProgress?.(10);

        // Use storage adapter for unified download
        const blob = await downloadTemplateAsZip(template);

        onProgress?.(90);

        // Trigger download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        onProgress?.(100);
    } catch (error) {
        console.error('Download failed:', error);
        throw error;
    }
}

/**
 * Create ZIP blob from template files (for storage adapter)
 */
export async function createTemplateZipBlob(
    templateId: number,
    templateTitle: string,
    folder: 'source' | 'demo' = 'source',
    onProgress?: (progress: number) => void
): Promise<Blob> {
    // Reuse the same logic but return blob instead of downloading
    const zip = new JSZip();

    onProgress?.(10);

    // Try root folder first
    let folderPath = `${templateId}`;
    let { data: files, error: listError } = await supabase.storage
        .from('template-files')
        .list(folderPath, {
            limit: 1000,
            offset: 0,
        });

    // If root folder is empty, try source subfolder
    if (!files || files.length === 0 || files.every(f => f.id === null)) {
        folderPath = `${templateId}/${folder}`;
        const result = await supabase.storage
            .from('template-files')
            .list(folderPath, {
                limit: 1000,
                offset: 0,
            });
        files = result.data;
        listError = result.error;
    }

    if (listError) {
        throw new Error(`Failed to list template files: ${listError.message}`);
    }

    if (!files || files.length === 0) {
        throw new Error('No files found for this template');
    }

    // Filter actual files
    let actualFiles = files.filter(file => file.id !== null && file.name !== '.emptyFolderPlaceholder');

    // Check subfolders if no files at root
    if (actualFiles.length === 0) {
        const folders = files.filter(f => f.id === null && f.name !== '.emptyFolderPlaceholder');

        for (const folder of folders) {
            const subPath = `${folderPath}/${folder.name}`;
            const { data: subFiles } = await supabase.storage
                .from('template-files')
                .list(subPath, { limit: 1000 });

            if (subFiles) {
                const subActualFiles = subFiles
                    .filter(f => f.id !== null && f.name !== '.emptyFolderPlaceholder')
                    .map(f => ({ ...f, name: `${folder.name}/${f.name}` }));
                actualFiles.push(...subActualFiles);
            }
        }
    }

    if (actualFiles.length === 0) {
        throw new Error('No files found for this template');
    }

    onProgress?.(30);

    // Download and add files to ZIP
    for (let i = 0; i < actualFiles.length; i++) {
        const file = actualFiles[i];
        const filePath = `${folderPath}/${file.name}`;

        const { data: fileData, error: downloadError } = await supabase.storage
            .from('template-files')
            .download(filePath);

        if (downloadError || !fileData) {
            console.error(`Failed to download ${file.name}:`, downloadError);
            continue;
        }

        zip.file(file.name, fileData);
        onProgress?.(30 + Math.round((i / actualFiles.length) * 60));
    }

    onProgress?.(95);

    // Generate ZIP blob
    const blob = await zip.generateAsync({ type: 'blob' });

    onProgress?.(100);

    return blob;
}

/**
 * Legacy function - Download template files directly from Supabase Storage
 */
export async function downloadTemplateFromStorage(
    templateId: number,
    templateTitle: string,
    folder: 'source' | 'demo' = 'source',
    onProgress?: (progress: number) => void
): Promise<void> {
    try {
        onProgress?.(10);

        // Try root folder first (for templates uploaded without folder structure)
        let folderPath = `${templateId}`;
        let { data: files, error: listError } = await supabase.storage
            .from('template-files')
            .list(folderPath, {
                limit: 1000,
                offset: 0,
            });

        // If root folder is empty or only has folders, try the source subfolder
        if (!files || files.length === 0 || files.every(f => f.id === null)) {
            folderPath = `${templateId}/${folder}`;
            const result = await supabase.storage
                .from('template-files')
                .list(folderPath, {
                    limit: 1000,
                    offset: 0,
                });
            files = result.data;
            listError = result.error;
        }

        if (listError) {
            throw new Error(`Failed to list template files: ${listError.message}`);
        }

        if (!files || files.length === 0) {
            throw new Error('No files found for this template');
        }

        console.log(`Found ${files.length} items in folder: ${folderPath}`, files);

        // Filter out folders and placeholder files
        // In Supabase Storage, folders have id = null, files have id = string
        let actualFiles = files.filter(file => {
            const isFile = file.id !== null;
            const notPlaceholder = file.name !== '.emptyFolderPlaceholder';
            console.log(`${file.name}: isFile=${isFile}, notPlaceholder=${notPlaceholder}, id=${file.id}`);
            return isFile && notPlaceholder;
        });

        console.log(`After filtering: ${actualFiles.length} actual files at root level`);

        // If no files found at root, check if there's a single folder and list its contents
        if (actualFiles.length === 0) {
            const folders = files.filter(f => f.id === null && f.name !== '.emptyFolderPlaceholder');
            console.log(`Found ${folders.length} folders`, folders);

            if (folders.length === 1) {
                // Try listing files inside this folder
                const subFolderPath = `${folderPath}/${folders[0].name}`;
                console.log(`Checking inside folder: ${subFolderPath}`);

                const { data: subFiles, error: subError } = await supabase.storage
                    .from('template-files')
                    .list(subFolderPath, {
                        limit: 1000,
                        offset: 0,
                    });

                if (!subError && subFiles && subFiles.length > 0) {
                    actualFiles = subFiles.filter(f => f.id !== null && f.name !== '.emptyFolderPlaceholder');
                    folderPath = subFolderPath; // Update folder path for downloads
                    console.log(`Found ${actualFiles.length} files in subfolder`);
                }
            }
        }

        console.log(`Final: ${actualFiles.length} actual files to download`);

        if (actualFiles.length === 0) {
            throw new Error('No downloadable files found');
        }

        onProgress?.(30);

        // Create ZIP file
        const zip = new JSZip();
        const zipFolder = zip.folder(templateTitle) || zip;

        // Download each file and add to ZIP
        let downloadedCount = 0;
        for (const file of actualFiles) {
            const filePath = `${folderPath}/${file.name}`;

            // Get public URL for file
            const { data: urlData } = supabase.storage
                .from('template-files')
                .getPublicUrl(filePath);

            if (!urlData?.publicUrl) {
                console.warn(`Skipping file ${file.name} - no public URL`);
                continue;
            }

            // Download file
            const response = await fetch(urlData.publicUrl);
            if (!response.ok) {
                console.warn(`Failed to download ${file.name}`);
                continue;
            }

            const blob = await response.blob();
            zipFolder.file(file.name, blob);

            downloadedCount++;
            const progress = 30 + (downloadedCount / actualFiles.length) * 50;
            onProgress?.(Math.round(progress));
        }

        if (downloadedCount === 0) {
            throw new Error('No files could be downloaded');
        }

        onProgress?.(85);

        // Generate ZIP
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        onProgress?.(95);

        // Trigger browser download
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${templateTitle.replace(/\\s+/g, '-')}-${templateId}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        onProgress?.(100);
    } catch (error) {
        console.error('Download error:', error);
        throw error;
    }
}
