import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaystackPop from "@paystack/inline-js"; // Paystack Inline JS library
import { db } from "../firebase"; // Import Firestore instance
import "../styles/Payment.css"; // Import your custom CSS

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [subscriptionRef, setSubscriptionRef] = useState("");
  const [amount, setAmount] = useState(0); // Set default amount
  const navigate = useNavigate();
  const location = useLocation();

  // Extract subscriptionRef from the query string
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const ref = query.get("ref");
    if (ref) {
      setSubscriptionRef(ref);
      // Set amount based on subscriptionRef (Beginner: R10, Pro: R25)
      setAmount(ref === "beginner" ? 10 : 25);  // Default to 10 for Beginner, 25 for Pro Plan
    }
  }, [location]);

  // Convert the amount to Kobo (Paystack uses Kobo, not Naira directly)
  const convertToKobo = (amountInRands) => {
    const exchangeRate = 18.5; // Example exchange rate for USD to ZAR
    return Math.round(amountInRands * exchangeRate) * 100; // Paystack expects Kobo
  };

  const handlePayment = () => {
    setLoading(true);
    const paystack = new PaystackPop();
    const reference = `ref_${new Date().getTime()}`;

    const amountInKobo = convertToKobo(amount);

    // Get the public key from environment variables
    const paystackPublicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

    // Paystack payment request
    paystack.newTransaction({
      key: paystackPublicKey, // Using the public key from .env
      email: "user_email@domain.com", // Replace with user's email
      amount: amountInKobo, // Amount in Kobo
      reference,
      onSuccess: async (transaction) => {
        console.log(`Payment successful: ${transaction.reference}`);

        // Save subscription data in Firestore
        try {
          const userId = "userId_from_auth"; // Get user ID (assuming they are authenticated)
          const userDocRef = db.collection("subscriptions").doc(userId);

          // Update the subscription info
          await userDocRef.set({
            subscriptionRef,
            paymentReference: transaction.reference,
            amount,
            paymentDate: new Date(),
            planType: subscriptionRef === "beginner" ? "Beginner" : "Pro", // Example plans
          });

          alert("Payment successful! Redirecting to dashboard...");
          navigate("/dashboard"); // Redirect to dashboard after successful payment
        } catch (error) {
          console.error("Error saving payment info:", error);
          alert("Error occurred while processing payment. Please try again.");
        }
      },
      onCancel: () => {
        alert("Payment cancelled. Please try again.");
        navigate("/pricing"); // Navigate to the pricing page or handle cancellation
      },
    });
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <p>Proceed with your payment to access the course material.</p>

      <div className="payment-info">
        <p>Subscription: {subscriptionRef === "beginner" ? "Beginner Plan" : "Pro Plan"}</p>
        <p>Amount: R{amount}</p>
      </div>

      <button className="payment-btn" onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
