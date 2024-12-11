import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const location = useLocation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const lastPage = queryParams.get("last_page") || "/";

    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });

    setLoading(false);

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem("jwtToken", token); // Store the JWT token
      navigator("/signin?last_page=" + lastPage);
    } else {
      const { message } = await response.json();
      setError(message || "Account creation failed");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-3xl text-sm/6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600
            p-2
          mr-4 py-2 px-4 border-0
      text-md font-semibold
      bg-blue-100 text-green-700
      hover:bg-green-100"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}{" "}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;
