import React, { createContext, useContext, useState } from "react";

// Create a new context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Define your state variables here
  const [fpFee, setFpFee] = useState("Advisor-directed");
  const [selectedMFEFTItems, setSelectedMFEFTItems] = useState([]);
  const [selectedEquitySMAItems, setSelectedEquitySMAItems] = useState([]);

  // You can define other functions or state variables here

  return (
    <AppContext.Provider
      value={{
        fpFee,
        setFpFee,
        selectedMFEFTItems,
        setSelectedMFEFTItems,
        selectedEquitySMAItems,
        setSelectedEquitySMAItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
