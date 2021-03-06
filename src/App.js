import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Preloader from './components/common/preloader/Preloader'
import ErrorPage from './components/ErrorPage/ErrorPage'
import HeaderContainer from './components/Header/HeaderContainer'
import { LoginPage } from './components/Login/Login'
import MusicPage from './components/Music/Music'
import Navbar from './components/Navbar/Navbar'
import SettingsPage from './components/Setting/Settings'
import UsersPage from './components/Users/UsersContainer'
import { initializeApp } from './redux/app-reducer'

const DialoguesContainer = React.lazy(() => import('./components/Dialogues/DialoguesContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
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
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path='/profile/:userId' element={<ProfileContainer />} />
                <Route path='/profile' element={<ProfileContainer />} />
                <Route path='/dialogues/*' element={<DialoguesContainer />} />
                <Route path='/users' element={<UsersPage pageTitle={'Users'} />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/music' element={<MusicPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App)
