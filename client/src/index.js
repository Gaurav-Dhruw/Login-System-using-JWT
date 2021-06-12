import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import  './assets/css/style.css';
import UserContextProvider from "./context/UserContextProvider"






ReactDOM.render(

  <UserContextProvider>
    <App />

  </UserContextProvider>
  ,
  document.getElementById('root')
);


