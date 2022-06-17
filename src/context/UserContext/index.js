import React, { useState, createContext } from "react";
import { FaLastfmSquare } from "react-icons/fa";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
  });

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
