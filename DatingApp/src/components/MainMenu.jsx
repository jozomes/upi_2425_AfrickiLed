import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import ProfileCard from './ProfileCard'; 
import '../cssFiles/mainMenu.css';

function MainMenu() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const LogOutAndExit = () => {
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    console.log('currentuser updated: ', currentUser);
  }, [currentUser]);

  return (
    <div className='container'>
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

      <div className="parent_user_window">
        {/*zakomentirano jer je napisano unutar profile card-a*/}
        {/* <div className="user_description">
          <p>Ime: {currentUser?.ime}</p>
          <p>Godine: {currentUser?.godine}</p>
          <p>Opis: {currentUser?.opis}</p>
          <p>Smjer: {currentUser?.smjer}</p>
        </div> */}

      
        {currentUser && (
          <ProfileCard
            name={currentUser.ime}
            age={currentUser.godine}
            shortBio={currentUser.shortBio}
            major={currentUser.smjer}
            favLanguage={currentUser.favLanguage}
            github={currentUser.github}
            githubProfile={currentUser.githubProfile}
            longBio={currentUser.longBio}
            image={currentUser.putanjaZaSliku}
          />
        )}

        <div className="btn_like_dislike">
          <button>0</button>
          <button>1</button>
        </div>
      </div>

      <footer>
        <div className="footer">
          <p>Credits:</p>
          <br></br>
          <a>About</a>
          <a>Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default MainMenu;
