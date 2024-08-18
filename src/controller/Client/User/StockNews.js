import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/news');
        console.log('API Response:', response.data); // Debug logging

        // Check if 'articles' exists in the response
        if (response.data && response.data.articles) {
          setNews(response.data.articles);
        } else {
          setError('No news data available.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Error fetching news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3 style={{ textAlign: "center", fontSize: "1.5rem" }}>Latest News</h3>
      <ul style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', padding: 0, margin: 0, fontSize: "0.9rem" }}>
        {news.length > 0 ? (
          news.map((item, index) => (
            <li key={index} style={{ listStyleType: 'none', margin: '10px ' }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", textDecoration: 'none', color: '#000' }}>
                <h4 style={{ fontSize: "1rem", margin: '10' }}>{item.title}</h4>
                <p style={{ fontSize: "0.8rem", margin: '10 0 0 10',color:"burlywood" }}><strong style={{color:"white"}}>Source:</strong> {item.source.name}</p>
                <p style={{ fontSize: "0.6rem" }}>{item.content}</p>
                {item.urlToImage && <img src={item.urlToImage} alt="News" style={{ width: '100%', height: 'auto' }} />}
                <p style={{ fontSize: "0.7rem", margin: '0' }}><strong style={{color:"white"}}>Published:</strong> {new Date(item.publishedAt).toLocaleString()}</p>
              </a>
            </li>
          ))
        ) : (
          <p>No news available.</p>
        )}
      </ul>
    </div>
  );
};

export default StockNews;
