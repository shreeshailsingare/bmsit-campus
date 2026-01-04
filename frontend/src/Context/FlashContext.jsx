import { createContext, useContext, useState, useEffect } from "react";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState({
    type: "",     
    message: ""
  });

  useEffect(() => {
    if (flash.message) {
      const timer = setTimeout(() => {
        setFlash({ type: "", message: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <FlashContext.Provider value={{ flash, setFlash }}>
      {children}
    </FlashContext.Provider>
  );
};

export const useFlash = () => useContext(FlashContext);
