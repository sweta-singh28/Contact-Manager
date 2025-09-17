import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../firebase";
import Home from "./Components/Home.jsx";
import ContactDetails from "./Components/ContactDetails.jsx";
import SignUp from "./Components/SignUp.jsx";
import Login from "./Components/Login.jsx";
import Logout from "./Components/LogOut.jsx"; 

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Clean up the subscription on component unmount
  }, []);

  return (
    <Router>
      <Routes>
        {/* Protect routes */}
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
