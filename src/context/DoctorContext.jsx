import { createContext } from "react";

export const DoctorContext = createContext(); // ← parentheses added

const DoctorContextProvider = (props) => {
  const value = {
    // context values go here
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;