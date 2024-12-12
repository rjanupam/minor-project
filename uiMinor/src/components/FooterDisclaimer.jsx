import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, ClipboardListIcon, InformationCircleIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";

function FooterDisclaimer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white text-center text-sm py-3">
        <p>
          Disclaimer: This application is not a substitute for professional medical advice. Always consult a healthcare provider for an accurate diagnosis.
        </p>
      </footer>
    </div>
  );
}

export default function BottomNavigationBar({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(""); // Track active button state

  const handleClick = (page) => {
    setActive(page);
    navigate(page);
  };

  return (
    <div>
      <div className="fixed bg-gradient-to-r from-blue-200 via-teal-400 to-green-500 bottom-0 left-0 right-0 shadow-md z-10 sm:hidden">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => handleClick("/")}
            className={`flex flex-col items-center text-white ${active === "/" ? "text-black" : ""} transition-colors duration-300`}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => handleClick("/DiagnosisPage")}
            className={`flex flex-col items-center text-white ${active === "/DiagnosisPage" ? "text-black" : ""} transition-colors duration-300`}
          >
            <ClipboardListIcon className="h-6 w-6" />
            <span className="text-xs">Diagnosis</span>
          </button>
          <button
            onClick={() => handleClick("/AboutUsPage")}
            className={`flex flex-col items-center text-white ${active === "/AboutUsPage" ? "text-black" : ""} transition-colors duration-300`}
          >
            <InformationCircleIcon className="h-6 w-6" />
            <span className="text-xs">About Us</span>
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setActive(""); // Optionally reset active state on logout
              }}
              className={`flex flex-col items-center text-white ${active === "/logout" ? "text-black" : ""} transition-colors duration-300`}
            >
              <LogoutIcon className="h-6 w-6" />
              <span className="text-xs">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => handleClick("/signin")}
              className={`flex flex-col items-center text-white ${active === "/signin" ? "text-black" : ""} transition-colors duration-300`}
            >
              <UserIcon className="h-6 w-6" />
              <span className="text-xs">Sign In</span>
            </button>
          )}
        </div>
      </div>

      <div className="mb-20 sm:mb-0">
        <FooterDisclaimer />
      </div>
    </div>
  );
}
