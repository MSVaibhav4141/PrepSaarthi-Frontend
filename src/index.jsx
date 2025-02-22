import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import store from "./store";
import { customThemes } from "./customTheme";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={customThemes}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </>
);
