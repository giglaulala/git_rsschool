import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider
import { ThemeProvider } from "./context/ThemeContext"; // Theme Context Provider
import { store } from "./app/store"; // Redux store
import App from "./App";
// import "./styles.css";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
