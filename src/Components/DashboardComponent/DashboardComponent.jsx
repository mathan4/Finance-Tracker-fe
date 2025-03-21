import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DashboardComponent.css'
import TransactionComponent from '../TransactionComponent/TransactionComponent'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const DashboardComponent = () => {
  const [transactionData, setTransactionData] = useState([])
  const [total, setTotal] = useState(0)
  const [foodTotal, setFoodTotal] = useState(0)
  const [entertotal, setEnterTotal] = useState(0)
  const [othertotal, setOtherTotal] = useState(0)

  const getAllTransactions = async () => {
    const response = await axios.get("https://finance-tracker-be.vercel.app/api/v1/financetracker/")
    setTransactionData(response.data)
  }

  useEffect(() => {
    getAllTransactions()
  }, [])

  const DeleteHandler = (id) => {
    try {
      axios.delete(`https://finance-tracker-be.vercel.app/api/v1/financetracker/delete/${id}`)
      setTransactionData(prevTransactions => prevTransactions.filter(transaction => transaction._id !== id))
      getAllTransactions()
    } catch (error) {
      console.log(error.message)
    }
  }

  const calculateTotal = () => {
    if (transactionData && transactionData.length > 0) {
      let tempTotal = 0
      let tempFoodTotal = 0
      let tempEnterTotal = 0
      let tempOtherTotal = 0

      transactionData.forEach((item) => {
        const amount = item.transactionAmount
        const description = item.transactionDescription

        tempTotal += amount

        if (description === "food") {
          tempFoodTotal += amount
        } else if (description === "entertainment") {
          tempEnterTotal += amount
        } else if (description === "other") {
          tempOtherTotal += amount
        }
      })

      setTotal(tempTotal)
      setFoodTotal(tempFoodTotal)
      setEnterTotal(tempEnterTotal)
      setOtherTotal(tempOtherTotal)
    }
  }

  useEffect(() => {
    calculateTotal()
  }, [transactionData])

  const pieChartData = [
    { name: 'Food', value: foodTotal },
    { name: 'Entertainment', value: entertotal },
    { name: 'Other', value: othertotal },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <div className='main-container'>
      <div className='total-container'>
        <div>Total<div className='total'>{total}</div></div>
        <div>Entertainment Total<div className='total'>{entertotal}</div></div>
        <div>Food Total<div className='total'>{foodTotal}</div></div>
        <div>Other Total<div className='total'>{othertotal}</div></div>
      </div>
      <div className='lower-section'>
        <div className='charts-container'>
          <div className='chart-box'>
            <h4>Spending Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className="Recent-transactions">
            <h4>Recent Transactions</h4>
            <div className="Recent-transaction-list-holder">
              {transactionData &&
                transactionData.slice(0, 3).map((it, index) => (
                  <div key={index}>
                    <TransactionComponent data={it} DeleteHandler={DeleteHandler} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent