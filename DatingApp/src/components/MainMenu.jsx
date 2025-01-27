import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import MedusobniLike from './MedusobniLike';
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
    const [endOfPartners, setEndOfPartners] = useState(false);
    const [seenUsers, setSeenUsers] = useState([]);

    const LogOutAndExit = () =>{
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("partners");
        localStorage.removeItem("medusobniLike")
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

  // Funkcija za prijavu korisnika
  const ReportUser = async () => {
    //nalik na blok samo prijava
    try {
      await axios.post('http://localhost:5000/report',
      {
        noviReport: `${currentPartner.email}`
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      NextPartner();
    } catch (error) {
      console.error("Greška prilikom prijavljivanja korisnika.", error);
      alert("Nije moguće bprijaviti korisnika. Pokušajte ponovo.");
    }
  };

  // Funkcija za blokiranje korisnika
  const BlockUser = async () => {
    try {
      await axios.patch('http://localhost:5000/block',
        { 
          noviBlok: `${currentPartner.email}` 
        },
        { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
      NextPartner();
    } catch (error) {
      console.error("Greška prilikom blokiranja korisnika.", error);
      alert("Nije moguće blokirati korisnika. Pokušajte ponovo.");
    }
  };

//dodajem drugi put
// Funkcija za preskakanje trenutnog korisnika
const handleInteraction = () => {
  const updatedSeenUsers = [...seenUsers, currentPartner.email];
  setSeenUsers(updatedSeenUsers);

  const remainingPartners = partners.filter(
      (partner) => !updatedSeenUsers.includes(partner.email)
  );

  if (remainingPartners.length > 0) {
      setCurrentPartner(remainingPartners[0]); 
  } else {
      setEndOfPartners(true); 
  }

  setPartners(remainingPartners); 
};

 const handleDislike = () => {
  handleInteraction(); 
};

// Funkcija za lajkanje korisnika
const handleLike = async () => {
  try {
      await axios.patch(
          'http://localhost:5000/browse/like',
          { newLike: currentPartner.email },
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          }
      );
      handleInteraction(); 
  } catch (error) {
      console.error("Dogodila se greška prilikom lajkanja korisnika.", error);
  }
};

  return (
    <div className='container'>
      <header>
        <div className="parent_header">
          <h1 className="header_naslov">Get Commit</h1>
          <div className="underline"></div>
        </div>
        <h3>Bok, {currentUser.ime}!</h3>
        <div className="parent_logout">
          <button className="logout" onClick={LogOutAndExit}>Odjava</button>
          <button className="logout" onClick={() => navigate("/edit-profile")}>Uredi profil</button>
        </div>
      </header>

      <div className="parent_user_window">
                {!endOfPartners && currentPartner ? (
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
                ) : (
                    <div className="end-of-partners-message">
                        <p>Došli ste do kraja potencijalnih partnera.</p>
                        <p>Pokušajte kasnije ponovno!</p>
                    </div>
                )}
            </div>

            {!endOfPartners && (
              <div>
                <div className="btn_like_dislike">
                    <button onClick={handleDislike}>0</button>
                    <button onClick={handleLike}>1</button>
                </div>
                <div className="report_block_buttons">
                  <button onClick={ReportUser} className="report-button">Prijavi korisnika</button>
                  <button onClick={BlockUser} className="block-button">Blokiraj korisnika</button>
                </div>
              </div>
            )}

      

        {medusobniLikeovi && medusobniLikeovi.length > 0 && (
          <div className="medusobni-likeovi-container">
            <h2>Jedan lajk, ali tko će prvi riješiti ovaj problem?</h2>
            <h3>Započni razgovor...</h3>
            <div className="likeovi-list">
              {medusobniLikeovi.map((mail) => (
                <div key={mail} className="like-user-grid">
                  <p className="like-user-mail">{mail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      <footer>
        <div className="footer">
          <p>Credits:</p>
          <a onClick={() => navigate("/about")}>About</a>
          {/* <button className="logout" onClick={() => navigate("/about")}>about</button> */}
        </div>
      </footer>
    </div>
  );
}

export default MainMenu;
