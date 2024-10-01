import React, { useState } from "react";
import "../../App.css";
import StockNews from "../Client/StockNews";
import NewsPost from "../News/newsPost";
import ImageList from "../Admin/News/imageList";
import DashBoard from "./Dashbord";
import UserList from "../Admin/User/userList";
import { FaHome, FaUser, FaCog, FaSearch } from "react-icons/fa";
import LocalStockList from "../Admin/StockList/LocalStock/Get";
import TopLosersGet from "../Admin/StockList/LocalStock/TopLosersGet";
import MostActivelyTradedGet from "../Admin/StockList/LocalStock/MostActivelyTradedGet";
import TopGainersGet from "../Admin/StockList/LocalStock/TopGainersGet";

function ContentDashBoard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localStockDropdownOpen, setLocalStockDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleLocalStockDropdown = () => {
    setLocalStockDropdownOpen(!localStockDropdownOpen);
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
          overflow: "hidden",
        }}
      >
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
        </div>
        <nav style={{ marginTop: "20px", width: "100%", position: "relative" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li
              style={{ padding: "10px 15px", display: "flex", alignItems: "center", cursor: "pointer", color: "#ECF0F1" }}
              onClick={() => handleTabClick("Home")}
            >
              <FaHome style={{ fontSize: "24px" }} />
              {isOpen && <span style={{ marginLeft: "10px" }}>DashBoard</span>}
            </li>
            <li
              style={{ padding: "10px 15px", display: "flex", alignItems: "center", cursor: "pointer", color: "#ECF0F1" }}
              onClick={() => handleTabClick("User Admin")}
            >
              <FaUser style={{ fontSize: "24px" }} />
              {isOpen && <span style={{ marginLeft: "10px" }}>Media</span>}
            </li>
            <li
              style={{ padding: "10px 15px", display: "flex", alignItems: "center", cursor: "pointer", color: "#ECF0F1" }}
              onClick={() => handleTabClick("Content Admin")}
            >
              <FaUser style={{ fontSize: "24px" }} />
              {isOpen && <span style={{ marginLeft: "10px" }}>User</span>}
            </li>
            <li
              style={{ padding: "10px 15px", cursor: "pointer", color: "#ECF0F1", position: "relative" }}
            >
              <button
                onClick={toggleLocalStockDropdown}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ECF0F1",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: isOpen ? "100%" : "auto",
                  position: "relative",
                }}
              >
                <FaSearch style={{ fontSize: "24px" }} />
                {isOpen && <span style={{ marginLeft: "10px" }}>Local Stock List</span>}
              </button>
              {localStockDropdownOpen && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    backgroundColor: "#34495E",
                    color: "#fff",
                    listStyleType: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    width: isOpen ? "200px" : "150px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    zIndex: 10,
                  }}
                >
                  <li onClick={() => handleTabClick("Top Gainers")} style={{ padding: "5px 0", cursor: "pointer" }}>
                    Top Gainers
                  </li>
                  <li onClick={() => handleTabClick("Top Losers")} style={{ padding: "5px 0", cursor: "pointer" }}>
                    Top Losers
                  </li>
                  <li onClick={() => handleTabClick("Most Actively Traded")} style={{ padding: "5px 0", cursor: "pointer" }}>
                    Most Actively Traded
                  </li>
                </ul>
              )}
            </li>
            <li
              style={{ padding: "10px 15px", cursor: "pointer", color: "#ECF0F1", position: "relative" }}
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
                  position: "relative",
                }}
              >
                <FaCog style={{ fontSize: "24px" }} />
                {isOpen && <span style={{ marginLeft: "10px" }}>Options</span>}
              </button>
              {dropdownOpen && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    backgroundColor: "#34495E",
                    color: "#fff",
                    listStyleType: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    width: isOpen ? "200px" : "150px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    zIndex: 10,
                  }}
                >
                  <li onClick={navigateToClientPage} style={{ padding: "5px 0", cursor: "pointer" }}>
                    Go to Client Page
                  </li>
                  <li onClick={() => alert("Other Option")} style={{ padding: "5px 0", cursor: "pointer" }}>
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
        {activeTab === "Top Gainers" && <TopGainersGet/>}
        {activeTab === "Top Losers" && <TopLosersGet/>}
        {activeTab === "Most Actively Traded" && <MostActivelyTradedGet/>}
        {activeTab === "Stock News" && <StockNews />}
      </div>
    </div>
  );
}

export default ContentDashBoard;
