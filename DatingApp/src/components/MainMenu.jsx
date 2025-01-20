import { useState, useContext } from 'react'
import '../cssFiles/mainMenu.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import { useEffect } from 'react';
import axios from 'axios';

function MainMenu() {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [partners, setPartners] = useState(null);

    const LogOutAndExit = () =>{
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("partners");
        navigate("/");
        console.log(currentUser);
    }


    async function GetPartners() {
        try {
            const res = await axios.get('http://localhost:5000/browse',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            const partners = res.data;
            console.log(res.data);
            localStorage.setItem("partners", partners);
            setPartners(partners);
        } catch (error) {
            console.error("Dogodila se greska u dohvacanju drugih usera");
        }
    }

    useEffect(()=> {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    useEffect(()=>{
        if (!partners) {
            GetPartners();
        }
    }, []);


    if (!currentUser) {
        return null;
    }

   return (
    <div className='container'>
        <div>
        <header>
            <div className="parent_header">
                <h1 className="header_naslov">Get Commit</h1>
                <div className="underline"></div>
            </div>
            <div className="parent_logout">
                <button className="logout" onClick={LogOutAndExit}>Log Out</button>
                <button className="logout" onClick={() => navigate("/edit-profile")}>Edit Profile</button>
            </div>

        </header>
        <div>
            <h3>Bok, {currentUser.ime}!</h3>
        </div>
        </div>
        <div className="parent_user_window">
            <div className="user_window">
                <div className="parent_user_image">
                    <div className="user_image">
                        {/* Prikazivanje slike korisnika */}
                        {currentUser && currentUser.putanjaZaSliku ? (
                            <img src={currentUser.putanjaZaSliku} alt="User Profile" />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                </div>
                <div className="user_description">
                  <p>Ime: </p>
                  <p>Godine: </p>
                  <p>Opis: </p>
                  <p>Smjer: </p>
                </div>
                
                <div className="parent_buttons">
                  <button>0</button>
                  <button>1</button>
                </div>
              </div>
        </div>
    
    <footer>
        <div className="footer">
            <p>Credits:</p>
            <a>About</a>
            <a>Contact Us</a>
        </div>
    </footer>
    </div>
   )
  }
export default MainMenu
