import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import "../styles/dashboard.css";

const data = [
  { month: "Jan", income: 30000, expenses: 20000 },
  { month: "Feb", income: 35000, expenses: 22000 },
  { month: "Mar", income: 28000, expenses: 19000 },
  { month: "Apr", income: 45000, expenses: 26000 },
  { month: "May", income: 40000, expenses: 25000 },
  { month: "Jun", income: 38000, expenses: 23000 },
  { month: "Jul", income: 50000, expenses: 28000 },
  { month: "Aug", income: 32000, expenses: 22000 },
];

const pieData = [
  { name: "Income", value: 592000 },
  { name: "Expenses", value: 238000 },
];

const COLORS = ["#6a008a", "#ff6699"];

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
          {/* Bar Chart */}
          <div className="bar-chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#6a008a" />
                <Bar dataKey="expenses" fill="#ff6699" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="pie-chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
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