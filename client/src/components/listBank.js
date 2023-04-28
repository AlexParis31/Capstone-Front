import React, {useEffect, useState} from "react";

import EditBank from "./editBank";
import InputBank from "./inputBank";



const ListBank = () => {

    const [subject, setSubject] = useState("")
    
    const [transactions, setTransactions] = useState([]);

    const [expenses, setExpenses] = useState(0);

    const [funds, setFunds] = useState(0);

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    

    const changeCategory = (event) => {
        event.preventDefault();
        setSubject(event.target.elements.myInput.value)
      }

    const reset = (event) => {
        setSubject("");
    }

    
    

    const deleteBank = async (id) => {
        try {
          const deleteBank = await fetch(`http://localhost:3000/bank/${id}`, {
            method: "DELETE"
          });
    
          setTransactions(transactions.filter(bank => bank.transaction_id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

    const getBank = async () => {
        try {
            const response = await fetch("http://localhost:3000/bank");
            const jsonData = await response.json();
            const allBanks = jsonData.allBanks;
            const sumFunds = jsonData.sumFunds;


            setTransactions(allBanks)
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

            setFunds(data)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getBank();
        getFunds();
    }, []);

    console.log(transactions)


    return (
    <>

    <h1 id="trans">Transactions</h1>

    <div className="showAll">
        <form className="inputField" onSubmit={changeCategory}>
                <label className="labelSrc">Search Transaction:</label>
                <input type="text" className="form-control" name = "myInput"/>
                <button className="btn btn-success" type="submit">Search</button>
        </form> 

        <button className ="btn reset" onClick={()=>reset()}>Show All</button> 

        <div className="remFunds">
            <h2>Remaining Funds:</h2> 
            <h2 className="green">{USDollar.format(funds-expenses)}</h2>
        </div>
    </div>

    <details className="details">
        <summary>Add Transaction</summary>
        <InputBank/>
    </details>

    <div className="row justify-content-center">
        <div className="col-md-12">
         <table className="table table-striped mt-5 text-center">
            <thead>
            <tr className="tHead">
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
            </tr>
            </thead>
            <tbody className="tBody">
            
                {transactions.map((trans) => (

                    subject === trans.category || subject === trans.name ?
                        <>
                            <tr key={trans.transaction_id}>
                                
                                <td>{trans.name}</td>
                                <td>{USDollar.format(trans.amount)}</td>
                                <td>{trans.date}</td>
                                <td>{trans.category}</td>
                                
                                
                                <td>
                                    <EditBank bank = {trans}/>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteBank(trans.transaction_id)}>Delete</button>
                                </td>
                            </tr>
                        </>
                    : subject === ("") ?
                        <>
                            <tr key={trans.transaction_id}>
                                <td>{trans.name}</td>
                                <td>{USDollar.format(trans.amount)}</td>
                                <td>{trans.date}</td>
                                <td>{trans.category}</td>
                                
                                
                                <td>
                                    <EditBank bank = {trans}/>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteBank(trans.transaction_id)}>Delete</button>
                                </td>
                            </tr>
                        </>
                    :
                        <>
                        </>
                    )
                        )};
            </tbody>
        </table>
        </div>
    </div>
    </>
)};

export default ListBank;