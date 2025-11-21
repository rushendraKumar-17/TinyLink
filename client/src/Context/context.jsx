import { createContext, useEffect, useState } from "react";

const AppContext = createContext();
import axios from "axios";
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const apiUrl = "https://tinylink-ff9f.onrender.com";
  const [open,setOpen] = useState(false);
  const [alertType,setAlertType] = useState('success');
  const [message,setMessage] = useState("Demo");
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      
        axios
        .get(`${apiUrl}/api/users/`, {
            headers: {
              Authorization:`Bearer ${token}`,
            },
        })
        .then((res) => {
          setLogged(true);
          setUser(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, logged, setLogged, apiUrl,open,setOpen,handleClose,alertType,setAlertType,message,setMessage }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
