import { useState } from 'react'
import '../cssFiles/largeProfile.css'

function LargeProfile() {
   return (
    <>
        <div className="parent_user_windoww">
            <div className="user_windoww">
                <div className="parent_user_imagee">
                    <div className="user_imagee">
                        <img src="" alt="User Profile"/>
                    </div>
                </div>
                <div className="user_descriptionn">
                  <p>Ime: </p>
                  <p>Godine: </p>
                  <p>Git statistika: </p>
                  <p>#1 Programski jezik:</p>
                  <p>Leetcode: </p>
                </div>
                <div className="synopsiss">
                    <p>Opis do 100 riječi</p>
                </div>
                <div className="parent_buttonss">
                  <button className="buttonss">0</button>
                  <button className="buttonss">1</button>
                </div>
              </div>
        </div>
    </>
   )
  }
export default LargeProfile
