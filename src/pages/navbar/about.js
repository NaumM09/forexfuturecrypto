import React from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';
import ourStory from "./../../images/ourStory.png";
import Mission from "./../../images/Psychology.jpg";
import TraderStream from "./../../images/TraderStream.png";
import RSA from "./../../images/RSA.png";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-highlight">Us</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Empowering African traders to thrive in global markets
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="section-grid">
            <div className="content-column">
              <h2>Our Story</h2>
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
              <p>
                Today, we provide a comprehensive ecosystem that brings together trading education, 
                community connections, market insights, and technological tools.
              </p>
            </div>
            <div className="image-column">
              <img src={ourStory} alt="Trading community members" className="about-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission">
        <div className="container">
          <div className="section-grid reverse">
            <div className="content-column">
              <h2>Our Mission</h2>
              <p>
                We believe that access to global financial markets should be democratised, and that 
                African traders deserve a platform built for their unique needs and challenges.
              </p>
              <p>
                Our mission is to empower African traders with the knowledge, community, and tools 
                they need to compete confidently in global markets, while building wealth and 
                financial independence.
              </p>
              <div className="mission-points">
                <div className="mission-point">
                  <div className="point-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="point-text">
                    <h4>Education First</h4>
                    <p>Making quality trading education accessible to all Africans</p>
                  </div>
                </div>
                <div className="mission-point">
                  <div className="point-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="point-text">
                    <h4>Community Driven</h4>
                    <p>Building supportive networks that elevate everyone</p>
                  </div>
                </div>
                <div className="mission-point">
                  <div className="point-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="point-text">
                    <h4>Trader Protection</h4>
                    <p>Promoting ethical practices and protecting our community</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="image-column">
              <img src={Mission} alt="Trader analysis" className="about-image" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do">
        <div className="container">
          <h2 className="centered-heading">What We Do</h2>
          <p className="centered-subheading">
            Our platform serves as the central hub for African traders, providing everything needed to succeed
          </p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-people-group"></i>
              </div>
              <h3>Trading Communities</h3>
              <p>
                Connect with verified trading communities and mentors from across Africa, sharing strategies and insights in a supportive environment.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Educational Resources</h3>
              <p>
                Access curated learning materials, webinars, and trading courses designed specifically for African market conditions and contexts.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Trading Challenges</h3>
              <p>
                Test your skills in our trading challenges and competitions, with opportunities to win capital and showcase your talent.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-newspaper"></i>
              </div>
              <h3>Market Insights</h3>
              <p>
                Stay informed with regular market analyses and African-focused reports that highlight relevant trading opportunities.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-building-columns"></i>
              </div>
              <h3>Prop Firm Partnerships</h3>
              <p>
                Access exclusive partnerships with proprietary trading firms, offering funded accounts to qualifying African traders.
              </p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Trading Events</h3>
              <p>
                Join virtual and in-person trading events, conferences, and meetups to build your network and expand your knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section className="current-projects">
        <div className="container">
          <h2 className="centered-heading">Current Projects</h2>
          <p className="centered-subheading">
            We're continuously developing innovative solutions to transform the African trading landscape
          </p>
          
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <img src={TraderStream } alt="TraderStream Platform" className="project-img" />
              </div>
              <div className="project-content">
                <h3>TraderStream</h3>
                <p className="project-subtitle">Trading Streaming Platform</p>
                <p className="project-description">
                  TraderStream is our flagship project that enables traders to livestream their trading sessions, share insights in real-time, and build their personal brand while monetising their expertise. This platform addresses the need for transparency in trading education while creating new income opportunities for skilled traders.
                </p>
                <div className="project-features">
                  <div className="feature">
                    <i className="fas fa-video"></i>
                    <span>Live Trading Sessions</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-comments"></i>
                    <span>Real-time Community Interaction</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-chart-line"></i>
                    <span>Performance Analytics</span>
                  </div>
                </div>
                <div className="project-status">
                  <div className="status-indicator in-development"></div>
                  <span>In Development • Q3 2025 Launch</span>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image">
                <img src={RSA} alt="RSA Humanitarian Coin" className="project-img" />
              </div>
              <div className="project-content">
                <h3>$RSA Humanitarian Coin</h3>
                <p className="project-subtitle">Social Impact through Blockchain</p>
                <p className="project-description">
                  The $RSA Humanitarian Coin is our initiative to leverage blockchain technology for social impact. This coin aims to raise awareness and provide support for humanitarian crises in Palestine and the Democratic Republic of Congo. By tokenizing compassion, we're creating a direct channel for the global community to contribute to critical humanitarian efforts.
                </p>
                <div className="project-features">
                  <div className="feature">
                    <i className="fas fa-hand-holding-heart"></i>
                    <span>Direct Humanitarian Support</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-shield-alt"></i>
                    <span>Transparent Fund Allocation</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-globe"></i>
                    <span>Global Awareness Building</span>
                  </div>
                </div>
                <div className="project-status">
                  <div className="status-indicator upcoming"></div>
                  <span>Token Launch • Q2 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values">
        <div className="container">
          <h2 className="centered-heading">Our Values</h2>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Integrity</h3>
              <p>
                We promote ethical trading practices and transparency in all community interactions, rigorously vetting all trading communities on our platform.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously develop new tools and resources that address the unique challenges faced by African traders in global markets.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-globe-africa"></i>
              </div>
              <h3>Pan-African</h3>
              <p>
                We embrace diversity and unite traders from all African countries, recognising that our collective strength lies in our shared knowledge and experiences.
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Growth Mindset</h3>
              <p>
                We believe in continuous learning and improvement, helping traders develop both technical skills and psychological resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Inspiration Section */}
      <section className="our-inspiration">
        <div className="container">
          <div className="inspiration-container">
            <div className="inspiration-content">
              <h2>What Inspired FX Futures Crypto</h2>
              <p>
                Our founding team's journey began with a collective frustration: despite Africa's immense talent and potential in trading markets, there was a systemic lack of infrastructure, education, and community support tailored to African traders' unique needs.
              </p>
              <p>
                Having experienced firsthand the challenges of navigating global markets from an African perspective, we recognized that the problem wasn't a lack of talent—it was a lack of ecosystem. 
              </p>
              <p>
                This realisation sparked our mission to build more than just a platform—to create a complete ecosystem that addresses the entire spectrum of needs for African traders, from education to community, from market insights to trading infrastructure. We're driven by the vision of African traders achieving financial sovereignty through collective empowerment.
              </p>
              <p>
                Today, that vision has evolved into a movement that spans the continent, creating opportunities not just for trading success, but for the development of Africa's emerging digital economy.
              </p>
            </div>
            <div className="inspiration-stats">
              <div className="stat-item">
                <span className="stat-number">54</span>
                <span className="stat-label">African Nations Served</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25K+</span>
                <span className="stat-label">Community Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How to Join Section */}
      <section className="join-movement">
        <div className="container">
          <h2 className="centered-heading">How to Join the Movement</h2>
          <p className="centered-subheading">
            There are multiple ways to partner with us and contribute to Africa's trading revolution
          </p>
          
          <div className="join-grid">
            <div className="join-card">
              <div className="join-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3>For Traders</h3>
              <p>
                Join our community platform to access educational resources, connect with fellow traders, and participate in trading challenges. Sign up for free and upgrade to premium for advanced features.
              </p>
              <a href="/auth" className="join-link">Create Account <i className="fas fa-chevron-right"></i></a>
            </div>
            
            <div className="join-card">
              <div className="join-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>For Businesses</h3>
              <p>
                Explore partnership opportunities to reach African traders, integrate your services with our platform, or collaborate on educational initiatives. We offer flexible partnership models for mutual growth.
              </p>
              <a href="https://api.whatsapp.com/send/?phone=%2B27810593062&text&type=phone_number&app_absent=0" className="join-link">Explore Partnerships <i className="fas fa-chevron-right"></i></a>
            </div>
            
            <div className="join-card">
              <div className="join-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <h3>For Investors</h3>
              <p>
                Connect with our team to learn about investment opportunities, current funding rounds, and our detailed growth projections. We welcome both strategic and financial investors aligned with our mission.
              </p>
              <a href="https://api.whatsapp.com/send/?phone=%2B27810593062&text&type=phone_number&app_absent=0" className="join-link">Investment Opportunities <i className="fas fa-chevron-right"></i></a>
            </div>
            
            <div className="join-card">
              <div className="join-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>For Educators</h3>
              <p>
                If you're an experienced trader or financial educator, apply to become a verified mentor on our platform. Share your knowledge, build your following, and create new income streams.
              </p>
              <a href="/community" className="join-link">Become a Mentor <i className="fas fa-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="join-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Africa's Fastest Growing Trading Ecosystem</h2>
            <p>
              Be part of a movement that's transforming how Africans trade, learn, and succeed in global markets.
            </p>
            <div className="cta-buttons">
              <a href="/auth" className="primary-button">Create Free Account</a>
              <a href="/community" className="secondary-button">Explore Communities</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;