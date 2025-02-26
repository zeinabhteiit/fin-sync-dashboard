import React from "react";
import "../styles/sidebar.css"; // Make sure to create this file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>FinSync</h2>
      </div>
      <ul className="menu">
        <li> Login</li>
        <li> Dashboard</li>
        <li> Admin Panel</li>
        <li> Categories</li>
        <li> Transactions</li>
        <li> Analytics</li>
        <li> Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
