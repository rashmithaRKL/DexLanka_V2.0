# EmailJS Reply Template Setup Guide

## Overview
This guide will help you set up EmailJS templates for sending automatic replies to contact form submissions.

## Step 1: Create Reply Template in EmailJS

1. **Go to EmailJS Dashboard** → **Email Templates**
2. **Click "Create New Template"**
3. **Template ID**: `template_reply` (or choose your own)

## Step 2: Template Content

Copy and paste this HTML template into the EmailJS template editor:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Reply from DexLanka</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for contacting us</p>
  </div>

  <!-- Content -->
  <div style="background: #f8f9fa; padding: 25px; border: 1px solid #e9ecef; border-top: none;">
    
    <!-- Greeting -->
    <div style="margin-bottom: 20px;">
      <p style="color: #2c3e50; font-size: 16px; margin: 0;">Hello {{to_name}},</p>
    </div>

    <!-- Reply Content -->
    <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">{{reply_subject}}</h2>
      <div style="color: #2c3e50; font-size: 15px; line-height: 1.6; white-space: pre-line;">
        {{reply_content}}
      </div>
    </div>

    <!-- Original Message Reference -->
    <div style="background: #f8f9fa; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 20px; border-radius: 0 4px 4px 0;">
      <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 14px;">Your Original Message:</h3>
      <p style="margin: 0; color: #6c757d; font-size: 13px; font-style: italic;">{{original_message}}</p>
    </div>

    <!-- Contact Information -->
    <div style="background: white; border-radius: 8px; padding: 20px; text-align: center; border: 2px solid #dc2626;">
      <h3 style="margin: 0 0 15px 0; color: #2c3e50;">Need More Help?</h3>
      <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <p style="margin: 0; font-weight: bold; color: #2c3e50;">Email</p>
          <a href="mailto:dexlanka@gmail.com" style="color: #dc2626; text-decoration: none;">dexlanka@gmail.com</a>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; font-weight: bold; color: #2c3e50;">Phone</p>
          <a href="tel:+94705588789" style="color: #dc2626; text-decoration: none;">+94 70 558 8789</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #2c3e50; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
    <p style="margin: 0;">This is an automated reply from DexLanka</p>
    <p style="margin: 5px 0 0 0; opacity: 0.8;">Reply to this email to continue the conversation</p>
  </div>
</div>
```

## Step 3: Template Variables

Make sure these variables are available in your EmailJS template:

### Recipient Information (Customer who contacted you):
- `{{to_name}}` - Customer's name (e.g., "John Doe")
- `{{to_email}}` - Customer's email (e.g., "john@example.com")

### Sender Information (DexLanka):
- `{{from_name}}` - Sender name ("DexLanka Team")
- `{{from_email}}` - Sender email ("dexlanka@gmail.com")

### Reply Content:
- `{{reply_subject}}` - Reply subject line
- `{{reply_content}}` - Reply message content

### Original Message Context:
- `{{original_message}}` - Customer's original contact form message
- `{{original_subject}}` - Customer's original subject

### Email Settings:
- `{{reply_to}}` - Email address for customer to reply to ("dexlanka@gmail.com")
- `{{message_id}}` - Unique message ID for tracking

## Important: Email Direction
- **FROM**: `dexlanka@gmail.com` (DexLanka)
- **TO**: `{{to_email}}` (Customer who contacted you)
- **REPLY-TO**: `dexlanka@gmail.com` (Customer replies go back to DexLanka)

## Step 4: Update Environment Variables

Add this to your `.env` file:

```env
# EmailJS Configuration for Replies
VITE_EMAILJS_REPLY_TEMPLATE_ID=template_reply
```

## Step 5: Test the Template

1. **Save the template** in EmailJS
2. **Test it** using the "Test It" button in EmailJS
3. **Update the ReplyModal component** if you use a different template ID

## Alternative: Use Existing Template

If you want to use your existing contact template (`template_4u4sfmm`), you can modify the ReplyModal to use the same template with different parameters.

## Template Features

✅ **Professional Design** - Matches DexLanka branding  
✅ **Responsive Layout** - Works on all devices  
✅ **Original Message Reference** - Shows what they contacted about  
✅ **Contact Information** - Easy access to phone/email  
✅ **Auto-reply Indicator** - Clear that it's an automated response  
✅ **Reply Functionality** - Recipients can reply directly  

## Usage

Once set up, the reply system will:
1. **Open reply modal** when clicking reply button
2. **Choose from templates** or write custom reply
3. **Send via Gmail** using EmailJS
4. **Update message status** to "Replied"
5. **Show success confirmation** to admin

The reply will be sent from `dexlanka@gmail.com` to the customer's email address with professional formatting and all the original message context.
