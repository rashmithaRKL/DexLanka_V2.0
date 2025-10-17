# Email Setup Guide for DexLanka Contact Form

This guide will help you set up email notifications for your contact form so that all form submissions are sent directly to `dexlanka@gmail.com`.

## Method 1: EmailJS (Recommended - No Backend Required)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your `dexlanka@gmail.com` account
5. Note down the **Service ID** (e.g., `service_xyz123`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template configuration:

**Template ID:** `template_contact` (or choose your own)

**Template Content (Code Editor):**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">DexLanka Website Contact Form</p>
  </div>

  <!-- Content -->
  <div style="background: #f8f9fa; padding: 25px; border: 1px solid #e9ecef; border-top: none;">
    
    <!-- Contact Info Card -->
    <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="background: #dc2626; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-right: 15px;">
          👤
        </div>
        <div>
          <h2 style="margin: 0; color: #2c3e50; font-size: 20px;">{{from_name}}</h2>
          <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 14px;">{{from_email}}</p>
        </div>
      </div>
      
      <!-- Form Details -->
      <div style="border-top: 1px solid #e9ecef; padding-top: 15px;">
        <div style="display: grid; gap: 12px;">
          <div>
            <strong style="color: #495057; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Subject:</strong>
            <div style="color: #2c3e50; font-size: 16px; margin-top: 4px;">{{subject}}</div>
          </div>
          
          <div>
            <strong style="color: #495057; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone:</strong>
            <div style="color: #2c3e50; font-size: 16px; margin-top: 4px;">{{phone}}</div>
          </div>
          
          <div>
            <strong style="color: #495057; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
            <div style="background: #f8f9fa; border-left: 4px solid #dc2626; padding: 15px; margin-top: 8px; border-radius: 0 4px 4px 0; color: #2c3e50; font-size: 15px; line-height: 1.6;">
              {{message}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Card -->
    <div style="background: white; border-radius: 8px; padding: 20px; text-align: center; border: 2px solid #dc2626;">
      <h3 style="margin: 0 0 15px 0; color: #2c3e50;">Quick Actions</h3>
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
        <a href="mailto:{{from_email}}?subject=Re: {{subject}}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Reply to {{from_name}}
        </a>
        <a href="tel:{{phone}}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Call {{from_name}}
        </a>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #2c3e50; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
    <p style="margin: 0;">This email was sent from the DexLanka contact form</p>
    <p style="margin: 5px 0 0 0; opacity: 0.8;">Reply directly to this email to respond to the customer</p>
  </div>
</div>
```

**Template Variables:**
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone (optional)
- `{{subject}}` - Selected subject
- `{{message}}` - Customer's message

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Environment Variables
Create a `.env` file in your project root and add:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=template_contact
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6: Test the Setup
1. Restart your development server
2. Fill out the contact form on your website
3. Check your `dexlanka@gmail.com` inbox for the email

## Method 2: Alternative - Simple Mailto Fallback

If you prefer a simpler approach without external services, you can use a mailto link as a fallback. The form will still save to your database, and users can click a link to send an email.

### Implementation
The current setup includes both email sending and database storage. If EmailJS fails, the form data is still saved to your Supabase database, and you'll see a message asking users to contact you directly.

## Troubleshooting

### EmailJS Not Working?
1. Check your environment variables are correctly set
2. Verify your EmailJS service is active
3. Check the browser console for error messages
4. Ensure your email template variables match the code

### No Emails Received?
1. Check your spam/junk folder
2. Verify the email address in your EmailJS service
3. Test with a different email address first
4. Check EmailJS dashboard for delivery status

### Form Still Not Working?
1. Check browser console for JavaScript errors
2. Verify all environment variables are loaded
3. Test the form submission step by step

## Free Tier Limits
- EmailJS free tier: 200 emails/month
- If you exceed this, consider upgrading or implementing Method 2

## Security Notes
- Never expose your EmailJS private key in client-side code
- Only use the public key in your frontend application
- Consider rate limiting to prevent spam

## Support
If you need help with the setup, contact the development team or refer to:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Templates Guide](https://www.emailjs.com/docs/templates/)
