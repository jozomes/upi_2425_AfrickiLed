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
            "liked":[]
        }
    }

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
            //alert("Registracija uspješna!");
            navigate("/");
        } catch (err) {
            console.error("Greška prilikom slanja podataka:", err);
            alert("Došlo je do greške prilikom registracije.");
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
                    
                
                <label htmlFor="GitHubAccount">GitHub:</label>
                <div className={stil.input}>
                    <input type="text" name="github" value={formaPodaci.github} onChange={promjenaUlaza} 
                    placeholder='GitHub'>
                    </input>
                </div>
                
                <label htmlFor="LeetCodeAccount">LeetCode:</label>
                <div className={stil.input}>
                        <input type="text" name="leetcode" value={formaPodaci.leetcode} onChange={promjenaUlaza} 
                        placeholder='LeetCode'>
                        </input>
                </div>
                <div>
                <button type="submit">Prijavi se</button>
                </div>
            </form>
            </div>
            
            <div>
                <Link to={"/"} className={stil.noprofile}>Već imaš profil?</Link>
            </div>

        </div>
    )
}

export default MainRegistrationForm;