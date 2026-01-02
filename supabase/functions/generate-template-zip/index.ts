// Supabase Edge Function to generate ZIP file from template source files
// This function fetches all files from a template's source folder and creates a ZIP archive

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DownloadRequest {
  templateId: number;
  purchaseId: number;
  customerEmail: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const { templateId, purchaseId, customerEmail }: DownloadRequest = await req.json();

    if (!templateId || !purchaseId || !customerEmail) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: templateId, purchaseId, customerEmail" }),
        { status: 400, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // Verify purchase
    const { data: purchase, error: purchaseError } = await supabase
      .from("template_purchases")
      .select("*")
      .eq("id", purchaseId)
      .eq("template_id", templateId)
      .eq("customer_email", customerEmail)
      .eq("status", "completed")
      .single();

    if (purchaseError || !purchase) {
      return new Response(
        JSON.stringify({ error: "Purchase not found or not completed" }),
        { status: 403, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // Check download limit if set
    if (purchase.download_limit !== null && purchase.download_count >= purchase.download_limit) {
      return new Response(
        JSON.stringify({ error: "Download limit reached" }),
        { status: 403, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // Get template info
    const { data: template, error: templateError } = await supabase
      .from("templates")
      .select("id, title, storage_path, download_enabled")
      .eq("id", templateId)
      .single();

    if (templateError || !template) {
      return new Response(
        JSON.stringify({ error: "Template not found" }),
        { status: 404, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    if (template.download_enabled === false) {
      return new Response(
        JSON.stringify({ error: "Download is disabled for this template" }),
        { status: 403, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // List all files in the source folder
    const sourceFolderPath = `${templateId}/source`;
    const { data: files, error: listError } = await supabase.storage
      .from("template-files")
      .list(sourceFolderPath, {
        limit: 1000,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (listError) {
      console.error("Error listing files:", listError);
      return new Response(
        JSON.stringify({ error: "Failed to list template files" }),
        { status: 500, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    if (!files || files.length === 0) {
      return new Response(
        JSON.stringify({ error: "No source files found for this template" }),
        { status: 404, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // Fetch all files and create ZIP
    // Note: We'll use a library or create ZIP manually
    // For now, we'll create signed URLs for all files and let the client download them
    // Or we can use JSZip library via CDN
    
    // Create signed URLs for all files (valid for 1 hour)
    const fileUrls = await Promise.all(
      files.map(async (file) => {
        const filePath = `${sourceFolderPath}/${file.name}`;
        const { data, error } = await supabase.storage
          .from("template-files")
          .createSignedUrl(filePath, 3600);

        if (error) {
          console.error(`Error creating signed URL for ${file.name}:`, error);
          return null;
        }

        return {
          name: file.name,
          path: filePath,
          url: data.signedUrl,
          size: file.metadata?.size || 0,
        };
      })
    );

    const validFileUrls = fileUrls.filter((f) => f !== null);

    if (validFileUrls.length === 0) {
      return new Response(
        JSON.stringify({ error: "Failed to generate download URLs" }),
        { status: 500, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // Update download count
    const newDownloadCount = (purchase.download_count || 0) + 1;
    await supabase
      .from("template_purchases")
      .update({
        download_count: newDownloadCount,
        last_downloaded_at: new Date().toISOString(),
      })
      .eq("id", purchaseId);

    // Return file URLs and metadata
    // The client will handle ZIP creation using JSZip
    return new Response(
      JSON.stringify({
        success: true,
        templateId,
        templateTitle: template.title,
        files: validFileUrls,
        downloadCount: newDownloadCount,
        message: "Download URLs generated successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "content-type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating template ZIP:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  }
});

