import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import ProfileCard from './ProfileCard';

function MainMenu() {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [partners, setPartners] = useState(null);
    const [partnerIndex, setPartnerIndex] = useState(0);
    const [currentPartner, setCurrentPartner] = useState(null);

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
            localStorage.setItem("partners", JSON.stringify(partners));
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

    useEffect(() => {
        if (partners && partners.length > 0) {
            InitializeBrowsing();
        }
    }, [partners]);

    async function InitializeBrowsing() {
      if (partners && partners.length > 0) {
          setCurrentPartner(partners[partnerIndex]);
          console.log(partners[partnerIndex]);
      }
    }


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
        {currentPartner && (
          <ProfileCard
            name={currentPartner.ime}
            surname={currentPartner.prezime}
            major={currentPartner.smjer}
            favLanguage={currentPartner.detalji.najdraziProgramskiJezik}
            github={currentPartner.detalji.github}
            leetcode={currentPartner.detalji.leetcode}
            longBio={currentPartner.detalji.opis}
            image={currentPartner.putanjaZaSliku}
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
