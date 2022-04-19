import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { Provider } from "react-redux";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
