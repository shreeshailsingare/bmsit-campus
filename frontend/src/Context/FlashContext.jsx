import { createContext, useContext, useState, useEffect } from "react";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState({
    type: "",     // success | danger | warning | info
    message: ""
  });

  // auto-hide after 3 seconds
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
