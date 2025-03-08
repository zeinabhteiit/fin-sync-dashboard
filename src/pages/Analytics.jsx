import React, { useState, useEffect } from "react";
import axios from "axios";
import { subWeeks, subMonths, subYears, isWithinInterval } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const API_BASE = "http://localhost:5000/api";
const endpoints = [
  "fixed-income",
  "fixed-expenses",
  "recurring-expenses",
  "recurring-incomes",
  "profit-goals"
];

const INCOME_CATEGORY_ID = "a225765f-8d0c-4c87-86e1-360d48e0ff3d";
const EXPENSE_CATEGORY_ID = "09315312-047c-43d5-8106-2aec9047e119";

const ReportChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("monthly");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map(endpoint => axios.get(`${API_BASE}/${endpoint}`))
        );
        
        const combinedData = responses.flatMap((res, index) => {
          const endpointName = endpoints[index];
          return res.data.map(item => ({ 
            ...item,
            endpoint: endpointName,
            filterDate: 
              endpointName === "profit-goals" 
                ? new Date(item.start_date) // Use start_date for profit-goals
                : new Date(item.date || item.start)
          }));
        });

        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterByDate = (items) => {
    const now = new Date();
    let fromDate, toDate;
    
    switch(filter) {
      case "weekly":
        fromDate = subWeeks(now, 1);
        toDate = now;
        break;
      case "monthly":
        fromDate = subMonths(now, 1);
        toDate = now;
        break;
      case "yearly":
        fromDate = subYears(now, 1);
        toDate = now;
        break;
      default:
        fromDate = subMonths(now, 1);
        toDate = now;
    }

    return items.filter(item => isWithinInterval(item.filterDate, { start: fromDate, end: toDate }));
  };

  const filteredData = filterByDate(data);

  const totalIncome = filteredData
    .filter(item => item.category_id === INCOME_CATEGORY_ID)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const totalExpenses = filteredData
    .filter(item => item.category_id === EXPENSE_CATEGORY_ID)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const totalProfitGoals = filteredData
    .filter(item => item.endpoint === "profit-goals")
    .reduce((sum, item) => sum + (Number(item.target_profit) || 0), 0);

  const chartData = [
    { 
      name: "Financial Summary", 
      income: totalIncome, 
      expenses: totalExpenses,
      profit_goal: totalProfitGoals,
      net_profit: totalIncome - totalExpenses
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Financial Report</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Filter by:{" "}
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "5px" }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3>Total Income: ${totalIncome.toFixed(2)}</h3>
        <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
        <h3>Net Profit: ${(totalIncome - totalExpenses).toFixed(2)}</h3>
        <h3>Active Profit Goals: ${totalProfitGoals.toFixed(2)}</h3>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          
          <Bar 
            dataKey="income" 
            fill="#8884d8" 
            name="Total Income"
          />
          <Bar 
            dataKey="expenses" 
            fill="#ff73ff" 
            name="Total Expenses"
          />
          <Bar 
            dataKey="profit_goal" 
            fill="#82ca9d" 
            name="Profit Goals"
          />
          <Bar 
            dataKey="net_profit" 
            fill="#ffc658" 
            name="Net Profit"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportChart;
