import React, { useState } from "react";

const InputBank = () => {

    const [name , setName] = useState("")
    const [amount , setAmount] = useState(0)
    const [date , setDate] = useState("")
    const [category, setCategory] = useState("")


    const handleSubmit = async e => {
        e.preventDefault();
        try {
          const body = { name, amount, date, category };
          const response = await fetch("http://localhost:3000/bank", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          })
    
          window.location = "/dashboard/transactions";
        } catch (err) {
          console.error(err.message);
        }
      };

    




    return (
        <>
            
            <form className="d-flex" onSubmit={handleSubmit}>
                <label className="labelAdd">For: </label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                <label className="labelAdd">Amount: </label>
                <input
                    type="text"
                    className="form-control"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    />
                <label className="labelAdd">Date: </label>
                <input
                    type="text"
                    className="form-control"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    />
                <label className="labelAdd">Category: </label>
                <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    />
                <button className="btn btn-success">Add</button>
            </form>
        </>
    )
}

export default InputBank;