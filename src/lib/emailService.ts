import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS if configuration is available
if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  // Check if EmailJS is configured
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS not configured. Please set up environment variables.');
  }

  try {
    // Prepare email template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      to_email: 'dexlanka@gmail.com',
      reply_to: formData.email,
    };

    // Send email using EmailJS
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('Email sent successfully:', result);
    
    if (result.status !== 200) {
      throw new Error(`EmailJS returned status: ${result.status}`);
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Fallback method using mailto link generation
export const generateMailtoLink = (formData: ContactFormData): string => {
  const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
  const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}
  `);
  
  return `mailto:dexlanka@gmail.com?subject=${subject}&body=${body}`;
};

// Alternative method using a simple fetch to a backend service
export const sendContactEmailViaAPI = async (formData: ContactFormData): Promise<void> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        to: 'dexlanka@gmail.com',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully via API:', result);
  } catch (error) {
    console.error('Failed to send email via API:', error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
