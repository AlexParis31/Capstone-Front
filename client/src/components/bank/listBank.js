import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

//components

import EditBank from "./editBank";
import InputBank from "./inputBank";



const ListBank = () => {

// CONSTANTS
    
// Set constant for jbank table to be mapped
    const [transactions, setTransactions] = useState([]);

// idk
    const [bankChange, setBankChange] = useState(false);

// This amount will be subtracted by funds
    const [expenses, setExpenses] = useState(0);

// This minus expenses equals remaining funds
    const [funds, setFunds] = useState(0);
    
// This represents whatever is in the search bar
    const [subject, setSubject] = useState("")

////////////////////////////////


// FUNCTIONS

// Changes constant subject to whatever is in search bar
    const changeCategory = (event) => {
        event.preventDefault();
        setSubject(event.target.elements.myInput.value)
      }

// Triggered when pressing "Show All" to reset search bar
    const reset = (event) => {
        setSubject("");
    }

// Makes every number currency
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
/////////////////////////////



// FETCH REQUESTS

// Get request to display transactions "jbanks"
    const getBank = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
                });
            const jsonData = await response.json();

            setTransactions(jsonData)

            
        } catch (err) {
            console.error(err.message);
        }
    };

// Delete request for each transaction in table
    const deleteBank = async (id) => {
        try {
          const deleteBank = await fetch(`http://localhost:3000/dashboard/bank/${id}`, {
            method: "DELETE",
            headers: { token: localStorage.token }
          });
    
          setTransactions(transactions.filter(bank => bank.bank_id !== id));
          window.location = "/dashboard/transactions"
        } catch (err) {
          console.error(err.message);
        }
      };

// Get request for sum of all expenses through "jbanks"
    const getExpenses = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard/expenses", {
                method: "GET",
                headers: { token: localStorage.token }
                });
                const jsonData = await response.json();
                setExpenses(jsonData.funds);
            
        } catch (err) {
            console.error(err.message)
        }
    }

// Get request for funds added to account through table "jfunds"
    const getFunds = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard/funds", {
                method: "GET",
                headers: { token: localStorage.token }
                });
                const jsonData = await response.json();
                setFunds(jsonData.funds);
            
        } catch (err) {
            console.error(err.message)
        }
    };

///////////////////

    useEffect(() => {
        getBank();
        getExpenses();
        getFunds();
    }, [bankChange]);

    console.log(transactions)

/////////////////////


    return (
    <>

        <nav className="navbar">
            <Link to="/dashboard"  className="navItem" >Home</Link>
            <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
            <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
            <Link to="/dashboard/budgets" className="navItem" >Budgets</Link>
        </nav>
{/* Title */}
    <h1 id="trans">Transactions</h1>

{/* Search Bar */}
    <div className="showAll">
        <form className="inputField" onSubmit={changeCategory}>
                <label className="labelSrc">Search Transaction:</label>
                <input type="text" className="form-control" name = "myInput"/>
                <button className="btn btn-success alignBtn" type="submit">Search</button>
        </form> 

        <button className ="btn reset alignBtn" onClick={()=>reset()}>Show All</button> 

        <div className="remFunds">
            <h2>Remaining Funds:</h2> 
            <h2 className="green">{USDollar.format(funds-expenses)}</h2>
        </div>
    </div>

{/* Add Transactions */}
    <details className="details">
        <summary>Add Transaction</summary>
        <InputBank setBankChange={setBankChange} />
    </details>

{/* Table */}
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

                    subject === trans.category || subject === trans.name ?
                        <>
                            <tr key={trans.bank_id}>
                                
                                <td>{trans.name}</td>
                                <td>{USDollar.format(trans.amount)}</td>
                                <td>{trans.date}</td>
                                <td>{trans.category}</td>
                                
                                
                                <td>
                                    <EditBank bank = {trans}/>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteBank(trans.bank_id)}>Delete</button>
                                </td>
                            </tr>
                        </>
                    : subject === ("") ?
                        <>
                            <tr key={trans.bank_id}>
                                <td>{trans.name}</td>
                                <td>{USDollar.format(trans.amount)}</td>
                                <td>{trans.date}</td>
                                <td>{trans.category}</td>
                                
                                
                                <td>
                                    <EditBank bank = {trans}/>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteBank(trans.bank_id)}>Delete</button>
                                </td>
                            </tr>
                        </>
                    :
                        <>
                        </>
                    )
                        )};
            </tbody>
        </table>
        </div>
    </div>
    </>
)};

export default ListBank;