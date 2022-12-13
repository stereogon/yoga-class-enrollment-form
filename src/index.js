import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "./contexts/formContext";
import { ErrorProvider } from "./contexts/errorContext";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <ErrorProvider>
    <Provider>
      <App />
    </Provider>
  </ErrorProvider>
);
