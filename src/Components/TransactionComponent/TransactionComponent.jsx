import React, { useState } from "react";
import "./TransactionComponent.css";
import axios from "axios";

const TransactionComponent = (transactionDetails) => {
  const [edit, setEdit] = useState(false);
  

  const EditHandler=()=>{
    
  }

  return (
    <React.Fragment>
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
            <button onClick={EditHandler} className="edit">Edit</button>
            <button onClick={()=>{transactionDetails.DeleteHandler(transactionDetails.data._id)}} className="delete">delete</button>
          </div>
        </div>
    </React.Fragment>
  );
};

export default TransactionComponent;
