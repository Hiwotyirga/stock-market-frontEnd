import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MediaDetail.module.css";

const MediaDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};

  if (!file) {
    return <div className={styles.container}>No media data available.</div>;
  }

  const isImage = file.mimetype && file.mimetype.startsWith("image/");
  const isVideo = file.mimetype && file.mimetype.startsWith("video/");

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.button}>
        Go Back
      </button>
      <h2 className={styles.title}>{file.content || "No title"}</h2>
      <div className={styles.media}>
        {isImage ? (
          <img
            src={`http://localhost:8080/images/${file.filename}`}
            alt={file.filename || "Media"}
          />
        ) : isVideo ? (
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
