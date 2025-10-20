import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import { store, persistor } from "./store/store"; // Import the store and persistor

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Provide the Redux store to the application */}
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* PersistGate delays rendering until rehydration is complete */}
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
