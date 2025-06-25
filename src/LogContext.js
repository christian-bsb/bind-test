// LogContext.js
import React, { createContext, useState } from 'react';

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logMessages, setLogMessages] = useState([]);

  const log = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogMessages((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  return (
    <LogContext.Provider value={{ logMessages, log }}>
      {children}
    </LogContext.Provider>
  );
};
