import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InputBankTwo from "./inputBankTwo";

const AddFunds = () => {
        
        const [funds, setFunds] = useState(0)

        const [fundsTwo, setFundsTwo] = useState(0)

        const [expenses, setExpenses] = useState(0);

        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });


        const getBank = async () => {
            try {
                const response = await fetch("http://localhost:3000/bank");
                const jsonData = await response.json();
                const sumFunds = jsonData.sumFunds;
    
                setExpenses(sumFunds)
                
            } catch (err) {
                console.error(err.message);
            }
        };

        const getFunds = async () => {
            try {
                const response = await fetch("http://localhost:3000/myfunds");
                const jsonData = await response.json();
                const data = jsonData[0].funds;

                setFundsTwo(data)
            } catch (err) {
                console.error(err.message)
            }
        }

        const handleFundsSubmit = async e => {
            e.preventDefault();
            try {
            const body = { funds };
            const response = await fetch("http://localhost:3000/myfunds", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = "/dashboard/add";
            } catch (err) {
            console.error(err.message);
            }
        };

        const handleSubmitBankTwo = async e => {
            e.preventDefault();
            try {
              
              const response = await fetch("http://localhost:3000/banktwo", {
                method: "POST"
              })
              const data = await response.json();
              console.log(data);
            } catch (err) {
              console.error(err.message);
            }
          };
    


        useEffect(() => {
            getBank();
            getFunds();
        }, []);

    return (
    <>

            <nav className="navbar">
                <Link to="/dashboard"  className="navItem" >Home</Link>
                <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
                <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
            </nav>
        <div className="manageCol">
            <div className="addCont">
                <h2>Bank Account #1:</h2>
            
                <div class="addFunds">
                    <h2 className="green">Current Funds: {USDollar.format(fundsTwo-expenses)}</h2>

                    <form className="addForm" onSubmit={handleFundsSubmit}>
                        <input type="text" className="form-control" value={funds} onChange={e => setFunds(e.target.value)}/>
                        <button className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
            <div>
                <h1>Create new table</h1>
                <button onClick={handleSubmitBankTwo}>Create Table</button>
            </div>
            
                <InputBankTwo/>
        </div>
        
        </>
        )
    };

export default AddFunds;
