import React from "react";
import "../styles/transactions.css"; // Make sure the CSS file is linked

const Transactions = () => {
  const transactions = [
    { id: 1, date: "2025-03-01", amount: "$100", description: "Payment from Client" },
    { id: 2, date: "2025-02-25", amount: "$50", description: "Payment for Services" },
    { id: 3, date: "2025-02-20", amount: "$200", description: "Payment from Vendor" },
  ];

  return (
    <div className="transactions">
      <h3> Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
