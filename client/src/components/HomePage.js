import React, { useState } from "react";
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <>
            <Link to="/login"  className="navItem" >Login</Link>
            <Link to="/register"  className="navItem" >Register</Link>
        </>
    )
};

export default HomePage;