import React, { useState } from "react";

const InputBank = ({setBankChange, variables}) => {

    const [name , setName] = useState("")
    const [amount , setAmount] = useState(0)
    const [date , setDate] = useState("")
    const [category, setCategory] = useState(variables)
    


    const handleSubmit = async e => {
        e.preventDefault();
        try {

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token)

          const body = { name, amount, date, category };
          const response = await fetch("http://localhost:3000/dashboard/bgtex", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(body)
          })

          const parseResponse = await response.json();
          console.log("this" + parseResponse)

          setBankChange(true);
          setName("");
          setAmount("");
          setDate("");
          setCategory("");
    
          window.location = "/dashboard/budgets";
        } catch (err) {
          console.error(err.message);
        }
      };

    return (
        <div className="b-flex">
            
            <form className="b-flex" onSubmit={handleSubmit}>
                <div className="b-flex">
                <label className="labelAdd">Name </label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="b-flex">
                <label className="labelAdd">Amount </label>
                <input
                    type="text"
                    className="form-control"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    />
                    </div>


                <div className="b-flex">
                <label className="labelAdd">Date </label>
                <input
                    type="text"
                    className="form-control"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    />

                </div>
                <div className="b-flex">
                <label className="labelAdd">Category </label>
                <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={e => setCategory(variables)}
                    />
                    </div>
                <button className="btn btn-success">Add</button>
            </form>
        </div>
    )
}

export default InputBank;