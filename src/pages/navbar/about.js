import React from 'react';
import { ChevronRight, MessageCircle, TrendingUp, Users, Globe, Zap, Award, Shield, Coffee, Target } from 'lucide-react';
import "../styles/about.css";
import heroImg from "../../images/website-img.png";
import Collaboration from "../../images/collaboration.jpg";
const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section" style={{backgroundImage: 'url("/api/placeholder/1200/600")'}}>
        <div className="about-hero-overlay"></div>
        <div className="about-container">
          <h1>About <span className="about-highlight">FX Futures Crypto</span></h1>
          <p className="about-hero-tagline">Keeping it real in the trading world - no fluff, no fake gurus, just real people winning together.</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-two-column">
            <div className="about-intro-content">
              <div className="about-section-heading">
                <span className="about-subtitle">Who We Are</span>
                <h2>Trading Made Simple</h2>
              </div>
              <p>At <strong>FX Futures Crypto</strong>, we keep things simple: we're a group of traders, content creators, and fintech lovers building a space where people can actually grow in the trading game—without all the noise.</p>
              <p>We know what it's like to feel overwhelmed by charts, lingo, and constant "get rich quick" advice. That's not us. We're here to keep it real, share what works, and build a community where everyday traders can win together. No fluff. No fake gurus. Just people trying to get better, one trade at a time.</p>
              
              <div className="about-stat-highlights">
                <div className="about-stat">
                  <span className="about-stat-number">1000+</span>
                  <span className="about-stat-label">Community Members</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">24/7</span>
                  <span className="about-stat-label">Trading Support</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">100%</span>
                  <span className="about-stat-label">Transparent Approach</span>
                </div>
              </div>
            </div>
            <div className="about-intro-image">
              <img src={heroImg} alt="FX Futures Crypto Team" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-section-heading about-centered">
            <span className="about-subtitle">OUR MISSION</span>
            <h2 className="about-heading-what-we-do">
              What<br/>
              We<br/>
              Do
            </h2>
            <p className="about-section-intro">We run social media campaigns and brand awareness projects that actually connect with people. No fancy jargon, just real trading talk.</p>
          </div>
          
          <div className="about-mission-content">
            <div className="about-mission-statement-container">
              <p className="about-mission-statement">
                Whether it's breaking down what's happening in the markets or sharing relatable trading moments, we focus on content that feels honest, educational, and easy to vibe with. We're mainly rooted in the fintech space—because that's where the future is. But we do things differently. Instead of trying to sound smart, we focus on making sure what we say <strong>actually makes sense</strong>.
              </p>
            </div>
            
            <div className="about-mission-pillars">
              <div className="about-pillar-card">
                <div className="about-pillar-icon">
                  <TrendingUp />
                </div>
                <h3>Market Education</h3>
                <p>We break down complex market concepts into digestible, actionable insights that traders at any level can understand and implement.</p>
              </div>
              
              <div className="about-pillar-card">
                <div className="about-pillar-icon">
                  <Globe />
                </div>
                <h3>Social Media</h3>
                <p>We create engaging content that resonates with traders, making complex financial concepts accessible and relatable through our various social platforms.</p>
              </div>
              
              <div className="about-pillar-card">
                <div className="about-pillar-icon">
                  <Users />
                </div>
                <h3>Community Building</h3>
                <p>We foster a supportive environment where traders can connect, share insights, and grow together regardless of their experience level.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="about-services-section">
        <div className="about-container">
          <div className="about-section-heading about-centered">
            <span className="about-subtitle">What We Do</span>
            <h2>Our Services</h2>
            <p className="about-section-intro">We use our platforms to educate, entertain, and inspire real conversations around trading and finance.</p>
          </div>
          
          <div className="about-services-grid">
            <div className="about-service-card">
              <div className="about-service-icon">
                <TrendingUp />
              </div>
              <div className="about-service-content">
                <h3>Market Education</h3>
                <p>Breaking down what's happening in the markets in simple, understandable terms that make sense to traders at all levels.</p>
              </div>
            </div>
            
            <div className="about-service-card">
              <div className="about-service-icon">
                <Globe />
              </div>
              <div className="about-service-content">
                <h3>Social Media Campaigns</h3>
                <p>Creating compelling content that connects with real traders and builds authentic engagement around financial topics.</p>
              </div>
            </div>
            
            <div className="about-service-card">
              <div className="about-service-icon">
                <Zap />
              </div>
              <div className="about-service-content">
                <h3>Brand Awareness</h3>
                <p>Helping fintech brands connect with their audience through honest, value-driven content that resonates with the trading community.</p>
              </div>
            </div>
            
            <div className="about-service-card">
              <div className="about-service-icon">
                <MessageCircle />
              </div>
              <div className="about-service-content">
                <h3>Community Management</h3>
                <p>Building and nurturing trading communities where members can learn, share, and grow together in a supportive environment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section className="about-community-section">
        <div className="about-container">
          <div className="about-community-header">
            <div className="about-community-text">
              <div className="about-section-heading">
                <span className="about-subtitle">JOIN US</span>
                <h2>Our Free Retail Trading Community</h2>
                <p className="about-section-intro">This is where the magic happens. A place where traders share, learn, and grow together.</p>
              </div>
              
              <p className="about-mission-statement">
                We run a free retail trading community where people share trades, ask questions, post wins (and losses), and just connect. You'll find beginners asking the right questions, intermediate traders learning by doing, and advanced traders breaking down real strategies in simple terms.
              </p>
              <p className="about-mission-statement about-bold-statement">
                <strong>No one's above anyone else. Everyone's learning. That's the point.</strong>
              </p>
            </div>
          </div>
          
          <div className="about-community-content">            
            <div className="about-community-features">
              <h3 className="about-features-heading">Inside the community, you'll get:</h3>
              <ul className="about-feature-list">
                <li className="about-feature-item">
                  <div className="about-feature-icon">
                    <TrendingUp />
                  </div>
                  <div className="about-feature-text">
                    <h3>Daily Market Talk</h3>
                    <p>We keep things active with chat around what's moving and why.</p>
                  </div>
                </li>
                <li className="about-feature-item">
                  <div className="about-feature-icon">
                    <Target />
                  </div>
                  <div className="about-feature-text">
                    <h3>Trade Ideas</h3>
                    <p>See what others are looking at and share your setups.</p>
                  </div>
                </li>
                <li className="about-feature-item">
                  <div className="about-feature-icon">
                    <MessageCircle />
                  </div>
                  <div className="about-feature-text">
                    <h3>Real Feedback</h3>
                    <p>Ask questions, get real answers. No judgment.</p>
                  </div>
                </li>
                <li className="about-feature-item">
                  <div className="about-feature-icon">
                    <Users />
                  </div>
                  <div className="about-feature-text">
                    <h3>Support</h3>
                    <p>Trading can get lonely. It doesn't have to be.</p>
                  </div>
                </li>
              </ul>
              <p className="about-mission-statement">We're building something long-term here. Not just a group chat, but a culture where people grow together.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Collaboration Section */}
      <section className="about-collab-section">
        <div className="about-container">
          <div className="about-collab-content">
            <div className="about-collab-text">
              <div className="about-section-heading">
                <span className="about-subtitle">Partnerships</span>
                <h2>Open to Collabs? Always.</h2>
              </div>
              <p>If you're a brand, creator, or project in the fintech or trading space and you're looking to partner—<strong>we're open</strong>. We love collaborating on campaigns that make sense, that bring value, and that don't feel like forced ads.</p>
              <p>Whether you're launching something new or just trying to tap into a real community, let's talk.</p>
              <p>We don't do "one-size-fits-all." We take time to understand your goals, and if the vibe is right, we'll build something that works for everyone.</p>
              <a href="mailto:naum@forexfuturescrypto.com" className="about-primary-button">
    Get in Touch <ChevronRight size={18} />
</a>
            </div>
            <div className="about-collab-image">
              <img src={Collaboration} alt="Collaboration" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="about-section-heading about-centered">
            <span className="about-subtitle">Our Philosophy</span>
            <h2>Our Approach</h2>
            <p className="about-section-intro">We believe in building trust first.</p>
          </div>
          
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <Coffee />
              </div>
              <h3>We listen before we talk</h3>
              <p>Understanding comes before advice. We take the time to hear what matters to our community members.</p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <Users />
              </div>
              <h3>We meet people where they are</h3>
              <p>Everyone's at a different stage in their trading journey, and that's perfectly fine with us.</p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <Award />
              </div>
              <h3>We focus on clarity, not hype</h3>
              <p>Clear, honest communication beats flashy promises every time. We keep it real.</p>
            </div>
            
            <div className="about-value-card">
              <div className="about-value-icon">
                <Shield />
              </div>
              <h3>We keep the door open</h3>
              <p>We're always looking for better ways to do things and welcome new ideas and perspectives.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-content">
            <h2>Join us. Be part of something real.</h2>
            <p>If you've read this far, chances are you care about trading, community, or just doing things a little differently. That's exactly what we're about.</p>
            <div className="about-cta-buttons">
              <a href="#" className="about-primary-button">Join Our Community</a>
              <a href="#" className="about-secondary-button">Partner With Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;