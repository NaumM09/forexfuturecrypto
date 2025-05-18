// Firebase function: index.js - Using OAuth2 instead of password
require("dotenv").config();

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const cors = require("cors")({ origin: true });

// Function to create OAuth2 transporter
const createTransporter = async () => {
  try {
    // Get config values
    const clientId = process.env.GOOGLE_CLIENT_ID || functions.config().gmail.client_id;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || functions.config().gmail.client_secret;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN || functions.config().gmail.refresh_token;
    const userEmail = process.env.GMAIL_EMAIL || functions.config().gmail.email;
    
    if (!clientId || !clientSecret || !refreshToken || !userEmail) {
      throw new Error("Missing OAuth2 configuration");
    }

    // Create OAuth2 client
    const OAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      "https://developers.google.com/oauthplayground"
    );
    OAuth2Client.setCredentials({ refresh_token: refreshToken });

    // Get access token
    const accessToken = await OAuth2Client.getAccessToken();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: userEmail,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken.token
      }
    });

    return transporter;
  } catch (error) {
    logger.error("Error creating transporter:", error);
    throw error;
  }
};

// The email sending function
exports.sendContactEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      // Get values from request body
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).send("Missing required fields");
      }

      // Get email to send to
      const destinationEmail = process.env.DESTINATION_EMAIL || 
                              functions.config().gmail.destination || 
                              "naum@forexfuturescrypto.com";

      // Create transporter (using OAuth2)
      const transporter = await createTransporter();

      // Setup email
      const mailOptions = {
        from: process.env.GMAIL_EMAIL || functions.config().gmail.email,
        replyTo: email, // So replies go to the user
        to: destinationEmail,
        subject: `New Investment Opportunity: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <h2>New Investment Opportunity Application</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="white-space: pre-line; margin-top: 20px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      logger.info("Email sent successfully");
      return res.status(200).send("Email sent successfully");
    } catch (error) {
      logger.error("Error sending email", error);
      return res.status(500).send(`Error sending email: ${error.message}`);
    }
  });
});