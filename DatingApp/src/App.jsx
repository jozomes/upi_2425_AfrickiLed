import { useState, createContext } from 'react'
import './App.css'
import EditProfile from './components/EditProfile'
import LargeProfile from './components/LargeProfile'
import MainMenu from './components/MainMenu'
import ServerTest from './components/ServerTest'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import RegistrationTest from './components/RegistrationTest'
import MainRegistrationForm from './components/MainRegistrationForm'
import ProfileCard from './components/ProfileCard'
import { Route, Routes } from 'react-router-dom'

export const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/register" element={<MainRegistrationForm />}></Route>
          <Route path="/MainMenu" element={<MainMenu/>}></Route>
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
