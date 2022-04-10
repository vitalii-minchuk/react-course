import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { addPost, updatePostText } from './redax/state';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container)

export let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} updatePostText={updatePostText} />
    </React.StrictMode>
  );
};

