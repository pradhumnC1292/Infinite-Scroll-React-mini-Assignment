import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?page=${page}&per_page=10&client_id=GJJUdnbxXkU2xjMVTEej7TIyz459m3jHfoqFcA7DUTQ`
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="infinite-scroll-container">
      <h1>Infinite Scrolling</h1>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.urls.small} alt={photo.alt_description} />
          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
