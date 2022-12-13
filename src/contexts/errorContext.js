import { useState, createContext } from "react";

const ErrorContext = createContext();

function ErrorProvider({ children }) {
  const [monthError, setMonthError] = useState("");
  const [batchError, setBatchError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [doubleEnrollError, setDoubleEnrollError] = useState("");
  const [payPrevError, setPayPrevError] = useState("");

  const showError = (setErrorType, value) => {
    setErrorType(value);
    setTimeout(() => {
      setErrorType("");
    }, 3000);
  };

  const toBeShared = {
    showError,
    monthError,
    setMonthError,
    batchError,
    setBatchError,
    genderError,
    setGenderError,
    ageError,
    setAgeError,
    mobileError,
    setMobileError,
    doubleEnrollError,
    setDoubleEnrollError,
    payPrevError,
    setPayPrevError,
  };

  return (
    <ErrorContext.Provider value={toBeShared}>{children}</ErrorContext.Provider>
  );
}

export { ErrorProvider };
export default ErrorContext;
