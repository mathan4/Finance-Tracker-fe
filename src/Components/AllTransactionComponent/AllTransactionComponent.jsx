import React, { useEffect, useState } from "react";
import "./AllTransactionComponent.css";
import TransactionComponent from "../TransactionComponent/TransactionComponent";
import axios from "axios";

const AllTransactionComponent = () => {
  const [transactionData, setTransactionData] = useState([]);

  const getAllTransactions = async () => {
    const response = await axios.get(
      "http://localhost:3500/api/v1/financetracker/"
    );
    setTransactionData(response.data);
    console.log(response.data);
  };

    
    const DeleteHandler=(id)=>{
           try {
              axios.delete(`http://localhost:3500/api/v1/financetracker/delete/${id}`);
              setTransactionData(prevTransactions => prevTransactions.filter(transaction => transaction._id !== id))
              getAllTransactions()
           } catch (error) {
              console.log(error.message);
           }
        }

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <React.Fragment>
    <div className="transactions">
      <div className="transaction-list-holder">
        {transactionData &&
          transactionData.map((it, index) => (
            <div key={index}>
              <TransactionComponent data={it} DeleteHandler={DeleteHandler}/>
            </div>
          ))}
      </div>
      </div>
    </React.Fragment>
  );
};

export default AllTransactionComponent;
