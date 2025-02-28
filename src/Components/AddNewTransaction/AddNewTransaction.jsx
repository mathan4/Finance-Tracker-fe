import React, { useState } from "react";
import "./AddNewTransaction.css";
import axios from "axios";

const AddNewTransaction = () => {
  const [transactionData, setTransactionData] = useState({
    transactionAmount: "",
    transactionDescription: "",
    transactionDate: "",
  });

  const { transactionAmount, transactionDescription, transactionDate } =
    transactionData;

  const transactionAmountHandler = (event) => {
    setTransactionData({
      ...transactionData,
      transactionAmount: event.target.value,
    });
  };

  const transactionDescriptionHandler = (event) => {
    setTransactionData({
      ...transactionData,
      transactionDescription: event.target.value,
    });
  };
  const transactionDateHandler = (event) => {
    setTransactionData({
      ...transactionData,
      transactionDate: event.target.value,
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    try {
      axios
        .post(
          "https://finance-tracker-be.vercel.app/api/v1/financetracker/add",
          transactionData
        )
        .then((response) => {
          console.log("Response data:", response.data);
          setTransactionAmount("");
          setTransactionDescription("");
          setTransactionDate("");
    
          
          alert("Transaction added successfully!");
        })
        .catch((error) => {
          console.error("Error response:", error.response.data);
        });

     
    } catch (error) {
      console.log("Caught error:", error.message);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={formSubmitHandler}>
        <h2>Add a New Transaction</h2>
        <div>
          <label>TransactionAmount</label>
          <input
            type="number"
            placeholder="Enter the Transaction Amount"
            value={transactionAmount}
            onChange={transactionAmountHandler}
          />
        </div>
        <div>
          <label>Transaction Description</label>
          <select
            value={transactionDescription}
            onChange={transactionDescriptionHandler}
            required
          >
            <option value="">Select Description</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Transaction Date</label>
          <input
            type="date"
            value={transactionDate}
            onChange={transactionDateHandler}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </React.Fragment>
  );
};

export default AddNewTransaction;
