import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

//components


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("")

    const getName = async () => {
        try {
            const response = await fetch("/dashboard", {
                method: "GET",
                headers: { token: localStorage.token}
            });

            const parseRes = await response.json()
            setName(parseRes[0].user_name)

        } catch (err) {
            console.error(err.message)
        }
    };

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        setAuth(false);
    };

    useEffect( () => {
        getName()
    }, []);

    return (
        <>
    <div className="dashTop">
        
        <h1 className="titleName">{name}'s Dashboard</h1>
        

        <div className="dashBot">
            <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
            <Link to="/dashboard/budgets" className="navItem" >Budgets</Link>
            <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
            <button className="btn btn-primary butLeft" onClick={e => logout(e)}>Logout</button>
        </div>
        
    </div>


        </>
    );
};

export default Dashboard;