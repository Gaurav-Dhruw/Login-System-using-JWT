import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import  './assets/css/style.css';
import UserContextProvider from "./context/UserContextProvider";

import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";






ReactDOM.render(

  <Provider store={store}>

    <PersistGate persistor={persistor}>
    <App />

    </PersistGate>
  </Provider>

  ,
  document.getElementById('root')
);


