const nodemailer = require('nodemailer');

// In-memory storage for OTPs and contact data
const otpStorage = new Map();
const contactDataStorage = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create nodemailer transporter with optimized settings for Render
const createTransporter = () => {
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: process.env.EMAIL_SECURE === 'true', // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 60000,
    socketTimeout: 60000,
    pool: false, // Disable pooling for better reliability
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
      ciphers: 'HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH'
    },
    // Additional settings for better reliability
    requireTLS: false,
    opportunisticTLS: true
  };

  console.log('Creating transporter with config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user,
    hasPassword: !!config.auth.pass
  });

  return nodemailer.createTransport(config);
};

// Verify transporter connection with retries
const verifyTransporter = async (transporter, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Verifying transporter (attempt ${i + 1}/${retries})...`);
      await transporter.verify();
      console.log('Email transporter verified successfully');
      return true;
    } catch (error) {
      console.error(`Verification attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) {
        console.error('All verification attempts failed');
        return false;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return false;
};

// Send OTP to user's email
exports.sendOTP = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please contact administrator.'
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

    // Verify connection before sending (with retries)
    const isVerified = await verifyTransporter(transporter);
    if (!isVerified) {
      console.error('Failed to verify email transporter after retries');
      return res.status(500).json({
        success: false,
        message: 'Email service connection failed. Please try again later.'
      });
    }

    // Email template for OTP
    const mailOptions = {
      from: `"Queensland Steel Frame Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification - Queensland Steel Frame Solutions',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a2b4a, #2d4373); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .otp-box { background: white; border: 2px solid #1a2b4a; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .otp { font-size: 32px; font-weight: bold; color: #1a2b4a; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Queensland Steel Frame Solutions</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for contacting Queensland Steel Frame Solutions Pty Ltd.</p>
              <p>To complete your message submission, please verify your email address by entering the following OTP:</p>
              <div class="otp-box">
                <div class="otp">${otp}</div>
              </div>
              <p><strong>This OTP is valid for 10 minutes.</strong></p>
              <p>If you didn't request this, please ignore this email.</p>
              <div class="footer">
                <p>&copy; 2024 Queensland Steel Frame Solutions Pty Ltd. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log('Attempting to send OTP email to:', email);

    // Send email with timeout
    await transporter.sendMail(mailOptions);

    console.log('OTP email sent successfully to:', email);

    // Close transporter
    transporter.close();

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      contactId: contactId
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
};

// Verify OTP and send notification to owner
exports.verifyOTP = async (req, res) => {
  try {
    const { contactId, otp } = req.body;

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
        message: 'Invalid or expired OTP'
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
        message: 'Invalid OTP. Please try again.'
      });
    }

    // Get contact data
    const contactData = contactDataStorage.get(contactId);
    if (!contactData) {
      return res.status(400).json({
        success: false,
        message: 'Contact data not found'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify connection before sending (with retries)
    const isVerified = await verifyTransporter(transporter);
    if (!isVerified) {
      return res.status(500).json({
        success: false,
        message: 'Email service connection failed. Please try again later.'
      });
    }

    // Send notification to owner
    const ownerMailOptions = {
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form Submission - ${contactData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a2b4a, #2d4373); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; border-left: 4px solid #1a2b4a; padding: 15px; margin: 15px 0; }
            .label { font-weight: bold; color: #1a2b4a; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>Queensland Steel Frame Solutions</p>
            </div>
            <div class="content">
              <h2>Contact Details</h2>
              <div class="info-box">
                <p><span class="label">Name:</span> ${contactData.name}</p>
              </div>
              <div class="info-box">
                <p><span class="label">Email:</span> ${contactData.email}</p>
              </div>
              <div class="info-box">
                <p><span class="label">Phone:</span> ${contactData.phone}</p>
              </div>
              <div class="info-box">
                <p><span class="label">Subject:</span> ${contactData.subject}</p>
              </div>
              <div class="message-box">
                <h3>Message:</h3>
                <p>${contactData.message.replace(/\n/g, '<br>')}</p>
              </div>
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                This message was sent from the Queensland Steel Frame Solutions website contact form on ${new Date().toLocaleString()}.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send confirmation email to user
    const userConfirmationOptions = {
      from: `"Queensland Steel Frame Solutions" <${process.env.EMAIL_USER}>`,
      to: contactData.email,
      subject: 'Thank You for Contacting Us',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a2b4a, #2d4373); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You!</h1>
            </div>
            <div class="content">
              <h2>Hello ${contactData.name},</h2>
              <p>Thank you for contacting Queensland Steel Frame Solutions Pty Ltd.</p>
              <p>We have received your message and will get back to you as soon as possible.</p>
              <p>Our team typically responds within 24-48 business hours.</p>
              <p>If you have any urgent queries, please feel free to call us directly.</p>
              <div class="footer">
                <p>&copy; 2024 Queensland Steel Frame Solutions Pty Ltd. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log('Attempting to send confirmation emails...');

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userConfirmationOptions)
    ]);

    console.log('Confirmation emails sent successfully');

    // Close transporter
    transporter.close();

    // Clean up stored data
    otpStorage.delete(contactId);
    contactDataStorage.delete(contactId);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP. Please try again.',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
};