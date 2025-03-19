// Dashboard.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  arrayUnion,
  Timestamp 
} from "firebase/firestore";
import "../styles/Dashboard.css";
import logo from "../images/logo-loader.png";
import { 
  FaPlay, FaLock, FaChevronDown, FaChevronRight, FaUser, 
  FaBell, FaSignOutAlt, FaCreditCard, FaCopy, FaCheck, 
  FaExclamationTriangle, FaDesktop, FaMobileAlt 
} from "react-icons/fa";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [playlists, setPlaylists] = useState({});
  const [expandedPlaylists, setExpandedPlaylists] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [subscriptionStatus, setSubscriptionStatus] = useState("Loading...");
  const [subscriptionDays, setSubscriptionDays] = useState(0);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentReference, setPaymentReference] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [users, setUsers] = useState([]);
  const [deviceCount, setDeviceCount] = useState(0);
  const [maxDevices] = useState(2);
  const [deviceList, setDeviceList] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Function to get a unique device ID
  const getUserDeviceId = useCallback(() => {
    // Get existing device ID from localStorage or create a new one
    let deviceId = localStorage.getItem("deviceId");
    
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
      localStorage.setItem("deviceId", deviceId);
    }
    
    return deviceId;
  }, []);

  // Function to get browser and OS info
  const getDeviceInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";
    
    // Detect browser
    if (userAgent.indexOf("Chrome") > -1) {
      browser = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      browser = "Safari";
    } else if (userAgent.indexOf("Firefox") > -1) {
      browser = "Firefox";
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
      browser = "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
      browser = "Edge";
    }
    
    // Detect OS
    if (userAgent.indexOf("Windows") > -1) {
      os = "Windows";
    } else if (userAgent.indexOf("Mac") > -1) {
      os = "MacOS";
    } else if (userAgent.indexOf("Linux") > -1) {
      os = "Linux";
    } else if (userAgent.indexOf("Android") > -1) {
      os = "Android";
    } else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
      os = "iOS";
    }
    
    return { browser, os };
  }, []);

  // Register current device - converted to useCallback to fix the dependency warning
  const registerCurrentDevice = useCallback(async (userId) => {
    try {
      const deviceId = getUserDeviceId();
      const { browser, os } = getDeviceInfo();
      const deviceName = `${browser} on ${os}`;
      
      // Check if device exists
      const deviceRef = doc(db, "users", userId, "devices", deviceId);
      const deviceDoc = await getDoc(deviceRef);
      
      // Check total devices first
      const devicesSnapshot = await getDocs(collection(db, "users", userId, "devices"));
      const deviceCount = devicesSnapshot.size;
      
      // If device doesn't exist and already at max, prevent registration
      if (!deviceDoc.exists() && deviceCount >= maxDevices) {
        // Don't add new device, but don't block current session
        console.warn("Maximum devices reached. Please deactivate a device to use this one.");
        return;
      }
      
      // Update or create device
      await setDoc(deviceRef, {
        deviceId,
        name: deviceName,
        browser,
        os,
        lastUsed: serverTimestamp()
      });
      
    } catch (error) {
      console.error("Error registering device:", error);
    }
  }, [getUserDeviceId, getDeviceInfo, maxDevices]);

  // Main effect to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
          navigate("/auth");
          return;
        }

        const userEmail = auth.currentUser?.email;

        // Register current device if not already registered
        await registerCurrentDevice(userId);

        // Check for admin access
        const adminEmail = "globalexpedyte@gmail.com";
        if (userEmail === adminEmail) {
          setUserName("Admin");
          setIsAdmin(true);
          loadPlaylists(true);
          setSubscriptionStatus("Lifetime Access");
          setSubscriptionDays(999);
          
          // Fetch all users for admin
          const usersSnapshot = await getDocs(collection(db, "users"));
          const usersData = [];
          
          for (const document of usersSnapshot.docs) {
            const userData = document.data();
            const userDevicesSnapshot = await getDocs(collection(db, "users", document.id, "devices"));
            const deviceCount = userDevicesSnapshot.size;
            
            // Get subscription status
            const subscriptionDoc = await getDoc(doc(db, "subscriptions", document.id));
            let subscriptionStatus = "None";
            let daysRemaining = 0;
            
            if (subscriptionDoc.exists()) {
              const subscriptionData = subscriptionDoc.data();
              if (subscriptionData.expiresAt) {
                const expirationDate = subscriptionData.expiresAt.toDate();
                daysRemaining = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));
                
                if (daysRemaining > 0) {
                  subscriptionStatus = "Active";
                } else {
                  subscriptionStatus = "Expired";
                }
              }
            }
            
            usersData.push({
              id: document.id,
              email: userData.email,
              name: userData.name || "Unnamed User",
              deviceCount,
              subscriptionStatus,
              daysRemaining,
              paymentHistory: userData.paymentHistory || []
            });
          }
          
          setUsers(usersData);
          setIsLoading(false);
          return;
        }

        // Generate payment reference for non-admin users
        const reference = `TRD-${userId.substring(0, 6).toUpperCase()}`;
        setPaymentReference(reference);

        // Fetch user subscription data
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || "User");

          // Get device count
          const devicesSnapshot = await getDocs(collection(db, "users", userId, "devices"));
          setDeviceCount(devicesSnapshot.size);
          
          // Get device list
          const deviceListData = [];
          devicesSnapshot.forEach(document => {
            const device = document.data();
            deviceListData.push({
              id: document.id,
              name: device.name,
              lastUsed: device.lastUsed?.toDate() || new Date(),
              browser: device.browser,
              os: device.os,
              isCurrent: device.deviceId === getUserDeviceId()
            });
          });
          
          setDeviceList(deviceListData);

          const subscriptionDoc = await getDoc(doc(db, "subscriptions", userId));
          if (subscriptionDoc.exists()) {
            const subscriptionData = subscriptionDoc.data();
            const expirationDate = subscriptionData.expiresAt.toDate();
            const remainingDays = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));

            setSubscriptionDays(remainingDays);
            
            if (remainingDays > 0) {
              setSubscriptionStatus("Active");
              loadPlaylists(true);
            } else {
              setSubscriptionStatus("Expired");
              loadPlaylists(false);
            }
          } else {
            setSubscriptionStatus("Inactive");
            loadPlaylists(false);
          }
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSubscriptionStatus("Error");
        loadPlaylists(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  // Include getUserDeviceId in dependencies to fix the warning
  }, [navigate, registerCurrentDevice, getUserDeviceId]);

  // Remove a device
  const removeDevice = async (deviceId) => {
    try {
      const userId = auth.currentUser?.uid;
      await deleteDoc(doc(db, "users", userId, "devices", deviceId));
      
      // Update device list
      setDeviceList(prevList => prevList.filter(device => device.id !== deviceId));
      setDeviceCount(prevCount => prevCount - 1);
      
    } catch (error) {
      console.error("Error removing device:", error);
    }
  };

  const loadPlaylists = (isPremium) => {
    // Pre-expand the first playlist for better UX
    const firstPlaylist = "Introduction to Trading (All Markets)";
    setExpandedPlaylists({ [firstPlaylist]: true });
    
    // Same playlists data but with added metadata
    const playlistsData = {
      "Introduction to Trading (All Markets)": {
        icon: "📊",
        description: "Fundamentals of trading across all markets, ideal for beginners.",
        sections: {
          "Trading Basics": [
            { 
              id: "intro-1",
              name: "What is Trading?", 
              locked: !isPremium,
              duration: "12:35",
              description: "An overview of trading fundamentals and market mechanics."
            },
            { 
              id: "intro-2",
              name: "Overview of Forex, Futures, and Crypto Markets", 
              locked: !isPremium,
              duration: "18:42",
              description: "Comparison of different market types and their characteristics."
            },
            { 
              id: "intro-3",
              name: "Common Trading Terminologies", 
              locked: !isPremium,
              duration: "14:18",
              description: "Essential vocabulary every trader needs to know."
            },
          ],
          "Understanding Risk Management": [
            { 
              id: "risk-1",
              name: "Risk-Reward Ratio and Position Sizing", 
              locked: !isPremium,
              duration: "22:10",
              description: "How to properly size your positions to manage risk effectively."
            },
            { 
              id: "risk-2",
              name: "Stop-Loss and Take-Profit Placement", 
              locked: !isPremium,
              duration: "15:55",
              description: "Techniques for setting proper exit points to protect capital."
            },
          ],
        }
      },
      "Forex Trading (For Beginners and Experts)": {
        icon: "💱",
        description: "Deep dive into currency trading strategies and analysis.",
        sections: {
          "Forex Market Dynamics": [
            { 
              id: "forex-1",
              name: "Major Currency Pairs", 
              locked: !isPremium,
              duration: "16:22",
              description: "Understanding the major currency pairs and their characteristics."
            },
            { 
              id: "forex-2",
              name: "How Central Banks Impact Forex Markets", 
              locked: !isPremium,
              duration: "23:45",
              description: "The relationship between monetary policy and currency movements."
            },
          ],
          "Technical Analysis in Forex": [
            { 
              id: "forex-tech-1",
              name: "Support and Resistance Levels", 
              locked: !isPremium,
              duration: "19:36",
              description: "Identifying key price levels in the forex market."
            },
            { 
              id: "forex-tech-2",
              name: "Indicators: RSI, MACD, Bollinger Bands", 
              locked: !isPremium,
              duration: "28:14",
              description: "How to use popular technical indicators for forex trading."
            },
            { 
              id: "forex-tech-3",
              name: "Smart Money Concepts", 
              locked: !isPremium,
              duration: "34:22",
              description: "Advanced techniques for tracking institutional money flow."
            },
          ],
        }
      },
      "Futures Trading (For Beginners and Experts)": {
        icon: "📈",
        description: "Comprehensive guide to trading futures contracts across markets.",
        sections: {
          "Introduction to Futures": [
            { 
              id: "futures-1",
              name: "What are Futures Contracts?", 
              locked: !isPremium,
              duration: "17:12",
              description: "Understanding the structure and purpose of futures contracts."
            },
          ],
          "Technical and Fundamental Analysis in Futures": [
            { 
              id: "futures-analysis-1",
              name: "Volume and Open Interest", 
              locked: !isPremium,
              duration: "21:33",
              description: "How to interpret volume and open interest for futures trading."
            },
          ],
        }
      },
      "Cryptocurrency Trading (For Beginners and Experts)": {
        icon: "🪙",
        description: "Strategies for trading Bitcoin, Ethereum, and other digital assets.",
        sections: {
          "Introduction to Crypto Trading": [
            { 
              id: "crypto-1",
              name: "How Crypto Markets Operate", 
              locked: !isPremium,
              duration: "20:18",
              description: "Understanding the unique aspects of cryptocurrency markets."
            },
          ],
          "Crypto Trading Strategies": [
            { 
              id: "crypto-strat-1",
              name: "Trend-Following Strategies", 
              locked: !isPremium,
              duration: "25:43",
              description: "How to identify and trade with the trend in crypto markets."
            },
            { 
              id: "crypto-strat-2",
              name: "2025 Crypto Bull Run Watchlist", 
              locked: !isPremium,
              duration: "41:15",
              description: "Potential high-performing cryptocurrencies for the next bull cycle."
            },
          ],
        }
      },
      "How to Create a Basic Trading Bot (Advanced)": {
        icon: "🤖",
        description: "Learn to automate your trading strategies with custom bots.",
        sections: {
          "Building Your First Bot": [
            { 
              id: "bot-1",
              name: "Overview of Algorithmic Trading", 
              locked: !isPremium,
              duration: "22:45",
              description: "Introduction to automated trading systems and their benefits."
            },
            { 
              id: "bot-2",
              name: "Automating a Simple Strategy", 
              locked: !isPremium,
              duration: "38:27",
              description: "Step-by-step guide to automating a basic trading strategy."
            },
          ],
          "Trading Bot Strategy Design": [
            { 
              id: "bot-design-1",
              name: "Defining Your Strategy Logic", 
              locked: !isPremium,
              duration: "27:54",
              description: "How to translate manual trading rules into algorithms."
            },
            { 
              id: "bot-design-2",
              name: "Backtesting the Bot Effectively", 
              locked: !isPremium,
              duration: "31:48",
              description: "Methods for testing your bot against historical data."
            },
          ],
          "Programming Basics for Bots": [
            { 
              id: "bot-prog-1",
              name: "Introduction to Python for Bots", 
              locked: !isPremium,
              duration: "45:20",
              description: "Getting started with Python for algorithmic trading."
            },
            { 
              id: "bot-prog-2",
              name: "Using APIs for Market Data", 
              locked: !isPremium,
              duration: "36:55",
              description: "How to connect to exchanges and retrieve market data."
            },
          ],
        }
      },
    };
    
    setPlaylists(playlistsData);
  };

  // Helper function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Admin function to add subscription to user
  const addSubscription = async (userId, days) => {
    try {
      const now = new Date();
      const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      
      await setDoc(doc(db, "subscriptions", userId), {
        createdAt: serverTimestamp(),
        expiresAt: Timestamp.fromDate(expiresAt),
        addedBy: auth.currentUser.uid,
        type: "manual"
      });
      
      // Record payment in user's payment history
      await updateDoc(doc(db, "users", userId), {
        paymentHistory: arrayUnion({
          date: serverTimestamp(),
          amount: "R800",
          type: "Manual (Admin)",
          duration: "90 days"
        })
      });
      
      // Update users list
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? {...user, 
               subscriptionStatus: "Active", 
               daysRemaining: days
              } 
            : user
        )
      );
      
      setShowPaymentModal(false);
      setSelectedUser(null);
      
    } catch (error) {
      console.error("Error adding subscription:", error);
      alert("Failed to add subscription. Please try again.");
    }
  };

  const togglePlaylist = (playlistName) => {
    setExpandedPlaylists((prevState) => ({
      ...prevState,
      [playlistName]: !prevState[playlistName],
    }));
  };

  const toggleSection = (playlistName, sectionName) => {
    const sectionKey = `${playlistName}:${sectionName}`;
    setExpandedSections((prevState) => ({
      ...prevState,
      [sectionKey]: !prevState[sectionKey],
    }));
  };

  const selectVideo = (playlistName, sectionName, video) => {
    if (video.locked) {
      return;
    }
    setSelectedVideo({
      ...video,
      playlistName,
      sectionName
    });
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const closeProfileMenu = (e) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(e.target) &&
      !e.target.closest(".profile-btn")
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeProfileMenu);
    return () => document.removeEventListener("click", closeProfileMenu);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getStatusColor = () => {
    if (subscriptionStatus === "Active" || subscriptionStatus === "Lifetime Access") {
      return "var(--color-success)";
    } else if (subscriptionStatus === "Expired") {
      return "var(--color-error)";
    } else if (subscriptionStatus === "Error") {
      return "var(--color-error)";
    } else {
      return "var(--color-warning)";
    }
  };

  // Toggle between admin and user view
  const toggleAdminView = () => {
    setAdminView(prev => !prev);
  };

  // Open payment modal for a specific user
  const openPaymentModal = (user) => {
    setSelectedUser(user);
    setShowPaymentModal(true);
  };

  if (isLoading) {
    return (
      <div className="dashboard loading-state">
        <div className="loader"></div>
        <p>Loading your content...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logo} alt="Forex Futures Crypto" className="logo" />
          <h1>Trading Academy</h1>
        </div>
        <div className="header-right">
          {isAdmin && (
            <button 
              className={`admin-toggle ${adminView ? 'active' : ''}`} 
              onClick={toggleAdminView}
            >
              {adminView ? 'View Courses' : 'Admin Panel'}
            </button>
          )}
          
          <div className="subscription-indicator" style={{ backgroundColor: getStatusColor() }}>
            <span className="status-text">{subscriptionStatus}</span>
            {subscriptionDays > 0 && (
              <span className="days-remaining">{subscriptionDays} days</span>
            )}
          </div>
          <div className="profile-container">
            <button className="profile-btn" onClick={toggleProfileMenu}>
              <div className="avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="username">{userName}</span>
            </button>
            {isProfileMenuOpen && (
              <div ref={profileMenuRef} className="profile-menu">
                <div className="profile-header">
                  <div className="avatar large">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <p className="user-name">{userName}</p>
                    <p className="user-email">{auth.currentUser?.email}</p>
                  </div>
                </div>
                <div className="menu-options">
                  <button className="menu-item">
                    <FaUser /> Profile Settings
                  </button>
                  <button className="menu-item">
                    <FaBell /> Notifications
                  </button>
                  <button className="menu-item">
                    <FaCreditCard /> Manage Subscription
                  </button>
                  <button className="menu-item logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-main">
        {isAdmin && adminView ? (
          <div className="admin-panel">
            <div className="admin-sidebar">
              <h3>Admin Controls</h3>
              <ul className="admin-menu">
                <li className="active">User Management</li>
                <li>Subscription Stats</li>
                <li>Course Analytics</li>
              </ul>
            </div>
            
            <div className="admin-content">
              <div className="admin-header">
                <h2>User Management</h2>
                <p>{users.length} registered users</p>
              </div>
              
              <div className="user-table-container">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subscription</th>
                      <th>Days Left</th>
                      <th>Devices</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className={user.subscriptionStatus === "Expired" ? "expired" : ""}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className={`status ${user.subscriptionStatus.toLowerCase()}`}>
                          {user.subscriptionStatus}
                        </td>
                        <td>{user.daysRemaining > 0 ? user.daysRemaining : 0}</td>
                        <td>
                          <span className={`device-count ${user.deviceCount >= maxDevices ? 'max' : ''}`}>
                            {user.deviceCount}/{maxDevices}
                          </span>
                        </td>
                        <td className="actions">
                          <button 
                            className="add-subscription-btn"
                            onClick={() => openPaymentModal(user)}
                          >
                            Add Subscription
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <>
            <aside className="sidebar">
              <div className="sidebar-header">
                <h3>Course Library</h3>
              </div>
              
              <div className="playlist-container">
                {Object.keys(playlists).length > 0 ? (
                  Object.keys(playlists).map((playlistName) => {
                    const playlist = playlists[playlistName];
                    const isExpanded = expandedPlaylists[playlistName];
                    
                    return (
                      <div key={playlistName} className={`playlist ${isExpanded ? 'expanded' : ''}`}>
                        <div 
                          className="playlist-header" 
                          onClick={() => togglePlaylist(playlistName)}
                        >
                          <div className="playlist-icon">{playlist.icon}</div>
                          <div className="playlist-title-container">
                            <h4 className="playlist-title">{playlistName}</h4>
                            <p className="playlist-description">{playlist.description}</p>
                          </div>
                          <div className="playlist-toggle">
                            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="playlist-content">
                            {Object.keys(playlist.sections).map((sectionName) => {
                              const sectionKey = `${playlistName}:${sectionName}`;
                              const isSectionExpanded = expandedSections[sectionKey] !== false; // Default to expanded
                              
                              return (
                                <div key={sectionName} className="section">
                                  <div 
                                    className="section-header" 
                                    onClick={() => toggleSection(playlistName, sectionName)}
                                  >
                                    <h5 className="section-title">{sectionName}</h5>
                                    <div className="section-toggle">
                                      {isSectionExpanded ? <FaChevronDown /> : <FaChevronRight />}
                                    </div>
                                  </div>
                                  
                                  {isSectionExpanded && (
                                    <div className="video-list">
                                      {playlist.sections[sectionName].map((video) => (
                                        <div
                                          key={video.id}
                                          className={`video-item ${video.locked ? "locked" : ""} ${
                                            selectedVideo?.id === video.id ? "selected" : ""
                                          }`}
                                          onClick={() => selectVideo(playlistName, sectionName, video)}
                                        >
                                          <div className="video-icon">
                                            {video.locked ? <FaLock /> : <FaPlay />}
                                          </div>
                                          <div className="video-details">
                                            <p className="video-title">{video.name}</p>
                                            <p className="video-duration">{video.duration}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-state">
                    <p>No courses available</p>
                  </div>
                )}
              </div>
            </aside>

            <main className="video-section">
              {selectedVideo ? (
                <div className="video-player-container">
                  <div className="video-player">
                    <div className="video-placeholder">
                      <FaPlay className="play-icon" />
                      <p>Video player would render here</p>
                    </div>
                  </div>
                  
                  <div className="video-info">
                    <div className="video-meta">
                      <h2 className="video-title">{selectedVideo.name}</h2>
                      <p className="video-path">
                        {selectedVideo.playlistName} &gt; {selectedVideo.sectionName}
                      </p>
                    </div>
                    <p className="video-description">{selectedVideo.description}</p>
                  </div>
                </div>
              ) : (
                <div className="welcome-screen">
                  <h2>Welcome to Your Trading Academy</h2>
                  <p className="welcome-message">
                    Select a video from the course library to start learning.
                  </p>
                  
                  {(subscriptionStatus === "Expired" || subscriptionStatus === "Inactive") && (
                    <div className="subscription-banner">
                      <h3>{subscriptionStatus === "Expired" ? "Your subscription has expired" : "Unlock Premium Content"}</h3>
                      <p>Access all premium courses with a subscription.</p>
                      
                      <div className="payment-options">
                        <div className="payment-option">
                          <h4>Standard Subscription</h4>
                          <p className="price">R800</p>
                          <p className="duration">90 days access</p>
                        </div>
                      </div>
                      
                      <div className="payment-instructions">
                        <h4>How to subscribe:</h4>
                        <ol>
                          <li>Make a payment via EFT to our bank account</li>
                          <li>
                            <p>Use this reference when making payment:</p>
                            <div className="reference-box">
                              <span>{paymentReference}</span>
                              <button 
                                className="copy-btn" 
                                onClick={() => copyToClipboard(paymentReference)}
                                title="Copy to clipboard"
                              >
                                {copySuccess ? <FaCheck /> : <FaCopy />}
                              </button>
                            </div>
                          </li>
                          <li>Send proof of payment to <strong>payments@tradingacademy.co.za</strong></li>
                          <li>Your account will be activated within 24 hours</li>
                        </ol>
                        
                        <div className="bank-details">
                          <h5>Bank Details:</h5>
                          <p><strong>Bank:</strong> FNB</p>
                          <p><strong>Account Name:</strong> Trading Academy Africa</p>
                          <p><strong>Account Number:</strong> 12345678910</p>
                          <p><strong>Branch Code:</strong> 250655</p>
                          <p><strong>Account Type:</strong> Business</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {subscriptionStatus === "Active" && (
                    <div className="get-started-guide">
                      <h3>Getting Started</h3>
                      <div className="guide-steps">
                        <div className="guide-step">
                          <div className="step-number">1</div>
                          <p>Browse the course library in the sidebar</p>
                        </div>
                        <div className="guide-step">
                          <div className="step-number">2</div>
                          <p>Select a topic that interests you</p>
                        </div>
                        <div className="guide-step">
                          <div className="step-number">3</div>
                          <p>Watch videos in sequence for best results</p>
                        </div>
                      </div>
                      
                      {/* Device management section */}
                      <div className="device-management">
                        <h3>Device Management</h3>
                        <p>Your subscription allows access on {maxDevices} devices. You are currently using {deviceCount}/{maxDevices} devices.</p>
                        
                        <div className="device-list">
                          {deviceList.map(device => (
                            <div key={device.id} className={`device-item ${device.isCurrent ? 'current' : ''}`}>
                              <div className="device-icon">
                                {device.os === "iOS" || device.os === "Android" ? <FaMobileAlt /> : <FaDesktop />}
                              </div>
                              <div className="device-details">
                                <p className="device-name">{device.name}</p>
                                <p className="last-used">
                                  Last used: {new Date(device.lastUsed).toLocaleDateString()}
                                </p>
                              </div>
                              {!device.isCurrent && (
                                <button 
                                  className="remove-device-btn" 
                                  onClick={() => removeDevice(device.id)}
                                  title="Remove device"
                                >
                                  Remove
                                </button>
                              )}
                              {device.isCurrent && (
                                <div className="current-device-badge">Current Device</div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {deviceCount >= maxDevices && (
                          <div className="device-limit-warning">
                            <FaExclamationTriangle />
                            <p>You've reached your device limit. Remove a device to access from a new one.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </main>
          </>
        )}
      </div>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Forex Futures Crypto Africa. All rights reserved.</p>
      </footer>

      {/* Admin Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <h2>Add Subscription for {selectedUser?.name}</h2>
            <p>This will grant the user access to all premium content.</p>
            
            <div className="form-group">
              <label>Subscription Details:</label>
              <div className="subscription-details">
                <p><strong>Duration:</strong> 90 days</p>
                <p><strong>Price:</strong> R800</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn" 
                onClick={() => addSubscription(selectedUser.id, 90)}
              >
                Confirm Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;