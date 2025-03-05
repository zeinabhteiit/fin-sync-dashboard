import React, { useEffect, useState } from "react";
import { fetchExpenses, createExpense } from "../services/expensesService";

const ExpenseList = () => {
  const [expenseList, setExpenseList] = useState([]);
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
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await fetchExpenses();
      console.log("📊 Updating expense list in state:", data);
      setExpenseList(data);
    } catch (error) {
      console.error("Failed to load expense data");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createExpense(formData);
      console.log("✅ Expense successfully added:", response.data);
      
      // Refresh expense list immediately
      await loadExpenses();

      alert("Expense added successfully!");
      setFormData({ title: "", description: "", amount: "", currency: "USD", date: "", category_id: "", user_id: "" });
    } catch (error) {
      console.error("❌ Failed to add expense:", error.response?.data || error.message);
      alert("Error adding expense. Check the console for details.");
    }
  };

  return (
    <div>
      <h2>Fixed Expenses List</h2>
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
          {expenseList.length > 0 ? (
            expenseList.map((expense, index) => (
              <tr key={expense.id || index}>
                <td>{expense.title}</td>
                <td>{expense.description || "N/A"}</td>
                <td>{expense.amount}</td>
                <td>{expense.currency}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category_id}</td>
                <td>{expense.user_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No expense records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Add Fixed Expense</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseList;
