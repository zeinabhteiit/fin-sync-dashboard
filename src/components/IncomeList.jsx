import React, { useEffect, useState } from "react";
import { fetchIncome, createIncome, updateIncome, deleteIncome } from "../services/incomeService";

const IncomeList = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    amount: "",
    currency: "USD",
    date: "",
    category_id: "",
    user_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadIncome();
  }, []);

  const loadIncome = async () => {
    try {
      const data = await fetchIncome();
      setIncomeList(data);
    } catch (error) {
      alert("Error loading income records.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateIncome(formData.id, formData);
        alert("Income updated successfully!");
      } else {
        await createIncome(formData);
        alert("Income added successfully!");
      }
      await loadIncome();
      resetForm();
    } catch (error) {
      alert("Error saving income.");
    }
  };

  const handleEdit = (income) => {
    setFormData({ ...income });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteIncome(id);
      alert("Income deleted successfully!");
      await loadIncome();
    } catch (error) {
      alert("Error deleting income.");
    }
  };

  const resetForm = () => {
    setFormData({ id: null, title: "", description: "", amount: "", currency: "USD", date: "", category_id: "", user_id: "" });
    setIsEditing(false);
  };

  const buttonStyle = {
    backgroundColor: 'pink',
    color: 'black',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  return (
    <div>
      <h2>Income List</h2>
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
          {incomeList.length > 0 ? (
            incomeList.map((income, index) => (
              isEditing && formData.id === income.id ? (
                <tr key={income.id || index}>
                  <td colSpan="8">
                    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
                      <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
                      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                      <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
                      <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
                      <button type="submit" style={buttonStyle}>Update</button>
                      <button type="button" onClick={resetForm} style={buttonStyle}>Cancel</button>
                    </form>
                  </td>
                </tr>
              ) : (
                <tr key={income.id || index}>
                  <td>{income.title}</td>
                  <td>{income.description || "N/A"}</td>
                  <td>{income.amount}</td>
                  <td>{income.currency}</td>
                  <td>{new Date(income.date).toLocaleDateString()}</td>
                  <td>{income.category_id}</td>
                  <td>{income.user_id}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(income)}
                      style={buttonStyle}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(income.id)}
                      style={buttonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            ))
          ) : (
            <tr>
              <td colSpan="8">No income records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>{isEditing ? "Edit Income" : "Add Income"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
        <input type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
        <button style={{ ...buttonStyle, backgroundColor: "pink", color: "black" }} type="submit">
          {isEditing ? "Update Income" : "Add Income"}
        </button>
        {isEditing && <button type="button" onClick={resetForm} style={{ marginLeft: "15px" }}>Cancel</button>}
      </form>
    </div>
  );
};

export default IncomeList;
