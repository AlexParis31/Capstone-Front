import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const InputBudget = () => {

    const [category, setCategory] = useState("")
    const [budget , setBudget] = useState(0)


      const handleSubmit = async e => {
        e.preventDefault();
        try {

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token)

            const body = { category, budget };
          const response = await fetch("/dashboard/budgetplan", {
            method: "POST",
            headers: myHeaders ,
            body: JSON.stringify(body)
            });
            const parseResponse = await response.json();
          console.log("this" + parseResponse)

          
            setCategory("");
            setBudget(0);
          window.location = "/dashboard/budgets";
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
                <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
                <Link to="/dashboard/budgets" className="navItem" >Budgets</Link>
            </nav>
            <form className="d-flex" onSubmit={handleSubmit}>
                <label className="labelAdd">Category </label>
                <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    />
                <label className="labelAdd">Limit: </label>
                <input
                    type="number"
                    className="form-control"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    />
                
                <button className="btn btn-success">Add</button>
            </form>
        </>
    )
}

export default InputBudget;