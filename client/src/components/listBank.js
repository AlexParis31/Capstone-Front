import React, {useEffect, useState} from "react";

import EditBank from "./editBank";


const ListBank = () => {

    const [category, setCategory] = useState("")
    
    const [transactions, setTransactions] = useState([]);

    const [expenses, setExpenses] = useState(0);

    const [funds, setFunds] = useState(0);

    const changeAll = () => {
        setCategory("")
    }

    const changeCategory = (p) => {
        setCategory(p)
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
            <nav className="buttons">
                <button className="btn" onClick={()=>changeAll()}>All</button>
                <button className="btn" onClick={()=>changeCategory('Food')}>Food</button>
                <button className="btn" onClick={()=>changeCategory('Clothes')}>Clothes</button>
                <button className="btn" onClick={()=>changeCategory('Recurring Payments')}>Recurring</button>
            </nav>

         <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                
                
            </tr>
            </thead>
            <tbody>
                {category === "Food" ?
                <>
                    {transactions.map((trans) => (

                        trans.category === "Food" ?
                        <>
                        
                            <tr key={trans.transaction_id}>
                                <td>{trans.name}</td>
                                <td>{trans.amount}</td>
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
                    )}
                </>
                : category === "Clothes" ?
                <>
                    {transactions.map((trans) => (

                        trans.category === "Clothes" ?
                        <>

                            <tr key={trans.transaction_id}>
                                <td>{trans.name}</td>
                                <td>{trans.amount}</td>
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
                        )}
                </>
                : category === "Recurring Payments" ?
                <>
                    {transactions.map((trans) => (

                        trans.category === "Recurring Payments" ?
                        <>

                            <tr key={trans.transaction_id}>
                                <td>{trans.name}</td>
                                <td>{trans.amount}</td>
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
                        )}
                </>
                : category === "Other" ?
                <>
                    {transactions.map((trans) => (

                        trans.category === "Other" ?
                        <>

                            <tr key={trans.transaction_id}>
                                <td>{trans.name}</td>
                                <td>{trans.amount}</td>
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
                        )}
                </>
                :
                <>
                    {transactions.map((trans) => (


                        <tr key={trans.transaction_id}>
                            <td>{trans.name}</td>
                            <td>{trans.amount}</td>
                            <td>{trans.date}</td>
                            <td>{trans.category}</td>
                            
                            
                            <td>
                                <EditBank bank = {trans}/>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteBank(trans.transaction_id)}>Delete</button>
                            </td>
                        </tr>
                    )
                    )}
                    </>
                    }

            </tbody>
        </table>

        <h1 className="funds">REMAINING FUNDS: {funds-expenses}</h1>

        </>
)};

export default ListBank;