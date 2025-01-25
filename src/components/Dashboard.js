import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [playlists, setPlaylists] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedPlaylists, setExpandedPlaylists] = useState({});
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
          navigate("/auth");
          return;
        }

        const adminEmail = "globalexpedyte@gmail.com"; // Read admin email from .env
        const userEmail = auth.currentUser.email;

        // Check if the user is an admin
        if (userEmail === adminEmail) {
          setIsAdmin(true);
          setUserName("Admin");
          loadMockPlaylists(true); // Admin has access to all playlists
          setSubscriptionStatus("Lifetime access granted as Admin.");
          return; // Skip subscription checks for admin
        }

        // Fetch user data from Firestore for non-admin users
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserName(userData.name || "User");

          const subscriptionDoc = await db
            .collection("subscriptions")
            .doc(userId)
            .get();

          if (subscriptionDoc.exists) {
            const subscriptionData = subscriptionDoc.data();
            const expirationDate = subscriptionData.expiresAt.toDate();
            const remainingDays = Math.ceil(
              (expirationDate - new Date()) / (1000 * 60 * 60 * 24)
            );

            if (remainingDays > 0) {
              setSubscriptionStatus(`Active - ${remainingDays} days remaining`);
              loadMockPlaylists(true);
            } else {
              setSubscriptionStatus("Expired - Renew your subscription");
              loadMockPlaylists(false);
            }
          } else {
            setSubscriptionStatus("No subscription found");
            loadMockPlaylists(false);
          }
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const loadMockPlaylists = (isPremium) => {
      setPlaylists({
        "Introduction to Trading (All Markets)": {
          "Trading Basics": [
            {
              name: "What is Trading?",
              url: "https://www.youtube.com/embed/oS4YoboIgI4",
              description: "Learn the basics of trading across different markets.",
            },
            {
              name: "Overview of Forex, Futures, and Crypto Markets",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Understand the differences between various trading markets.",
              locked: !isPremium,
            },
            {
              name: "Common Trading Terminologies",
              url: "https://www.youtube.com/embed/xvFZjo5PgG0",
              description: "Familiarize yourself with essential trading terms.",
              locked: !isPremium,
            },
          ],
          "Understanding Risk Management": [
            {
              name: "Risk-Reward Ratio and Position Sizing",
              url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
              description: "Learn how to manage risk effectively.",
              locked: !isPremium,
            },
            {
              name: "Stop-Loss and Take-Profit Placement",
              url: "https://www.youtube.com/embed/tgbNymZ7vqY",
              description: "Master the art of setting stop-loss and take-profit orders.",
              locked: !isPremium,
            },
          ],
          "Setting Up Your Workspace": [
            {
              name: "Choosing the Right Platform",
              url: "https://www.youtube.com/embed/3e5Ed_uP7Gk",
              description: "Explore different platforms like MT5, Binance, and more.",
              locked: !isPremium,
            },
          ],
        },
        "Forex Trading (For Beginners and Experts)": {
          "Forex Market Dynamics": [
            {
              name: "Major Currency Pairs",
              url: "https://www.youtube.com/embed/W8PLvNNlNUQ",
              description: "An overview of the most traded currency pairs.",
              locked: !isPremium,
            },
            {
              name: "How Central Banks Impact Forex Markets",
              url: "https://www.youtube.com/embed/qWYF4FbMYCw",
              description: "Learn about the role of central banks in forex trading.",
              locked: !isPremium,
            },
          ],
          "Technical Analysis in Forex": [
            {
              name: "Support and Resistance Levels",
              url: "https://www.youtube.com/embed/zKQGz7_gIQY",
              description: "Identify key levels in the forex market.",
              locked: !isPremium,
            },
            {
              name: "Indicators: RSI, MACD, Bollinger Bands",
              url: "https://www.youtube.com/embed/RnEavzqDlX8",
              description: "Understand popular technical indicators.",
              locked: !isPremium,
            },
            {
              name: "Smart Money Concepts",
              url: "https://www.youtube.com/embed/RnEavzqDlX8",
              description: "Understand popular smart money concepts, Order Blocks, Fair Value Gaps and More",
              locked: !isPremium,
            },
            {
              name: "Finding a Profitable Strategy",
              url: "https://www.youtube.com/embed/RnEavzqDlX8",
              description: "FxFuturesCrypto Profitable Trading Strategy",
              locked: !isPremium,
            },
          ],
        },
        "Futures Trading (For Beginners and Experts)": {
          "Introduction to Futures": [
            {
              name: "What are Futures Contracts?",
              url: "https://www.youtube.com/embed/Hyfs7jzfbSA",
              description: "Understand the basics of futures trading.",
              locked: !isPremium,
            },
          ],
          "Technical and Fundamental Analysis in Futures": [
            {
              name: "Volume and Open Interest",
              url: "https://www.youtube.com/embed/hYxM7ZZnIXk",
              description: "Learn how to analyze volume and open interest.",
              locked: !isPremium,
            },
          ],
        },
        "Cryptocurrency Trading (For Beginners and Experts)": {
          "Introduction to Crypto Trading": [
            {
              name: "How Crypto Markets Operate",
              url: "https://www.youtube.com/embed/vXJ2yAv6a04",
              description: "Understand how cryptocurrency markets work.",
              locked: !isPremium,
            },
          ],
          "Crypto Trading Strategies": [
            {
              name: "Trend-Following Strategies",
              url: "https://www.youtube.com/embed/VmPmYWoFo98",
              description: "Master trend-following strategies for cryptocurrencies.",
              locked: !isPremium,
            },
            {
              name: "2025 Crypto Bull Run Watchlist",
              url: "https://www.youtube.com/embed/VmPmYWoFo98",
              description: "Find the right Altcoins & Memecoins",
              locked: !isPremium,
            },
          ],
        },
        "Psychology of Trading (All Markets)": {
          "The Trader's Mindset": [
            {
              name: "Overcoming Fear and Greed",
              url: "https://www.youtube.com/embed/PLnMnhWAK9w",
              description: "Develop a winning mindset for trading.",
              locked: !isPremium,
            },
          ],
        },
        "Building and Testing a Trading System": {
          "How to Create a Trading Plan": [
            {
              name: "Defining Your Trading Style",
              url: "https://www.youtube.com/embed/DTeqjd_dHSs",
              description: "Create a trading plan that suits your style.",
              locked: !isPremium,
            },
          ],
        },
        "How to Create a Basic Trading Bot (Advanced)": {
          "Building Your First Bot": [
            {
              name: "Overview of Algorithmic Trading",
              url: "https://www.youtube.com/embed/HdXrhgMx6GI",
              description: "Learn the basics of creating a trading bot.",
              locked: !isPremium,
            },
          ],
        },
      });
    };
    

    fetchUserData();
  }, [navigate]);

  const togglePlaylist = (playlistName) => {
    setExpandedPlaylists((prevState) => ({
      ...prevState,
      [playlistName]: !prevState[playlistName],
    }));
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUpgrade = () => {
    navigate("/pricing"); // Redirect to pricing or payment page
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const closeProfileMenu = (e) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(e.target) &&
      e.target.className !== "profile-btn"
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeProfileMenu);
    return () => {
      document.removeEventListener("click", closeProfileMenu);
    };
  }, []);

  const handleVideoSelection = (video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Ensure video remains at the top of the screen
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>ForexFuturesCrypto</h1>
        </div>
        <div className="header-right">
          <span>Welcome back, {userName || "User"}!</span>
          <button className="profile-btn" onClick={toggleProfileMenu}>
            Profile
          </button>
          {isProfileMenuOpen && (
            <div ref={profileMenuRef} className="profile-menu">
              <p>Language: English (za)</p>
              <p onClick={() => alert("Notifications feature coming soon!")}>
                Notifications
              </p>
              <p onClick={() => alert("Cancel Subscription not implemented yet")}>
                Cancel Subscription
              </p>
              <p className="logout-btn" onClick={handleSignOut}>
                Logout
              </p>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-main">
        <aside className="sidebar">
          <h3>Playlists</h3>
          {Object.keys(playlists).map((playlistName) => (
            <div key={playlistName} className="playlist">
              <h4
                className="playlist-title"
                onClick={() => togglePlaylist(playlistName)}
              >
                {playlistName}{" "}
                <span className="dropdown-indicator">
                  {expandedPlaylists[playlistName] ? "-" : "+"}
                </span>
              </h4>
              {expandedPlaylists[playlistName] && (
                <div className="playlist-content">
                  {Object.keys(playlists[playlistName]).map((subFolderName) => (
                    <div key={subFolderName} className="sub-folder">
                      <h5>{subFolderName}</h5>
                      {playlists[playlistName][subFolderName].map(
                        (video, index) => (
                          <button
                            key={index}
                            className={`video-item ${
                              video.locked ? "locked" : ""
                            } ${
                              selectedVideo?.name === video.name ? "selected" : ""
                            }`}
                            onClick={() =>
                              video.locked
                                ? handleUpgrade()
                                : handleVideoSelection(video)
                            }
                          >
                            {video.name}
                            {video.locked && " 🔒"}
                          </button>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        <main className="video-section">
          {selectedVideo ? (
            <>
              <iframe
                title={selectedVideo.name}
                className="video-player"
                src={selectedVideo.url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="video-details">
                <h3>{selectedVideo.name}</h3>
                <p>{selectedVideo.description}</p>
              </div>
            </>
          ) : (
            <p className="placeholder-text">Select a video to watch</p>
          )}
        </main>
      </div>

      <footer className="dashboard-footer">
        <p>{subscriptionStatus}</p>
        {!isAdmin && subscriptionStatus.includes("Expired") && (
          <button className="renew-button" onClick={handleUpgrade}>
            Pay Now
          </button>
        )}
      </footer>
    </div>
  );
};

export default Dashboard;