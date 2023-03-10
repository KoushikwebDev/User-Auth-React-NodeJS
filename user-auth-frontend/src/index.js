import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ContextProviderFunc from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProviderFunc>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProviderFunc>
);
