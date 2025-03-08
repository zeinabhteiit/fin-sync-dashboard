import axios from "axios";

const API_URL = "http://localhost:5000/api/recurring-expenses"; 

// Fetch all recurring expenses
export const fetchRecurringExpenses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching recurring expenses:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new recurring expense record
export const createRecurringExpense = async (expenseData) => {
  try {
    const response = await axios.post(API_URL, expenseData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating recurring expense:", error.response?.data || error.message);
    throw error;
  }
};

// Update a recurring expense record
export const updateRecurringExpense = async (id, expenseData) => {
  try {
    const response = await axios.put($`{API_URL}/${id}`, expenseData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recurring expense:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a recurring expense record
export const deleteRecurringExpense = async (id) => {
  try {
    await axios.delete($`{API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting recurring expense:", error.response?.data || error.message);
    throw error;
  }
};