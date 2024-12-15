import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ComplaintContext = createContext();

const ComplaintProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, [navigate]);

  useEffect(() => {
    console.log(isAdmin);
  }, [isAdmin]);

  return (
    <ComplaintContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const ComplaintState = () => {
  return useContext(ComplaintContext);
};

export default ComplaintProvider;
