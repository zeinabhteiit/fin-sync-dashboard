import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import "../styles/sidebar.css"; // Make sure to create this file


const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Menu</h2>
      </div>
      <ul className="menu">
        <li><Link to="/dashboard">Dashboard</Link></li>  
        <li><Link to="/admin">Admin Panel</Link></li>  
        <li><Link to="/profit">Profit Goals</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>  
        <li><Link to="/analytics">Analytics</Link></li>  
        <li><button onClick={handleLogout}>Logout</button></li>  
      </ul>
    </div>
  );
};

export default Sidebar;

