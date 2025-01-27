import { useState, createContext, useEffect } from 'react'
import './App.css'
import EditProfile from './components/EditProfile'
import MainMenu from './components/MainMenu'
import LoginForm from './components/LoginForm'
import MainRegistrationForm from './components/MainRegistrationForm'
import ProfileCard from './components/ProfileCard'
import { Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Admin from './components/Admin'
export const UserContext = createContext(null);
import About from './components/About'

//dodano
import { useNavigate } from 'react-router-dom'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  //dodano
  const navigate = useNavigate();

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
          <Route path="/admin-page" element={<Admin/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
