import React, {useEffect, useState} from "react";
import './App.css';
import { Link, BrowserRouter, Route, Routes } from "react-router-dom"

//components

import AddFunds from "./components/addFunds"
import ListBank from "./components/listBank";

function App() {

  return (
    <BrowserRouter>
      <>
        <nav className="navbar">
            <Link to="/"  className="navItem" >Home</Link>
            <Link to="/transactions" className="navItem" >Transactions</Link>
            <Link to="/add" className="navItem" >Manage Account</Link>
        </nav>


        <div className="container">
          <Routes>
            <Route path="/" element={<h1>Hello</h1>} />
            <Route path="/transactions" element={
            <ListBank/>
            } />
            <Route path="/add" element={<AddFunds />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
};

export default App;
