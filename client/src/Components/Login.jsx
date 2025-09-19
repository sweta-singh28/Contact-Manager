// src/components/Login.js
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseClient";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for routing
import "./../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      alert("Logged in successfully!");
      localStorage.setItem("email",email);
       navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const goToRegisterPage = () => {
    navigate("/signup"); // Navigate to the sign-up page when the button is clicked
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <button onClick={goToRegisterPage}>Register</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
