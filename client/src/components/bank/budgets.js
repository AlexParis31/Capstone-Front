import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Add a transaction to the budgets page
import InputBankTwo from "./inputBankTwo";
import EditBankTwo from "./editBankTwo";




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

  const [yes, setYes] = useState(true)

  // Currency Filter
  let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });



  // Fetch categories for budget (Category & Limit) 
  const getBudget = async () => {
    try {
      const response = await fetch("/dashboard/budgetplan", {
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
      const response = await fetch("/dashboard/bgtex", {
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
      const response = await fetch("/dashboard/bgtsum", {
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

  // Fetch sum of ALL budgetting transactions
  const getSums = async () => {
    try {
      const response = await fetch("/dashboard/bgtsums", {
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

  // Fetch sum of ALL limits for all categories in the budget.
  const getSumsTwo = async () => {
    try {
      const response = await fetch("/dashboard/bgtsumstwo", {
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

  // Delete budget row
  const deleteBudget = async (id) => {
    try {
      const deleteBank = await fetch(`/dashboard/budgetplan/${id}`, {
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

    <Link to="/dashboard/createbudget"  className="btn btn-primary my-5 mx-5" >Create a Category!</Link>


    <div className="row justify-content-center">
      <div className="col-md-10">


{/* Main Table starts here */}
        <table className="table three table-striped mt-5 text-center">

{/* Header Row */}
        <thead>
          <tr className="tHead">
              
              <th>Category</th>
              <th>Limit</th>
              <th>Amount Left</th>
          </tr>
        </thead>

{/* Body */}
        <tbody className="tBody">
      
          {budgets.map((budg) => (  
            yes ?
            <>     


            
{/* Budget Rows */}
            <tr className="trone" key={budg.budget_id}>

                
{/* First-Second Column of Main */}
              <td> {budg.category} </td>
              <td> {USDollar.format(budg.budget)} </td>

{/* Third Column (Amount Left) */}
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
{/* Edit and Delete columns for Main Table */}
              <td>
                <EditBankTwo budg = {budg}/>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteBudget(budg.budget_id)}>Delete</button>
              </td>
            </tr>  









{/* SUB TABLE FOR TRANSACTIONS (HIDDEN ROW) */}
            <tr className="trtwo">
              <td colspan="6">
              <details>

                <summary className="left"> View {budg.category} Transactions </summary>

                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <table className="table two table-striped mt-5  text-center">

{/* Headers of sub table */}
                      <thead>
                        <tr className="tHead">
                          <th>Transaction</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Category</th>
                        </tr>
                      </thead>
{/* Body of sub table */}
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
                          <></>
                        ))}

                      </tbody>

{/* Footer of sub table with totals */}
                      <tfoot className="foot">
                        {totals.map((tots) => (

                          budg.category === tots.category ?       
                          <>
                            <th>Total {tots.category}:</th> 
                            <th>{USDollar.format(tots.total_amount)}</th>
                            <th></th>
                            <th></th>
                          </>
                          :
                          <></>
                        ))}
                      </tfoot>

                    </table>
                    
{/* Add Transaction form for each budgetting category */}
                    <div className="my-5">
                      <InputBankTwo  setBankChange={setBankChange} variables={budg.category} />
                    </div>         
                  </div>    
                </div>
                
              </details>

              </td>
            </tr> 
{/* After the two <tr> tags we have the last part of the conditional at the top from "budgets" */}
            </>   
            :
            <></>
                           
          ))} 
      </tbody>

{/* Footer of Main Table */}
        <tfoot className="foot">
          <th>TOTALS:</th>
          <th></th>
          <th>{USDollar.format(budtotals)}</th>
          <th>
            {USDollar.format(budtotals-suptotals)}
          </th>
        </tfoot>
      </table>     
    </div>
    </div>
      
  
  </>
  )};

export default Budgets;
