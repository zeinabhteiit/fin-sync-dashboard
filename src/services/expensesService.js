import axios from "axios";

const API_URL = "https://fin-sync.onrender.com/api/fixed-expenses"; // ✅ Update endpoint

// Fetch all fixed expenses
export const fetchExpenses = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("📊 Fetching expense data:", response.data); // Debugging log
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
