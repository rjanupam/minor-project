import React, { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import { checkTokenValidity } from "../utils/auth";
import HomeContent from "../components/HomeContent";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token && checkTokenValidity(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <div>
      <HomeContent />
    </div>
  );
}

export default Home;

