import React from 'react'
import AddNewTransaction from './Components/AddNewTransaction/AddNewTransaction'
import AllTransactionComponent from './Components/AllTransactionComponent/AllTransactionComponent'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import DashboardComponent from './Components/DashboardComponent/DashboardComponent'

const App = () => {
  return (
    <BrowserRouter>
            <div >
              <div className="navbar">
              <h1 className='logo'>Finance Tracker</h1>
              
            <nav className="menu">
                <Link to="/" >Home</Link>
                <Link to="/all" >View All Transactions</Link>
                <Link to="/add" >Add Transactions</Link>
            </nav>
            </div>
           <Routes>
                 <Route exact path='/' element={<DashboardComponent/>}></Route>
                 <Route path='/add' element={<AddNewTransaction/>}></Route>
                 <Route path='/all' element={<AllTransactionComponent/>}></Route>
          </Routes>
          </div>
       </BrowserRouter>
  )
}

export default App
