import React from "react";
import './App.css';

//components

import InputBank from "./components/inputBank";
import AddFunds from "./components/addFunds"
import ListBank from "./components/listBank";

function App() {

  return (
    <>
      <div className="container">
        <InputBank />
        <AddFunds/>
        <ListBank />
      </div>
    </>
  );
}

export default App;
