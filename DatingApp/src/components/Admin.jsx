import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import '../cssFiles/mainMenu.css';
function Admin() {
    const navigate = useNavigate();

    // Funkcija za odjavu
    const Exit = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    
  return (
    
    <div className='container'>
        <div>
            <header>
            <div className="parent_header">
                <h1 className="header_naslov">Obavijesti</h1>
            </div>
            <div className='obavijest'>
                
                Korisnik: KOJI
                <div className="parent_buttons">
                    <button>Odobri</button>
                    <button>Odbaci</button>
                </div>
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
