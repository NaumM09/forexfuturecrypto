import React from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';
import ourStory from "./../../images/ourStory.png";
import Mission from "./../../images/Psychology.jpg";
import TraderStream from "./../../images/TraderStream.png";
import RSA from "./../../images/RSA.png";

const AboutPage = () => {
  // Animation variants for better organization
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="about-page">
      {/* Modern Hero Section with Overlay */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            About <span className="highlight">Us</span>
          </motion.h1>
          <motion.p 
            className="hero-tagline"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering African traders to thrive in global markets
          </motion.p>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container">
          <div className="two-column">
            <motion.div 
              className="intro-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-heading">
                <span className="subtitle">Our Story</span>
                <h2>Africa's Premier Trading Community</h2>
              </div>
              <p>
                Founded in 2024, our platform was born from a simple observation: talented African 
                traders were disconnected from each other and from the global trading community. 
                Despite Africa's rapidly growing financial markets, there was no centralised 
                ecosystem where traders could connect, learn, and grow together.
              </p>
              <p>
                What started as a small WhatsApp group for forex traders in South Africa has evolved 
                into the continent's most vibrant trading community platform, serving thousands of 
                traders across all 54 African nations.
              </p>
              <div className="stat-highlights">
                <div className="stat">
                  <span className="stat-number">54</span>
                  <span className="stat-label">African Nations</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25K+</span>
                  <span className="stat-label">Community Members</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="intro-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img src={ourStory} alt="Trading community members" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission Section with Card Design */}
      <section className="mission-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="subtitle">Our Mission</span>
            <h2>Democratizing Access to Global Markets</h2>
          </div>
          
          <div className="mission-content">
            <motion.p 
              className="mission-statement"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              We believe that access to global financial markets should be democratised, and that 
              African traders deserve a platform built for their unique needs and challenges. Our mission is 
              to empower African traders with the knowledge, community, and tools they need to compete 
              confidently in global markets, while building wealth and financial independence.
            </motion.p>
            
            <div className="mission-pillars">
              <motion.div 
                className="pillar-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="pillar-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Education First</h3>
                <p>Making quality trading education accessible to all Africans</p>
              </motion.div>
              
              <motion.div 
                className="pillar-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="pillar-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Community Driven</h3>
                <p>Building supportive networks that elevate everyone</p>
              </motion.div>
              
              <motion.div 
                className="pillar-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="pillar-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Trader Protection</h3>
                <p>Promoting ethical practices and protecting our community</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section with Modern Card Layout */}
      <section className="services-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="subtitle">What We Do</span>
            <h2>Our Platform Services</h2>
            <p className="section-intro">
              Our platform serves as the central hub for African traders, providing everything needed to succeed
            </p>
          </div>
          
          <div className="services-grid">
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="service-icon">
                <i className="fas fa-people-group"></i>
              </div>
              <div className="service-content">
                <h3>Trading Communities</h3>
                <p>Connect with verified trading communities and mentors from across Africa, sharing strategies and insights in a supportive environment.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="service-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <div className="service-content">
                <h3>Educational Resources</h3>
                <p>Access curated learning materials, webinars, and trading courses designed specifically for African market conditions and contexts.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="service-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="service-content">
                <h3>Trading Challenges</h3>
                <p>Test your skills in our trading challenges and competitions, with opportunities to win capital and showcase your talent.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="service-icon">
                <i className="fas fa-newspaper"></i>
              </div>
              <div className="service-content">
                <h3>Market Insights</h3>
                <p>Stay informed with regular market analyses and African-focused reports that highlight relevant trading opportunities.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="service-icon">
                <i className="fas fa-building-columns"></i>
              </div>
              <div className="service-content">
                <h3>Prop Firm Partnerships</h3>
                <p>Access exclusive partnerships with proprietary trading firms, offering funded accounts to qualifying African traders.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="service-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="service-content">
                <h3>Trading Events</h3>
                <p>Join virtual and in-person trading events, conferences, and meetups to build your network and expand your knowledge.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Projects Section with Tabs */}
      <section className="projects-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="subtitle">Current Projects</span>
            <h2>Innovating African Trading</h2>
            <p className="section-intro">
              We're continuously developing innovative solutions to transform the African trading landscape
            </p>
          </div>
          
          <div className="projects-showcase">
            <motion.div 
              className="project-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="project-image">
                <img src={TraderStream} alt="TraderStream Platform" />
                <div className="project-status">
                  <span className="status in-development">In Development • Q3 2025</span>
                </div>
              </div>
              <div className="project-content">
                <h3>TraderStream</h3>
                <p className="project-category">Trading Streaming Platform</p>
                <p>
                  TraderStream enables traders to livestream their trading sessions, share insights in real-time, and build their personal brand while monetising their expertise. This platform addresses the need for transparency in trading education while creating new income opportunities for skilled traders.
                </p>
                <div className="project-features">
                  <span className="feature"><i className="fas fa-video"></i> Live Trading Sessions</span>
                  <span className="feature"><i className="fas fa-comments"></i> Real-time Community Interaction</span>
                  <span className="feature"><i className="fas fa-chart-line"></i> Performance Analytics</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="project-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="project-image">
                <img src={RSA} alt="RSA Humanitarian Coin" />
                <div className="project-status">
                  <span className="status upcoming">Launching • Q2 2025</span>
                </div>
              </div>
              <div className="project-content">
                <h3>$RSA Humanitarian Coin</h3>
                <p className="project-category">Social Impact through Blockchain</p>
                <p>
                  The $RSA Humanitarian Coin is our initiative to leverage blockchain technology for social impact. This coin aims to raise awareness and provide support for humanitarian crises in Palestine and the Democratic Republic of Congo.
                </p>
                <div className="project-features">
                  <span className="feature"><i className="fas fa-hand-holding-heart"></i> Direct Humanitarian Support</span>
                  <span className="feature"><i className="fas fa-shield-alt"></i> Transparent Fund Allocation</span>
                  <span className="feature"><i className="fas fa-globe"></i> Global Awareness Building</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section with Cards */}
      <section className="values-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="subtitle">Our Values</span>
            <h2>What Guides Us</h2>
          </div>
          
          <div className="values-grid">
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Integrity</h3>
              <p>
                We promote ethical trading practices and transparency in all community interactions, rigorously vetting all trading communities on our platform.
              </p>
            </motion.div>
            
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously develop new tools and resources that address the unique challenges faced by African traders in global markets.
              </p>
            </motion.div>
            
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="value-icon">
                <i className="fas fa-globe-africa"></i>
              </div>
              <h3>Pan-African</h3>
              <p>
                We embrace diversity and unite traders from all African countries, recognising that our collective strength lies in our shared knowledge and experiences.
              </p>
            </motion.div>
            
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="value-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Growth Mindset</h3>
              <p>
                We believe in continuous learning and improvement, helping traders develop both technical skills and psychological resilience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How to Join Section - Updated Structure */}
<section className="join-section">
  <div className="container">
    <div className="join-heading-container">
      <span className="join-subtitle">HOW TO JOIN</span>
      <h2 className="join-title">Be Part of the Movement</h2>
      <p className="join-description">
        There are multiple ways to partner with us and contribute to Africa's trading revolution
      </p>
    </div>
    
    <div className="join-grid">
      <div className="join-card">
        <div className="join-header">
          <div className="join-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <h3>For Traders</h3>
        </div>
        <p>
          Join our community platform to access educational resources, connect with fellow traders, and participate in trading challenges. Sign up for free and upgrade to premium for advanced features.
        </p>
        <a href="/auth" className="join-button">
          Create Account <i className="fas fa-arrow-right"></i>
        </a>
      </div>
      
      <div className="join-card">
        <div className="join-header">
          <div className="join-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <h3>For Businesses</h3>
        </div>
        <p>
          Explore partnership opportunities to reach African traders, integrate your services with our platform, or collaborate on educational initiatives. We offer flexible partnership models for mutual growth.
        </p>
        <a href="https://api.whatsapp.com/send/?phone=%2B27810593062&text&type=phone_number&app_absent=0" className="join-button">
          Explore Partnerships <i className="fas fa-arrow-right"></i>
        </a>
      </div>
      
      <div className="join-card">
        <div className="join-header">
          <div className="join-icon">
            <i className="fas fa-hand-holding-usd"></i>
          </div>
          <h3>For Investors</h3>
        </div>
        <p>
          Connect with our team to learn about investment opportunities, current funding rounds, and our detailed growth projections. We welcome both strategic and financial investors aligned with our mission.
        </p>
        <a href="https://api.whatsapp.com/send/?phone=%2B27810593062&text&type=phone_number&app_absent=0" className="join-button">
          Investment Opportunities <i className="fas fa-arrow-right"></i>
        </a>
      </div>
      
      <div className="join-card">
        <div className="join-header">
          <div className="join-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h3>For Educators</h3>
        </div>
        <p>
          If you're an experienced trader or financial educator, apply to become a verified mentor on our platform. Share your knowledge, build your following, and create new income streams.
        </p>
        <a href="/community" className="join-button">
          Become a Mentor <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Join Africa's Fastest Growing Trading Ecosystem</h2>
            <p>
              Be part of a movement that's transforming how Africans trade, learn, and succeed in global markets.
            </p>
            <div className="cta-buttons">
              <a href="/auth" className="primary-button">Create Free Account</a>
              <a href="/community" className="secondary-button">Explore Communities</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;