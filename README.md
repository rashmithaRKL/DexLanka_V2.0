# DexLanka V2.0 - Setup and Run Guide

Complete guide to set up and run the DexLanka project with backend integration.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** (free) - [Sign up](https://supabase.com)
- **PayHere Account** (for payments) - [Sign up](https://www.payhere.lk) (required)
- **2Checkout Account** (for payments) - [Sign up](https://www.2co.com) (required)
- **EmailJS Account** (for contact forms) - [Sign up](https://www.emailjs.com/) (optional)

## 🚀 Quick Start

### Step 1: Clone and Install Dependencies

```bash
# Navigate to project directory
cd DexLanka_V2.0

# Install dependencies
npm install
```

### Step 2: Set Up Supabase Backend

#### 2.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Project Name**: `dexlanka` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait for project to be created (takes ~2 minutes)

#### 2.2 Set Up Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Run each SQL file from the `database/` folder in this order:
   ```sql
   -- 1. First, create the update_updated_at_column function (from users_table.sql)
   --    This function is needed by other tables
   -- 2. Then run: users_table.sql (creates function + users table)
   -- 3. Then run: templates_table.sql
   -- 4. Then run: orders_table.sql
   -- 5. Then run: template_purchases_table.sql
   -- 6. Then run: template_customizations_table.sql
   ```
   
   **Or** copy and paste the contents of each file into the SQL Editor and run them sequentially.

3. Verify tables are created:
   - Go to **Table Editor** in Supabase Dashboard
   - You should see: `users`, `templates`, `orders`, `template_purchases`, `template_customizations`

#### 2.3 Get Supabase Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

#### 2.4 Payment Gateway Setup

1. **Set Up PayHere (Primary Payment Gateway)**:
   - Go to [PayHere Dashboard](https://www.payhere.lk)
   - Sign up or log in to your account
   - Get your Merchant ID and Merchant Secret from the dashboard
   - Enable sandbox mode for testing

2. **Set Up 2Checkout (Secondary Payment Gateway)**:
   - Go to [2Checkout Dashboard](https://www.2co.com)
   - Sign up or log in to your account
   - Get your Seller ID from the dashboard
   - Enable sandbox mode for testing

### Step 3: Configure Environment Variables

1. **Create `.env` file** in the project root:
   ```bash
   cp env.example .env
   ```

2. **Edit `.env`** with your credentials:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# PayHere Configuration (Required - Primary Payment Gateway)
VITE_PAYHERE_MERCHANT_ID=your_merchant_id
VITE_PAYHERE_MERCHANT_SECRET=your_merchant_secret
VITE_PAYHERE_SANDBOX=true
VITE_SITE_URL=http://localhost:5173

# 2Checkout Configuration (Required - Secondary Payment Gateway)
VITE_2CHECKOUT_SELLER_ID=your_seller_id
VITE_2CHECKOUT_SANDBOX=true

# EmailJS Configuration (Required for contact form)
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_REPLY_TEMPLATE_ID=template_xxxxx
```

> **⚠️ Important**: Never commit your `.env` file to Git! It's already in `.gitignore`.

### Step 4: Set Up Payment Gateways

1. **Set Up PayHere (Primary)**:
   - Create account at [https://www.payhere.lk](https://www.payhere.lk)
   - Get Merchant ID and Merchant Secret from dashboard
   - Add to `.env` file as shown above

2. **Set Up 2Checkout (Secondary)**:
   - Create account at [https://www.2co.com](https://www.2co.com)
   - Get Seller ID from dashboard
   - Add to `.env` file as shown above

### Step 5: Set Up EmailJS (Optional - for contact form)

1. **Create EmailJS Account**: [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Create Email Service**:
   - Go to **Email Services** → **Add New Service**
   - Connect your email provider (Gmail, Outlook, etc.)
3. **Create Email Template**:
   - Go to **Email Templates** → **Create New Template**
   - Set up template for contact form submissions
   - Copy **Service ID** → `VITE_EMAILJS_SERVICE_ID`
   - Copy **Template ID** → `VITE_EMAILJS_TEMPLATE_ID`
4. **Get Public Key**:
   - Go to **Account** → **General**
   - Copy **Public Key** → `VITE_EMAILJS_PUBLIC_KEY`

### Step 6: Run the Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## 📁 Project Structure

```
DexLanka_V2.0/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── lib/                # Utilities (Supabase, API, etc.)
│   └── context/            # React contexts
├── supabase/
│   └── functions/          # Supabase Edge Functions (backend)
│       ├── create-checkout-session/
│       └── webhook/
├── database/               # SQL schema files
├── .env                   # Environment variables (create this)
└── package.json           # Dependencies
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗄️ Database Tables

The project uses the following Supabase tables:
- **users** - User accounts and authentication
- **templates** - Template catalog
- **orders** - Order records (created via payment gateway webhooks)
- **template_purchases** - Purchase records linked to orders
- **template_customizations** - Customization requests

## 🔐 Admin Access

To set up admin access:

1. Go to Supabase SQL Editor
2. Update admin email in RLS policies (see `DATABASE_SETUP.md` for details)
3. Access admin dashboard at `/admin` route

## 📚 Additional Documentation

- **Database Setup**: See `DATABASE_SETUP.md` for detailed database configuration
- **Deployment**: See `DEPLOYMENT_GUIDE.md` for production deployment
- **Email Setup**: See `EMAIL_SETUP_GUIDE.md` for EmailJS configuration
- **Payment Gateways**: PayHere (Primary) and 2Checkout (Secondary) are integrated. See Terms and Conditions page for details.

## 🐛 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that `.env` file exists and has correct values
   - Restart dev server after changing `.env`

2. **"Failed to deploy Supabase functions"**
   - Ensure Supabase CLI is installed and logged in
   - Check that project is linked correctly
   - Verify secrets are set

3. **"Database connection failed"**
   - Verify Supabase URL and keys are correct
   - Check Supabase project is active
   - Ensure RLS policies are set up

4. **"Payment gateway not working"**
   - Verify PayHere Merchant ID and Secret are correct
   - Check 2Checkout Seller ID is correct
   - Ensure sandbox mode is enabled for testing
   - Verify return URLs are correctly configured

## 🚀 Next Steps

1. Add sample data to your database
2. Customize templates and content
3. Set up custom domain
4. Deploy to production (see `DEPLOYMENT_GUIDE.md`)

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Check browser console for detailed error messages

---



