import React, { useEffect, useState } from "react";
import { fetchIncome, createIncome } from "../services/incomeService";

const IncomeList = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "USD",
    date: "",
    category_id: "",
    user_id: "",
  });

  useEffect(() => {
    loadIncome();
  }, []);

  const loadIncome = async () => {
    try {
      const data = await fetchIncome();
      console.log("📊 Updating income list in state:", data);
      setIncomeList(data); // Ensure state updates
    } catch (error) {
      console.error("Failed to load income data");
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createIncome(formData);
  
      console.log("✅ Income successfully added:", response.data);
      
      // Refresh income list immediately
      await loadIncome();
  
      alert("Income added successfully!");
      setFormData({ title: "", description: "", amount: "", currency: "USD", date: "", category_id: "", user_id: "" });
    } catch (error) {
      console.error("❌ Failed to add income:", error.response?.data || error.message);
      alert("Error adding income. Check the console for details.");
    }
  };
  
  
  

  return (
    <div>
      <h2>Income List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Category ID</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
  {incomeList.length > 0 ? (
    incomeList.map((income, index) => (
      <tr key={income.id || index}>
        <td>{income.title}</td>
        <td>{income.description || "N/A"}</td>
        <td>{income.amount}</td>
        <td>{income.currency}</td>
        <td>{new Date(income.date).toLocaleDateString()}</td>
        <td>{income.category_id}</td>
        <td>{income.user_id}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No income records found.</td>
    </tr>
  )}
</tbody>

      </table>

      <h3>Add Income</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default IncomeList;
