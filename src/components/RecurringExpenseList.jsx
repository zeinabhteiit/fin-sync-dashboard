import React, { useEffect, useState } from "react";
import { fetchRecurringExpenses, createRecurringExpense } from "../services/recurringExpenseService";

const RecurringExpenseList = () => {
  const [recurringExpenseList, setRecurringExpenseList] = useState([]);
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
    loadRecurringExpenses();
  }, []);

  const loadRecurringExpenses = async () => {
    try {
      const data = await fetchRecurringExpenses();
      console.log("📊 Updating recurring expense list in state:", data);
      setRecurringExpenseList(data);
    } catch (error) {
      console.error("Failed to load recurring expense data");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRecurringExpense(formData);
      console.log("✅ Recurring Expense successfully added:", response.data);
      
      // Refresh recurring expense list immediately
      await loadRecurringExpenses();

      alert("Recurring Expense added successfully!");
      setFormData({ title: "", description: "", amount: "", currency: "USD", start_date: "", end_date: "", recurrence: "", category_id: "", user_id: "" });
    } catch (error) {
      console.error("❌ Failed to add recurring expense:", error.response?.data || error.message);
      alert("Error adding recurring expense. Check the console for details.");
    }
  };

  return (
    <div>
      <h2>Recurring Expense List</h2>
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
          {recurringExpenseList.length > 0 ? (
            recurringExpenseList.map((expense, index) => (
              <tr key={expense.id || index}>
                <td>{expense.title}</td>
                <td>{expense.description || "N/A"}</td>
                <td>{expense.amount}</td>
                <td>{expense.currency}</td>
                <td>{new Date(expense.start_date).toLocaleDateString()}</td>
                <td>{new Date(expense.end_date).toLocaleDateString()}</td>
                <td>{expense.recurrence}</td>
                <td>{expense.category_id}</td>
                <td>{expense.user_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No recurring expense records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Add Recurring Expense</h3>
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
        <button type="submit">Add Recurring Expense</button>
      </form>
    </div>
  );
};

export default RecurringExpenseList;
