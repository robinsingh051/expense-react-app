import React, { createContext, useState } from "react";

const SuccessContext = createContext({
  text: null,
  showText: (message) => {},
  hideText: () => {},
});

export const SuccessContextProvider = (props) => {
  const [text, setText] = useState(null);

  const showText = (message) => {
    setText(message);
  };

  const hideText = () => {
    setText(null);
  };

  const contextValue = {
    text: text,
    showText: showText,
    hideText: hideText,
  };

  return (
    <SuccessContext.Provider value={contextValue}>
      {props.children}
    </SuccessContext.Provider>
  );
};

export default SuccessContext;
