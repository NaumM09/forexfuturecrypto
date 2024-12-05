import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AnnouncementBanner from "./components/AnnouncementBanner" ;
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from './components/Service';
import PricingPlan from "./components/PricingPlan";
import Disclaimer from "./components/Disclaimer";
import Testimonial from "./components/Testimonial";
import CertificateSection from "./components/CertificateSection";
import Strategy from "./components/Strategy";
import Contact from "./components/Contact"; // Import Contact section
import Footer from "./components/Footer";   // Import Footer section
import WhyChooseUs from "./components/WhyChooseUs";
import FAQ from "./components/FAQ";
import Loader from "./components/Loader";   // Import Loader component
import WhatsAppButton from "./components/Whatsapp";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate loading completion after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="app">
      {loading ? (
        <Loader /> // Show loader while loading is true
      ) : (
        <>
          <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KJYF73XDWR"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KJYF73XDWR');
          `}
        </script>
      </Helmet>
          <Helmet>
            <title>ForexFuturesCrypto | Start Your Trading Journey</title>
            <meta 
              name="description" 
              content="Join our mentorship program to start your funded trading journey and achieve financial freedom." 
            />
          </Helmet>
          <AnnouncementBanner />
          <Router>
            <Navbar />
          </Router>
          <Hero />
          <Services />
          <Strategy />
          <Testimonial />
          <WhyChooseUs />
          <PricingPlan />
          <CertificateSection />
          <FAQ />
          <Contact />
          <Disclaimer />
          <div>
      <WhatsAppButton />
    </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;



