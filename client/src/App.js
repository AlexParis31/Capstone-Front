import React, {useEffect, useState} from "react";
import './App.css';
import {  BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom"

//components

import Dashboard from "./components/pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddFunds from "./components/funds/addFunds";
import ListBank from "./components/bank/listBank";
import HomePage from "./components/pages/HomePage";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  };


  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) :
      setIsAuthenticated(false)

    } catch (error) {
      
    }
  }
 
 
useEffect(() => {
  isAuth();
})


  return (
    
    <>
      <Router>
        <div >
          <Routes> 
            <Route exact path = "/" element = {
            !isAuthenticated ? (
                <HomePage setAuth={setAuth}/>
              ) : (
                <Navigate to="/dashboard" /> 
              )
            }/>

            <Route exact path="/login" element = {
              !isAuthenticated ? ( 
                <Login setAuth={setAuth}/> 
              ) : ( 
                <Navigate to="/dashboard" /> 
              )
            } 
            />

            <Route exact path="/register" element = {
              !isAuthenticated ? (
                <Register setAuth={setAuth}/> 
              ) : ( 
                <Navigate to="/dashboard" /> 
              )
            } 
            />
            <Route exact path="/dashboard" element = {
              isAuthenticated ? ( 
                <Dashboard setAuth={setAuth}/> 
              ) : ( 
                <Navigate to="/" /> 
              )
            } 
            />
            



                            
            <Route path="/dashboard/transactions" element={
                            <ListBank/>
                            } />

            <Route path="/dashboard/add" element={<AddFunds />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;


// return (
//   <Router>
//     <>
//       <nav className="navbar">
//           <Link to="/"  className="navItem" >Home</Link>
//           <Link to="/transactions" className="navItem" >Transactions</Link>
//           <Link to="/add" className="navItem" >Manage Account</Link>
//       </nav>


//       <div className="container">
//         <Routes>
//           <Route path="/" element={<h1>Hello</h1>} />
//           <Route path="/transactions" element={
//           <ListBank/>
//           } />
//           <Route path="/add" element={<AddFunds />} />
//         </Routes>
//       </div>
//     </>
//   </Router>
// );
