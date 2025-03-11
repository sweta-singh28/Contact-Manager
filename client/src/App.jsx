import { app } from "./../firebase.js"
import { useState } from "react";
import Home from "./Components/Home.jsx";
import "./App.css";
import { BrowserRouter, Router } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </>
  );
}

export default App;
