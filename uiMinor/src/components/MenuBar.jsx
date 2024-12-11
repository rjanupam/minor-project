import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../utils/auth";

export default function MenuBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token && checkTokenValidity(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    navigate("/signin"); // Redirect to sign-in page after logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-200 via-teal-400 to-green-500">
        <div className="mx-auto  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex flex-1 items-center justify-between">
              <div className="flex shrink-0 items-center">
                <img
                  onClick={() => navigate("/")}
                  className="h-11 w-auto "
                  src="/fullLogo.png"
                  alt="Logo"
                />
              </div>
            </div>
            {/* Navigation for large screens */}
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <a
                  onClick={() => navigate("/")}
                  className=" text-white  hover:bg-green-100 hover:text-black rounded-md px-3 py-2 text-base font-medium"
                  aria-current="page"
                >
                  Home
                </a>
                <a
                  onClick={() => navigate("/DiagnosisPage")}
                  className="text-white hover:bg-green-100 hover:text-black rounded-md px-3 py-2 text-base font-medium"
                >
                  Diagnosis
                </a>
                <a
                  onClick={() => navigate("/HistoryPage")}
                  className="text-white hover:bg-green-100 hover:text-black rounded-md px-3 py-2 text-base font-medium"
                >
                  History
                </a>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-green-100 hover:text-black rounded-md px-3 py-2 text-base font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    href="/signin"
                    className="text-white hover:bg-green-100 hover:text-black rounded-md px-3 py-2 text-base font-medium"
                  >
                    Sign Up / Sign In
                  </a>
                )}
              </div>
            </div>
            {/* Dropdown for small screens */}
            <div className="sm:hidden relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center justify-center px-3 py-2 rounded-md text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span>Menu</span>
                <span className="ml-2">&#9660;</span>{" "}
                {/* Simple downward arrow */}
              </button>
              {dropdownOpen && (
                <div
                  className="
                absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-green-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-nonetext-black hover:text-black text-sm font-medium cursor-pointer"
                >
                  <div className="py-1">
                    <a
                      onClick={() => navigate("/")}
                      className="text-white hover:bg-green-100 hover:text-black block px-4 py-2 text-sm"
                      aria-current="page"
                    >
                      Home
                    </a>
                    <a
                      onClick={() => navigate("/DiagnosisPage")}
                      className="text-white hover:bg-green-100 hover:text-black block px-4 py-2 text-sm"
                    >
                      Diagnosis
                    </a>
                    <a
                      onClick={() => navigate("/HistoryPage")}
                      className="text-white hover:bg-green-100 hover:text-black block px-4 py-2 text-sm"
                    >
                      History
                    </a>
                    <a
                      href="/SignUpSignInPage"
                      className="text-white hover:bg-green-100 hover:text-black block px-4 py-2 text-sm"
                    >
                      Sign Up / Sign In
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
