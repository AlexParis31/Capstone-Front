import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Add a transaction to the budgets page
import InputBankTwo from "../bank/inputBankTwo";
import EditBankTwo from "../bank/editBankTwo";

const Budgets = () => {

  // For InputBankTwo variable
  const [bankChange, setBankChange] = useState(false);

  // Set constant for budget categories to be mapped
  const [budgets, setBudgets] = useState([])
       
  // Set constant for budget transactions to be mapped
  const [transactions, setTransactions] = useState([]);

  // Set constant for sum of each categories amount to be mapped
  const [totals, setTotals] = useState([])  

  const [suptotals, setSuptotals] = useState([])

  const [budtotals, setBudtotals] = useState([])

  // Currency Filter
  let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });




  // Fetch categories for budget (Category & Limit) 
  const getBudget = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard/budgetplan", {
        method: "GET",
        headers: { token: localStorage.token }
        });

      const jsonData = await response.json();

      setBudgets(jsonData)

    } catch (err) {
      console.error(err.message);
    }
  };

  // Fetch transactions for budgetting (transaction, amount, date, category)
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
 
  // Fetch sum of transactions grouped by category
  const getSum = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard/bgtsum", {
        method: "GET",
        headers: { token: localStorage.token }
        });

      const jsonData = await response.json();

      setTotals(jsonData)
      // console.log(jsonData)

    } catch (err) {
      console.error(err.message);
    }
  };

  const getSums = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard/bgtsums", {
        method: "GET",
        headers: { token: localStorage.token }
        });

      const jsonData = await response.json();

      setSuptotals(jsonData[0].sum)
      console.log(jsonData[0])

    } catch (err) {
      console.error(err.message);
    }
  };

  const getSumsTwo = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard/bgtsumstwo", {
        method: "GET",
        headers: { token: localStorage.token }
        });

      const jsonData = await response.json();

      setBudtotals(jsonData[0].sum)
      console.log(jsonData[0])

    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteBudget = async (id) => {
    try {
      const deleteBank = await fetch(`http://localhost:3000/dashboard/budgetplan/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token }
      });

      setTransactions(transactions.filter(budg => budg.budget_id !== id));
      window.location = "/dashboard/budgets"
    } catch (err) {
      console.error(err.message);
    }
  };


// Use Effect
  useEffect(() => {
  getBank();
  getBudget();
  getSum();
  getSums();
  getSumsTwo();
  }, [bankChange]);



  return (
  <>
    <nav className="navbar">
        <Link to="/dashboard"  className="navItem" >Home</Link>
        <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
        <Link to="/dashboard/budgets" className="navItem" >Budgets</Link>
        <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
        
    </nav>

  
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
                    <table className="table two table-striped mt-5  text-center">

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
                        ))}
                        

                      </tbody>
                      

                      <tfoot className="foot">
                        {totals.map((tots) => (

                          budg.category === tots.category ?       
                          <>
                            <th>Total {tots.category}:</th> 
                            <th>{USDollar.format(tots.total_amount)}</th>
                            <th></th>
                            <th>
                              
                            </th>
                          </>
                          :
                          <>
                          
                          </>

                        ))}
                      </tfoot>

                    </table>
                    
                      <div className="my-5">
                        <InputBankTwo  setBankChange={setBankChange} variables={budg.category} />
                      </div>
                              
                  </div>
                  
                </div>
                
              </details>
              
                  
                
              <td> {budg.category} </td>
              <td> {USDollar.format(budg.budget)} </td>
              <td>   
                {totals.map((tots) => (
                  tots.category === budg.category ? 
                  <>
                    {USDollar.format(budg.budget-tots.total_amount)} 
                  </>
                  :
                  <>
                  </>
                ))}
              </td>
              <td>
                <EditBankTwo budg = {budg}/>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteBudget(budg.budget_id)}>Delete</button>
              </td>
              

            </tr>                  
          ))}
        </tbody>
        <tfoot className="foot">
          <th>TOTALS:</th>
          <th></th>
          <th>{USDollar.format(budtotals)}</th>
          <th>
            {USDollar.format(budtotals-suptotals)}
          </th>
        </tfoot>
      </table>                  
                  
      <Link to="/dashboard/createbudget"  className="btn btn-primary my-5 mx-5" >Create a Category!</Link>

      <div className="addFunds">
        <details>
            <summary>Add Transaction</summary>
            <InputBankTwo setBankChange={setBankChange} variables="food" />
        </details>
      </div>
            
  
  </>
  )};

export default Budgets;
