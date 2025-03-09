import React, { useEffect, useState } from "react";
import { fetchRecurringIncome, createRecurringIncome, updateRecurringIncome, deleteRecurringIncome } from "../services/recurringIncomeService";

const RecurringIncomeList = () => {
  const [recurringIncomeList, setRecurringIncomeList] = useState([]);
  const [formData, setFormData] = useState({
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
  const [editingId, setEditingId] = useState(null);

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
      if (editingId) {
        await updateRecurringIncome(editingId, formData);
        alert("Recurring income updated successfully!");
      } else {
        await createRecurringIncome(formData);
        alert("Recurring income added successfully!");
      }

      setEditingId(null);
      setFormData({ title: "", description: "", amount: "", currency: "USD", start: "", finish: "", frequency: "", category_id: "", user_id: "" });
      loadRecurringIncome();
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("Error processing recurring income. Check console for details.");
    }
  };

  const handleEdit = (income) => {
    setEditingId(income.id);
    setFormData({
      title: income.title,
      description: income.description,
      amount: income.amount,
      currency: income.currency,
      start: income.start.split("T")[0],
      finish: income.finish.split("T")[0],
      frequency: income.frequency,
      category_id: income.category_id,
      user_id: income.user_id,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recurring income?")) {
      try {
        await deleteRecurringIncome(id);
        alert("Recurring income deleted successfully!");
        loadRecurringIncome();
      } catch (error) {
        console.error("❌ Error deleting recurring income:", error.response?.data || error.message);
        alert("Error deleting recurring income. Check console for details.");
      }
    }
  };

  const buttonStyle = {
    backgroundColor: "pink",
    color: "black",
    padding: "5px 15px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <h2>Recurring Income List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead style={{ backgroundColor: "pink" }}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Start</th>
            <th>Finish</th>
            <th>Frequency</th>
            <th>Category ID</th>
            <th>User ID</th>
            <th>Actions</th>
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
                <td>{new Date(income.start).toLocaleDateString()}</td>
                <td>{new Date(income.finish).toLocaleDateString()}</td>
                <td>{income.frequency}</td>
                <td>{income.category_id}</td>
                <td>{income.user_id}</td>
                <td>
                  <button onClick={() => handleEdit(income)} style={buttonStyle}>Edit</button>
                  <button onClick={() => handleDelete(income.id)} style={buttonStyle}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No recurring income records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>{editingId ? "Edit Recurring Income" : "Add Recurring Income"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
        <input type="date" name="start" value={formData.start} onChange={handleChange} required />
        <input type="date" name="finish" value={formData.finish} onChange={handleChange} required />
        <input type="text" name="frequency" value={formData.frequency} onChange={handleChange} placeholder="Frequency (e.g., monthly, weekly)" required />
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
        <button type="submit" style={buttonStyle}>{editingId ? "Update Recurring Income" : "Add Recurring Income"}</button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)} style={{ ...buttonStyle, marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default RecurringIncomeList;
