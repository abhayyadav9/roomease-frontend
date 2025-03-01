import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Add this line

import { Toaster } from "../src/components/ui/sonner"


import App from "./App";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
