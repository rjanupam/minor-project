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
      <div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign In</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      <div className="flex max-w-md mx-auto mt-6 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div className="mt-2">
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <input
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-3xl text-sm/6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600
            p-2
          mr-4 py-2 px-4 border-0
      text-md font-semibold
      bg-blue-100 text-green-700
      hover:bg-green-100"
          >Sign In</button>
        </form>
      </div>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;
