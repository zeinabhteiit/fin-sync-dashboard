import React, { useEffect, useState } from "react";
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from "../services/expensesService";

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

  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", amount: "", currency: "", date: "", category_id: "", user_id: "" });

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
      await createExpense(formData);
      console.log("✅ Expense successfully added!");
      await loadExpenses();
      setFormData({ title: "", description: "", amount: "", currency: "USD", date: "", category_id: "", user_id: "" });
    } catch (error) {
      console.error("❌ Failed to add expense:", error.response?.data || error.message);
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpenseId(expense.id);
    setEditData({ ...expense });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateExpense(editingExpenseId, editData);
      console.log("✅ Expense successfully updated!");
      await loadExpenses();
      setEditingExpenseId(null);
    } catch (error) {
      console.error("❌ Failed to update expense:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await deleteExpense(id);
      console.log("✅ Expense successfully deleted!");
      await loadExpenses();
    } catch (error) {
      console.error("❌ Failed to delete expense:", error.response?.data || error.message);
    }
  };

  const buttonStyle = {
    backgroundColor: 'pink',
    color: 'black',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '5px'
  };

  return (
    <div>
      <h2>Fixed Expenses List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead style={{ backgroundColor: "pink" }}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Category ID</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.length > 0 ? (
            expenseList.map((expense) => (
              <tr key={expense.id}>
                {editingExpenseId === expense.id ? (
                  <>
                    <td><input type="text" name="title" value={editData.title} onChange={handleEditChange} /></td>
                    <td><input type="text" name="description" value={editData.description} onChange={handleEditChange} /></td>
                    <td><input type="number" name="amount" value={editData.amount} onChange={handleEditChange} /></td>
                    <td><input type="text" name="currency" value={editData.currency} onChange={handleEditChange} /></td>
                    <td><input type="date" name="date" value={editData.date} onChange={handleEditChange} /></td>
                    <td><input type="text" name="category_id" value={editData.category_id} onChange={handleEditChange} /></td>
                    <td><input type="text" name="user_id" value={editData.user_id} onChange={handleEditChange} /></td>
                    <td>
                      <button style={buttonStyle} onClick={handleUpdate}>Save</button>
                      <button style={buttonStyle} onClick={() => setEditingExpenseId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{expense.title}</td>
                    <td>{expense.description || "N/A"}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.currency}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.category_id}</td>
                    <td>{expense.user_id}</td>
                    <td>
                      <button style={buttonStyle} onClick={() => handleEditClick(expense)}>
                        Edit
                      </button>
                      <button style={buttonStyle} onClick={() => handleDelete(expense.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No expense records found.</td>
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
        <button style={buttonStyle} type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseList;
