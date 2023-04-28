import React, {useEffect, useState} from "react";
import './App.css';

//components

import InputBank from "./components/inputBank";
import AddFunds from "./components/addFunds"
import ListBank from "./components/listBank";

function App() {

  return (
    <>
      <div className="container">

      <h1 className = "text-center mt-5">Pern Transaction Lists</h1>
        
        <ListBank />

        <details>
          <summary>Input Transaction</summary>
        <InputBank />
        </details>

        <details>
          <summary>Add Funds</summary>
        <AddFunds/>
        </details>
          
        
      </div>
    </>
  );
}

export default App;
