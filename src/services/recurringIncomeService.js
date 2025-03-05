import axios from "axios";

const API_URL = "https://fin-sync.onrender.com/api/recurring-incomes"; // ✅ Correct API URL

// Fetch all recurring income records
export const fetchRecurringIncome = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("📊 Fetching recurring income data:", response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error("Error fetching recurring income:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new recurring income record
export const createRecurringIncome = async (incomeData) => {
  try {
    const response = await axios.post(API_URL, incomeData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating recurring income:", error.response?.data || error.message);
    throw error;
  }
};
