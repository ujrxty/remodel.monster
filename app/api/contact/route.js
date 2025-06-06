import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { message: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Get SMTP configuration from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // Check if SMTP configuration is available
    if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
      console.log('SMTP configuration not available');
      return NextResponse.json(
        { 
          message: 'Email service is currently unavailable. Please try again later or contact us directly.',
          details: 'SMTP configuration missing'
        },
        { status: 503 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransporter(smtpConfig);

    // Verify SMTP connection
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        { 
          message: 'Email service is currently unavailable. Please try again later.',
          details: 'SMTP connection failed'
        },
        { status: 503 }
      );
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.SMTP_FROM || smtpConfig.auth.user,
      to: process.env.CONTACT_EMAIL || smtpConfig.auth.user,
      subject: `Contact Form: ${subject}`,
      text: `
Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from Remodel Monster Contact Form
${new Date().toISOString()}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
    Contact Form Submission
  </h2>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Subject:</strong> ${subject}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3 style="color: #333;">Message:</h3>
    <div style="background: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 0 5px 5px 0;">
      ${message.replace(/\n/g, '<br>')}
    </div>
  </div>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
  <p style="color: #6c757d; font-size: 12px;">
    Sent from Remodel Monster Contact Form<br>
    ${new Date().toLocaleString()}
  </p>
</div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if it's a specific SMTP error
    if (error.code === 'EAUTH' || error.code === 'ECONNECTION') {
      return NextResponse.json(
        { 
          message: 'Email service is currently unavailable. Please try again later.',
          details: 'Authentication or connection failed'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}