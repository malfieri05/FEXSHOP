require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER, // send to yourself for testing
  subject: 'Test Email from Nodemailer',
  text: 'If you received this, your Gmail SMTP is working!',
  html: '<b>If you received this, your Gmail SMTP is working!</b>'
}, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Email sent:', info.response);
  }
}); 