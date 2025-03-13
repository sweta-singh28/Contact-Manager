import { app } from "./../firebase.js"
import { useState } from "react";
import Home from "./Components/Home.jsx";
import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ContactDetails from "./Components/ContactDetails.jsx";
function App() {
  

  return (
    <>
      
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact/:id" element = {<ContactDetails/>}/>
          </Routes>
        </Router>
      
    </>
  );
}

export default App;
