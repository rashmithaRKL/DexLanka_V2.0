# Deployment Guide for DexLanka with Database

This guide covers deploying your DexLanka website with the Supabase database to various hosting platforms.

## Recommended Hosting Platforms

### 1. Vercel (Recommended for React/Vite)
- **Free tier**: Yes
- **Easy setup**: Very simple
- **Performance**: Excellent
- **Database**: Works perfectly with Supabase

### 2. Netlify
- **Free tier**: Yes
- **Easy setup**: Simple
- **Performance**: Good
- **Database**: Works perfectly with Supabase

### 3. GitHub Pages
- **Free tier**: Yes
- **Easy setup**: Moderate
- **Performance**: Good
- **Database**: Works with Supabase

## Deployment Steps for Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add database integration"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables**:
   - In Vercel dashboard → Settings → Environment Variables
   - Add your Supabase credentials

4. **Deploy**: Vercel will automatically deploy on every push to main

## Deployment Steps for Netlify

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Set Environment Variables**:
   - Go to Netlify dashboard → Site Settings → Environment Variables
   - Add your Supabase credentials

## Deployment Steps for GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/dexlanka"
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

4. **Set Environment Variables**:
   - GitHub Pages doesn't support server-side environment variables
   - You'll need to use a different approach (see below)

## Environment Variables for Static Hosting

Since static hosting platforms don't support server-side environment variables, you have a few options:

### Option 1: Build-time Environment Variables (Recommended)
Your current setup with `VITE_` prefix works perfectly for this:

1. **For Vercel/Netlify**: Set environment variables in their dashboards
2. **For GitHub Pages**: Create a `.env` file in your repo (not recommended for production)

### Option 2: Runtime Configuration
Create a config file that gets loaded at runtime:

```javascript
// src/config.js
export const config = {
  supabaseUrl: 'https://your-project-id.supabase.co',
  supabaseKey: 'your-anon-key'
}
```

## Pre-deployment Checklist

- [ ] Test contact form submission
- [ ] Verify admin dashboard loads
- [ ] Check all pages work correctly
- [ ] Test on mobile devices
- [ ] Verify environment variables are set
- [ ] Run `npm run build` locally to check for errors

## Post-deployment Checklist

- [ ] Test live contact form
- [ ] Check admin dashboard at `/admin`
- [ ] Verify database connections
- [ ] Test all functionality
- [ ] Set up domain (if using custom domain)
- [ ] Configure SSL certificate (usually automatic)

## Custom Domain Setup

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

## SSL/HTTPS

- **Vercel**: Automatic SSL certificates
- **Netlify**: Automatic SSL certificates  
- **GitHub Pages**: Automatic SSL certificates

## Performance Optimization

1. **Enable caching**:
   ```bash
   # Add to vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             supabase: ['@supabase/supabase-js']
           }
         }
       }
     }
   })
   ```

2. **Optimize images**: Use WebP format and proper sizing

3. **Enable compression**: Most hosting platforms do this automatically

## Monitoring and Analytics

### Vercel Analytics:
```bash
npm install @vercel/analytics
```

### Google Analytics:
Add to your `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Backup Strategy

1. **Database backups**: Supabase provides automatic backups
2. **Code backups**: Use Git version control
3. **Environment variables**: Keep secure backups of your keys

## Troubleshooting

### Common Issues:

1. **Build fails**: Check for TypeScript errors and missing dependencies
2. **Environment variables not working**: Ensure they're set in hosting platform
3. **Database connection fails**: Verify Supabase URL and keys
4. **CORS errors**: Supabase handles this automatically

### Getting Help:

- Check hosting platform documentation
- Verify Supabase connection in browser dev tools
- Check browser console for errors

## Cost Breakdown

### Free Tier Limits:
- **Vercel**: 100GB bandwidth, unlimited static sites
- **Netlify**: 100GB bandwidth, 300 build minutes
- **Supabase**: 500MB database, 2GB bandwidth
- **Total**: $0/month for small to medium sites

### Paid Plans (when you need them):
- **Vercel Pro**: $20/month
- **Netlify Pro**: $19/month  
- **Supabase Pro**: $25/month

## Security Best Practices

1. **Never commit `.env` files**
2. **Use environment variables for sensitive data**
3. **Enable Row Level Security in Supabase**
4. **Regular security updates**
5. **Monitor for suspicious activity**

Your DexLanka website with database is now ready for production deployment! 🚀
