import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { UserContextProvider } from "context/UserContext";

// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <VisionUIControllerProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </VisionUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
