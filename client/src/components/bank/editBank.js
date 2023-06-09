import React, { useState } from "react";

const EditBank = ({ bank }) => {

  const [name, setName] = useState(bank.name);
  const [amount, setAmount] = useState(bank.amount);
  const [date, setDate] = useState(bank.date);
  const [category, setCategory ] = useState(bank.category);

  //edit transaction function
  const updateTransaction = async id => {
        
        try {

          const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token)

          const body = { name, amount, date, category };

          // proxy 

          const response = await fetch(
            `/dashboard/bank/${id}`,
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

      const setAll = (bank) => {
        setName(bank.name);
        setAmount(bank.amount);
        setDate(bank.date);
        setCategory(bank.category);
      }

  return (
    <>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${bank.bank_id}`}>
        Edit
      </button>

      <div className="modal" id={`id${bank.bank_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Edit Transaction</h4>
              <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
              <input type="text" className="form-control" value={amount} onChange={e => setAmount(e.target.value)}/>
              <input type="text" className="form-control" value={date} onChange={e => setDate(e.target.value)}/>
              <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)}/>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateTransaction(bank.bank_id)}>Edit</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setAll(bank)}  >Close</button>
            </div>

          </div>
        </div>
      </div>
    </>
)};

export default EditBank;
