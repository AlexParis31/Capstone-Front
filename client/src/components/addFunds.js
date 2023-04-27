import React, { useState } from "react";

const AddFunds = () => {


        const [funds, setFunds] = useState(0)

        const handleFundsSubmit = async e => {
            e.preventDefault();
            try {
            const body = { funds };
            const response = await fetch("http://localhost:3000/myfunds", {
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
        <form className="d-flex mt-5" onSubmit={handleFundsSubmit}>
            <label htmlFor="for">Add Funds to Your Account: </label>
            <input
                type="text"
                className="form-control"
                value={funds}
                onChange={e => setFunds(e.target.value)}
                />
            <button className="btn btn-success">Add</button>
        </form>
    </>
    )

    };

export default AddFunds;
