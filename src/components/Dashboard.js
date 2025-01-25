import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("User");
  const [playlists, setPlaylists] = useState({});
  const [expandedPlaylists, setExpandedPlaylists] = useState({});
  const [subscriptionStatus, setSubscriptionStatus] = useState("Fetching subscription status...");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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

        const userEmail = auth.currentUser?.email;

        // Check for admin access
        const adminEmail = "globalexpedyte@gmail.com";
        if (userEmail === adminEmail) {
          setUserName("Admin");
          loadMockPlaylists(true);
          setSubscriptionStatus("Lifetime access granted as Admin.");
          return;
        }

        // Fetch user subscription data
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserName(userData.name || "User");

          const subscriptionDoc = await db.collection("subscriptions").doc(userId).get();
          if (subscriptionDoc.exists) {
            const subscriptionData = subscriptionDoc.data();
            const expirationDate = subscriptionData.expiresAt.toDate();
            const remainingDays = Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24));

            if (remainingDays > 0) {
              setSubscriptionStatus(`Active - ${remainingDays} days remaining`);
              loadMockPlaylists(true);
            } else {
              setSubscriptionStatus("Expired - Please renew your subscription.");
              loadMockPlaylists(false);
            }
          } else {
            setSubscriptionStatus("No active subscription found.");
            loadMockPlaylists(false);
          }
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSubscriptionStatus("Error fetching subscription data.");
        loadMockPlaylists(false); // Ensure titles are displayed even on error
      }
    };

    const loadMockPlaylists = (isPremium) => {
      setPlaylists({
        "Introduction to Trading (All Markets)": {
          "Trading Basics": [
            { name: "What is Trading?", locked: !isPremium },
            { name: "Overview of Forex, Futures, and Crypto Markets", locked: !isPremium },
            { name: "Common Trading Terminologies", locked: !isPremium },
          ],
          "Understanding Risk Management": [
            { name: "Risk-Reward Ratio and Position Sizing", locked: !isPremium },
            { name: "Stop-Loss and Take-Profit Placement", locked: !isPremium },
          ],
        },
        "Forex Trading (For Beginners and Experts)": {
          "Forex Market Dynamics": [
            { name: "Major Currency Pairs", locked: !isPremium },
            { name: "How Central Banks Impact Forex Markets", locked: !isPremium },
          ],
          "Technical Analysis in Forex": [
            { name: "Support and Resistance Levels", locked: !isPremium },
            { name: "Indicators: RSI, MACD, Bollinger Bands", locked: !isPremium },
            { name: "Smart Money Concepts", locked: !isPremium },
          ],
        },
        "Futures Trading (For Beginners and Experts)": {
          "Introduction to Futures": [
            { name: "What are Futures Contracts?", locked: !isPremium },
          ],
          "Technical and Fundamental Analysis in Futures": [
            { name: "Volume and Open Interest", locked: !isPremium },
          ],
        },
        "Cryptocurrency Trading (For Beginners and Experts)": {
          "Introduction to Crypto Trading": [
            { name: "How Crypto Markets Operate", locked: !isPremium },
          ],
          "Crypto Trading Strategies": [
            { name: "Trend-Following Strategies", locked: !isPremium },
            { name: "2025 Crypto Bull Run Watchlist", locked: !isPremium },
          ],
        },
        "How to Create a Basic Trading Bot (Advanced)": {
          "Building Your First Bot": [
            { name: "Overview of Algorithmic Trading", locked: !isPremium },
            { name: "Automating a Simple Strategy", locked: !isPremium },
          ],
          "Trading Bot Strategy Design": [
            { name: "Defining Your Strategy Logic", locked: !isPremium },
            { name: "Backtesting the Bot Effectively", locked: !isPremium },
          ],
          "Programming Basics for Bots": [
            { name: "Introduction to Python for Bots", locked: !isPremium },
            { name: "Using APIs for Market Data", locked: !isPremium },
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

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const closeProfileMenu = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeProfileMenu);
    return () => document.removeEventListener("click", closeProfileMenu);
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>ForexFuturesCrypto</h1>
        </div>
        <div className="header-right">
          <span>
            Welcome back, <strong>{userName}</strong>!
          </span>
          <button className="profile-btn" onClick={toggleProfileMenu}>
            Profile
          </button>
          {isProfileMenuOpen && (
            <div ref={profileMenuRef} className="profile-menu">
              <p>Language: English (za)</p>
              <p>Notifications</p>
              <p>Cancel Subscription</p>
              <p onClick={() => auth.signOut() && navigate("/auth")}>Logout</p>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-main">
        <aside className="sidebar">
          <h3>Playlists</h3>
          {Object.keys(playlists).length > 0 ? (
            Object.keys(playlists).map((playlistName) => (
              <div key={playlistName} className="playlist">
                <h4
                  className="playlist-title"
                  onClick={() => togglePlaylist(playlistName)}
                >
                  {playlistName}{" "}
                  <span>{expandedPlaylists[playlistName] ? "-" : "+"}</span>
                </h4>
                {expandedPlaylists[playlistName] && (
                  <div className="playlist-content">
                    {Object.keys(playlists[playlistName]).map((sectionName) => (
                      <div key={sectionName} className="sub-folder">
                        <h5>{sectionName}</h5>
                        {playlists[playlistName][sectionName].map((video, index) => (
                          <div
                            key={index}
                            className={`video-item ${video.locked ? "locked" : ""}`}
                            onClick={() =>
                              video.locked
                                ? alert("Subscribe to unlock this video.")
                                : alert("Playing video...")
                            }
                          >
                            {video.name}
                            {video.locked && " 🔒"}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No playlists available.</p>
          )}
        </aside>

        <main className="video-section">
          <h2>Subscription Status</h2>
          <p>{subscriptionStatus}</p>
          <p className="placeholder-text">Select a video to watch</p>
        </main>
      </div>

      <footer className="dashboard-footer">
        <p>{subscriptionStatus}</p>
      </footer>
    </div>
  );
};

export default Dashboard;
