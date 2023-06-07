import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import InputBankTwo from "../bank/inputBankTwo";

const Budgets = () => {

        const [show, setShow] = useState(false)
        const [budgets, setBudgets] = useState([])

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

       
    


        useEffect(() => {
        getBudget();
        }, []);

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
                <h2 className="titleAdd">Budgets</h2>

                
                
                <Link to="/dashboard/createbudget"  className="btn btn-primary createBtn my-5" >Create a Category!</Link>

                <table className="table table-striped mt-5 text-center">
            <thead>
            <tr className="tHead">
                <th>Category</th>
                <th>Limit</th>
                
            </tr>
            </thead>

                <tbody className="tBody">
            
                {budgets.map((budg) => (

                   
                        <>
                            <tr key={budg.budget_id}>
                                <td>{budg.category}</td>
                                <td>{USDollar.format(budg.budget)}</td>
                                
                                
                                
                                
                            </tr>
                        </>
                    
                    )
                    
                        )};
            </tbody>
            </table>

                   
            
                
               
            
            </div>
            
                
        </div>
        
        </>
        )
    };

export default Budgets;
