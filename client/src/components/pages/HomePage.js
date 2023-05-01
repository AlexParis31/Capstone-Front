import React, { useState } from "react";
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="dashTop dash">
            <h1 className="titleDash">Per(n)sonal Budgetting App</h1>
            <Link to="/login"  className="navItem" >Login</Link>
            <Link to="/register"  className="navItem" >Register</Link>
        </div>
    )
};

export default HomePage;