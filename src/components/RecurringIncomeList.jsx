import React, { useEffect, useState } from "react";
import { fetchRecurringIncome, createRecurringIncome } from "../services/recurringIncomeService";

const RecurringIncomeList = () => {
  const [recurringIncomeList, setRecurringIncomeList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "USD",
    start_date: "",
    end_date: "",
    recurrence: "",
    category_id: "",
    user_id: "",
  });

  useEffect(() => {
    loadRecurringIncome();
  }, []);

  const loadRecurringIncome = async () => {
    try {
      const data = await fetchRecurringIncome();
      console.log("📊 Updating recurring income list in state:", data);
      setRecurringIncomeList(data);
    } catch (error) {
      console.error("Failed to load recurring income data");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRecurringIncome(formData);
      console.log("✅ Recurring Income successfully added:", response.data);
      
      // Refresh recurring income list immediately
      await loadRecurringIncome();

      alert("Recurring Income added successfully!");
      setFormData({ title: "", description: "", amount: "", currency: "USD", start_date: "", end_date: "", recurrence: "", category_id: "", user_id: "" });
    } catch (error) {
      console.error("❌ Failed to add recurring income:", error.response?.data || error.message);
      alert("Error adding recurring income. Check the console for details.");
    }
  };

  return (
    <div>
      <h2>Recurring Income List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Recurrence</th>
            <th>Category ID</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {recurringIncomeList.length > 0 ? (
            recurringIncomeList.map((income, index) => (
              <tr key={income.id || index}>
                <td>{income.title}</td>
                <td>{income.description || "N/A"}</td>
                <td>{income.amount}</td>
                <td>{income.currency}</td>
                <td>{new Date(income.start_date).toLocaleDateString()}</td>
                <td>{new Date(income.end_date).toLocaleDateString()}</td>
                <td>{income.recurrence}</td>
                <td>{income.category_id}</td>
                <td>{income.user_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No recurring income records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Add Recurring Income</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
        <input type="text" name="recurrence" value={formData.recurrence} onChange={handleChange} placeholder="Recurrence (e.g., monthly, weekly)" required />
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
        <button type="submit">Add Recurring Income</button>
      </form>
    </div>
  );
};

export default RecurringIncomeList;
