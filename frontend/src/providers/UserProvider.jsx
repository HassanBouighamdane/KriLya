import React, { createContext, useState } from 'react';

// Create a context
const MyContext = createContext();

// Create a Provider component
const MyProvider = ({ children }) => {
  // Define state or any data you want to provide
  const [data, setData] = useState(false);

  return (
    // Pass the state or data through the value prop of the Provider
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
