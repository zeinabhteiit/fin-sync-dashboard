import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import "../styles/dashboard.css";

// Replace with your actual API endpoints
const INCOME_API_URL = "https://fin-sync.onrender.com/api/fixed-income";
const EXPENSES_API_URL = "https://fin-sync.onrender.com/api/fixed-expenses";
const RECURRING_INCOME_API_URL = "https://fin-sync.onrender.com/api/recurring-incomes";
const RECURRING_EXPENSES_API_URL = "https://fin-sync.onrender.com/api/recurring-expenses";
const PROFIT_GOAL_API_URL = "http://localhost:5000/api/profit-goals"; // New API endpoint

const DashboardPage = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [profitGoal, setProfitGoal] = useState({ collected: 0, goal: 0 }); // New state for profit goal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Income, Expenses, Recurring Income, Recurring Expenses, and Profit Goal data
        const [incomeResponse, expensesResponse, recurringIncomeResponse, profitGoalResponse] = await Promise.all([
          axios.get(INCOME_API_URL),
          axios.get(EXPENSES_API_URL),
          axios.get(RECURRING_INCOME_API_URL),  // Use the recurring income API
          axios.get(PROFIT_GOAL_API_URL) // Fetch profit goal data
        ]);

        console.log("Income Data:", incomeResponse.data);  // Debugging
        console.log("Expenses Data:", expensesResponse.data);  // Debugging
        console.log("Recurring Income Data:", recurringIncomeResponse.data);  // Debugging
        console.log("Profit Goal Data:", profitGoalResponse.data); // Debugging

        // Combine Income and Expenses into one object
        if (incomeResponse.data && expensesResponse.data) {
          const combinedData = incomeResponse.data.map((incomeItem, index) => ({
            name: incomeItem.month,
            income: incomeItem.amount,
            expenses: expensesResponse.data[index] ? expensesResponse.data[index].amount : 0,
          }));

          setBarChartData(combinedData);
        }

        // Prepare the Pie Chart data for Income and Expenses
        setPieChartData([ 
          { name: "Income", value: incomeResponse.data.reduce((sum, item) => sum + item.amount, 0) }, // Sum of income
          { name: "Expenses", value: expensesResponse.data.reduce((sum, item) => sum + item.amount, 0) }, // Sum of expenses
        ]);

        // Set Profit Goal
        if (profitGoalResponse.data) {
          setProfitGoal({
            collected: profitGoalResponse.data.collected,
            goal: profitGoalResponse.data.goal
          });
        }

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array ensures this effect runs once on mount

  // Pie chart colors for Income and Expenses
  const COLORS = ["#C0A0D8", "#FFB6C1"];  //  for Income,  for Expenses

  return (
   <div classname= "dashboard">
    <center>
  <h1>FinSync</h1>
  </center>
<div className="dashboard-container"> 
  {/* Show Loading State */}
  {loading && <p>Loading data...</p>}
  {error && <p style={{ color: "red" }}>{error}</p>}

  {/* If Data is Available, Show Charts */}
  {!loading && !error && (
    <>
      <div
        className="charts-wrapper"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
          marginTop: "40px",
          marginBottom: "40px", // Add margin bottom here
        }}
      >
        {/* Bar Chart Section */}
        <div className="chart-section" style={{ flex: 1, textAlign: "center" }}>
          <h3 style={{ marginBottom: "48px" }}>Income vs. Expenses</h3> {/* Increased margin-bottom */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#C0A0D8" />
              <Bar dataKey="expenses" fill="#FFB6C1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Section */}
        <div className="chart-section" style={{ flex: 1, textAlign: "center" }}>
          <h3 style={{ marginBottom: "20px" }}>Income vs. Expenses Breakdown</h3> {/* Increased margin-bottom */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profit Goal Section Below the Charts */}
      <div
        className="profit-goal-section"
        style={{ marginTop: "40px", textAlign: "center" }}
      >
        <h3 style={{ marginBottom: "85px" }}>Profit Goal Progress</h3>
        <div
          className="profit-goal-progress"
          style={{ display: "flex", justifyContent: "center", gap: "20px" }}
        >
          <div className="progress-bar" style={{ width: "50%" }}>
            {/* Change progress bar color to purple */}
            <progress
              value={profitGoal.collected}
              max={profitGoal.goal}
              style={{
                width: "100%",
                accentColor: "#800080", // Purple color for better browser compatibility
              }}
            />
          </div>
          <div className="profit-goal-details" style={{ flex: 1 }}>
            <p>
              <strong>Collected:</strong> ${profitGoal.collected}
            </p>
            <p>
              <strong>Goal:</strong> ${profitGoal.goal}
            </p>
          </div>
        </div>
      </div>
    </>
  )}
</div>
</div>
  );
};

export default DashboardPage;
