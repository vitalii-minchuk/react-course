import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DialoguesContainer from './components/Dialogues/DialoguesContainer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import UsersContainer from './components/Users/UsersContainer';


const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app__wrapper'>
        <Header />
        <Navbar />
        <main className='main'>
          <Routes>
            <Route path='/profile' element={<Profile />} />
            <Route path='/dialogues/*' element={<DialoguesContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
