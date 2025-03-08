import axios from "axios";

const API_URL = "http://localhost:5000/api/fixed-income"; 

// Fetch all income records
export const fetchIncome = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching income:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new income record
export const createIncome = async (incomeData) => {
  try {
    const response = await axios.post(API_URL, incomeData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating income:", error.response?.data || error.message);
    throw error;
  }
};

// Update an income record
export const updateIncome = async (id, incomeData) => {
  try {
    const response = await axios.put($`{API_URL}/${id}`, incomeData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating income:", error.response?.data || error.message);
    throw error;
  }
};

// Delete an income record
export const deleteIncome = async (id) => {
  try {
    await axios.delete($`{API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting income:", error.response?.data || error.message);
    throw error;
  }
};