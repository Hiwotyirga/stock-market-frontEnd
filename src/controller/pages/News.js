import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/media/files");
        const sortedFiles = response.data.items
          .sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
        setFiles(sortedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  const handleMediaClick = (file) => {
    // Navigate to the full details page with file data
    navigate(`/media/${file.id}`, { state: { file } });
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
      {/* <h2 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>
        Latest News
      </h2> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between", // Ensure spacing between items
        }}
      >
        {files.map((file, index) => (
          <div
            key={file.id}
            onClick={() => handleMediaClick(file)}
            style={{
              width: "23%", // Adjust width to fit 4 items per row
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
