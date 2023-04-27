import React, {useEffect, useState} from "react";

import EditBank from "./editBank";


const ListBank = () => {

    const [transactions, setTransactions] = useState([]);

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

            setTransactions(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getBank();
    }, []);

    console.log(transactions)


    return (
        <>
        
         <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
                {transactions.map((trans) => (
                    
                    <tr key={trans.transaction_id}>
                        <td>{trans.name}</td>
                        <td>{trans.amount}</td>
                        <td>{trans.date}</td>
                        <td>
                            <EditBank bank = {trans}/>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteBank(trans.transaction_id)}>Delete</button>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </table>
        </>
)};

export default ListBank;