import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
