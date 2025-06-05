// Add this at the very top for clarity
// To use Gmail SMTP, create a .env file in your project root with:
// GMAIL_USER=your_gmail_address@gmail.com
// GMAIL_PASS=your_app_password

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Use environment variables
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
});

app.post('/api/send-quote', async (req, res) => {
  const { email, quote, state, burialType, gender, age, coverage, healthTier } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    await transporter.sendMail({
      from: GMAIL_USER,
      to: email,
      subject: 'Your Final Expense Quote',
      html: `
        <div style="font-family: Arial, sans-serif; background: #f0f4fa; padding: 32px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #e0e7ef;">
            <div style="padding: 24px; text-align: center;">
              <h1 style="color: #2563eb;">Your Personalized Final Expense Quote</h1>
              <p style="font-size: 18px; color: #333;">Thank you for requesting a quote, ${req.body.name || email}!</p>
              <div style="background: #e0f2fe; border-radius: 8px; padding: 16px; margin: 24px 0;">
                <strong style="font-size: 24px; color: #2563eb;">$${quote}/month</strong>
                <p style="margin: 8px 0 0 0; color: #555;">State: ${state}<br>Coverage: $${coverage}<br>Health Tier: ${healthTier}</p>
              </div>
              <a href="tel:5037645097" style="display: inline-block; background: #2563eb; color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold;">Contact an Agent</a>
              <p style="margin-top: 32px; color: #888;">FEX Pro &mdash; Your trusted protection partner</p>
            </div>
          </div>
        </div>
      `
    });
    res.json({ success: true });
  } catch (e) {
    console.error('Error sending email:', e);
    res.status(500).json({ error: 'Failed to send quote.' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001')); 