import axios from "axios";

const API_URL = "http://localhost:5000/api/recurring-incomes"; 

// Fetch all recurring income records
export const fetchRecurringIncome = async () => {
  try {
    const response = await axios.get(API_URL);
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

// Update a recurring income record
export const updateRecurringIncome = async (id, incomeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, incomeData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recurring income:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a recurring income record
export const deleteRecurringIncome = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting recurring income:", error.response?.data || error.message);
    throw error;
  }
};