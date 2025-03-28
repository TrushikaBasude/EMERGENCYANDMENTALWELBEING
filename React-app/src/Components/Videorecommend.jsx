import React, { useState } from "react";
import axios from "axios";
import "../Components/Videorecommend.css";

const Videorecommend = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Self help", "Reducing stress", "Anxiety", 
    "Panic attacks", "Breathing exercises", 
    "Stretching", "Calm music", "Meditation"
  ];

  const fetchVideos = async (searchTerm) => {
    setLoading(true);
    setError("");

    try {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!API_KEY) throw new Error("API key is missing. Check your .env file.");
      
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: searchTerm,
            type: "video",
            maxResults: 6,
            key: API_KEY,
          },
        }
      );
      
      setVideos(response.data.items);
    } catch (err) {
      setError("Failed to load videos. Please try again.");
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") fetchVideos(query);
  };

  return (
    <div className="video-container">
      <h2 className="title">Mental Wellness Videos</h2>
      
      <div className="search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search videos..." 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <div className="categories">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => { setSelectedCategory(category); fetchVideos(category); }}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && <p className="loading-text">Loading videos...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h4>{video.snippet.title}</h4>
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
              Watch
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videorecommend;
