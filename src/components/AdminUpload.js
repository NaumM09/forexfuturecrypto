import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/AdminUpload.css";

const AdminUpload = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [newSubFolderName, setNewSubFolderName] = useState("");
  const [subFolders, setSubFolders] = useState([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState("");
  const [videoName, setVideoName] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistsCollection = collection(db, "playlists");
        const querySnapshot = await getDocs(playlistsCollection);
        const fetchedPlaylists = querySnapshot.docs.map((doc) => doc.id);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName) {
      setMessage("Playlist name cannot be empty.");
      return;
    }
    try {
      const playlistRef = doc(db, "playlists", newPlaylistName);
      await setDoc(playlistRef, {}); // Create an empty playlist
      setPlaylists([...playlists, newPlaylistName]);
      setNewPlaylistName("");
      setMessage(`Playlist "${newPlaylistName}" created successfully!`);
    } catch (error) {
      console.error("Error creating playlist:", error);
      setMessage("Failed to create playlist.");
    }
  };

  const handleCreateSubFolder = async () => {
    if (!selectedPlaylist || !newSubFolderName) {
      setMessage("Select a playlist and enter a sub-folder name.");
      return;
    }
    try {
      const playlistRef = doc(db, "playlists", selectedPlaylist);
      const subFolderData = {
        [newSubFolderName]: [],
      };
      await setDoc(playlistRef, subFolderData, { merge: true });
      setSubFolders([...subFolders, newSubFolderName]);
      setNewSubFolderName("");
      setMessage(`Sub-folder "${newSubFolderName}" created successfully in "${selectedPlaylist}"!`);
    } catch (error) {
      console.error("Error creating sub-folder:", error);
      setMessage("Failed to create sub-folder.");
    }
  };

  const handleUploadVideo = async () => {
    if (!selectedPlaylist || !selectedSubFolder || !videoName || !videoURL) {
      setMessage("All fields are required to upload a video.");
      return;
    }
    try {
      const playlistRef = doc(db, "playlists", selectedPlaylist);
      const playlistData = {
        [selectedSubFolder]: [
          {
            name: videoName,
            url: videoURL,
          },
        ],
      };
      await setDoc(playlistRef, playlistData, { merge: true });
      setMessage(`Video "${videoName}" uploaded successfully!`);
      setVideoName("");
      setVideoURL("");
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Failed to upload video.");
    }
  };

  return (
    <div className="admin-upload">
      <h2>Admin Panel</h2>

      <div>
        <h3>Create New Playlist</h3>
        <input
          type="text"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button onClick={handleCreatePlaylist}>Create Playlist</button>
      </div>

      <div>
        <h3>Select Playlist</h3>
        <select onChange={(e) => setSelectedPlaylist(e.target.value)} value={selectedPlaylist}>
          <option value="">Select a Playlist</option>
          {playlists.map((playlist) => (
            <option key={playlist} value={playlist}>
              {playlist}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Create New Sub-Folder</h3>
        <input
          type="text"
          placeholder="Enter sub-folder name"
          value={newSubFolderName}
          onChange={(e) => setNewSubFolderName(e.target.value)}
        />
        <button onClick={handleCreateSubFolder}>Create Sub-Folder</button>
      </div>

      <div>
        <h3>Select Sub-Folder</h3>
        <select onChange={(e) => setSelectedSubFolder(e.target.value)} value={selectedSubFolder}>
          <option value="">Select a Sub-Folder</option>
          {subFolders.map((subFolder) => (
            <option key={subFolder} value={subFolder}>
              {subFolder}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Upload Video</h3>
        <input
          type="text"
          placeholder="Enter video name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />
        <button onClick={handleUploadVideo}>Upload Video</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminUpload;
