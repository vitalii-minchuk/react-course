import React from 'react';
import './App.css';
import Dialogues from './components/Dialogues/Dialogues';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <div className='app__wrapper'>
      <Header />
      <Navbar />
      <main className='main'>
        <Profile />
        <Dialogues />
      </main>
    </div>
  );
};

export default App;
