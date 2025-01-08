import { useState } from 'react'
import './App.css'
import EditProfile from './components/EditProfile'
import LargeProfile from './components/LargeProfile'
import MainMenu from './components/MainMenu'
import ServerTest from './components/ServerTest'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import RegistrationTest from './components/RegistrationTest'
import MainRegistrationForm from './components/MainRegistrationForm'

function App() {

  return (
    <>
      <RegistrationTest />
      <MainRegistrationForm></MainRegistrationForm>
      <LoginForm />
      <RegistrationForm />
      <ServerTest />
      <EditProfile />
      <LargeProfile />
      <MainMenu />
    </>
  )
}

export default App
