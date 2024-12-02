import React, { useState } from 'react';
import Hero from "./components/Hero";
import PricingPlan from "./components/PricingPlan";
import Disclaimer from "./components/Disclaimer";
import Testimonial from "./components/Testimonial";
import CertificateSection from "./components/CertificateSection";
import Strategy from "./components/Strategy";
import Contact from "./components/Contact"; // Import Contact section
import Footer from "./components/Footer";   // Import Footer section
import TradingMemeCarousel from "./components/TradingMemeCarousel";
import MarketCarousel from './components/MarketCarousel';
import WhyChooseUs from "./components/WhyChooseUs";
import FAQ from "./components/FAQ";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <div className="app">
      <MarketCarousel />
      <Hero />
      <Strategy />
      <TradingMemeCarousel />
      <Testimonial />
      <WhyChooseUs />
      <PricingPlan />
      <CertificateSection />
      <FAQ />
      <Contact />
      <Disclaimer />
      <Footer />
    </div>
  );
};

export default App;


