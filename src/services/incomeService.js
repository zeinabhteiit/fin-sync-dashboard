import axios from "axios";

const API_URL = "https://fin-sync.onrender.com/api/fixed-income"; 

// Fetch all income records
export const fetchIncome = async () => {
    try {
      const response = await axios.get("https://fin-sync.onrender.com/api/fixed-income");
      console.log("📊 Fetching income data:", response.data); // Debugging log
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
