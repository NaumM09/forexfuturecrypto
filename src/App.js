import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import Services from "./components/Service";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// import Challenge from "./components/Challenge";
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
import ProfilePage from "./components/Profile"; // Import ProfilePage component
import { auth } from "./firebase"; // Firebase configuration
import { onAuthStateChanged } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
// import Resource from "./components/Resource";
import Articles from "./components/Articles"; // Articles section component
import PodcastSection from "./components/Podcast"; // Import the new PodcastSection
import "./App.css";

// Individual article pages
import Article2025BullRun from "./pages/articles/Article2025BullRun";
import Article2025ForexOutlook from "./pages/articles/Article2025ForexOutlook";
import ArticleAIInTrading from "./pages/articles/ArticleAIInTrading";
import ArticleTradeWars from "./pages/articles/ArticleTradeWars";
import GlobalExchangeBanner from "./components/GlobalExchangeBanner";
import Community from "./pages/navbar/community"; // Import the Community page
import Eventspage from "./pages/navbar/events"; // Import the Community page
import Resourcespage from "./pages/navbar/resources";
import AboutPage from "./pages/navbar/about";


// Individual Footer Page
import OpportunitiesPage from "./pages/footer/OpportunitiesPage";


const App = () => {
  // Simple auth listener to log authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);
      } else {
        console.log("No authenticated user.");
      }
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const MainApp = () => {
    const location = useLocation(); 
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
                <PodcastSection /> {/* Add the new Podcast Section */}
                {/* <Resource/> */}
                {/* <Challenge /> */}
                <Articles /> {/* Include Articles section */}
                <Contact />
                <WhatsAppButton />
              </>
            }
          />
          
          {/* Authentication Routes */}
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerificationPage />} />
          <Route path="/auth-handler" element={<AuthHandler />} />
          
          {/* Profile Page - accessible to authenticated users */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path="/admin-upload" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminUpload />
            </ProtectedRoute>
          } />
          
          {/* Feature Routes - accessible to all, but with enhanced functionality for authenticated users */}
          <Route path="/events" element={<Eventspage />} />
          <Route path="/resources" element={<Resourcespage />} />
          <Route path="/about" element={< AboutPage/>} />
            <Route path="/opportunities" element ={<OpportunitiesPage/>}/>
          
          {/* Articles Routes */}
          <Route path="/articles/2025-bull-run" element={<Article2025BullRun />} />
          <Route path="/articles/2025-forex-outlook" element={<Article2025ForexOutlook />} />
          <Route path="/articles/ai-in-trading" element={<ArticleAIInTrading />} />
          <Route path="/articles/trade-wars-2025" element={<ArticleTradeWars/>} />
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