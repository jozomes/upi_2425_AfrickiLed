import { useState } from 'react'
import '../cssFiles/mainMenu.css'

function MainMenu() {
   return (
    <>
        
        <div>
        <header>
            <div className="parent_header">
                <h1 className="header_naslov">Get Commit</h1>
            </div>
            <div className="parent_logout">
                <button className="logout">Log Out</button>
            </div>
        </header>
        </div>
        <div className="parent_user_window">
            <div className="user_window">
                <div className="parent_user_image">
                    <div className="user_image">
                        <img src="" alt="User Profile" />
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
