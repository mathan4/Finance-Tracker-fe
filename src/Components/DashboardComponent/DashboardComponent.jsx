import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './DashboardComponent.css'
import TransactionComponent from '../TransactionComponent/TransactionComponent';


const DashboardComponent = () => {
    const[transactionData,setTransactionData]=useState([]);
    const[total,setTotal]=useState(0);
    const[foodTotal,setFoodTotal]=useState(0);
    const[entertotal,setEnterTotal]=useState(0);
    const[othertotal,setOtherTotal]=useState(0);

    const getAllTransactions = async () => {
        const response = await axios.get(
          "https://finance-tracker-be.vercel.app/api/v1/financetracker/");
        setTransactionData(response.data);
      };
     
      useEffect(()=>{
        getAllTransactions()

      },[])

      const DeleteHandler=(id)=>{
        try {
           axios.delete(`https://finance-tracker-be.vercel.app/api/v1/financetracker/delete/${id}`);
           setTransactionData(prevTransactions => prevTransactions.filter(transaction => transaction._id !== id))
           getAllTransactions()
        } catch (error) {
           console.log(error.message);
        }
     }


      const calculateTotal = () => {
        if (transactionData && transactionData.length > 0) {

          let tempTotal = 0;
          let tempFoodTotal = 0;
          let tempEnterTotal = 0;
          let tempOtherTotal = 0;
      
          
          transactionData.forEach((item) => {
            const amount = item.transactionAmount;
            const description = item.transactionDescription;
      
            tempTotal += amount;
    
            if (description === "food") {
              tempFoodTotal += amount;
            } else if (description === "entertainment") {
              tempEnterTotal += amount;
            } else if (description === "other") {
              tempOtherTotal += amount;
            }
          });
      
    
          setTotal(tempTotal);
          setFoodTotal(tempFoodTotal);
          setEnterTotal(tempEnterTotal);
          setOtherTotal(tempOtherTotal);
      
        }
      };

      useEffect(() => {
        calculateTotal();
      }, [transactionData]);  
    
      
      
     
  return (
   <React.Fragment>
    <div className='main-container'>
    <div className='total-container'>
        <div>Total<div className='total'>{total}</div></div>
        <div>Entertainment Total<div className='total'>{entertotal}</div></div>
        <div>Food Total<div className='total'>{foodTotal}</div></div>
        <div>Other Total<div className='total'>{othertotal}</div></div>
    </div>
    <div>
        <h4>Recent Transactions</h4>
    <div className="Recent-transactions">
      <div className="Recent-transaction-list-holder">
        {transactionData &&
          transactionData.slice(0,3).map((it, index) => (
            <div key={index}>
              <TransactionComponent data={it} DeleteHandler={DeleteHandler}/>
            </div>
          ))}
      </div>
      </div>
    </div>
    </div>
   </React.Fragment>
  )
}

export default DashboardComponent
