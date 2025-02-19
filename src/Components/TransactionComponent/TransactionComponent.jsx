import React, { useState } from "react";
import "./TransactionComponent.css";
import axios from "axios";

const TransactionComponent = (transactionDetails) => {
  const [edit, setEdit] = useState(false);
  const id=transactionDetails.data._id;
  const [transactionData, setTransactionData] = useState({
      transactionAmount: transactionDetails.transactionAmount,
      transactionDescription: transactionDetails.transactionDescription,
      transactionDate: transactionDetails.transactionDate,
    });
  
    const { transactionAmount, transactionDescription, transactionDate } =
      transactionData;
  

  const EditHandler=()=>{
    setEdit(true);
    
  }
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

  const formSubmitHandler = () => {
    try {
      axios
        .put(
          `http://localhost:3500/api/v1/financetracker/edit/${id}`,
          transactionData
        )
        .then((response) => {
          console.log("Response data:", response.data);
        
          alert("Transaction edited successfully!");
          setEdit(false);
          transactionDetails.getAllTransactions()
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
        {edit?(<form onSubmit={formSubmitHandler}>
        <div>
          <label>TransactionAmount</label>
          <input
            type="number"
            defaultValue={transactionDetails.data.transactionAmount}
            value={transactionAmount}
            onChange={transactionAmountHandler}
          />
        </div>
        <div>
          <label>Transaction Description</label>
          <select
           defaultValue={transactionDetails.data.transactionDescription}
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
            defaultValue={transactionDetails.data.transactionDate}
            value={transactionDate}
            onChange={transactionDateHandler}
          />
        </div>
        <button type="submit">Edit</button>
      </form>)
      :
      (<div className="transaction-detail-box">
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
            <button onClick={EditHandler} className="edit">Edit</button>
            <button onClick={()=>{transactionDetails.DeleteHandler(transactionDetails.data._id)}} className="delete">delete</button>
          </div>
        </div>)}
    </React.Fragment>
  );
};

export default TransactionComponent;
