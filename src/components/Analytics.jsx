import React, { useState, useEffect } from "react";
import axios from "axios";
import { subWeeks, subMonths, subYears } from "date-fns";

const API_BASE = "https://fin-sync.onrender.com/api";
const endpoints = [
  "fixed-income",
  "fixed-expenses",
  "recurring-expenses",
  "recurring-incomes"
];

const INCOME_CATEGORY_ID = "a225765f-8d0c-4c87-86e1-360d48e0ff3d";
const EXPENSE_CATEGORY_ID = "09315312-047c-43d5-8106-2aec9047e119";

const Report = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("monthly");
  const [category, setCategory] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map(endpoint => axios.get(`${API_BASE}/${endpoint}`))
        );
        const combinedData = responses.flatMap(res => res.data);
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterByDate = (items) => {
    const now = new Date();
    let fromDate;
    if (filter === "weekly") fromDate = subWeeks(now, 1);
    if (filter === "monthly") fromDate = subMonths(now, 1);
    if (filter === "yearly") fromDate = subYears(now, 1);
    return items.filter(item => new Date(item.date || item.start) >= fromDate);
  };

  const filteredData = filterByDate(data).filter(item =>
    category ? item.category_id === category : true
  );

  const totalIncome = filteredData
    .filter(item => item.category_id === INCOME_CATEGORY_ID)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = filteredData
    .filter(item => item.category_id === EXPENSE_CATEGORY_ID)
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <h2>Financial Report</h2>
      <label>
        Filter by:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <h3>Total Income: ${totalIncome}</h3>
      <h3>Total Expenses: ${totalExpenses}</h3>
    </div>
  );
};

export default Report;