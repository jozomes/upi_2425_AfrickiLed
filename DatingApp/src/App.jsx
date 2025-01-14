import { useState, createContext, useEffect } from 'react'
import './App.css'
import EditProfile from './components/EditProfile'
import LargeProfile from './components/LargeProfile'
import MainMenu from './components/MainMenu'
import ServerTest from './components/ServerTest'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import RegistrationTest from './components/RegistrationTest'
import MainRegistrationForm from './components/MainRegistrationForm'
import { Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now()/1000;
        if (decoded.exp > currentTime) {
          setCurrentUser(decoded.korisnik);
        }else{
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token: ", error);
        localStorage.removeItem("token");
      }
    }
    setIsInitializing(false);
  }, []);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

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
