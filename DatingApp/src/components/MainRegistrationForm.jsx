import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import stil from '../cssFiles/LoginForm.module.css';

function MainRegistrationForm() {
    const [formaPodaci, postaviPodatke] = useState({
        email: '',
        lozinka: '',
        ponovi_lozinku: '',
        smjer: '',
        ime: '',
        prezime: '',
        short_desc: '',
        fav_language: '',
        github: '',
        leetcode: '',
        putanjaZaSliku: ''
    });

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    const smjerovi = ["Informatika", "Informatika-tehnika", "Matematika", "Fizika ", "Biologija-kemija"];
    const prog_lang = ["python", "c#", "javascript", "c++", "c", "java", "php", "rust", "tajna je :)"];
    const navigate = useNavigate();

    function ParseData(object) {
        return{
            "email": object.email,
            "lozinka": object.lozinka,
            "smjer": object.smjer,
            "ime": object.ime,
            "prezime": object.prezime,
            "detalji": {
                "opis":object.short_desc,
                "najdraziProgramskiJezik": object.fav_language,
                "github":object.github,
                "leetcode":object.leetcode
            },
            "putanjaZaSliku":object.putanjaZaSliku,
            "liked":[]
        }
    }

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length) {
            postaviPodatke({ ...formaPodaci, putanjaZaSliku: files[0] });
        }
    };

    async function JedinstvenMail(mail){
        const url = `http://localhost:5000/users/${mail}`;

        try{
            const rez = await axios.get(url);
            if (rez.status === 200)
            {
                console.log("Email ok");
                return true;
            }
        }catch (err) {
            if (err.response && err.response.status === 400) {
                return false;
            }
            console.error("Dogodila se greska: ", err);
        }

        return false;
    }

    const SendData = async event => {
        event.preventDefault();

        if (!formaPodaci.email.endsWith("@pmfst.hr")) {
            alert("Unesite pmfst.hr domenu");
            return;
        }

        if (formaPodaci.lozinka != formaPodaci.ponovi_lozinku) {
            alert("Lozinke se ne podudaraju");
            return;
        }

        const jedinstven = await JedinstvenMail(formaPodaci.email);
        if (!jedinstven) {
            alert("Ovaj mail se vec koristi");
            return;
        }

        const zaSlanje = ParseData(formaPodaci);
        console.log(zaSlanje);

        try {
            const response = await axios.post('http://localhost:5000/users', zaSlanje);
            console.log(response);
            await PohranaSlike();
            //alert("Registracija uspješna!");
            navigate("/");
        } catch (err) {
            console.error("Greška prilikom slanja podataka:", err);
            alert("Došlo je do greške prilikom registracije.");
        }
    }

    const PohranaSlike = async () =>{
        const formData = new FormData();
        formData.append('profileImages', formaPodaci.putanjaZaSliku);
        formData.append('email', formaPodaci.email);

        try {
            const response = await fetch('http://localhost:5000/upload-profile-picture', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Greska pri uploadu slike', errorData.message);
                return;
            }

            const data = await response.json();
            console.log('Slika uspješno spremljena:', data);  // Check server response
            postaviPodatke((prevState) => ({...prevState, profileImage: null}));
        } catch (error) {
            console.error('Greška prilikom slanja slike:', error);
        }
    }

    return(
        <div className={stil.container}>
            <div className={stil.header}>
               <div className={stil.text}>Registracija</div>
                <div className={stil.underline}></div>
            </div>
            
            <div className={stil.inputs}>
            <form onSubmit={SendData}>
                <label htmlFor="email">Email:</label>
                <div className={stil.input}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formaPodaci.email}
                        placeholder="@pmfst"
                        onChange={promjenaUlaza}
                        required
                    />
                </div>

                <br />
                <label htmlFor="lozinka">Lozinka:</label>
                <div className={stil.input}>
                    <input
                        id="lozinka"
                        type="password"
                        name="lozinka"
                        value={formaPodaci.lozinka}
                        placeholder="Lozinka"
                        onChange={promjenaUlaza}
                        required
                    />
                </div>
                
                <br />
                <label htmlFor="ponovi_lozinku">Ponovi lozinku:</label>
                <div className={stil.input}>
                    <input
                        id="ponovi_lozinku"
                        type="password"
                        name="ponovi_lozinku"
                        value={formaPodaci.ponovi_lozinku}
                        placeholder="Lozinka"
                        onChange={promjenaUlaza}
                        required
                    />
                </div>
            
                <hr></hr>
                <br />
                <label htmlFor="ime">Ime:</label>
                <div className={stil.input}>
                    <input
                        id="ime"
                        type="text"
                        name="ime"
                        value={formaPodaci.ime}
                        placeholder="Ime"
                        onChange={promjenaUlaza}
                        required
                    />
                </div>

               <br />
                <label htmlFor="prezime">Prezime:</label>
                <div className={stil.input}>
                    <input
                        id="prezime"
                        type="text"
                        name="prezime"
                        value={formaPodaci.prezime}
                        onChange={promjenaUlaza}
                        placeholder="Prezime"
                        required
                    />
                </div>
               
               <br />
                <label htmlFor="description">Malo duži opis:</label>
                <div className={stil.input}>
                    <textarea id="description"
                        name="short_desc"
                        value={formaPodaci.short_desc}
                        minLength="1"
                        maxLength="100"
                        onChange={promjenaUlaza}
                        placeholder='Duži opis'>
                    </textarea>      
                </div>

                <br />
                <label htmlFor="smjer">Smjer:</label>
                <div className={stil.input}>
                    <select
                        id="smjer"
                        name="smjer"
                        value={formaPodaci.smjer}
                        onChange={promjenaUlaza}
                        required
                    >
                        <option value="">Odaberite smjer</option>
                        {smjerovi.map((smjer) => (
                        <option key={smjer} value={smjer}>
                            {smjer}
                        </option>
                        ))}
                    </select>
                </div>
                
                <hr></hr>
                <br />
                <label htmlFor="description">Najdraži programski jezik:</label>
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
                    
                <br />
                <label htmlFor="GitHubAccount">GitHub:</label>
                <div className={stil.input}>
                    <input type="text" name="github" value={formaPodaci.github} onChange={promjenaUlaza} 
                    placeholder='GitHub'>
                    </input>
                </div>
                <br />
                
                <label htmlFor="LeetCodeAccount">LeetCode:</label>
                <div className={stil.input}>
                        <input type="text" name="leetcode" value={formaPodaci.leetcode} onChange={promjenaUlaza} 
                        placeholder='LeetCode'>
                        </input>
                </div>
                <br></br>
                <div>
                    <label htmlFor="profileImage">Upload slike:</label>
                        <div className={stil.inputs}>
                        <div className={stil.input}>
                            <input
                                type="file"
                                name="putanjaZaSliku"
                                accept="image/*"
                                onChange={handleImageChange}
                                /></div></div>
                        </div>
                <div>
                <button type="submit">Prijavi se</button>
                </div>
            </form>
            </div>
            <br></br>
            <div>
                <Link to={"/"} className={stil.noprofile}>Već imaš profil?</Link>
            </div>

        </div>
    )
}

export default MainRegistrationForm;