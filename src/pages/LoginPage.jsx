import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase"; // Adjust the import to match your project structure

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Store email
  const [password, setPassword] = useState(""); // Store password
  const [error, setError] = useState(null); // Store error messages
  const navigate = useNavigate(); // Navigation hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    

    if (data) {
      navigate("/dashboard"); // Redirect to dashboard if login is successful
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
