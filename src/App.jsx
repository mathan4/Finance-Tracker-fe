import React from 'react'
import AddNewTransaction from './Components/AddNewTransaction/AddNewTransaction'
import AllTransactionComponent from './Components/AllTransactionComponent/AllTransactionComponent'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
            <div >
              <div className="navbar">
              <h1 className='logo'>Finance Tracker</h1>
              
            <nav className="menu">
                <Link to="/" >Home</Link>
                <Link to="/add" >Add Transactions</Link>
                {/* <Link to="/cart" >Cart</Link> */}
            </nav>
            </div>
           <Routes>
                 <Route exact path='/' element={<AllTransactionComponent/>}></Route>
                 <Route path='/add' element={<AddNewTransaction/>}></Route>
                 {/* <Route path='/cart' element={<GetCartItemsComponent/>}></Route> */}
          </Routes>
          </div>
       </BrowserRouter>
  )
}

export default App
