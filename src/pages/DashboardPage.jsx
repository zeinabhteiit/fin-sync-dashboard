import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import "../styles/dashboard.css";

const INCOME_API_URL = "https://fin-sync.onrender.com/api/fixed-income";
const EXPENSES_API_URL = "https://fin-sync.onrender.com/api/fixed-expenses";
const RECURRING_INCOME_API_URL = "https://fin-sync.onrender.com/api/recurring-incomes";
const PROFIT_GOAL_API_URL = "http://localhost:5000/api/profit-goals";

const DashboardPage = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [profitData, setProfitData] = useState({ netProfit: 0, profitGoal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeResponse, expensesResponse, recurringIncomeResponse, profitGoalResponse] = await Promise.all([
          axios.get(INCOME_API_URL),
          axios.get(EXPENSES_API_URL),
          axios.get(RECURRING_INCOME_API_URL),
          axios.get(PROFIT_GOAL_API_URL)
        ]);

        // Calculate net profit (assuming recurring income is part of total income)
        const totalIncome = incomeResponse.data.reduce((sum, item) => sum + item.amount, 0) +
                          recurringIncomeResponse.data.reduce((sum, item) => sum + item.amount, 0);
        const totalExpenses = expensesResponse.data.reduce((sum, item) => sum + item.amount, 0);
        const netProfit = totalIncome - totalExpenses;

        // Get profit goal from API
        const currentProfitGoal = profitGoalResponse.data.length > 0 
          ? profitGoalResponse.data[0].target_profit 
          : 0;

        setProfitData({
          netProfit: netProfit,
          profitGoal: currentProfitGoal
        });

        // Existing chart data setup
        const combinedData = incomeResponse.data.map((incomeItem, index) => ({
          name: incomeItem.month,
          income: incomeItem.amount,
          expenses: expensesResponse.data[index]?.amount || 0,
        }));

        setBarChartData(combinedData);
        setPieChartData([
          { name: "Income", value: totalIncome },
          { name: "Expenses", value: totalExpenses },
        ]);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#800080", "#FFB6C1"];
  const profitChartData = [{
    name: "Profit",
    netProfit: profitData.netProfit,
    profitGoal: profitData.profitGoal
  }];

  return (
    <div className="dashboard">
            <center>
        <h1 style={{ color: "#800080", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          FinSync
          <img src="https://i.ibb.co/Q7qvnMBc/finsync-4x-1.png" alt="FinSync Logo" style={{ height: "40px" }} />
        </h1>
      </center>
      <div className="dashboard-container">
        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            <div className="charts-wrapper" style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              marginTop: "40px",
              marginBottom: "40px",
            }}>
              {/* Existing Bar Chart */}
              <div className="chart-section" style={{ flex: 1, textAlign: "center" }}>
                <h3 style={{ marginBottom: "48px" }}>Income vs. Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#800080" />
                    <Bar dataKey="expenses" fill="#FFB6C1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Existing Pie Chart */}
              <div className="chart-section" style={{ flex: 1, textAlign: "center" }}>
                <h3 style={{ marginBottom: "20px" }}>Income vs. Expenses Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                   data={pieChartData}
                   cx="50%"
                   cy="50%"
                   outerRadius={100}
                   fill="#4B0082"
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

            {/* New Profit Goal Bar Chart */}
            <div className="profit-goal-section" style={{ marginTop: "40px", textAlign: "center" }}>
              <h3 style={{ marginBottom: "60px" }}>Profit Goal vs. Net Profit</h3>
              <div style={{ width: "50%", margin: "0 auto" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={profitChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="netProfit" fill="#800080" name="Net Profit" />
                    <Bar dataKey="profitGoal" fill="#FFB6C1" name="Profit Goal" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
