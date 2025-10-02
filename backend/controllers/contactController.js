const nodemailer = require('nodemailer');

// In-memory storage for OTPs and contact data (use database in production)
const otpStorage = new Map();
const contactDataStorage = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create nodemailer transporter optimized for Gmail
const createTransporter = () => {
  console.log('Creating Gmail transporter for user:', process.env.EMAIL_USER);

  const transportConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000,
    socketTimeout: 60000,
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2'
    }
  };

  return nodemailer.createTransporter(transportConfig);
};

// Test email configuration on startup
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Gmail configuration is valid and ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Gmail configuration test failed:', error.message);
    return false;
  }
};

// Call test on server startup
testEmailConfig();

// Send OTP to user's email
exports.sendOTP = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    console.log('📧 Received OTP request for:', email);

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const contactId = Date.now().toString();

    // Store OTP with expiration (10 minutes)
    const expirationTime = Date.now() + 10 * 60 * 1000;
    otpStorage.set(contactId, { otp, expirationTime });

    // Store contact data
    contactDataStorage.set(contactId, { name, email, phone, subject, message });

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter before sending
    console.log('🔍 Verifying Gmail transporter...');
    await transporter.verify();
    console.log('✅ Gmail transporter verified successfully');

    // Email template for OTP
    const mailOptions = {
      from: `"Queensland Steel Frame Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification - Queensland Steel Frame Solutions',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Arial', 'Helvetica', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .email-container { 
              max-width: 600px; 
              margin: 20px auto; 
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #1a2b4a 0%, #2d4373 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 28px;
              font-weight: 700;
            }
            .header p {
              margin: 0;
              font-size: 16px;
              opacity: 0.9;
            }
            .content { 
              background: #ffffff; 
              padding: 40px 30px;
            }
            .content h2 {
              color: #1a2b4a;
              margin: 0 0 20px 0;
              font-size: 24px;
            }
            .content p {
              color: #555;
              margin: 0 0 15px 0;
              font-size: 16px;
              line-height: 1.6;
            }
            .otp-box { 
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border: 3px solid #1a2b4a; 
              border-radius: 12px; 
              padding: 30px; 
              text-align: center; 
              margin: 30px 0;
              box-shadow: 0 2px 8px rgba(26, 43, 74, 0.1);
            }
            .otp { 
              font-size: 42px; 
              font-weight: bold; 
              color: #1a2b4a; 
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
            }
            .otp-label {
              color: #666;
              font-size: 14px;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .info-box {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .info-box p {
              margin: 0;
              color: #856404;
              font-size: 14px;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              background-color: #f8f9fa;
              border-top: 1px solid #e9ecef;
            }
            .footer p {
              color: #6c757d; 
              font-size: 13px;
              margin: 5px 0;
            }
            .footer a {
              color: #1a2b4a;
              text-decoration: none;
            }
            .button-container {
              text-align: center;
              margin: 30px 0;
            }
            @media only screen and (max-width: 600px) {
              .email-container {
                margin: 10px;
                border-radius: 5px;
              }
              .header {
                padding: 30px 20px;
              }
              .header h1 {
                font-size: 24px;
              }
              .content {
                padding: 30px 20px;
              }
              .otp {
                font-size: 36px;
                letter-spacing: 6px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Queensland Steel Frame Solutions</h1>
              <p>Email Verification Required</p>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for contacting Queensland Steel Frame Solutions Pty Ltd.</p>
              <p>To complete your message submission and verify your email address, please use the One-Time Password (OTP) below:</p>
              
              <div class="otp-box">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp">${otp}</div>
              </div>

              <div class="info-box">
                <p><strong>⏰ This OTP is valid for 10 minutes only.</strong></p>
              </div>

              <p>Please enter this code in the verification window to complete your submission.</p>
              
              <p>If you didn't request this verification, please ignore this email. Your information is safe with us.</p>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                Best regards,<br>
                <strong>Queensland Steel Frame Solutions Team</strong>
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Queensland Steel Frame Solutions Pty Ltd.</p>
              <p>All rights reserved.</p>
              <p style="margin-top: 15px; font-size: 12px;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log('📤 Sending OTP email via Gmail to:', email);
    
    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ OTP email sent successfully via Gmail. Message ID:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      contactId: contactId
    });

  } catch (error) {
    console.error('❌ Error sending OTP via Gmail:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please check your email configuration.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred while sending the email'
    });
  }
};

// Verify OTP and send notification to owner
exports.verifyOTP = async (req, res) => {
  try {
    const { contactId, otp } = req.body;

    console.log('🔐 Verifying OTP for contactId:', contactId);

    // Validate input
    if (!contactId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Contact ID and OTP are required'
      });
    }

    // Check if OTP exists
    const storedData = otpStorage.get(contactId);
    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please request a new one.'
      });
    }

    // Check expiration
    if (Date.now() > storedData.expirationTime) {
      otpStorage.delete(contactId);
      contactDataStorage.delete(contactId);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please check and try again.'
      });
    }

    // Get contact data
    const contactData = contactDataStorage.get(contactId);
    if (!contactData) {
      return res.status(400).json({
        success: false,
        message: 'Contact data not found. Please submit the form again.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    console.log('📧 Sending notification emails...');

    // Email to owner - Professional notification
    const ownerMailOptions = {
      from: `"Queensland Steel Website" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `🔔 New Contact Form Submission - ${contactData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 700px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #1a2b4a 0%, #2d4373 100%); 
              color: white; 
              padding: 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
            }
            .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
            }
            .content { 
              padding: 40px 30px;
            }
            .content h2 {
              color: #1a2b4a;
              border-bottom: 3px solid #2d4373;
              padding-bottom: 10px;
              margin-bottom: 25px;
            }
            .info-row { 
              background: #f8f9fa;
              border-left: 4px solid #1a2b4a; 
              padding: 20px; 
              margin: 15px 0;
              border-radius: 5px;
            }
            .info-row .label { 
              font-weight: bold; 
              color: #1a2b4a;
              display: inline-block;
              width: 100px;
            }
            .info-row .value {
              color: #333;
            }
            .message-box { 
              background: #ffffff;
              border: 2px solid #e9ecef;
              padding: 25px; 
              border-radius: 8px; 
              margin-top: 25px;
            }
            .message-box h3 {
              color: #1a2b4a;
              margin-top: 0;
              margin-bottom: 15px;
            }
            .message-box p {
              color: #555;
              line-height: 1.8;
              white-space: pre-wrap;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px 30px;
              text-align: center;
              border-top: 1px solid #e9ecef;
            }
            .footer p {
              margin: 5px 0;
              color: #6c757d;
              font-size: 13px;
            }
            .timestamp {
              background-color: #e7f3ff;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
              text-align: center;
              color: #0066cc;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>🔔 New Contact Form Submission</h1>
              <p>Queensland Steel Frame Solutions</p>
            </div>
            <div class="content">
              <h2>Contact Details</h2>
              
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${contactData.name}</span>
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></span>
              </div>
              
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${contactData.phone}">${contactData.phone}</a></span>
              </div>
              
              <div class="info-row">
                <span class="label">Subject:</span>
                <span class="value">${contactData.subject}</span>
              </div>
              
              <div class="message-box">
                <h3>📝 Message:</h3>
                <p>${contactData.message.replace(/\n/g, '<br>')}</p>
              </div>

              <div class="timestamp">
                <strong>⏰ Submitted:</strong> ${new Date().toLocaleString('en-AU', { 
                  dateStyle: 'full', 
                  timeStyle: 'long',
                  timeZone: 'Australia/Brisbane'
                })}
              </div>
            </div>
            <div class="footer">
              <p><strong>This is an automated notification from your website contact form.</strong></p>
              <p>Please respond to the customer within 24-48 hours.</p>
              <p style="margin-top: 15px;">&copy; ${new Date().getFullYear()} Queensland Steel Frame Solutions Pty Ltd</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Confirmation email to user - Thank you message
    const userConfirmationOptions = {
      from: `"Queensland Steel Frame Solutions" <${process.env.EMAIL_USER}>`,
      to: contactData.email,
      subject: '✅ Thank You for Contacting Queensland Steel Frame Solutions',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #1a2b4a 0%, #2d4373 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
            }
            .header p {
              margin: 10px 0 0 0;
              font-size: 18px;
              opacity: 0.95;
            }
            .content { 
              padding: 40px 30px;
            }
            .content h2 {
              color: #1a2b4a;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .content p {
              color: #555;
              margin-bottom: 15px;
              font-size: 16px;
              line-height: 1.8;
            }
            .highlight-box {
              background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
              border-left: 4px solid #4caf50;
              padding: 20px;
              margin: 25px 0;
              border-radius: 5px;
            }
            .highlight-box p {
              margin: 0;
              color: #2e7d32;
              font-weight: 500;
            }
            .info-section {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
            }
            .info-section h3 {
              color: #1a2b4a;
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 18px;
            }
            .info-section p {
              margin: 8px 0;
              font-size: 15px;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              background-color: #f8f9fa;
              border-top: 1px solid #e9ecef;
            }
            .footer p {
              color: #6c757d; 
              font-size: 13px;
              margin: 5px 0;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              color: #1a2b4a;
              text-decoration: none;
              margin: 0 10px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>✅ Thank You!</h1>
              <p>Your message has been received</p>
            </div>
            <div class="content">
              <h2>Hello ${contactData.name},</h2>
              
              <p>Thank you for contacting <strong>Queensland Steel Frame Solutions Pty Ltd</strong>.</p>
              
              <div class="highlight-box">
                <p>✓ We have successfully received your message and our team will review it shortly.</p>
              </div>

              <p>We appreciate your interest in our steel frame construction services. Our team is committed to providing you with the best possible service and will get back to you as soon as possible.</p>

              <div class="info-section">
                <h3>📋 Your Submission Summary:</h3>
                <p><strong>Subject:</strong> ${contactData.subject}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-AU', { 
                  dateStyle: 'medium', 
                  timeStyle: 'short',
                  timeZone: 'Australia/Brisbane'
                })}</p>
              </div>

              <div class="info-section">
                <h3>⏱️ What Happens Next?</h3>
                <p>• Our team will review your inquiry</p>
                <p>• You'll receive a response within <strong>24-48 business hours</strong></p>
                <p>• We'll contact you via email or phone based on your preference</p>
              </div>

              <p>If you have any urgent queries, please feel free to call us directly.</p>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                Best regards,<br>
                <strong>The Queensland Steel Frame Solutions Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Queensland Steel Frame Solutions Pty Ltd</strong></p>
              <p>Queensland, Australia</p>
              <p>Email: info@queenslandsteel.com.au | Phone: +61 XXX XXX XXX</p>
              <p style="margin-top: 15px;">&copy; ${new Date().getFullYear()} Queensland Steel Frame Solutions Pty Ltd. All rights reserved.</p>
              <p style="font-size: 12px; margin-top: 15px;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userConfirmationOptions)
    ]);

    console.log('✅ All notification emails sent successfully via Gmail');

    // Clean up stored data
    otpStorage.delete(contactId);
    contactDataStorage.delete(contactId);

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will contact you soon.'
    });

  } catch (error) {
    console.error('❌ Error verifying OTP and sending emails:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    res.status(500).json({
      success: false,
      message: 'Failed to process your request. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
    });
  }
};