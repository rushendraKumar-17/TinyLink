import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/context";
import {User} from 'lucide-react'
const Navbar = () => {
  const navigate = useNavigate();
  const { setLogged, setUser, user, logged } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    setUser(null);
    setLogged(false);
    navigate("/home");
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* App Name */}
        <h1
          className="text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Tiny Link
        </h1>

        {/* Right Section */}
        {logged ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <User/>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border z-50">
                <div className="px-4 py-2 text-gray-800">
                  <strong>{user?.name}</strong>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 px-4 py-2 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
