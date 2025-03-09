import axios from "axios";

const API_URL = "http://localhost:5000/api/fixed-expenses"; 

// Fetch all fixed expenses
export const fetchExpenses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new fixed expense record
export const createExpense = async (expenseData) => {
  try {
    const response = await axios.post(API_URL, expenseData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating expense:", error.response?.data || error.message);
    throw error;
  }
};

// Update a fixed expense record
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, expenseData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a fixed expense record
export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting expense:", error.response?.data || error.message);
    throw error;
  }
};
