import React from "react";
import AddNewTransaction from "./Components/AddNewTransaction/AddNewTransaction";
import AllTransactionComponent from "./Components/AllTransactionComponent/AllTransactionComponent";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import DashboardComponent from "./Components/DashboardComponent/DashboardComponent";
import logo from "./assets/logo2.jpg";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <div className="logo-container">
          <img src={logo} className="logo-image" alt="Finance Tracker Logo" />
          <h1 className="logo-text">Finance Tracker</h1>
          </div>


          <nav className="menu">
            <Link to="/">Home</Link>
            <Link to="/all">View All Transactions</Link>
            <Link to="/add">Add Transactions</Link>
          </nav>
        </div>
        <Routes>
          <Route exact path="/" element={<DashboardComponent />}></Route>
          <Route path="/add" element={<AddNewTransaction />}></Route>
          <Route path="/all" element={<AllTransactionComponent />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
