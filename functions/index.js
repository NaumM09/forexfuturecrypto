require("dotenv").config();

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// Email config — use environment variables for security
const gmailEmail = process.env.GMAIL_EMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;

// Setup the transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// The function to handle contact form email submissions
exports.sendContactEmail = onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send("Missing fields");
    }

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "naum@forexfuturescrypto.com", // Where the email will be sent
      subject: `New message from ${name} via website`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error("Error sending email", error);
        return res.status(500).send("Email failed to send");
      }
      logger.info("Email sent", info.response);
      return res.status(200).send("Email sent successfully");
    });
  });
});
