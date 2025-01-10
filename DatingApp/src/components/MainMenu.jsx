import { useState, useContext } from 'react'
import '../cssFiles/mainMenu.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

function MainMenu() {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const LogOutAndExit = () =>{
        setCurrentUser(null);
        navigate("/");
        console.log(currentUser);
    }

    

   return (
    <>
        <div>
        <header>
            <div className="parent_header">
                <h1 className="header_naslov">Get Commit</h1>
            </div>
            <div className="parent_logout">
                <button className="logout" onClick={LogOutAndExit}>Log Out</button>
            </div>
            <div className="parent_logout">
                <button className="logout" onClick={() => navigate("/edit-profile")}>Edit Profile</button>
            </div>
            
            {/* <div>
                <p>{currentUser.ime}</p>
            </div> */}
        </header>
        </div>
        <div className="parent_user_window">
            <div className="user_window">
                <div className="parent_user_image">
                    <div className="user_image">
                        {/* Prikazivanje slike korisnika */}
                        {currentUser && currentUser.profileImage ? (
                            <img src={currentUser.profileImage} alt="User Profile" />
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
                  <button className="buttons">0</button>
                  <button className="buttons">1</button>
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
    </>
   )
  }
export default MainMenu
