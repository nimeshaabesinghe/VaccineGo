import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <AppContext.Provider value={{ clickCount, setClickCount }}>
      {children}
    </AppContext.Provider>
  );
};
