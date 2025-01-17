import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firebase and Firestore
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [playlists, setPlaylists] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedPlaylists, setExpandedPlaylists] = useState({});
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for menu toggle
  const profileMenuRef = useRef(null); // Ref to detect clicks outside the menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
          navigate("/auth");
          return;
        }

        const adminEmail = "globalexpedyte@gmail.com"; // Admin email
        const userEmail = auth.currentUser.email;

        const isAdmin = userEmail === adminEmail;

        if (isAdmin) {
          console.log("Admin access granted.");
          setUserName("Admin");
          loadMockPlaylists(true);
          return;
        }

        // Fetch user data from Firestore
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

            if (remainingDays <= 0) {
              alert("Your subscription has expired. Please renew.");
              navigate("/pricing");
              return;
            }

            loadMockPlaylists(subscriptionData.planType === "Pro");
          } else {
            navigate("/pricing");
            return;
          }
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const loadMockPlaylists = (isAdmin) => {
      setPlaylists({
        "Forex Basics": {
          "Introduction to Forex": [
            {
              name: "What is Forex?",
              url: "https://www.youtube.com/embed/oS4YoboIgI4",
              description: "Learn the basics of Forex trading.",
            },
            {
              name: "Understanding Currency Pairs",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Understand how currency pairs work.",
            },
          ],
          "Forex Strategies": [
            {
              name: "Basic Forex Strategy",
              url: "https://www.youtube.com/embed/xvFZjo5PgG0",
              description: "A beginner-friendly Forex strategy.",
              locked: !isAdmin, // Locked for non-admins and beginners
            },
          ],
        },
        "Crypto Basics": {
          "Introduction to Crypto": [
            {
              name: "What is Cryptocurrency?",
              url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
              description: "An overview of cryptocurrencies.",
            },
            {
              name: "How Blockchain Works",
              url: "https://www.youtube.com/embed/tgbNymZ7vqY",
              description: "Learn how blockchain technology works.",
              locked: !isAdmin, // Locked for non-admins and beginners
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
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUpgrade = () => {
    alert("Upgrade to unlock this content!");
    navigate("/pricing");
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const closeProfileMenu = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeProfileMenu);
    return () => {
      document.removeEventListener("click", closeProfileMenu);
    };
  }, []);

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
              <p>Profile</p>
              <p>Settings</p>
              <p className="cancel-btn" onClick={handleSignOut}>
                Sign Out
              </p>
            </div>
          )}
          <button className="signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
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
                            } ${selectedVideo?.name === video.name ? "selected" : ""}`}
                            onClick={() =>
                              video.locked
                                ? handleUpgrade()
                                : setSelectedVideo(video)
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
        <p>Your membership is active.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
