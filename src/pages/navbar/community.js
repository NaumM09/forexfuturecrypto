import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/community.css';
import { getAuth } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Mock data for communities - replace with Firestore fetch in production
const MOCK_COMMUNITIES = [
  {
    id: 'c001',
    name: 'Real Braveyn',
    username: 'real_braveyn',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Real+Braveyn',
    description: 'A community focused on gold and indice trading strategies, chart analysis and live trading sessions',
    country: 'South Africa',
    members: "19.8k",
    platform: 'instagram',
    platformUrl: 'https://www.instagram.com/channel/Aba3t8wdLiumYpFD/?igsh=MWlwdGViZWd3YmRuMA==',
    tags: ['chart analysis', 'live-streams', 'community'],
    created: '2023-10-15',
    isFree: true
  },
  {
    id: 'c002',
    name: 'Fx Futures Crypto',
    username: 'fxfuturescrypto',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Fx+Futures+crypto',
    description: 'The largest crypto trading community in Africa with a focus on Bitcoin, Ethereum and altcoin analysis. Daily market updates and crypto education.',
    country: 'South Africa',
    members: 3865,
    platform: 'youtube',
    platformUrl: 'https://discord.gg/PwPwkruw',
    tags: ['analysis', 'trading psychology', 'live stream'],
    created: '2022-05-18',
    isFree: true,
  },
  {
    id: 'c003',
    name: 'SpenceTrades Premium',
    username: 'gregalto',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Spencer+Trades_Premium',
    description: 'Join our community of stock market investors across Africa. We analyze JSE, NSE, and other African markets with a long-term investment approach.',
    country: 'Belgium',
    members: 236,
    platform: 'Telegram',
    platformUrl: 'https://t.me/+Hi309J3Jq_Q3NzFk',
    tags: ['metals', 'indices', 'oil'],
    created: '2024-01-05',
    isFree: true
  },
  {
    id: 'c004',
    name: 'Money Matrix Fx',
    username: 'grotman_lehumo',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Grotman+Lehumo',
    description: 'Learn advanced trading strategies adapted for African markets. We focus on risk management and consistent returns through strategic options plays.',
    country: 'South Africa',
    members: 542,
    platform: 'x',
    platformUrl: 'https://x.com/optionstraderzar',
    tags: ['options', 'derivatives', 'strategies'],
    created: '2024-02-10',
    isFree: false,
    price: 'R500',
    benefits: ['Lifetime access', 'Proven Trading Strategies', 'Live Sessions']
  },
  {
    id: 'c005',
    name: 'GHOST FORMULA STRATEGY',
    username: 'Boinelo_3',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Ghost+formula+strategy',
    description: 'Unlcok the secrets and consistent trading success! Join out expert mentorship program and take your Forex trading to new heights!',
    country: 'South Africa',
    members: 925,
    platform: 'whatsapp',
    platformUrl: 'https://whatsapp.com/group/cairotradingclub',
    tags: ['forex', 'mentorship', 'technical-analysis'],
    created: '2023-07-22',
    isFree: false,
    price: 'R280',
    benefits: ['Expert Guidance', 'Personalised coaching & Support', 'Exclusive trading strategies and techniques', 'Regular market analysis and updates']
  },
  {
    id: 'c006',
    name: 'Pro Forex Signals',
    username: 'proforexsignals',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Pro+Forex',
    description: 'Premium forex signals group with 85% win rate. Our team of professional traders provides high-quality signals for major currency pairs.',
    country: 'Kenya',
    members: 1250,
    platform: 'telegram',
    platformUrl: 'https://t.me/proforexsignals',
    tags: ['forex', 'signals', 'professional'],
    created: '2023-03-15',
    isFree: false,
    price: 'R450/month',
    benefits: ['5-10 signals daily', 'Trade explanations', 'Market analysis']
  },
  {
    id: 'c007',
    name: 'Beginner Friendly Trading',
    username: 'easytrading',
    verified: false,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Beginner+Trading',
    description: 'A supportive community for new traders. We focus on the basics with simple strategies that work for beginners.',
    country: 'Ghana',
    members: 750,
    platform: 'discord',
    platformUrl: 'https://discord.gg/easytrading',
    tags: ['beginners', 'education', 'basics'],
    created: '2024-01-10',
    isFree: true
  }
];

// Platform icons component
const PlatformIcon = ({ platform }) => {
  switch (platform) {
    case 'telegram':
      return <i className="fab fa-telegram-plane platform-icon telegram"></i>;
    case 'discord':
      return <i className="fab fa-discord platform-icon discord"></i>;
    case 'youtube':
      return <i className="fab fa-youtube platform-icon youtube"></i>;
    case 'x':
      return <i className="fab fa-twitter platform-icon twitter"></i>;
    case 'whatsapp':
      return <i className="fab fa-whatsapp platform-icon whatsapp"></i>;
    case 'instagram':
      return <i className="fab fa-instagram platform-icon instagram"></i>;
    default:
      return <i className="fas fa-users platform-icon"></i>;
  }
};

const Community = () => {
  const [communities, setCommunities] = useState([]);
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePlatform, setActivePlatform] = useState('all');
  const [activeGroupType, setActiveGroupType] = useState('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    platform: '',
    platformUrl: '',
    tags: '',
    image: null,
    isFree: true,
    price: '',
    benefits: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    // In the real app, fetch communities from Firestore
    // For now, using mock data
    setCommunities(MOCK_COMMUNITIES);
    setFilteredCommunities(MOCK_COMMUNITIES);

    return () => unsubscribe();
  }, []);

  // Handle search and filters
  useEffect(() => {
    let results = communities;
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(
        community => 
          community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          community.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply verification filter
    if (activeFilter === 'verified') {
      results = results.filter(community => community.verified);
    }
    
    // Apply platform filter
    if (activePlatform !== 'all') {
      results = results.filter(community => community.platform === activePlatform);
    }
    
    // Apply group type filter
    if (activeGroupType === 'free') {
      results = results.filter(community => community.isFree);
    } else if (activeGroupType === 'paid') {
      results = results.filter(community => !community.isFree);
    }
    
    setFilteredCommunities(results);
  }, [searchTerm, activeFilter, activePlatform, activeGroupType, communities]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (name === 'image' && files[0]) {
      setFormData({
        ...formData,
        image: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Community name is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.platform) errors.platform = 'Platform is required';
    if (!formData.platformUrl) errors.platformUrl = 'Community URL is required';
    if (!formData.image) errors.image = 'Community image is required';
    if (!formData.isFree && !formData.price) errors.price = 'Price is required for paid groups';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert('Please log in to submit a community');
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      // For image upload
      let imageUrl = '';
      if (formData.image) {
        const imageRef = ref(storage, `community-images/${uuidv4()}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }
      
      // Prepare tags array
      const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim().toLowerCase()) : [];
      
      // Prepare benefits array if it's a paid group
      const benefits = !formData.isFree && formData.benefits 
        ? formData.benefits.split(',').map(benefit => benefit.trim()) 
        : [];
      
      // Add to Firestore
      const communityData = {
        name: formData.name,
        description: formData.description,
        country: formData.country,
        platform: formData.platform,
        platformUrl: formData.platformUrl,
        tags: tags,
        image: imageUrl,
        username: user.displayName || user.email.split('@')[0],
        verified: false, // Admin will verify later
        members: 0,
        created: Timestamp.now(),
        userId: user.uid,
        isFree: formData.isFree,
        price: !formData.isFree ? formData.price : null,
        benefits: !formData.isFree ? benefits : null
      };
      
      // In a real app, add the document to Firestore
      // await addDoc(collection(db, "communities"), communityData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          description: '',
          country: '',
          platform: '',
          platformUrl: '',
          tags: '',
          image: null,
          isFree: true,
          price: '',
          benefits: ''
        });
        setIsSubmitModalOpen(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting community:", error);
      alert('Failed to submit community. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle community submission modal
  const toggleSubmitModal = () => {
    if (!isLoggedIn) {
      // Redirect to login page
      window.location.href = '/auth';
      return;
    }
    setIsSubmitModalOpen(!isSubmitModalOpen);
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <div className="header-content">
          <h1>Trading <span className="text-highlight">Communities</span></h1>
          <p className="header-description">
            Connect with trading communities across Africa. Find your tribe of like-minded traders, mentors, and market enthusiasts.
          </p>
          <button 
            className="submit-community-btn"
            onClick={toggleSubmitModal}
          >
            <i className="fas fa-plus-circle"></i> Submit Your Community
          </button>
        </div>
      </div>
      
      <div className="community-tools">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text" 
            placeholder="Search communities, topics, or tags..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        {/* Group Type Tabs */}
        <div className="group-type-tabs">
          <button 
            className={`group-type-tab ${activeGroupType === 'all' ? 'active' : ''}`}
            onClick={() => setActiveGroupType('all')}
          >
            All Groups
          </button>
          <button 
            className={`group-type-tab ${activeGroupType === 'free' ? 'active' : ''}`}
            onClick={() => setActiveGroupType('free')}
          >
            <i className="fas fa-unlock"></i> Free Groups
          </button>
          <button 
            className={`group-type-tab ${activeGroupType === 'paid' ? 'active' : ''}`}
            onClick={() => setActiveGroupType('paid')}
          >
            <i className="fas fa-crown"></i> Premium Groups
          </button>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Communities
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'verified' ? 'active' : ''}`}
            onClick={() => setActiveFilter('verified')}
          >
            <i className="fas fa-check-circle"></i> Verified Only
          </button>
        </div>
        
        <div className="platform-filters">
          <button 
            className={`platform-filter ${activePlatform === 'all' ? 'active' : ''}`}
            onClick={() => setActivePlatform('all')}
          >
            All
          </button>
          <button 
            className={`platform-filter ${activePlatform === 'telegram' ? 'active' : ''}`}
            onClick={() => setActivePlatform('telegram')}
          >
            <i className="fab fa-telegram-plane"></i>
          </button>
          <button 
            className={`platform-filter ${activePlatform === 'discord' ? 'active' : ''}`}
            onClick={() => setActivePlatform('discord')}
          >
            <i className="fab fa-discord"></i>
          </button>
          <button 
            className={`platform-filter ${activePlatform === 'youtube' ? 'active' : ''}`}
            onClick={() => setActivePlatform('youtube')}
          >
            <i className="fab fa-youtube"></i>
          </button>
          <button 
            className={`platform-filter ${activePlatform === 'x' ? 'active' : ''}`}
            onClick={() => setActivePlatform('x')}
          >
            <i className="fab fa-twitter"></i>
          </button>
          <button 
            className={`platform-filter ${activePlatform === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActivePlatform('whatsapp')}
          >
            <i className="fab fa-whatsapp"></i>
          </button>
          <button 
            className={`platform-filter ${activePlatform === 'instagram' ? 'active' : ''}`}
            onClick={() => setActivePlatform('instagram')}
          >
            <i className="fab fa-instagram"></i>
          </button>
        </div>
      </div>
      
      <div className="communities-container">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community, index) => (
            <motion.div 
              className={`community-item ${community.isFree ? 'free-community' : 'paid-community'}`}
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="community-image-container">
                <img 
                  src={community.image} 
                  alt={community.name} 
                  className="community-image"
                />
                <div className="community-platform">
                  <PlatformIcon platform={community.platform} />
                </div>
                {community.verified && (
                  <div className="verified-badge" title="Verified Community">
                    <i className="fas fa-check-circle"></i>
                  </div>
                )}
                {!community.isFree && (
                  <div className="premium-badge" title="Premium Group">
                    <i className="fas fa-crown"></i>
                  </div>
                )}
              </div>
              
              <div className="community-content">
                <div className="community-info">
                  <div className="community-header-row">
                    <h3 className="community-name">
                      {community.name}
                    </h3>
                    {!community.isFree && (
                      <span className="community-price">{community.price}</span>
                    )}
                  </div>
                  <div className="community-meta">
                    <span className="community-country">
                      <i className="fas fa-globe-africa"></i> {community.country}
                    </span>
                    <span className="community-members">
                      <i className="fas fa-users"></i> {community.members.toLocaleString()}
                    </span>
                    <span className="community-type">
                      {community.isFree ? (
                        <><i className="fas fa-unlock"></i> Free</>
                      ) : (
                        <><i className="fas fa-crown"></i> Premium</>
                      )}
                    </span>
                  </div>
                  <div className="community-creator">
                    By <span className="username">@{community.username}</span>
                  </div>
                  <p className="community-description">
                    {community.description}
                  </p>
                  {!community.isFree && community.benefits && (
                    <div className="community-benefits">
                      <h4>What you get:</h4>
                      <ul>
                        {community.benefits.map((benefit, idx) => (
                          <li key={idx}><i className="fas fa-check"></i> {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="community-tags">
                    {community.tags.map(tag => (
                      <span className="tag" key={tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="community-actions">
                  <a 
                    href={community.platformUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`join-button ${!community.isFree ? 'premium-join' : ''}`}
                  >
                    {community.isFree ? 'Join Community' : 'Join Premium'}
                  </a>
                  <button className="details-button">
                    <i className="fas fa-info-circle"></i> Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-communities">
            <i className="fas fa-search"></i>
            <h3>No communities found</h3>
            <p>Try changing your search terms or filters</p>
          </div>
        )}
      </div>
      
      <div className="community-cta">
        <div className="cta-content">
          <h2>Build Your Trading Network</h2>
          <p>Create your own trading community and connect with traders from across Africa.</p>
          <button className="cta-button" onClick={toggleSubmitModal}>
            Submit Your Community
          </button>
        </div>
      </div>
      
      {isSubmitModalOpen && (
        <div className="modal-overlay">
          <div className="community-submit-modal">
            <div className="modal-header">
              <h2>Submit Your Community</h2>
              <button 
                className="close-modal"
                onClick={toggleSubmitModal}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              {submitSuccess ? (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <h3>Submission Successful!</h3>
                  <p>Your community has been submitted for review. We'll notify you once it's approved.</p>
                </div>
              ) : (
                <>
                  <p className="modal-description">
                    Submit your trading community for review. Once approved, it will appear in our community directory with a verification badge.
                  </p>
                  <form className="community-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Community Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Enter community name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && <span className="error">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label>Community Description *</label>
                      <textarea 
                        name="description"
                        placeholder="Describe your community, its focus, and what members can expect..." 
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                      {formErrors.description && <span className="error">{formErrors.description}</span>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Country *</label>
                        <select 
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value="">Select country</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Other">Other</option>
                        </select>
                        {formErrors.country && <span className="error">{formErrors.country}</span>}
                      </div>
                      <div className="form-group">
                        <label>Platform *</label>
                        <select 
                          name="platform"
                          required
                          value={formData.platform}
                          onChange={handleInputChange}
                        >
                          <option value="">Select platform</option>
                          <option value="telegram">Telegram</option>
                          <option value="discord">Discord</option>
                          <option value="youtube">YouTube</option>
                          <option value="x">X (Twitter)</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="instagram">Instagram</option>
                          <option value="other">Other</option>
                        </select>
                        {formErrors.platform && <span className="error">{formErrors.platform}</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Community URL *</label>
                      <input 
                        type="url" 
                        name="platformUrl"
                        placeholder="https://" 
                        required 
                        value={formData.platformUrl}
                        onChange={handleInputChange}
                      />
                      {formErrors.platformUrl && <span className="error">{formErrors.platformUrl}</span>}
                    </div>
                    <div className="form-group">
                      <label>Community Logo/Image *</label>
                      <div className="file-upload">
                        <input 
                          type="file" 
                          id="community-image" 
                          name="image"
                          accept="image/*" 
                          required 
                          onChange={handleInputChange}
                        />
                        <label htmlFor="community-image">
                          <i className="fas fa-cloud-upload-alt"></i> {formData.image ? formData.image.name : 'Select image'}
                        </label>
                      </div>
                      <small>Recommended size: 600×400px, JPG or PNG</small>
                      {formErrors.image && <span className="error">{formErrors.image}</span>}
                    </div>
                    
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          name="isFree"
                          checked={formData.isFree}
                          onChange={handleInputChange}
                        />
                        <span>This is a free community</span>
                      </label>
                    </div>
                    
                    {!formData.isFree && (
                      <>
                        <div className="form-group">
                          <label>Membership Price *</label>
                          <input 
                            type="text" 
                            name="price"
                            placeholder="e.g. R599/month" 
                            value={formData.price}
                            onChange={handleInputChange}
                          />
                          {formErrors.price && <span className="error">{formErrors.price}</span>}
                        </div>
                        <div className="form-group">
                          <label>Benefits (comma separated)</label>
                          <textarea 
                            name="benefits"
                            placeholder="Daily signals, Weekly webinars, Private chat access" 
                            rows={3}
                            value={formData.benefits}
                            onChange={handleInputChange}
                          ></textarea>
                          <small>List what members get when they join your premium group</small>
                        </div>
                      </>
                    )}
                    
                    <div className="form-group">
                      <label>Tags (comma separated)</label>
                      <input 
                        type="text" 
                        name="tags"
                        placeholder="forex, signals, education" 
                        value={formData.tags}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className="submit-form-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit For Review'}
                      </button>
                      <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={toggleSubmitModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;