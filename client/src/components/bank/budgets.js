import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InputBankTwo from "../bank/inputBankTwo";

const Budgets = () => {

  // idk
        const [bankChange, setBankChange] = useState(false);
        const [budgets, setBudgets] = useState([])
        const [expenses, setExpenses] = useState(0)
        // Set constant for jbank table to be mapped
        const [transactions, setTransactions] = useState([]);


        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });


        const getBudget = async () => {
          try {
              const response = await fetch("http://localhost:3000/dashboard/budgetplans", {
                  method: "GET",
                  headers: { token: localStorage.token }
                  });
              const jsonData = await response.json();
  
              setBudgets(jsonData)
  
              
          } catch (err) {
              console.error(err.message);
          }
      };

       
    
      const getBank = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard/bgtex", {
                method: "GET",
                headers: { token: localStorage.token }
                });
            const jsonData = await response.json();

            setTransactions(jsonData)

            
        } catch (err) {
            console.error(err.message);
        }
    };

        useEffect(() => {
        getBank();
        getBudget();
        }, [bankChange]);

    return (
<>
  <nav className="navbar">
      <Link to="/dashboard"  className="navItem" >Home</Link>
      <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
      <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
      <Link to="/dashboard/budgets" className="navItem" >Budgets</Link>
  </nav>

<div className="manageCol">
  <div className="addCont">
    <h2 className="titleAdd">Budget #1</h2>

    <table className="table table-striped mt-5 text-center">

      <thead>
        <tr className="tHead">
            <th></th>
            <th>Category</th>
            <th>Limit</th>
            <th>Amount Left</th>
        </tr>
      </thead>

      <tbody className="tBody">
    
        {budgets.map((budg) => (
          
          <tr key={budg.budget_id}>
            <details>

              <summary></summary>

              <div className="row justify-content-center">
                <div className="col-md-10">
                  <table className="table table-striped mt-5 text-center">

                    <thead>
                      <tr className="tHead">
                        <th>Transaction</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                      </tr>
                    </thead>

                    <tbody className="tBody">
                    
                      {transactions.map((trans) => (

                        trans.category === budg.category ?  
                        <>
                            <tr key={trans.bank_id}>
                                <td>{trans.name}</td>
                                <td>{USDollar.format(trans.amount)}</td>
                                <td>{trans.date}</td>
                                <td>{trans.category}</td>
                            </tr>
                        </>
                        :
                        <>
                        </>
                      ))};

                    </tbody>

                  </table>
                </div>
              </div>
            </details>
            <td> {budg.category} </td>
                <td> {USDollar.format(budg.budget)} </td>
                <td> {USDollar.format(budg.budget-expenses)} </td>
          </tr>                  
        ))};
      </tbody>
    </table>                  
                
            <Link to="/dashboard/createbudget"  className="btn btn-primary my-5 mx-5" >Create a Category!</Link>
               
{/* Add Transactions */}
<details className="details">
        <summary>Add Transaction</summary>
        <InputBankTwo setBankChange={setBankChange} />
    </details>
                 
           
          </div> 
        </div>
        </>
        )
    };

export default Budgets;
