/**
 * Template Download Utilities
 * Handles template download functionality including ZIP generation
 */

import { supabase } from './supabase';

export interface DownloadFile {
  name: string;
  path: string;
  url: string;
  size: number;
}

export interface DownloadResponse {
  success: boolean;
  templateId: number;
  templateTitle: string;
  files: DownloadFile[];
  downloadCount: number;
  message: string;
}

/**
 * Check if user has purchased a template
 */
export async function checkTemplatePurchase(
  templateId: number,
  customerEmail: string
): Promise<{ hasPurchase: boolean; purchaseId?: number }> {
  const { data, error } = await supabase
    .from('template_purchases')
    .select('id')
    .eq('template_id', templateId)
    .eq('customer_email', customerEmail)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return { hasPurchase: false };
  }

  return { hasPurchase: true, purchaseId: data.id };
}

/**
 * Generate download URLs and create ZIP file
 */
export async function generateTemplateDownload(
  templateId: number,
  purchaseId: number,
  customerEmail: string
): Promise<DownloadResponse> {
  // Call Supabase Edge Function to get download URLs
  const { data, error } = await supabase.functions.invoke<DownloadResponse>(
    'generate-template-zip',
    {
      body: {
        templateId,
        purchaseId,
        customerEmail,
      },
    }
  );

  if (error) {
    throw new Error(`Failed to generate download: ${error.message}`);
  }

  if (!data || !data.success) {
    throw new Error(data?.message || 'Failed to generate download');
  }

  return data;
}

/**
 * Download file from URL
 */
async function downloadFile(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }
  return response.blob();
}

/**
 * Create ZIP file from template files
 */
export async function createTemplateZip(
  files: DownloadFile[],
  templateTitle: string
): Promise<Blob> {
  // Dynamic import JSZip to avoid SSR issues
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  const folder = zip.folder(templateTitle) || zip;

  // Download all files and add to ZIP
  for (const file of files) {
    try {
      const blob = await downloadFile(file.url);
      // Preserve folder structure
      const relativePath = file.path.split('/').slice(2).join('/'); // Remove template-id/source prefix
      folder.file(relativePath, blob);
    } catch (error) {
      console.error(`Failed to download ${file.name}:`, error);
      // Continue with other files
    }
  }

  // Generate ZIP blob
  return await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
}

/**
 * Download template as ZIP file
 */
export async function downloadTemplate(
  templateId: number,
  purchaseId: number,
  customerEmail: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  try {
    // Step 1: Generate download URLs
    onProgress?.(10);
    const downloadData = await generateTemplateDownload(templateId, purchaseId, customerEmail);
    onProgress?.(30);

    // Step 2: Create ZIP file
    const zipBlob = await createTemplateZip(downloadData.files, downloadData.templateTitle);
    onProgress?.(90);

    // Step 3: Trigger browser download
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${downloadData.templateTitle.replace(/\s+/g, '-')}-${templateId}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onProgress?.(100);
  } catch (error) {
    throw error;
  }
}

/**
 * Get user's purchases for a template
 */
export async function getUserTemplatePurchases(
  customerEmail: string,
  templateId?: number
): Promise<Array<{ id: number; template_id: number; download_count: number; download_limit: number | null }>> {
  let query = supabase
    .from('template_purchases')
    .select('id, template_id, download_count, download_limit')
    .eq('customer_email', customerEmail)
    .eq('status', 'completed');

  if (templateId) {
    query = query.eq('template_id', templateId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch purchases: ${error.message}`);
  }

  return data || [];
}

