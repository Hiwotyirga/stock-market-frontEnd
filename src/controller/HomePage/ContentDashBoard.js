import React, { useState } from "react";
import "../../App.css";
import StockNews from "../Client/StockNews";
import NewsPost from "../News/newsPost";
import ImageList from "../Admin/News/imageList";
import DashBoard from "./Dashbord";
import UserList from "../Admin/User/userList";
import { FaHome, FaUser, FaCog, FaSearch } from "react-icons/fa";
import LocalStock from "../Admin/StockList/LocalStock/TopGainersPost";
import LocalStockList from "../Admin/StockList/LocalStock/Get";

function ContentDashBoard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateToClientPage = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          backgroundColor: "#2C3E50",
          width: isOpen ? "240px" : "80px",
          transition: "width 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingTop: "10px",
          position: "fixed",
          height: "100vh",
          overflow: "hidden", // Prevent overflow of sidebar content
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            width: "100%",
            padding: "10px",
            color: "#ECF0F1",
            textAlign: isOpen ? "left" : "center",
          }}
        >
          <button
            onClick={toggleSidebar}
            style={{ background: "none", border: "none", color: "#ECF0F1" }}
          >
            ☰
          </button>
          {/* {isOpen && <h2>Admin Panel</h2>} */}
        </div>

        {/* Sidebar Links */}
        <nav style={{ marginTop: "20px", width: "100%", position: "relative" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li
              style={{
                padding: "10px 15px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#ECF0F1",
              }}
              onClick={() => handleTabClick("Home")}
            >
              <FaHome style={{ fontSize: "24px" }} />
              {isOpen && <span style={{ marginLeft: "10px" }}>DashBoard</span>}
            </li>
            <li
              style={{
                padding: "10px 15px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#ECF0F1",
              }}
              onClick={() => handleTabClick("User Admin")}
            >
              <FaUser style={{ fontSize: "24px" }} />
              {isOpen && <span style={{ marginLeft: "10px" }}>Media</span>}
            </li>
            <li
              style={{
                padding: "10px 15px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#ECF0F1",
              }}
              onClick={() => handleTabClick("Content Admin")}
            >
              <FaUser style={{ fontSize: "24px" }} />
              {isOpen && <span style={{ marginLeft: "10px" }}>User</span>}
            </li>
            <li
              style={{
                padding: "10px 15px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#ECF0F1",
              }}
              onClick={() => handleTabClick("Search")}
            >
              <FaSearch style={{ fontSize: "24px" }} />
              {isOpen && (
                <span style={{ marginLeft: "10px" }}>Local Stock List</span>
              )}
            </li>
            <li
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                color: "#ECF0F1",
                position: "relative",
              }}
            >
              <button
                onClick={toggleDropdown}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ECF0F1",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: isOpen ? "100%" : "auto",
                  position: "relative", // Ensure button is relative to position the dropdown
                }}
              >
                <FaCog style={{ fontSize: "24px" }} />
                {isOpen && <span style={{ marginLeft: "10px" }}>Options</span>}
              </button>

              {dropdownOpen && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%", // Position dropdown below the button
                    left: "0", // Align dropdown with the left edge of the button
                    backgroundColor: "#34495E",
                    color: "#fff",
                    listStyleType: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    width: isOpen ? "200px" : "150px", // Adjust width based on sidebar open state
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // Optional shadow for better visibility
                    zIndex: 10, // Ensure dropdown is on top of other content
                  }}
                >
                  <li
                    onClick={navigateToClientPage}
                    style={{ padding: "5px 0", cursor: "pointer" }}
                  >
                    Go to Client Page
                  </li>
                  <li
                    onClick={() => alert("Other Option")}
                    style={{ padding: "5px 0", cursor: "pointer" }}
                  >
                    Other Option
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: isOpen ? "240px" : "80px",
          padding: "20px",
          transition: "margin-left 0.3s ease-in-out",
          flex: 1,
        }}
      >
        {activeTab === "Home" && <DashBoard />}
        {activeTab === "User Admin" && <ImageList />}
        {activeTab === "Content Admin" && <UserList />}
        {activeTab === "Search" && <LocalStockList />}
        {activeTab === "Settings" && <h1>Hello Settings</h1>}
      </div>
    </div>
  );
}

export default ContentDashBoard;
