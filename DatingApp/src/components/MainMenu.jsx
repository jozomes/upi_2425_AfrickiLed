import { useState } from 'react'
import '../cssFiles/mainMenu.css'

function MainMenu() {
   return (
    <>
        <body>
        <div>
        <header>
            <div class="parent_header">
                <h1 class="header_naslov">Get Commit</h1>
            </div>
            <div class="parent_logout">
                <button class="logout">Log Out</button>
            </div>
        </header>
        </div>
        <div class="parent_user_window">
            <div class="user_window">
                <div class="parent_user_image">
                    <div class="user_image">
                        <img src="" alt="User Profile" />
                    </div>
                </div>
                <div class="user_description">
                  <p>Ime: </p>
                  <p>Godine: </p>
                  <p>Opis: </p>
                  <p>Smjer: </p>
                </div>
                <div class="parent_buttons">
                  <button class="buttons">0</button>
                  <button class="buttons">1</button>
                </div>
              </div>
        </div>
    </body>
    <footer>
        <div class="footer">
            <p>Credits:</p>
            <a>About</a>
            <a>Contact Us</a>
        </div>
    </footer>
    </>
   )
  }
export default MainMenu
