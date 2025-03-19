import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import "../styles/Profile.css";

const ProfilePage = () => {
  const { currentUser, userProfile, updateUserProfile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    country: '',
    expertise: '',
    experience: '',
    website: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    profileImage: null
  });
  const [preview, setPreview] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: '/profile' } });
    }
  }, [isAuthenticated, navigate]);

  // Load user profile data
  useEffect(() => {
    if (userProfile) {
      setFormData(prevData => ({
        ...prevData,
        displayName: userProfile.displayName || currentUser?.displayName || '',
        bio: userProfile.bio || '',
        country: userProfile.country || '',
        expertise: userProfile.expertise || '',
        experience: userProfile.experience || '',
        website: userProfile.website || '',
        twitter: userProfile.twitter || '',
        linkedin: userProfile.linkedin || '',
        instagram: userProfile.instagram || '',
      }));
      
      if (userProfile.photoURL) {
        setPreview(userProfile.photoURL);
      }
    }
  }, [userProfile, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let photoURL = userProfile?.photoURL || '';
      
      // Upload profile image if provided
      if (formData.profileImage) {
        const imageRef = ref(storage, `profile-images/${currentUser.uid}/${uuidv4()}`);
        await uploadBytes(imageRef, formData.profileImage);
        photoURL = await getDownloadURL(imageRef);
      }
      
      // Update profile without the file object
      const profileData = {
        displayName: formData.displayName,
        bio: formData.bio,
        country: formData.country,
        expertise: formData.expertise,
        experience: formData.experience,
        website: formData.website,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        instagram: formData.instagram,
        photoURL
      };
      
      await updateUserProfile(profileData);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <h1>Your Profile</h1>
          <p>Update your profile information and manage your account</p>
        </div>
      </div>

      <div className="profile-content container">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {preview ? (
                <img src={preview} alt="Profile" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  {formData.displayName?.charAt(0) || currentUser?.email?.charAt(0) || '?'}
                </div>
              )}
              <div className="verification-status">
                {userProfile?.isVerified ? (
                  <span className="verified"><i className="fas fa-check-circle"></i> Verified</span>
                ) : (
                  <span className="unverified"><i className="fas fa-clock"></i> Pending Verification</span>
                )}
              </div>
            </div>
            <h3>{formData.displayName || currentUser?.displayName || currentUser?.email?.split('@')[0]}</h3>
            <p className="email">{currentUser?.email}</p>
            {userProfile?.profileComplete ? (
              <div className="profile-status complete">
                <i className="fas fa-check-circle"></i> Profile Complete
              </div>
            ) : (
              <div className="profile-status incomplete">
                <i className="fas fa-exclamation-circle"></i> Please Complete Your Profile
              </div>
            )}
            <button className="logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Log Out
            </button>
          </div>
          
          <div className="sidebar-links">
            <h4>Account</h4>
            <ul>
              <li className="active"><a href="#profile"><i className="fas fa-user"></i> Profile</a></li>
              <li><a href="#communities"><i className="fas fa-users"></i> My Communities</a></li>
              <li><a href="#events"><i className="fas fa-calendar"></i> My Events</a></li>
              <li><a href="#security"><i className="fas fa-shield-alt"></i> Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="profile-main">
          {success && (
            <div className="alert success">
              <i className="fas fa-check-circle"></i> Profile updated successfully!
            </div>
          )}
          
          {error && (
            <div className="alert error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
          
          <div className="profile-section" id="profile">
            <div className="section-header">
              <h2>Edit Profile</h2>
              <p>Update your personal information and trading expertise</p>
            </div>
            
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-group">
                  <label htmlFor="profileImage">Profile Picture</label>
                  <div className="profile-image-upload">
                    <div className="image-preview">
                      {preview ? (
                        <img src={preview} alt="Profile preview" />
                      ) : (
                        <div className="no-image">
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    <div className="image-upload-controls">
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                      />
                      <label htmlFor="profileImage" className="upload-button">
                        <i className="fas fa-upload"></i> Upload Photo
                      </label>
                      <p className="upload-help">JPG or PNG. Max 2MB.</p>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="displayName">Display Name*</label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                    placeholder="Your display name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself and your trading journey"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country*</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-section">
                <h3>Trading Information</h3>
                
                <div className="form-group">
                  <label htmlFor="expertise">Trading Expertise*</label>
                  <select
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your primary expertise</option>
                    <option value="Forex">Forex</option>
                    <option value="Cryptocurrency">Cryptocurrency</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Options">Options</option>
                    <option value="Futures">Futures</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Indices">Indices</option>
                    <option value="Multiple">Multiple Markets</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="experience">Trading Experience*</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your experience level</option>
                    <option value="Beginner">Beginner (0-1 years)</option>
                    <option value="Intermediate">Intermediate (1-3 years)</option>
                    <option value="Advanced">Advanced (3-5 years)</option>
                    <option value="Professional">Professional (5+ years)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-section">
                <h3>Social Links</h3>
                <p>Add your website and social media profiles</p>
                
                <div className="form-group">
                  <label htmlFor="website">
                    <i className="fas fa-globe"></i> Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://your-website.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="twitter">
                    <i className="fab fa-twitter"></i> Twitter
                  </label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="@username"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="linkedin">
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/username"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="instagram">
                    <i className="fab fa-instagram"></i> Instagram
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@username"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="submit"
                  className="save-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;