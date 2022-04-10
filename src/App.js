import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogues from './components/Dialogues/Dialogues';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import state, { addPost } from './redax/state';


const App = () => {
  return (
    <BrowserRouter>
      <div className='app__wrapper'>
        <Header />
        <Navbar />
        <main className='main'>
          <Routes>
            <Route path='/profile' element={<Profile addPost={addPost} state={state} />} />
            <Route path='/dialogues/*' element={<Dialogues state={state} />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
