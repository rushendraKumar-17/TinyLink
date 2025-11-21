import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../Context/context";
import { Loader } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const {
    setUser,
    setLogged,
    apiUrl,
    setMessage,
    setAlertType,
    setOpen,
    
  } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/api/users/signin`, {
        email,
        password,
      });

      if (res.status === 200) {
        setAlertType("success");
        setMessage("Login successful!");
        setOpen(true);

        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        setLogged(true);

        navigate("/home");
      } else {
        setAlertType("error");
        setMessage("Invalid credentials");
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
    <div className="flex flex-col items-center justify-center min-h-[50vh] shadow-lg rounded-lg p-6 max-w-[350px] mx-auto mt-[10vh] bg-white">
      <h1 className="text-3xl font-semibold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="w-full">
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 mt-3"
        />

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 underline">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
