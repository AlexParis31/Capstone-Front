import React from "react";
import './App.css';

//components

import InputBank from "./components/inputBank";
import ListBank from "./components/listBank";

function App() {

  return (
    <>
      <div className="container">
        <InputBank />
        <ListBank />
      </div>
    </>
  );
}

export default App;
