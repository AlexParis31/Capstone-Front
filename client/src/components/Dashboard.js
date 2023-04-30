import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

//components


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("")

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token}
            });

            const parseRes = await response.json()
            setName(parseRes.user_name)

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
            <nav className="navbar">
                <Link to="/dashboard"  className="navItem" >Home</Link>
                <Link to="/dashboard/transactions" className="navItem" >Transactions</Link>
                <Link to="/dashboard/add" className="navItem" >Manage Account</Link>
                <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
            </nav>

            <h1 className="text-center my-5">{name}'s Dashboard</h1>
            


        </>
    );
};

export default Dashboard;