import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/sidebar.css"; // Make sure to create this file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Menu</h2>
      </div>
      <ul className="menu">
        <li><Link to="/login">Login</Link></li>  {/* Link to login page */}
        <li><Link to="/dashboard">Dashboard</Link></li>  {/* Link to dashboard page */}
        <li><Link to="/admin">Admin Panel</Link></li>  {/* Link to admin panel */}
        <li><Link to="/profit">Profit Goals</Link></li>{/* Link to Profit Goal Page */}
        <li><Link to="/transactions">Transactions</Link></li>  {/* Link to transactions page */}
        <li><Link to="/analytics">Analytics</Link></li>  {/* Link to analytics page */}
        <li><Link to="/logout">Logout</Link></li>  {/* Link to logout page (You can add this functionality) */}
      </ul>
    </div>
  );
};

export default Sidebar;
