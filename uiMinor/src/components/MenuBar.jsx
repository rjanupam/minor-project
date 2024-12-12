import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../utils/auth";

export default function MenuBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(""); // Track active page
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token && checkTokenValidity(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setActive(""); // Reset active state on logout
    navigate("/signin");
  };

  const handleClick = (page) => {
    setActive(page);
    navigate(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-auto">
      <nav className="bg-gradient-to-r from-blue-200 via-teal-400 to-green-500">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex flex-1 items-center justify-center sm:justify-between">
              <div className="flex shrink-0 items-center">
                <img
                  onClick={() => handleClick("/")}
                  className="h-11 w-auto cursor-pointer"
                  src="/fullLogo.png"
                  alt="Logo"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <a
                  onClick={() => handleClick("/")}
                  className={`text-white ${active === "/" ? "text-black bg-gray-200" : ""} hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-base font-medium cursor-pointer`}
                  aria-current="page"
                >
                  Home
                </a>
                <a
                  onClick={() => handleClick("/DiagnosisPage")}
                  className={`text-white ${active === "/DiagnosisPage" ? "text-black bg-gray-200" : ""} hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-base font-medium cursor-pointer`}
                >
                  Diagnosis/Report
                </a>
                <a
                  onClick={() => handleClick("/AboutUsPage")}
                  className={`text-white ${active === "/AboutUsPage" ? "text-black bg-gray-200" : ""} hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-base font-medium cursor-pointer`}
                >
                  About Us
                </a>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className={`text-white ${active === "/logout" ? "text-black bg-gray-200" : ""} hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-base font-medium cursor-pointer`}
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    onClick={() => handleClick("/signin")}
                    className={`text-white ${active === "/signin" ? "text-black bg-gray-200" : ""} hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-base font-medium cursor-pointer`}
                  >
                    Sign Up / Sign In
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
