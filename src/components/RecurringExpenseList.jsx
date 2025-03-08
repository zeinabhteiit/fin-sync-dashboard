import React, { useEffect, useState } from "react";
import {
  fetchRecurringExpenses,
  createRecurringExpense,
  updateRecurringExpense,
  deleteRecurringExpense,
} from "../services/recurringExpenseService";

const RecurringExpenseList = () => {
  const [recurringExpenseList, setRecurringExpenseList] = useState([]);
  const [formData, setFormData] = useState({
    id: null, // Added for editing
    title: "",
    description: "",
    amount: "",
    currency: "USD",
    start: "",
    finish: "",
    frequency: "",
    category_id: "",
    user_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadRecurringExpenses();
  }, []);

  // Fetch all recurring expenses
  const loadRecurringExpenses = async () => {
    try {
      const data = await fetchRecurringExpenses();
      console.log("📊 Updating recurring expense list:", data);
      setRecurringExpenseList(data);
    } catch (error) {
      console.error("❌ Failed to load recurring expenses:", error.message);
      alert("Error loading recurring expenses. Please try again.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateRecurringExpense(formData.id, formData);
        console.log("✏️ Recurring expense updated successfully:", formData);
        alert("Recurring expense updated successfully!");
      } else {
        await createRecurringExpense(formData);
        console.log("✅ Recurring expense added successfully:", formData);
        alert("Recurring expense added successfully!");
      }

      // Refresh list and reset form
      await loadRecurringExpenses();
      resetForm();
    } catch (error) {
      console.error("❌ Error saving recurring expense:", error.response?.data || error.message);
      alert("Error saving recurring expense. Check the console for details.");
    }
  };

  // Handle Edit button click
  const handleEdit = (expense) => {
    setFormData({ ...expense });
    setIsEditing(true);
  };

  // Handle Delete button click
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recurring expense?")) return;

    try {
      await deleteRecurringExpense(id);
      console.log("🗑️ Recurring expense deleted successfully:", id);
      alert("Recurring expense deleted successfully!");

      // Refresh the list
      await loadRecurringExpenses();
    } catch (error) {
      console.error("❌ Error deleting recurring expense:", error.response?.data || error.message);
      alert("Error deleting recurring expense. Check the console for details.");
    }
  };

  // Reset form state
  const resetForm = () => {
    setFormData({ id: null, title: "", description: "", amount: "", currency: "USD", start: "", finish: "", frequency: "", category_id: "", user_id: "" });
    setIsEditing(false);
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
            <th>Actions</th>
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
                <td>{new Date(expense.start).toLocaleDateString()}</td>
                <td>{new Date(expense.finish).toLocaleDateString()}</td>
                <td>{expense.frequency}</td>
                <td>{expense.category_id}</td>
                <td>{expense.user_id}</td>
                <td>
                  <button onClick={() => handleEdit(expense)}>Edit</button>
                  <button onClick={() => handleDelete(expense.id)} style={{ marginLeft: "8px", color: "red" }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No recurring expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>{isEditing ? "Edit Recurring Expense" : "Add Recurring Expense"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
        <input type="date" name="start_date" value={formData.start} onChange={handleChange} required />
        <input type="date" name="end_date" value={formData.finish} onChange={handleChange} required />
        <input type="text" name="recurrence" value={formData.frequency} onChange={handleChange} placeholder="Recurrence (e.g., monthly, weekly)" required />
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
        <button type="submit">{isEditing ? "Update Recurring Expense" : "Add Recurring Expense"}</button>
        {isEditing && <button type="button" onClick={resetForm} style={{ marginLeft: "8px" }}>Cancel</button>}
      </form>
    </div>
  );
};

export default RecurringExpenseList;