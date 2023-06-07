import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

//components

import EditBank from "./editBank";
import InputBank from "./inputBank";



const ListBank = () => {
    
    const [transactions, setTransactions] = useState([]);

    const [bankChange, setBankChange] = useState(false);


    const [expenses, setExpenses] = useState(0);

    const [funds, setFunds] = useState(0);
    
    const [subject, setSubject] = useState("")

    const changeCategory = (event) => {
        event.preventDefault();
        setSubject(event.target.elements.myInput.value)
      }

    const reset = (event) => {
        setSubject("");
    }

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    


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

    useEffect(() => {
        getBank();
        getExpenses();
        getFunds();
    }, [bankChange]);

    console.log(transactions)


    return (
    <>

        <nav className="navbar">
            <Link to="/dashboard"  className="navItem" >Home</Link>
            <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
            <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
            <Link to="/dashboard/budgets" className="navItem" >Budgets</Link>
        </nav>

    <h1 id="trans">Transactions</h1>

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

    <details className="details">
        <summary>Add Transaction</summary>
        <InputBank setBankChange={setBankChange} />
    </details>

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