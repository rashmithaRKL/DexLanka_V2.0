# Database Setup Guide for DexLanka

This guide will help you set up an online database for your DexLanka website using Supabase (a free PostgreSQL database service).

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up for a free account
3. Create a new project:
   - Choose a project name (e.g., "dexlanka-database")
   - Set a strong database password
   - Choose a region close to your users

## Step 2: Set Up the Database Schema

1. In your Supabase dashboard, go to the "SQL Editor"
2. Copy the contents of `database/schema.sql` and paste it into the editor
3. Click "Run" to execute the SQL script
4. This will create all necessary tables and insert sample data

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to "Settings" → "API"
2. Copy your:
   - Project URL
   - Anon (public) key

## Step 4: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Never commit your `.env` file to version control!

## Step 5: Update Admin Email

In the database schema, you need to update the admin email for authentication:

1. Go to your Supabase SQL Editor
2. Run this query (replace with your email):

```sql
-- Update the admin policies with your email
DROP POLICY IF EXISTS "Allow admin full access on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow admin full access on projects" ON projects;
DROP POLICY IF EXISTS "Allow admin full access on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow admin full access on packages" ON packages;

CREATE POLICY "Allow admin full access on contact_submissions" ON contact_submissions 
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Allow admin full access on projects" ON projects 
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Allow admin full access on testimonials" ON testimonials 
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-email@example.com');

CREATE POLICY "Allow admin full access on packages" ON packages 
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-email@example.com');
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Test the contact form on your website
3. Check your Supabase dashboard → "Table Editor" to see if the submission was saved
4. Visit `/admin` to access the admin dashboard

## Database Tables Created

### 1. `contact_submissions`
- Stores contact form submissions
- Fields: name, email, phone, subject, message, status, timestamps

### 2. `projects`
- Stores portfolio projects
- Fields: title, category, image_url, description, live_demo_url, github_url, technologies, etc.

### 3. `testimonials`
- Stores client testimonials
- Fields: content, author, position, company, avatar_url, featured flag

### 4. `packages`
- Stores pricing packages
- Fields: title, price, description, features, category, is_popular, order_index

## Features Added

✅ **Contact Form Integration** - Contact form now saves to database
✅ **Dynamic Project Gallery** - Projects loaded from database
✅ **Admin Dashboard** - Manage all content from `/admin`
✅ **Testimonials Management** - Add/edit testimonials
✅ **Packages Management** - Manage pricing packages
✅ **Row Level Security** - Secure database access

## Next Steps

1. **Authentication**: Add Supabase Auth for secure admin access
2. **Image Upload**: Implement image upload for projects
3. **Email Notifications**: Set up email alerts for new contact submissions
4. **Analytics**: Add usage analytics
5. **Backup**: Set up automated database backups

## Troubleshooting

### Common Issues:

1. **Environment variables not working**: Make sure your `.env` file is in the project root and restart your dev server
2. **CORS errors**: Supabase handles CORS automatically for web apps
3. **Permission denied**: Check your RLS policies and admin email configuration
4. **Data not loading**: Check browser console for API errors

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- Check the browser console for detailed error messages

## Security Notes

- The anon key is safe to use in frontend code (it's designed for public access)
- Row Level Security (RLS) is enabled to protect your data
- Admin access is restricted by email-based policies
- Never expose your service role key in frontend code

## Cost Information

- Supabase offers a generous free tier
- Free tier includes: 500MB database, 2GB bandwidth, 50MB file storage
- Paid plans start at $25/month for production use
- Perfect for small to medium websites
