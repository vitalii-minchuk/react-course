import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container)

let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
    </React.StrictMode>
  );
};

rerenderEntireTree (store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});
