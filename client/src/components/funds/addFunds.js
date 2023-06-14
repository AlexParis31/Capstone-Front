import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import InputBankTwo from "../bank/inputBankTwo";

const AddFunds = () => {
        
        const [funds, setFunds] = useState(0)

        const [fundsTwo, setFundsTwo] = useState(0);

        const [show, setShow] = useState(false)

        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });


     

        const createBudget = async e => {
            setShow(true)
            e.preventDefault();
            try {
              const response = await fetch("/dashboard/fundscreate", {
                method: "POST",
                headers: { token: localStorage.token },
                body: JSON.stringify()
                });
                const data = await response.json();
                console.log(data);
            } catch (err) {
              console.error(err.message);
            }
          };

        const updateFunds = async id => {
            try {
              const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("token", localStorage.token)
    
              const body = { funds };
              const response = await fetch(
                `/dashboard/fundscreate/${id}`,
                {
                  method: "PUT",
                  headers: myHeaders,
                  body: JSON.stringify(body)
                }
              );
        
              window.location = "/dashboard/transactions"
            } catch (err) {
              console.error(err.message);
            }
          };
    
          
       
    


        useEffect(() => {
        }, []);

    return (
    <>

            <nav className="navbar">
                <Link to="/dashboard"  className="navItem" >Home</Link>
                <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
                <Link to="/dashboard/budgets" className="navItem" >Budgets</Link>
                <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
            </nav>
        <div className="manageCol">
            <div className="addCont">
                <h2 className="titleAdd">Bank Account #1:</h2>

                
                
                <button onClick={createBudget} className="btn btn-primary createBtn my-5">Create a Per(n)sonal Funds Account</button>

                    {show === true ?
                    <>
                        <h3 className="confirm">Account Created! Add Funds to your account in the bar below</h3>
                    </>
                    :
                    <>
                    </>}
               
            
                <div class="addFunds">
                    <h2 className="green">Add Funds To Your Account:</h2>

                    <form className="addForm" onSubmit={updateFunds}>
                        <input type="text" className="form-control" value={funds} onChange={e => setFunds(e.target.value)}/>
                        <button className="btn btn-success">Add</button>
                    </form>
                </div>
               
            
            </div>
            <div>
                <button>Add Another Account</button>
            </div>
            
                
        </div>
        
        </>
        )
    };

export default AddFunds;
