import React from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Cards Section */}
      <div className="cards">
        <div className="card">
          <h3>Total Balance</h3>
          <p>$632,000</p>
        </div>
        <div className="card">
          <h3>Total Income</h3>
          <p>$592,000</p>
        </div>
        <div className="card">
          <h3>Total Savings</h3>
          <p>$354,000</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>$238,000</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="analytics">
        <h2>Analytics</h2>
        <div className="charts">
          <div className="bar-chart"> Bar Chart Placeholder</div>
          <div className="pie-chart">Pie Chart Placeholder</div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="transactions">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Adobe After Effects</td>
              <td>Sat, 20 Apr 2022</td>
              <td>$80.09</td>
              <td className="completed">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
