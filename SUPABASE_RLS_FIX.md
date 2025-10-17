# Fix Supabase Row Level Security (RLS) for Contact Form

## Problem
You're getting this error: `"new row violates row-level security policy for table 'contact_submissions'"`

This means your Supabase database has Row Level Security enabled but doesn't have the proper policy to allow anonymous contact form submissions.

## Solution 1: Quick Fix via Supabase Dashboard

### Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your DexLanka project

### Step 2: Navigate to Database Settings
1. In the left sidebar, click **"Database"**
2. Click **"Tables"**
3. Find and click on **`contact_submissions`** table

### Step 3: Check Row Level Security
1. Look for **"Row Level Security"** section
2. Make sure it's **enabled** (toggle should be ON)
3. If it's disabled, enable it first

### Step 4: Create Insert Policy
1. Click on **"Policies"** tab
2. Click **"New Policy"**
3. Choose **"Create a policy from scratch"**
4. Fill in the details:
   - **Name**: `Allow anonymous contact form submissions`
   - **For**: `INSERT`
   - **Using expression**: `true`
   - **With check expression**: `true`
5. Click **"Review"** then **"Create Policy"**

### Step 5: Grant Permissions
1. Go to **"Database"** → **"Roles"**
2. Find **"anon"** role
3. Click **"Grant permissions"**
4. Select **`contact_submissions`** table
5. Grant **INSERT** permission

## Solution 2: Using SQL Editor (Recommended)

### Step 1: Open SQL Editor
1. In Supabase Dashboard, click **"SQL Editor"**
2. Click **"New Query"**

### Step 2: Run the Fix Script
Copy and paste this SQL code:

```sql
-- Fix Row Level Security policies for contact form submissions
-- This script will ensure anonymous users can submit contact forms

-- First, drop any existing policies that might be conflicting
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;

-- Create a new policy that allows anonymous users to insert contact form submissions
CREATE POLICY "Allow anonymous contact form submissions" 
ON contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Also create a policy for reading contact submissions (for admin purposes)
-- This allows authenticated users with admin email to read all submissions
DROP POLICY IF EXISTS "Allow admin full access on contact_submissions" ON contact_submissions;

CREATE POLICY "Allow admin read access on contact_submissions" 
ON contact_submissions 
FOR SELECT 
USING (auth.jwt() ->> 'email' = 'dexlanka@gmail.com');

CREATE POLICY "Allow admin update access on contact_submissions" 
ON contact_submissions 
FOR UPDATE 
USING (auth.jwt() ->> 'email' = 'dexlanka@gmail.com');

-- Ensure the table has RLS enabled (this should already be done, but just in case)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to the anon role
GRANT INSERT ON contact_submissions TO anon;
GRANT USAGE ON SEQUENCE contact_submissions_id_seq TO anon;
```

3. Click **"Run"** to execute the script

## Solution 3: Alternative - Disable RLS (Not Recommended)

If you want to quickly test without RLS:

```sql
-- WARNING: This disables security for the contact_submissions table
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
```

**Note**: Only do this for testing. Re-enable RLS and create proper policies for production.

## Verification

After applying the fix:

1. **Test the contact form** on your website
2. **Check the Supabase dashboard**:
   - Go to **"Database"** → **"Tables"** → **`contact_submissions`**
   - Click **"Table editor"** tab
   - You should see new submissions appearing

3. **Check your email** (if EmailJS is configured):
   - You should receive emails at `dexlanka@gmail.com`

## Troubleshooting

### Still getting RLS errors?
1. **Check the policy exists**:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'contact_submissions';
   ```

2. **Verify anon role permissions**:
   ```sql
   SELECT * FROM information_schema.table_privileges 
   WHERE table_name = 'contact_submissions' AND grantee = 'anon';
   ```

3. **Check RLS status**:
   ```sql
   SELECT relname, relrowsecurity FROM pg_class 
   WHERE relname = 'contact_submissions';
   ```

### Contact form still not working?
1. Check browser console for JavaScript errors
2. Verify your Supabase URL and keys in environment variables
3. Test with a simple form submission
4. Check EmailJS configuration if using email notifications

## Important Notes

- **RLS is important for security** - don't disable it permanently
- **Anonymous users** can now submit contact forms
- **Only admins** (with `dexlanka@gmail.com`) can read/update submissions
- **Always test** after making changes

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify your Supabase project settings
3. Make sure your environment variables are correct
4. Contact support with specific error messages
