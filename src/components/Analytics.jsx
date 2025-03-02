// Analytics.jsx
import React from "react";
import "../styles/analytics.css";

const Analytics = () => {
  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <div className="analytics-content">
        <div className="analytics-item">
          <h3>Revenue</h3>
          <p>$10,000</p>
        </div>
        <div className="analytics-item">
          <h3>Transactions</h3>
          <p>$1,250</p>
        </div>
        <div className="analytics-item">
          <h3>Users</h3>
          <p>$5,000</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
