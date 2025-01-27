import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import '../cssFiles/mainMenu.css';
function Admin() {
    const navigate = useNavigate();
    const [prijavljeni, setPrijavljeni] = useState(null);
    const [trenutniPrijavljeni, setTrenutniPrijavljeni] = useState(null);
    const [krajPrijavljenih, setKrajPrijavljenih] = useState(false);

    // Funkcija za odjavu
    const Exit = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    /*potencijalna zamjena za return()
    return (
    <div className="container">
      <h1>Obavijesti</h1>
      {email ? (
        <div className="obavijest">
          <p>Korisnik za brisanje: {email}</p>
          <div className="parent_buttons">
            <button onClick={handleDeleteUser} disabled={loading}>
              {loading ? 'Obrađujem...' : 'Odobri'}
            </button>
          </div>
        </div>
      ) : (
        <p>Nema korisnika za brisanje.</p>
      )}
      {poruka && <p>{poruka}</p>}
    </div>
  );
}*/


  const OdbaciPrijavu = async (event) =>{
    event.preventDefault();

    try {
      const email = trenutniPrijavljeni.toLowerCase();
      await axios.delete(`http://localhost:5000/odbaci/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Zahtjev za prijavu uspjesno odbacen.');
      const ostaliPrijavljeni = prijavljeni.filter(
        (p) => p !== trenutniPrijavljeni
      );
      setPrijavljeni(ostaliPrijavljeni);

      if(ostaliPrijavljeni.length > 0){
        setTrenutniPrijavljeni(ostaliPrijavljeni[0]);
      }
      else{
        setTrenutniPrijavljeni(null);
        setKrajPrijavljenih(true);
      }
    } catch (error) {
      console.error('Greška prilikom odbacivanje zahtjeva.', error);
      alert('Nije moguće odbaciti zahtjev. Pokušajte ponovo.');
    }
  }
  const OdobriPrijavu = async (event) => {
    event.preventDefault();

    try {
      const email = trenutniPrijavljeni.toLowerCase();
      console.log(email);
      await axios.delete(`http://localhost:5000/users/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Korisnik je uspješno izbrisan.');
      const ostaliPrijavljeni = prijavljeni.filter(
        (p) => p !== trenutniPrijavljeni
      );
      setPrijavljeni(ostaliPrijavljeni);

      if(ostaliPrijavljeni.length > 0){
        setTrenutniPrijavljeni(ostaliPrijavljeni[0]);
      }
      else{
        setTrenutniPrijavljeni(null);
        setKrajPrijavljenih(true);
      }
    } catch (error) {
      console.error('Greška prilikom brisanje korisnika.', error);
      alert('Nije moguće obrisati korisnika. Pokušajte ponovo.');
    }
  };

  async function InitialLoad() {
    try {
      const response = await axios.get('http://localhost:5000/prijavljeni');
      const podaci = response.data.prijave;
      setPrijavljeni(podaci);
      setTrenutniPrijavljeni(podaci[0]);
      console.log(podaci);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    InitialLoad();
}, []);

    
  return (
    
    <div className='container'>
        <div>
            <header>
            <div className="parent_header">
                <h1 className="header_naslov">Obavijesti</h1>
            </div>
            <div className='obavijest'>
                {!krajPrijavljenih && trenutniPrijavljeni ? (
                  <div>
                    <p>Korisnik: {trenutniPrijavljeni}</p>
                    <div className="parent_buttons">
                        <button onClick={OdobriPrijavu}>Odobri</button>
                        <button onClick={OdbaciPrijavu}>Odbaci</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>Pregledali ste sve prijavljene korisnike</p>
                  </div>
                )}
            </div>
            <div className="parent_logout">
                <button onClick={Exit}>Odjava</button>
            </div>

        </header>
        </div>
    </div>
  );
}

export default Admin;