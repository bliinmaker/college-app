import React from "react";
import { createRoot } from "react-dom";
import { App } from "./App";
import "./index.css";
import store from './store'
import { Provider } from 'react-redux';

const rootElement = document.getElementById("root");

if (!rootElement.hasChildNodes()) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

