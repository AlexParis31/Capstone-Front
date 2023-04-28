import React, { useState } from "react";

const InputBank = () => {

    const [name , setName] = useState("")
    const [amount , setAmount] = useState(0)
    const [date , setDate] = useState("")
    const [category, setCategory] = useState("")

    const [funds, setFunds] = useState(0)


    const handleSubmit = async e => {
        e.preventDefault();
        try {
          const body = { name, amount, date, category };
          const response = await fetch("http://localhost:3000/bank", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          })
    
          window.location = "/";
        } catch (err) {
          console.error(err.message);
        }
      };

    




    return (
        <>
            
            <form className="d-flex mt-5" onSubmit={handleSubmit}>
                <label htmlFor="for">For: </label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                <label htmlFor="Amount">Amount: </label>
                <input
                    type="text"
                    className="form-control"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    />
                <label htmlFor="Date">Date: </label>
                <input
                    type="text"
                    className="form-control"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    />
                <label htmlFor="Category">Category: </label>
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