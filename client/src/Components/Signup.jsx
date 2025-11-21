/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/context";
import { Loader } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser, setLogged, apiUrl, setMessage, setOpen, setAlertType } =
    useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/api/users/signup`, {
        uname: name,
        email,
        password,
      });

      if (res.status === 201) {
          setAlertType("success");
          setMessage("Registration successful!");
          setOpen(true);
          navigate("/login");
      } else {
        setAlertType("error");
        setMessage("Something went wrong");
        setOpen(true);
      }
    } catch (err) {
      setAlertType("error");
      const msg = err.response?.data?.message || "Internal server error";
      setMessage(msg);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm mt-12">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Signing up...
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
