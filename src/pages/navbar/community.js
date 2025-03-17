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
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Forex+Trading',
    description: 'A community focused on gold and indice trading strategies, chart analysis and live trading sessions',
    country: 'South Africa',
    members: "19.8k",
    platform: 'instagram',
    platformUrl: 'https://www.instagram.com/channel/Aba3t8wdLiumYpFD/?igsh=MWlwdGViZWd3YmRuMA==',
    tags: ['chart analysis', 'live-streams', 'community'],
    created: '2023-10-15'
  },
  {
    id: 'c002',
    name: 'African Stock Investors',
    username: 'nairobistockguy',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Stock+Investors',
    description: 'Join our community of stock market investors across Africa. We analyze JSE, NSE, and other African markets with a long-term investment approach.',
    country: 'South Africa',
    members: 876,
    platform: 'discord',
    platformUrl: 'https://discord.gg/stockafrica',
    tags: ['stocks', 'investing', 'dividends'],
    created: '2024-01-05'
  },
  {
    id: 'c003',
    name: 'Crypto Trading Africa',
    username: 'cryptonaija',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Crypto+Africa',
    description: 'The largest crypto trading community in Africa with a focus on Bitcoin, Ethereum and altcoin analysis. Daily market updates and crypto education.',
    country: 'Nigeria',
    members: 3240,
    platform: 'youtube',
    platformUrl: 'https://youtube.com/c/cryptoafrica',
    tags: ['crypto', 'bitcoin', 'altcoins'],
    created: '2022-05-18'
  },
  {
    id: 'c004',
    name: 'Options Strategies Group',
    username: 'optionstraderzar',
    verified: false,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Options+Trading',
    description: 'Learn advanced options trading strategies adapted for African markets. We focus on risk management and consistent returns through strategic options plays.',
    country: 'South Africa',
    members: 542,
    platform: 'x',
    platformUrl: 'https://x.com/optionstraderzar',
    tags: ['options', 'derivatives', 'strategies'],
    created: '2024-02-10'
  },
  {
    id: 'c005',
    name: 'Cairo Trading Club',
    username: 'cairotraderpro',
    verified: true,
    image: 'https://placehold.co/600x400/001e36/00b7c3?text=Cairo+Trading',
    description: 'Arabic and English trading community focused on EGX and MENA region markets. Technical analysis and fundamental research on Egyptian stocks.',
    country: 'Egypt',
    members: 925,
    platform: 'whatsapp',
    platformUrl: 'https://whatsapp.com/group/cairotradingclub',
    tags: ['stocks', 'egypt', 'technical-analysis'],
    created: '2023-07-22'
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
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    platform: '',
    platformUrl: '',
    tags: '',
    image: null
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
    
    setFilteredCommunities(results);
  }, [searchTerm, activeFilter, activePlatform, communities]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files[0]) {
      setFormData({
        ...formData,
        image: files[0]
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
        userId: user.uid
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
          image: null
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
        </div>
      </div>
      
      <div className="communities-container">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community, index) => (
            <motion.div 
              className="community-item"
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
              </div>
              
              <div className="community-content">
                <div className="community-info">
                  <h3 className="community-name">
                    {community.name}
                  </h3>
                  <div className="community-meta">
                    <span className="community-country">
                      <i className="fas fa-globe-africa"></i> {community.country}
                    </span>
                    <span className="community-members">
                      <i className="fas fa-users"></i> {community.members.toLocaleString()}
                    </span>
                  </div>
                  <div className="community-creator">
                    By <span className="username">@{community.username}</span>
                  </div>
                  <p className="community-description">
                    {community.description}
                  </p>
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
                    className="join-button"
                  >
                    Join Community
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