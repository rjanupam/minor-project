import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

      const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailOrUsername,
        username: emailOrUsername,
        password,
      }),
    });

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem("jwtToken", token); // Store the JWT token
      window.location.reload(); // Refresh to check token validity
    } else {
      const { message } = await response.json();
      setError(message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
