import React, { useState } from "react";
import "./TransactionComponent.css";
import axios from "axios";

const TransactionComponent = (transactionDetails) => {
  const [edit, setEdit] = useState(false);
  const id = transactionDetails.data._id;
  const [transactionData, setTransactionData] = useState({
    transactionAmount: transactionDetails.data.transactionAmount,
    transactionDescription: transactionDetails.data.transactionDescription,
    transactionDate: transactionDetails.data.transactionDate,
  });

  const { transactionAmount, transactionDescription, transactionDate } =
    transactionData;

  const EditHandler = () => {
    setEdit(true);
  };
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

  const formSubmitHandler = async () => {
    try {
      await axios.put(
        `https://finance-tracker-be.vercel.app/api/v1/financetracker/edit/${id}`,
        transactionData
      );
      alert("Transaction edited successfully!");
      setEdit(false);
      transactionDetails.getAllTransactions();
    } catch (error) {
      console.log("Caught error:", error.message);
    }
  };

  return (
    <React.Fragment>
      {edit ? (
        <div className="container">
          <div className="form-group">
            <label>Transaction Amount</label>
            <input
              type="number"
              value={transactionAmount}
              onChange={transactionAmountHandler}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Transaction Description</label>
            <select
              value={transactionDescription}
              onChange={transactionDescriptionHandler}
              required
              className="form-select"
            >
              <option value="">Select Description</option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Transaction Date</label>
            <input
              type="date"
              value={
                new Date(transactionDetails.data.transactionDate)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={transactionDateHandler}
              className="form-input"
            />
          </div>

          <button onClick={formSubmitHandler} className="form-button">
            Edit
          </button>
        </div>
      ) : (
        <div className="transaction-detail-box">
          <div className="transaction-amount-description">
            <div>{transactionDetails.data.transactionAmount}</div>
            <div className="sub-details">
              <div>{transactionDetails.data.transactionDescription}</div>
              <div className="transaction-date">
                {
                  new Date(transactionDetails.data.transactionDate)
                    .toISOString()
                    .split("T")[0]
                }
              </div>
            </div>
          </div>
          <div className="edit-delete-button">
            <button onClick={EditHandler} className="edit">
              Edit
            </button>
            <button
              onClick={() => {
                transactionDetails.DeleteHandler(transactionDetails.data._id);
              }}
              className="delete"
            >
              delete
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TransactionComponent;
