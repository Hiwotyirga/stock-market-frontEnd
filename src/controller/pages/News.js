import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [files, setFiles] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // State for watchlist
  const [popupVisible, setPopupVisible] = useState({}); // State to manage popup visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/media/files");
        const sortedFiles = response.data.items.sort(
          (a, b) => new Date(b.postTime) - new Date(a.postTime)
        );
        setFiles(sortedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  const handleMediaClick = (file) => {
    navigate(`/media/${file.id}`, { state: { file } });
  };

  const addToWatchlist = (file) => {
    // Check if the file is already in the watchlist
    if (watchlist.find((item) => item.id === file.id)) {
      return; // Don't add if already in watchlist
    }
    setWatchlist([...watchlist, file]); // Add the file to the watchlist
    showPopup(file.id); // Show the popup
  };

  const showPopup = (id) => {
    setPopupVisible((prev) => ({ ...prev, [id]: true })); // Show popup for the clicked file
    setTimeout(() => {
      setPopupVisible((prev) => ({ ...prev, [id]: false })); // Hide popup after 2 seconds
    }, 2000);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        overflowY: "auto",
        maxHeight: "calc(100vh - 40px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => handleMediaClick(file)}
            style={{
              width: "23%",
              height: "400px",
              margin: "15px 0",
              color: "#666",
              backgroundColor: "#666",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: "yellow",
                padding: "10px",
                fontSize: "18px",
                color: "#333",
                textAlign: "center",
              }}
            >
              {file.content || "No title"}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {file.mimetype.startsWith("image/") && (
                <img
                  src={`http://localhost:8080/images/${file.filename}`}
                  alt={file.filename || "Placeholder"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              {file.mimetype.startsWith("video/") && (
                <video
                  src={`http://localhost:8080/images/${file.filename}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                  }}
                  controls
                />
              )}
            </div>
            <div
              style={{
                padding: "10px",
                fontSize: "14px",
                color: "white",
                textAlign: "center",
              }}
            >
              <p>
                {file.description
                  ? file.description.length > 100
                    ? file.description.substring(0, 100) + "..."
                    : file.description
                  : "No description available"}
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                fontSize: "15px",
                color: "darkblue",
              }}
            >
              {new Date(file.postTime).toLocaleDateString()}
            </div>

            {/* Circular Add to Watchlist Button */}
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering media click
                addToWatchlist(file);
              }}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "30px", // Width of the circular button
                height: "30px", // Height of the circular button
                borderRadius: "50%", // Make it circular
                backgroundColor: "green", // Background color of the button
                color: "white", // Color of the plus icon
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span style={{ fontSize: "15px", lineHeight: "15px", margin: "0" }}>+</span>

              {/* Popup for "Add to Watchlist" message */}
              {popupVisible[file.id] && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "35px",
                    backgroundColor: "white",
                    color: "black",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                    fontSize: "12px",
                  }}
                >
                  Add to Watchlist
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
