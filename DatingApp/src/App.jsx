import { useState } from 'react'
import './App.css'
import EditProfile from './components/EditProfile'
import LargeProfile from './components/LargeProfile'
import MainMenu from './components/MainMenu'
import ServerTest from './components/ServerTest'

function App() {

  return (
    <>
      <ServerTest />
      <EditProfile />
      <LargeProfile />
      <MainMenu />
    </>
  )
}

export default App
