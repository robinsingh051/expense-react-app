import React, { createContext, useState } from "react";

const ErrorContext = createContext({
  error: null,
  showError: (errorMessage) => {},
  hideError: () => {},
});

export const ErrorContextProvider = (props) => {
  const [error, setError] = useState(null);

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  const hideError = () => {
    setError(null);
  };

  const contextValue = {
    error: error,
    showError: showError,
    hideError: hideError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
