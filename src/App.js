import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import Services from "./components/Service";
import Disclaimer from "./components/Disclaimer";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Challenge from "./components/Challenge";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PaymentPage from "./components/PaymentPage";
import AdminUpload from "./components/AdminUpload";
import ResetPasswordPage from "./components/PasswordResetPage";
import ProtectedRoute from "./components/ProtectedRoute";
import VerificationPage from "./components/VerificationPage";
import AuthHandler from "./components/AuthHandler";
import WhatsAppButton from "./components/Whatsapp";
import { auth, db } from "./firebase"; // Firebase configuration
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
// import Resource from "./components/Resource";
import Articles from "./components/Articles"; // Articles section component

// Individual article pages
import Article2025BullRun from "./pages/articles/Article2025BullRun";
import Article2025ForexOutlook from "./pages/articles/Article2025ForexOutlook";
import ArticleAIInTrading from "./pages/articles/ArticleAIInTrading";
import GlobalExchangeBanner from "./components/GlobalExchangeBanner";
import Community from "./pages/navbar/community"; // Import the Community page

const App = () => {

  useEffect(() => {
    // Authentication listener to check user status
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);

        // Perform Firestore operations
        writeToFirestore(user.uid, { name: "Admin", email: "globalexpedyte@gmail.com" });
        readFromFirestore(user.uid);
      } else {
        console.log("No authenticated user.");
      }
    });
  }, []);

  // Function to write to Firestore
  const writeToFirestore = async (userId, data) => {
    try {
      await setDoc(doc(db, "users", userId), data);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document:", error);
    }
  };

  // Function to read from Firestore
  const readFromFirestore = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error reading document:", error);
    }
  };

  const MainApp = () => {
    const location = useLocation(); // Moved useLocation inside the Router context
    const hideNavbarRoutes = ["/dashboard"]; // Define routes where Navbar should be hidden
    const showNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
      <>
        {showNavbar && <Navbar />}
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <GlobalExchangeBanner/>
                {/* <Services /> */}
                <Events />
                {/* <Resource/> */}
                <Challenge />
                <Articles /> {/* Include Articles section */}
                <Contact />
                <Disclaimer />
                <WhatsAppButton />
              </>
            }
          />
          {/* Login Page */}
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin-upload" element={<AdminUpload />} />
          <Route path="/auth-handler" element={<AuthHandler />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerificationPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Community Route */}
          <Route path="/community" element={<Community />} />
          {/* Articles Routes */}
          <Route path="/articles/2025-bull-run" element={<Article2025BullRun />} />
          <Route path="/articles/2025-forex-outlook" element={<Article2025ForexOutlook />} />
          <Route path="/articles/ai-in-trading" element={<ArticleAIInTrading />} />
        </Routes>
        {showNavbar && <Footer />} {/* Conditionally render Footer */}
      </>
    );
  };

  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <MainApp />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;