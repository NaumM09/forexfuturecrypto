import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Globe, Mail, CheckCircle, Award, Users, ShieldCheck, Briefcase} from 'lucide-react';
import '../styles/OpportunitiesPage.css';

export default function OpportunitiesPage() {
  const [activeAccordion, setActiveAccordion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };
  
  // Simplified form submission that uses mailto directly
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formData = new FormData(e.target);
      const name = formData.get('name');
      const email = formData.get('email');
      const company = formData.get('company');
      const position = formData.get('position');
      const project = formData.get('project');
      const valuation = formData.get('valuation');
      
      // Create email subject and body
      const subject = `New Investment Opportunity: ${company}`;
      const body = `
Name: ${name}
Email: ${email}
Company: ${company}
Position: ${position}
Valuation: ${valuation}

Project Overview:
${project}
      `;
      
      // Create and open mailto link directly
      const mailtoLink = `mailto:naum@forexfuturescrypto.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitStatus('success');
      
      // Reset form
      e.target.reset();
    } catch (error) {
      console.error('Error with form submission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const ifsgGoals = [
    "Economic empowerment and inclusive growth",
    "Social justice, equity & community well-being",
    "Ethical partnership & equitable risk-sharing",
    "Environmental stewardship & sustainable development",
    "Interest-free, values-driven financial systems",
    "Transparency, accountability & ethical governance",
    "Innovation, education & capacity building"
  ];
  
  const kycDocuments = [
    "Organogram detailing ultimate beneficial owners and all holding and subsidiary companies",
    "Certificate of Incorporation including company registration number",
    "Proof of registered address",
    "Letter of good standing for applicant and immediate shareholders",
    "Register of shareholders",
    "Register of directors",
    "Directors' ID's /passports and proof of address",
    "Bank reference letter",
    "Latest Financial statements",
    "Company profile",
    "Official letterhead",
    "Letter from Registered official Auditors",
    "Statement of Assets and Liabilities",
    "Document authorizing signatory to act on behalf of the company like board resolution",
    "Registered trade license and any other regulatory license",
    "Letter of no legal impediment and litigation from professional practicing attorney",
    "Tax registry details"
  ];
  
  const eligibilityCriteria = [
    "Asset-backed projects with tangible assets and verifiable valuation",
    "Demonstrable socio-economic impact, aligned with at least 5 of the 9 IFSG Goals",
    "Experienced management team with proven track record in the sector",
    "Willingness to embrace blockchain tokenization and digital finance innovation",
    "Commitment to participate in a collaborative joint venture (JV) structure",
    "Alignment with Sharia-compliant financing principles (profit-loss sharing, asset-backing)"
  ];

  const benefits = [
    {
      title: "Innovative Funding",
      description: "Access to alternative capital through cutting-edge Web3 technology",
      icon: <Award size={24} className="benefit-icon-OP" />
    },
    {
      title: "Global Network",
      description: "Connect with international investors aligned with ethical and sustainable finance",
      icon: <Globe size={24} className="benefit-icon-OP" />
    },
    {
      title: "Expert Support",
      description: "Receive guidance from industry leaders in Islamic finance and blockchain technology",
      icon: <Users size={24} className="benefit-icon-OP" />
    },
    {
      title: "Impact Validation",
      description: "Enhance your project's credibility through IFSG certification and assessment",
      icon: <ShieldCheck size={24} className="benefit-icon-OP" />
    }
  ];
  
  return (
    <div className="opportunities-page-OP">
      <header className="hero-header-OP">
        <div className="container-OP">
          <h1 className="hero-title-OP">Transformative Investment Opportunities</h1>
          <p className="hero-description-OP">
            Join our pioneering initiative combining ethical finance, blockchain innovation, and sustainable impact.
          </p>
        </div>
      </header>
      
      
      <main className="container-OP main-content-OP">
        <section className="intro-section-OP">
          <div className="card-OP">
            <div className="card-content-OP">
              <div className="section-header-OP">
                <Briefcase size={36} className="header-icon-OP"/>
                <h2 className="section-title-OP">Pioneering the Future of Ethical Finance </h2>
              </div>
              
              <p className="text-lg-OP">
                We are bringing together <strong>visionary, high-impact projects</strong> to create a 
                groundbreaking <strong>Sharia-compliant investment ecosystem</strong>, powered by blockchain technology.
              </p>
              
              <p className="text-lg-OP">
                This exclusive opportunity connects purpose-driven ventures with ethical capital through the 
                <strong> Islamic Finance Sustainable Goals (IFSG)</strong> framework, creating a new paradigm 
                in sustainable investment.
              </p>
              
              <div className="alert-box-OP">
                <h3 className="alert-title-OP">Current Funding Round</h3>
                <p className="alert-text-OP">We are selecting <strong>5–7 exceptional projects</strong> with a combined 
                asset valuation of <strong>$100M USD.</strong></p>
              </div>
              
              {/* Benefits Cards */}
              <h3 className="subsection-title-OP">Why Join This Initiative</h3>
              <div className="benefits-grid-OP">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-card-OP">
                    <div className="benefit-header-OP">
                      {benefit.icon}
                      <h4 className="benefit-title-OP">{benefit.title}</h4>
                    </div>
                    <p className="benefit-description-OP">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Accordion */}
          <div className="accordion-container-OP">
            {/* Eligibility Criteria */}
            <div className="accordion-item-OP">
              <button 
                className="accordion-button-OP"
                onClick={() => toggleAccordion('eligibility')}
              >
                <div className="accordion-button-content-OP">
                  <CheckCircle size={24} className="accordion-icon-OP" />
                  <h3 className="accordion-title-OP">Project Eligibility Criteria</h3>
                </div>
                {activeAccordion === 'eligibility' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {activeAccordion === 'eligibility' && (
                <div className="accordion-content-OP">
                  <ul className="criteria-list-OP">
                    {eligibilityCriteria.map((criteria, index) => (
                      <li key={index} className="criteria-item-OP">
                        <span className="check-mark-OP">✓</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* IFSG Framework */}
            <div className="accordion-item-OP">
              <button 
                className="accordion-button-OP"
                onClick={() => toggleAccordion('ifsg')}
              >
                <div className="accordion-button-content-OP">
                  <Globe size={24} className="accordion-icon-OP" />
                  <h3 className="accordion-title-OP">The IFSG Framework: Finance with Purpose</h3>
                </div>
                {activeAccordion === 'ifsg' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {activeAccordion === 'ifsg' && (
                <div className="accordion-content-OP">
                  <p className="content-text-OP">
                    The <strong>Islamic Finance Sustainable Goals (IFSG)</strong> represent a comprehensive 
                    values-driven framework that aligns ethical finance with positive impact, based on Shariah principles:
                  </p>
                  <ul className="dot-list-OP">
                    {ifsgGoals.map((goal, index) => (
                      <li key={index} className="dot-item-OP">
                        <span className="dot-OP">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="info-box-OP">
                    <p className="info-text-OP">
                      By aligning with IFSG principles, your project gains recognition within a global community committed to 
                      ethical finance and sustainable development.
                    </p>
                    <p className="info-text-OP">
                      Learn more at <a href="http://www.gifsrv.com" className="info-link-OP">www.gifsrv.com</a> and <a href="http://www.ifsg.com" className="info-link-OP">www.ifsg.com</a>.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* KYC and AML */}
            <div className="accordion-item-OP">
              <button 
                className="accordion-button-OP"
                onClick={() => toggleAccordion('kyc')}
              >
                <div className="accordion-button-content-OP">
                  <FileText size={24} className="accordion-icon-OP" />
                  <h3 className="accordion-title-OP">KYC and AML Requirements</h3>
                </div>
                {activeAccordion === 'kyc' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              
              {activeAccordion === 'kyc' && (
                <div className="accordion-content-OP">
                  <p className="content-text-OP">
                    All documents to be notarized and certified by a competent authority:
                  </p>
                  <ul className="numbered-list-OP">
                    {kycDocuments.map((doc, index) => (
                      <li key={index} className="numbered-item-OP">
                        <span className="number-OP">{index + 1}</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="warning-box-OP">
                    <p className="warning-text-OP">
                      Our team is available to guide you through this process. Selected projects will receive dedicated support 
                      to ensure smooth compliance with all regulatory requirements.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Application Form Section */}
        <section className="form-section-OP">
          <div className="form-container-OP">
            <div className="form-content-OP">
              <h2 className="form-title-OP">Join the Future of Ethical Finance</h2>
              <p className="form-description-OP">
                If your project aligns with our vision and meets our criteria, we invite you to apply for this 
                transformative opportunity. Complete the form below to begin your journey with us.
              </p>
              
              <form className="application-form-OP" onSubmit={handleFormSubmit}>
                <div className="form-row-OP">
                  <div className="form-group-OP">
                    <label htmlFor="name" className="form-label-OP">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      className="form-input-OP"
                      placeholder="Full Name" 
                      required
                    />
                  </div>
                  <div className="form-group-OP">
                    <label htmlFor="email" className="form-label-OP">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      className="form-input-OP"
                      placeholder="Email" 
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row-OP">
                  <div className="form-group-OP">
                    <label htmlFor="company" className="form-label-OP">Organization Name</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      className="form-input-OP"
                      placeholder="Your Company/Organization" 
                      required
                    />
                  </div>
                  <div className="form-group-OP">
                    <label htmlFor="position" className="form-label-OP">Your Role</label>
                    <input 
                      type="text" 
                      id="position" 
                      name="position"
                      className="form-input-OP"
                      placeholder="Your Position/Title" 
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group-OP">
                  <label htmlFor="project" className="form-label-OP">Project Overview</label>
                  <textarea 
                    id="project" 
                    name="project"
                    rows="4" 
                    className="form-textarea-OP"
                    placeholder="Describe your project's purpose, impact, and alignment with our criteria" 
                    required
                  ></textarea>
                </div>
                
                <div className="form-group-OP">
                  <label htmlFor="valuation" className="form-label-OP">Estimated Asset Valuation (USD)</label>
                  <input 
                    type="text" 
                    id="valuation" 
                    name="valuation"
                    className="form-input-OP"
                    placeholder="Estimated value of project assets" 
                    required
                  />
                </div>
                
                <div className="checkbox-group-OP">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="form-checkbox-OP"
                    required
                  />
                  <label htmlFor="terms" className="checkbox-label-OP">
                    I agree to the processing of my data for the purpose of this application
                  </label>
                </div>
                
                <div className="form-group-OP">
                  <button
                    type="submit"
                    className="submit-button-OP"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="success-message-OP">
                    <CheckCircle size={24} className="success-icon-OP" />
                    <p>Your application has been submitted. Please complete the email that has opened to send your details to our team.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="error-message-OP">
                    <p>There was an error processing your application. Please try again or contact us directly at <a href="mailto:naum@forexfuturescrypto.com">naum@forexfuturescrypto.com</a></p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="site-footer-OP">
        <div className="container-OP">
          <div className="footer-grid-OP">
            <div className="footer-column-OP">
              <h3 className="footer-title-OP">About This Initiative</h3>
              <p className="footer-text-OP">
                We're on a mission to fund high-impact, ethically aligned projects that drive real change. 
                By connecting purpose-driven initiatives with alternative finance solutions rooted in 
                transparency, equity, and sustainability, we're helping close the gap between good ideas 
                and the capital they deserve.
              </p>
            </div>
            
            <div className="footer-column-OP">
              <h3 className="footer-title-OP">Contact Us</h3>
              <div className="footer-contact-OP">
                <Mail size={16} className="footer-icon-OP" />
                <a href="mailto:naum@forexfuturescrypto.com" className="footer-link-OP">naum@forexfuturescrypto.com</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}