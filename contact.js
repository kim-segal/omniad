/* eslint-disable no-undef */
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body;

  // Configure your email transport (example uses Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devops@bold-win.com',
      pass: 'akopfoicheywrgvc'
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'devops@bold-win.com',
      subject: `Contact from ${name} (${company})`,
      text: message
    });
    res.status(200).send({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001')); 