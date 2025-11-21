import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Home from "./Components/Home.jsx";
import AppContext from "./Context/context.jsx";
import Navbar from "./Components/Navbar.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import UrlDetailsPage from "./Components/UrlDetailsPage.jsx";

function App() {
  const { open, alertType, message, setOpen } = useContext(AppContext);

  // Trigger toast whenever open = true
  useEffect(() => {
    if (open) {
      toast[alertType || "info"](message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });

      // Close it after displaying
      setOpen(false);
    }
  }, [open, alertType, message]);

  return (
    <>
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/home/*" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/code/:code" element={<UrlDetailsPage/>}/>
      
      </Routes>
    </>
  );
}

export default App;
