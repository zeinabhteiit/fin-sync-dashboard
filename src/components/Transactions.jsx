import React, { useState, useEffect } from "react";
import { fetchExpenses } from "../services/expensesService";
import { fetchIncome } from "../services/incomeService";
import { fetchRecurringExpenses } from "../services/recurringExpenseService";
import { fetchRecurringIncome } from "../services/recurringIncomeService";
import ExpenseList from "../components/ExpensesList";
import IncomeList from "../components/IncomeList";
import RecurringExpenseList from "../components/RecurringExpenseList";
import RecurringIncomeList from "../components/RecurringIncomeList";

const Transactions = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [recurringIncome, setRecurringIncome] = useState([]);
  const [loading, setLoading] = useState(true); // For showing loading state

  useEffect(() => {
    // Fetch data from the services
    const fetchData = async () => {
      try {
        const expensesData = await fetchExpenses();
        const incomeData = await fetchIncome();
        const recurringExpensesData = await fetchRecurringExpenses();
        const recurringIncomeData = await fetchRecurringIncome();

        // Set the state with the fetched data
        setExpenses(expensesData);
        setIncome(incomeData);
        setRecurringExpenses(recurringExpensesData);
        setRecurringIncome(recurringIncomeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }
return (
    <div>
      <h1>Transactions</h1>

      {/* Render the components and pass the fetched data as props */}
      <h2>Fixed Expenses</h2>
      <ExpenseList expenses={expenses} />

      <h2>Fixed Income</h2>
      <IncomeList income={income} />

      <h2>Recurring Expenses</h2>
      <RecurringExpenseList recurringExpenses={recurringExpenses} />

      <h2>Recurring Income</h2>
      <RecurringIncomeList recurringIncome={recurringIncome} />
    </div>
  );
};

export default Transactions;