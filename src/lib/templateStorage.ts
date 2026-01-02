/**
 * Template Storage Utilities
 * Handles file operations with Supabase Storage for templates
 */

import { supabase } from './supabase'

export const TEMPLATE_STORAGE_BUCKET = 'template-files'

export interface TemplateFile {
  name: string
  path: string
  size: number
  lastModified: string
  contentType?: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

/**
 * Get storage path for a template
 */
export function getTemplateStoragePath(templateId: number, subfolder: 'source' | 'demo' | 'screenshots' = 'source'): string {
  return `${templateId}/${subfolder}`
}

/**
 * Get public URL for a template file (for demo viewing)
 */
export function getTemplatePublicUrl(templateId: number, filePath: string, subfolder: 'demo' | 'screenshots' = 'demo'): string {
  const fullPath = `${templateId}/${subfolder}/${filePath}`
  const { data } = supabase.storage.from(TEMPLATE_STORAGE_BUCKET).getPublicUrl(fullPath)
  return data.publicUrl
}

/**
 * Get signed URL for a template file (for downloads - requires authentication)
 */
export async function getTemplateSignedUrl(
  templateId: number,
  filePath: string,
  expiresIn: number = 3600
): Promise<string> {
  const fullPath = `${templateId}/source/${filePath}`
  const { data, error } = await supabase.storage
    .from(TEMPLATE_STORAGE_BUCKET)
    .createSignedUrl(fullPath, expiresIn)

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`)
  }

  return data.signedUrl
}

/**
 * List all files in a template folder
 */
export async function listTemplateFiles(
  templateId: number,
  subfolder: 'source' | 'demo' | 'screenshots' = 'source'
): Promise<TemplateFile[]> {
  const folderPath = getTemplateStoragePath(templateId, subfolder)

  const { data, error } = await supabase.storage
    .from(TEMPLATE_STORAGE_BUCKET)
    .list(folderPath, {
      limit: 1000,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    })

  if (error) {
    throw new Error(`Failed to list files: ${error.message}`)
  }

  return (data || []).map(file => ({
    name: file.name,
    path: `${folderPath}/${file.name}`,
    size: file.metadata?.size || 0,
    lastModified: file.updated_at || file.created_at || '',
    contentType: file.metadata?.mimetype
  }))
}

/**
 * Upload a file to template storage
 */
export async function uploadTemplateFile(
  templateId: number,
  file: File,
  subfolder: 'source' | 'demo' | 'screenshots' = 'source',
  onProgress?: (progress: UploadProgress) => void
): Promise<{ path: string; url: string }> {
  const folderPath = getTemplateStoragePath(templateId, subfolder)
  const filePath = `${folderPath}/${file.name}`

  // Upload file
  const { data, error } = await supabase.storage
    .from(TEMPLATE_STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'application/octet-stream'
    })

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`)
  }

  // Get public URL if it's a demo file
  let url = ''
  if (subfolder === 'demo' || subfolder === 'screenshots') {
    const publicUrl = getTemplatePublicUrl(templateId, file.name, subfolder)
    url = publicUrl
  }

  return {
    path: data.path,
    url
  }
}

/**
 * Upload multiple files to template storage
 */
export async function uploadTemplateFiles(
  templateId: number,
  files: File[],
  subfolder: 'source' | 'demo' | 'screenshots' = 'source',
  onProgress?: (progress: UploadProgress) => void
): Promise<Array<{ path: string; url: string; error?: string }>> {
  const results = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    try {
      const result = await uploadTemplateFile(templateId, file, subfolder, (progress) => {
        // Calculate overall progress
        const overallProgress = {
          loaded: (i * 100) + progress.percentage,
          total: files.length * 100,
          percentage: Math.round(((i * 100) + progress.percentage) / files.length)
        }
        onProgress?.(overallProgress)
      })
      results.push(result)
    } catch (error) {
      results.push({
        path: '',
        url: '',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return results
}

/**
 * Delete a template file
 */
export async function deleteTemplateFile(
  templateId: number,
  fileName: string,
  subfolder: 'source' | 'demo' | 'screenshots' = 'source'
): Promise<void> {
  const folderPath = getTemplateStoragePath(templateId, subfolder)
  const filePath = `${folderPath}/${fileName}`

  const { error } = await supabase.storage
    .from(TEMPLATE_STORAGE_BUCKET)
    .remove([filePath])

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`)
  }
}

/**
 * Delete all files in a template folder
 */
export async function deleteTemplateFolder(
  templateId: number,
  subfolder: 'source' | 'demo' | 'screenshots'
): Promise<void> {
  const folderPath = getTemplateStoragePath(templateId, subfolder)

  // List all files first
  const files = await listTemplateFiles(templateId, subfolder)

  if (files.length === 0) {
    return
  }

  // Delete all files
  const filePaths = files.map(file => file.path)
  const { error } = await supabase.storage
    .from(TEMPLATE_STORAGE_BUCKET)
    .remove(filePaths)

  if (error) {
    throw new Error(`Failed to delete folder: ${error.message}`)
  }
}

/**
 * Get total size of all files in a template folder
 */
export async function getTemplateFolderSize(
  templateId: number,
  subfolder: 'source' | 'demo' | 'screenshots' = 'source'
): Promise<number> {
  const files = await listTemplateFiles(templateId, subfolder)
  return files.reduce((total, file) => total + file.size, 0)
}

/**
 * Check if template has files uploaded
 */
export async function templateHasFiles(templateId: number): Promise<boolean> {
  try {
    const sourceFiles = await listTemplateFiles(templateId, 'source')
    return sourceFiles.length > 0
  } catch {
    return false
  }
}

/**
 * Get demo entry point URL
 */
export function getDemoEntryPointUrl(templateId: number, entryPoint: string = 'index.html'): string {
  return getTemplatePublicUrl(templateId, entryPoint, 'demo')
}

