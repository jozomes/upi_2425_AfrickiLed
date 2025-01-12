import { useState, useContext } from 'react'
import stil from '../cssFiles/LoginForm.module.css'
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [formaPodaci, postaviPodatke] = useState({
        short_desc: currentUser.detalji.short_desc,
        fav_language: currentUser.detalji.fav_language,
        github: currentUser.detalji.github,
        leetcode: currentUser.detalji.leetcode,
        profileImage: null,
      });

    const prog_lang = ["python", "c#", "javascript", "c++", "c", "java", "php", "rust", "tajna je :)"];
    const navigate = useNavigate();

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            postaviPodatke({ ...formaPodaci, profileImage: file});
        }
    };
    const [profilePicture, setProfilePicture] = useState("");

    const handleImageUpload = async (event) => {
        const formData = new FormData();
        formData.append('profilePicture', event.target.files[0]);

        try {
            const response = await fetch('http://localhost:5000/upload-profile-picture', {
            method: 'POST',
             body: formData,
            });

            const data = await response.json();
    
            if (response.ok) {
                console.log('Slika uspješno spremljena:', data.imageUrl);
                setProfilePicture(data.imageUrl); // Spremi URL slike u stanje
            } else {
                console.error('Greška pri uploadu slike:', data.message);
            }
        } catch (error) {
            console.error('Došlo je do greške:', error);
            }
};

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profileImage', formaPodaci.profileImage);
        formData.append('email', currentUser.email); // Dodaj email korisnika

        try {
            const response = await fetch('http://localhost:5000/upload-profile-picture', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Greška pri uploadu slike:', errorData.message);
                return;
            }

            const data = await response.json();
            console.log('Slika uspješno spremljena:', data);

            // Ažuriraj trenutno stanje korisnika
            setCurrentUser({ ...currentUser, putanjaZaSliku: data.putanjaZaSliku });
        } catch (error) {
            console.error('Greška prilikom slanja slike:', error);
        }
};
    const UpdateProfile = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:5000/update/${currentUser.email}`,{
                detalji: {
                    "opis": formaPodaci.short_desc,
                    "najdraziProgramskiJezik": formaPodaci.fav_language,
                    "github": formaPodaci.github,
                    "leetcode": formaPodaci.leetcode,
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const Exit = (event) => {
        event.preventDefault();
        navigate("/MainMenu");
    }

    return (
      <div className={stil.container}>
        <div className={stil.header}>
            <div className={stil.text}>Uređivanje profila</div>
            <div className={stil.underline}></div>
        </div>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="description">Malo duži opis:</label>
                <div className={stil.inputs}>
                <div className={stil.input}>
                    <textarea id="description"
                    name="short_desc"
                    minLength="1"
                    maxLength="100"
                    onChange={promjenaUlaza}
                    placeholder='Duži opis'>
                  </textarea>      
                </div>
            </div>
            <div>
                <label>
                    Najdrazi programski jezik
                    <div className={stil.input}>
                    <select
                    name='fav_language'
                    value={formaPodaci.fav_language}
                    onChange={promjenaUlaza}
                    required>
                        <option value=''>--":P"--</option>
                        {prog_lang.map(lang => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                    </div>
                </label>
                
            </div>
            <div>
                <label htmlFor="GitHubAccount">GitHub:</label>
                <div className={stil.input}>
                <input type="text" name="github" value={formaPodaci.github} onChange={promjenaUlaza} 
                placeholder='GitHub'>
                </input>
                </div>
            </div>
            <div>
                <label htmlFor="LeetCodeAccount">LeetCode:</label>
                <div className={stil.input}>
                    <input type="text" name="leetcode" value={formaPodaci.leetcode} onChange={promjenaUlaza} 
                    placeholder='LeetCode'>
                    </input>
                </div>
            </div>
            <div>
                <label htmlFor="profileImage">Upload slike:</label>
                    <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    />
            </div>
            <button type="submit">Spremi profil</button>
            <button onClick={Exit}>Povratak na main menu</button>
            </div>
        </form>
      </div>
    )
  }
export default EditProfile
