import { useState } from 'react'
import './App.css'
import EditProfile from './components/EditProfile'
import LargeProfile from './components/LargeProfile'
import MainMenu from './components/MainMenu'

function App() {

  return (
    <>
      <EditProfile />
      <LargeProfile />
      <MainMenu />
    </>
  )
}

export default App
