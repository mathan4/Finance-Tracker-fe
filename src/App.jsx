import React, { useState } from "react";
import AddNewTransaction from "./Components/AddNewTransaction/AddNewTransaction";
import AllTransactionComponent from "./Components/AllTransactionComponent/AllTransactionComponent";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import DashboardComponent from "./Components/DashboardComponent/DashboardComponent";
import logo from "./assets/logo2.jpg";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <div className="logo-container">
            <img src={logo} className="logo-image" alt="Finance Tracker Logo" />
            <h1 className="logo-text">Finance Tracker</h1>
          </div>

          <nav className={`menu ${menuOpen ? "active" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/all" onClick={() => setMenuOpen(false)}>View All Transactions</Link>
            <Link to="/add" onClick={() => setMenuOpen(false)}>Add Transactions</Link>
          </nav>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <>
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
          </div>
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