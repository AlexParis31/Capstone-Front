import React, { useState } from "react";

const EditBankTwo = ({ budg }) => {

  
  const [category, setCategory ] = useState(budg.category);
  const [budget, setBudget ] = useState(budg.budget);

  //edit transaction function
  const updateTransaction = async id => {
        
        try {

          const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token)

          const body = { category, budget };
          const response = await fetch(
            `http://localhost:3000/dashboard/budgetplan/${id}`,
            {
              method: "PUT",
              headers: myHeaders,
              body: JSON.stringify(body)
            }
          );
    
          window.location = "/dashboard/budgets"
        } catch (err) {
          console.error(err.message);
        }
      };

      const setAll = (budg) => {
        setCategory(budg.category);
        setBudget(budg.budget)
      }

  return (
    <>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${budg.budget_id}`}>
        Edit
      </button>

      <div className="modal" id={`id${budg.budget_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Edit Transaction</h4>
              <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)}/>
              <input type="text" className="form-control" value={budget} onChange={e => setBudget(e.target.value)}/>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateTransaction(budg.budget_id)}>Edit</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setAll(budg)}  >Close</button>
            </div>

          </div>
        </div>
      </div>
    </>
)};

export default EditBankTwo;
