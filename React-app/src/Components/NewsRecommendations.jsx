import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/News.css";

const NewsRecommendations = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("mental health");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (searchQuery) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) throw new Error("API key is missing. Check your .env file.");
      
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`
      );
      
      setNews(response.data.articles);
      setError(null);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  return (
    <div className="news-page">
      <div className="news-header">
        <h2 className="news-title">📰 Recommended News</h2>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="news-grid">
        {news.slice(0, 12).map((article, index) => (
          <div key={index} className="news-card">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img
                src={article.urlToImage || "https://via.placeholder.com/250"}
                alt={article.title}
                className="news-thumbnail"
              />
              <div className="news-info">
                <h3 className="news-headline">{article.title}</h3>
                <p className="news-description">{article.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsRecommendations;
