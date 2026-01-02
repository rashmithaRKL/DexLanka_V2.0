# Supabase Storage Setup Guide

This guide explains how to set up Supabase Storage for the template system.

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Configure the bucket:
   - **Name**: `template-files`
   - **Public bucket**: ✅ **Enable** (for demo files to be publicly accessible)
   - **File size limit**: 100 MB (or adjust based on your needs)
   - **Allowed MIME types**: Leave empty to allow all types

5. Click **Create bucket**

## Step 2: Set Up Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies.

### Policy Summary

The following table provides an overview of all storage policies:

| Policy Name | Allowed Operation | Target Roles | Policy Definition |
|------------|------------------|--------------|-------------------|
| **Public can view demo files** | `SELECT` | Public (unauthenticated) | `bucket_id = 'template-files' AND ((storage.foldername(name))[1] = 'demo' OR (storage.foldername(name))[1] = 'screenshots')` |
| **Authenticated users can read source files** | `SELECT` | Authenticated users | `bucket_id = 'template-files' AND (storage.foldername(name))[1] = 'source' AND auth.role() = 'authenticated'` |
| **Purchased users can read source files** (Optional) | `SELECT` | Authenticated users with purchase | `bucket_id = 'template-files' AND (storage.foldername(name))[1] = 'source' AND auth.role() = 'authenticated' AND EXISTS (SELECT 1 FROM template_purchases WHERE template_id::text = (storage.foldername(name))[2] AND customer_email = auth.jwt() ->> 'email' AND status = 'completed')` |
| **Admins can upload template files** | `INSERT` | Authenticated users (admins) | `bucket_id = 'template-files' AND auth.role() = 'authenticated'` |
| **Admins can update template files** | `UPDATE` | Authenticated users (admins) | `bucket_id = 'template-files' AND auth.role() = 'authenticated'` |
| **Admins can delete template files** | `DELETE` | Authenticated users (admins) | `bucket_id = 'template-files' AND auth.role() = 'authenticated'` |

### Policy 1: Public Read for Demo Files

This allows anyone to view demo files (for public template previews).

**Using Supabase UI:**
1. Policy name: `Public can view demo files`
2. Allowed operation: `SELECT`
3. Target roles: `Defaults to all (public) roles if none selected`
4. Policy definition (paste this in the "Policy definition" field):
```sql
bucket_id = 'template-files' AND
((storage.foldername(name))[1] = 'demo' OR
 (storage.foldername(name))[1] = 'screenshots')
```

**Using SQL Editor:**
```sql
-- Allow public read access to demo and screenshots folders
CREATE POLICY "Public can view demo files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'template-files' AND
  ((storage.foldername(name))[1] = 'demo' OR
   (storage.foldername(name))[1] = 'screenshots')
);
```

### Policy 2: Authenticated Read for Source Files

This allows only authenticated users who have purchased the template to download source files.

**Using Supabase UI:**
1. Policy name: `Authenticated users can read source files`
2. Allowed operation: `SELECT`
3. Target roles: `Defaults to all (public) roles if none selected`
4. Policy definition (paste this in the "Policy definition" field):
```sql
bucket_id = 'template-files' AND
(storage.foldername(name))[1] = 'source' AND
auth.role() = 'authenticated'
```

**Using SQL Editor:**
```sql
-- Allow authenticated users to read source files (for downloads)
CREATE POLICY "Authenticated users can read source files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'template-files' AND
  (storage.foldername(name))[1] = 'source' AND
  auth.role() = 'authenticated'
);
```

**Note**: You may want to add additional checks to verify the user has purchased the template. This can be done by checking the `template_purchases` table.

### Policy 3: Admin Write Access

This allows admins to upload and manage template files.

**Using Supabase UI (Create 3 separate policies):**

**Policy 3a: Upload Files**
1. Policy name: `Admins can upload template files`
2. Allowed operation: `INSERT`
3. Target roles: `Defaults to all (public) roles if none selected`
4. Policy definition:
```sql
bucket_id = 'template-files' AND
auth.role() = 'authenticated'
```

**Policy 3b: Update Files**
1. Policy name: `Admins can update template files`
2. Allowed operation: `UPDATE`
3. Target roles: `Defaults to all (public) roles if none selected`
4. Policy definition:
```sql
bucket_id = 'template-files' AND
auth.role() = 'authenticated'
```

**Policy 3c: Delete Files**
1. Policy name: `Admins can delete template files`
2. Allowed operation: `DELETE`
3. Target roles: `Defaults to all (public) roles if none selected`
4. Policy definition:
```sql
bucket_id = 'template-files' AND
auth.role() = 'authenticated'
```

**Using SQL Editor:**
```sql
-- Allow authenticated users (admins) to upload files
CREATE POLICY "Admins can upload template files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'template-files' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users (admins) to update files
CREATE POLICY "Admins can update template files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'template-files' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users (admins) to delete files
CREATE POLICY "Admins can delete template files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'template-files' AND
  auth.role() = 'authenticated'
);
```

## Step 3: Enhanced Policy (Optional - Purchase Verification)

If you want to restrict source file downloads to only users who have purchased the template, use this enhanced policy:

**Using Supabase UI:**
1. First, delete the "Authenticated users can read source files" policy if you created it
2. Create a new policy with these settings:
   - Policy name: `Purchased users can read source files`
   - Allowed operation: `SELECT`
   - Target roles: `Defaults to all (public) roles if none selected`
   - Policy definition:
```sql
bucket_id = 'template-files' AND
(storage.foldername(name))[1] = 'source' AND
auth.role() = 'authenticated' AND
EXISTS (
  SELECT 1 FROM template_purchases
  WHERE template_purchases.template_id::text = (storage.foldername(name))[2]
  AND template_purchases.customer_email = auth.jwt() ->> 'email'
  AND template_purchases.status = 'completed'
)
```

**Using SQL Editor:**
```sql
-- Drop the simple authenticated policy first
DROP POLICY IF EXISTS "Authenticated users can read source files" ON storage.objects;

-- Create policy that checks purchase status
CREATE POLICY "Purchased users can read source files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'template-files' AND
  (storage.foldername(name))[1] = 'source' AND
  auth.role() = 'authenticated' AND
  EXISTS (
    SELECT 1 FROM template_purchases
    WHERE template_purchases.template_id::text = (storage.foldername(name))[2]
    AND template_purchases.customer_email = auth.jwt() ->> 'email'
    AND template_purchases.status = 'completed'
  )
);
```

## Step 4: Folder Structure

The storage bucket will have the following structure:

```
template-files/
  ├── {template-id}/
  │   ├── source/              # Source files for download (authenticated only)
  │   │   ├── index.html
  │   │   ├── styles.css
  │   │   ├── script.js
  │   │   ├── assets/
  │   │   └── ...
  │   ├── demo/                # Demo files (public read)
  │   │   ├── index.html
  │   │   └── assets/
  │   └── screenshots/         # Screenshots (public read)
  │       ├── screenshot1.png
  │       └── ...
```

## Step 5: Test Storage Access

After setting up, test the storage:

1. Upload a test file through the admin panel
2. Verify public URLs work for demo files
3. Verify authenticated access works for source files
4. Test download functionality

## Troubleshooting

### Issue: "new row violates row-level security policy"

**Solution**: Make sure you've created the storage policies correctly and that the bucket name matches exactly (`template-files`).

### Issue: "Public URL not accessible"

**Solution**: 
1. Ensure the bucket is set to **Public**
2. Check that the file path is correct
3. Verify the public read policy is in place

### Issue: "Cannot upload files"

**Solution**:
1. Check that you're authenticated
2. Verify the insert policy is created
3. Check file size limits
4. Verify bucket name is correct

## Security Notes

1. **Demo files** are publicly accessible - only include safe, sanitized demo content
2. **Source files** require authentication - ensure proper purchase verification
3. **File size limits** - Set appropriate limits to prevent abuse
4. **MIME type restrictions** - Consider restricting to specific file types if needed

## Next Steps

After setting up storage:
1. Run the database migration: `database/templates_table_update.sql`
2. Test file upload through admin panel
3. Test demo viewing
4. Test download functionality

