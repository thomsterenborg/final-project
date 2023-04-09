import React from "react";
import { useLocalStorage } from "primereact/hooks";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

UserContext.displayName = "UserContext";

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage(null, "currentUser");

  const navigate = useNavigate();

  const handleCurrentUser = (user) => {
    setCurrentUser(user);
    if (!user) return navigate("/login");
    navigate(`/user/${user.id}`);
  };

  return (
    <UserContext.Provider value={{ currentUser, handleCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within UserContextProvidr");
  }
  return context;
};
