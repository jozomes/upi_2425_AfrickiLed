import { useState, useContext } from 'react';
import stil from '../cssFiles/LoginForm.module.css';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formaPodaci, postaviPodatke] = useState({
        najdraziProgramskiJezik: currentUser.detalji.najdraziProgramskiJezik,
        github: currentUser.detalji.github,
        leetcode: currentUser.detalji.leetcode,
        profileImage: null,
    });
    

    const [odabranoPolje, setOdabranoPolje] = useState('');
    const [poruka, setPoruka] = useState('');
    const prog_lang = ["python", "c#", "javascript", "c++", "c", "java", "php", "rust", "tajna je :)"];
    const navigate = useNavigate();

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length) {
            postaviPodatke({ ...formaPodaci, profileImage: files[0] });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formaPodaci.profileImage) {
            await UpdateProfile();
            console.log("azuriran profil");
            return;
        }

        const formData = new FormData();
        formData.append('profileImages', formaPodaci.profileImage);
        formData.append('email', currentUser.email);

         try {
            const response = await fetch('http://localhost:5000/upload-profile-picture', {
            method: 'POST',
            body: formData,
            });
            // Check for non-OK response
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Greška pri uploadu slike:', errorData.message);
                return;
            }

            const data = await response.json();
            console.log('Slika uspješno spremljena:', data);  // Check server response
            postaviPodatke((prevState) => ({...prevState, profileImage: null}));
            
        } catch (error) {
            console.error('Greška prilikom slanja slike:', error);
        }
    };

    const UpdateProfile = async () => {

        try {
            const response = await axios.patch(`http://localhost:5000/update/${currentUser.email}`,{
                detalji: {
                    "najdraziProgramskiJezik": formaPodaci.najdraziProgramskiJezik,
                    "github": formaPodaci.github,
                    "leetcode": formaPodaci.leetcode,
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };


    const Exit = () => {
        navigate("/MainMenu");
    };

    return (
        <div className={stil.container}>
            <div className={stil.header}>
                <div className={stil.text}>Uređivanje profila</div>
                <div className={stil.underline}></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={stil.radioContainer}>
                    <p>Odaberite polje koje želite urediti:</p>
                    <label className={stil.radioOption}>
                        <input
                            type="radio"
                            name="odabranoPolje"
                            value="najdraziProgramskiJezik"
                            onChange={() => setOdabranoPolje('najdraziProgramskiJezik')}
                        />
                        Najdraži programski jezik
                    </label>
                    <br />
                    <label className={stil.radioOption}>
                        <input
                            type="radio"
                            name="odabranoPolje"
                            value="github"
                            onChange={() => setOdabranoPolje('github')}
                        />
                        GitHub
                    </label>
                    <br />
                    <label className={stil.radioOption}>
                        <input
                            type="radio"
                            name="odabranoPolje"
                            value="leetcode"
                            onChange={() => setOdabranoPolje('leetcode')}
                        />
                        LeetCode
                    </label>
                    <br />
                    <label className={stil.radioOption}>
                        <input
                            type="radio"
                            name="odabranoPolje"
                            value="profileImage"
                            onChange={() => setOdabranoPolje('profileImage')}
                        />
                        Učitaj profilnu sliku
                    </label>
                </div>

                {odabranoPolje === 'najdraziProgramskiJezik' && (
                    <div>
                        <div className={stil.inputs}>
                        
                        <div className={stil.input}>
                        <label>
                            Najdraži programski jezik: 
                            <select
                                name="najdraziProgramskiJezik"
                                value={formaPodaci.najdraziProgramskiJezik}
                                onChange={promjenaUlaza}
                            >
                                <option value="">--":P"--</option>
                                {prog_lang.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </label>
                        </div></div>
                    </div>
                )}

                {odabranoPolje === 'github' && (
                    <div>
                        <label htmlFor="GitHubAccount">GitHub:</label>
                        <div className={stil.inputs}>
                        <div className={stil.input}>
                        <input
                            type="text"
                            name="github"
                            value={formaPodaci.github}
                            onChange={promjenaUlaza}
                            placeholder="GitHub"
                        /></div></div>
                    </div>
                )}

                {odabranoPolje === 'leetcode' && (
                    <div>
                        <label htmlFor="LeetCodeAccount">LeetCode:</label>
                        <div className={stil.inputs}>
                        <div className={stil.input}>
                        <input
                            type="text"
                            name="leetcode"
                            value={formaPodaci.leetcode}
                            onChange={promjenaUlaza}
                            placeholder="LeetCode"
                        /></div></div>
                    </div>
                )}

                {odabranoPolje === 'profileImage' && (
                    <div>
                        <label htmlFor="profileImage">Upload slike:</label>
                        <div className={stil.inputs}>
                        <div className={stil.input}>
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                        /></div></div>
                    </div>
                )}
                {poruka && <p>{poruka}</p>}
                <div className={stil.buttons}>
                    <button type="submit">Spremi</button>
                    <button type="button" onClick={Exit}>
                        Povratak
                    </button>
                </div>
            </form>

            
        </div>
    );
}

export default EditProfile;
