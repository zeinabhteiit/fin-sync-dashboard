import axios from "axios";

const API_URL = "https://fin-sync.onrender.com/api/recurring-expenses"; // ✅ Correct API URL

// Fetch all recurring expense records
export const fetchRecurringExpenses = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("📊 Fetching recurring expenses data:", response.data); // Debugging log
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
