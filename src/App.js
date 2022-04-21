import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import DialoguesContainer from './components/Dialogues/DialoguesContainer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <BrowserRouter>
        <div className='app__wrapper'>
          <HeaderContainer />
          <Navbar />
          <main className='main'>
            <Routes>
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
              <Route path='/dialogues/*' element={<DialoguesContainer />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    );
  }
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

export default connect(mapStateToProps, { initializeApp })(App);
