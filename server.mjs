import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const app = express();
const PORT = 5000; // Port for the server
const PAYSTACK_SECRET_KEY = "sk_test_your_secret_key_here"; // Replace with your Paystack secret key

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Paystack integration server is running!");
});

// Paystack webhook route
app.post("/webhook", (req, res) => {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Unauthorized"); // Signature mismatch
  }

  const event = req.body.event;

  // Handle successful payment event
  if (event === "charge.success") {
    const data = req.body.data;
    const email = data.customer.email;
    const amount = data.amount / 100; // Convert amount from kobo to main currency
    const reference = data.reference;

    console.log(`Payment received from ${email} for R${amount}. Reference: ${reference}`);
    // TODO: Save subscription data to your database here
  }

  res.status(200).send("Webhook received successfully");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
