import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MediaDetail.module.css"; // Adjust the import path as needed

const MediaDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};

  if (!file) {
    return <div className={styles.container}>No media data available.</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.button}>
        Go Back
      </button>
      <h2 className={styles.title}>{file.content || "No title"}</h2>
      <div className={styles.media}>
        {file.mimetype.startsWith("image/") ? (
          <img
            src={`http://localhost:8080/images/${file.filename}`}
            alt={file.filename || "Media"}
          />
        ) : file.mimetype.startsWith("video/") ? (
          <video
            src={`http://localhost:8080/images/${file.filename}`}
            controls
          />
        ) : (
          <div>Unsupported media type</div>
        )}
      </div>
      <p className={styles.description}>
        {file.description || "No description available"}
      </p>
      <p className={styles.date}>
        Posted on: {new Date(file.postTime).toLocaleDateString()}
      </p>
    </div>
  );
};

export default MediaDetail;
