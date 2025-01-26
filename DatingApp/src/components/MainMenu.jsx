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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [medusobniLikeovi, setMedusobniLikeovi] = useState(null);

    const LogOutAndExit = () =>{
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("partners");
        navigate("/");
        console.log(currentUser);
    }

    const handleNextPicture = () => {
      if (currentPartner?.putanjaZaSliku) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentPartner.putanjaZaSliku.length);
      }
    };
    
    const handlePreviousPicture = () => {
      if (currentPartner?.putanjaZaSliku) {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex - 1 + currentPartner.putanjaZaSliku.length) % currentPartner.putanjaZaSliku.length
        );
      }
    };


    async function GetPartners() {
        try {
            const res = await axios.get('http://localhost:5000/browse',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            const partners = res.data;
            console.log(res.data);
            localStorage.removeItem("partners");
            localStorage.setItem("partners", JSON.stringify(partners));
            setPartners(partners);

            if (partners && partners.length > 0) {
              const partner = { 
                  ...partners[0], 
                  putanjaZaSliku: partners[0].putanjaZaSliku || [], 
              };
              setCurrentPartner(partner);
          }
        } catch (error) {
            console.error("Dogodila se greska u dohvacanju drugih usera");
        }
    }

    async function LikePartner() {
      try{
        const res = await axios.patch('http://localhost:5000/browse/like', 
          { 
            newLike: `${currentPartner.email}` 
          },
          { 
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        console.log(res.data);

        const updatedLiked = [...(currentUser.liked || []), currentPartner.email];
        const updatedUser = {...currentUser, liked: updatedLiked};
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        const updatedPartners = partners.filter((partner) => partner.email !== currentPartner.email);
        setPartners(updatedPartners);
        NextPartner();
      }catch(error){
        console.log(error);
      }
    }

    async function GetMedusobniLike(){
      try {
        const res = await axios.get('http://localhost:5000/usporediLikes',
          { 
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        const dohvaceniMedusobniLikeovi = res.data.medusobniLike;
        setMedusobniLikeovi(dohvaceniMedusobniLikeovi);
        localStorage.setItem("medusobniLike", dohvaceniMedusobniLikeovi);
        
        console.log(`Imate ${dohvaceniMedusobniLikeovi.length} medusobnih like-ova`);

      } catch (error) {
        console.log(error);
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
            GetMedusobniLike();
        }
    }, [partners]);




    async function InitializeBrowsing() {
      if (partners && partners.length > 0) {
        setCurrentPartner(partners[partnerIndex]);
        console.log(partners[partnerIndex]);
      }
    }

    function NextPartner() {
      setPartnerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % partners.length;
        setCurrentPartner(partners[nextIndex]);
        return nextIndex;
      });
    }

    if (!currentUser) {
      return null;
    }

  //dodala sam ovo
  // Funkcija za prijavu korisnika
  const ReportUser = async () => {
    try {
      await axios.post('http://localhost:5000/report', {
        reportedUserId: currentPartner.id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Korisnik je uspješno prijavljen.");
      NextPartner();
    } catch (error) {
      console.error("Greška prilikom prijavljivanja korisnika.", error);
      alert("Nije moguće prijaviti korisnika. Pokušajte ponovo.");
    }
  };

  // Funkcija za blokiranje korisnika
  const BlockUser = async () => {
    try {
      await axios.post('http://localhost:5000/block', {
        blockedUserId: currentPartner.id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Korisnik je uspješno blokiran.");
      NextPartner();
    } catch (error) {
      console.error("Greška prilikom blokiranja korisnika.", error);
      alert("Nije moguće blokirati korisnika. Pokušajte ponovo.");
    }
  };


  return (
    <div className='container'>
      <header>
        <div className="parent_header">
          <h1 className="header_naslov">Get Commit</h1>
          <div className="underline"></div>
        </div>
        <div className="parent_logout">
          <button className="logout" onClick={LogOutAndExit}>Log Out</button>
          <button className="logout" onClick={() => navigate("/edit-profile")}>Uredi profil</button>
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
            image={currentPartner.putanjaZaSliku?.[currentImageIndex] || ''}
            onNextPicture={handleNextPicture}
            onPreviousPicture={handlePreviousPicture}
          />
        )}   

        <div className="btn_like_dislike">
          <button onClick={NextPartner}>0</button>
          <button onClick={LikePartner}>1</button>
        </div>
      </div>

      {/* Botuni za prijavu i blokiranje */}
      <div className="report_block_buttons">
          <button onClick={ReportUser} className="report-button">Prijavi korisnika</button>
          <button onClick={BlockUser} className="block-button">Blokiraj korisnika</button>
        </div>

      <footer>
        <div className="footer">
          <p>Credits:</p>
          <a>About</a>
        </div>
      </footer>
    </div>
  );
}

export default MainMenu;
