import React, { useState } from "react";

import handlePromise from "./handlePromise";

export const userContext = React.createContext();

const Provider = userContext.Provider;

const ContextProviderFunc = (props) => {
  const [userData, setUserData] = useState(null);
  const handleSubmit = async (userDetails) => {
    console.log(userDetails);

    let { data, err } = await handlePromise(
      "http://localhost:3000/signup",
      userDetails
    );
    console.log(data, err);
    setUserData(data);
    return data.data;
  };

  const loginHandler = async (userDetails) => {
    console.log(userDetails);

    let { data, err } = await handlePromise(
      "http://localhost:3000/login",
      userDetails
    );
    console.log(data, err);

    setUserData(data);
    return data;
  };

  return (
    <Provider value={{ handleSubmit, loginHandler, userData, setUserData }}>
      {props.children}
    </Provider>
  );
};

export default ContextProviderFunc;
