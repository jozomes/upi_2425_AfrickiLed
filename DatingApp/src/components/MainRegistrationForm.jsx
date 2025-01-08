import React, {useState} from "react";
import axios from "axios";

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
            }
        }
    }

    const SendData = event => {
        event.preventDefault();

        if (formaPodaci.lozinka != formaPodaci.ponovi_lozinku) {
            alert("Lozinke se ne podudaraju");
            return;
        }
        const zaSlanje = ParseData(formaPodaci);
        console.log(zaSlanje);
    }

    return(
        <div>
            <h1>Registracija</h1>
            <form onSubmit={SendData}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <div>
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
                </div>

                <div>
                    <label htmlFor="lozinka">Lozinka:</label>
                    <div>
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
                </div>

                <div>
                    <label htmlFor="ponovi_lozinku">Ponovi lozinku:</label>
                    <div>
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
                </div>

                <div>
                    <label htmlFor="smjer">Smjer:</label>
                    <div >
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
                </div>

                <div>
                    <label htmlFor="ime">Ime:</label>
                    <div>
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
                </div>

                <div>
                    <label htmlFor="prezime">PREZIME:</label>
                    <div>
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
                </div>

                <div>
                    <label htmlFor="description">Malo duži opis:</label>
                    <div>
                        <textarea id="description"
                        name="short_desc"
                        value={formaPodaci.short_desc}
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
                        <div>
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
                    <div>
                    <input type="text" name="github" value={formaPodaci.github} onChange={promjenaUlaza} 
                    placeholder='GitHub'>
                    </input>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="LeetCodeAccount">LeetCode:</label>
                    <div>
                        <input type="text" name="leetcode" value={formaPodaci.leetcode} onChange={promjenaUlaza} 
                        placeholder='LeetCode'>
                        </input>
                    </div>
                </div>
                <button type="submit">Prijavi se</button>
            </form>
            
        </div>
    )
}

export default MainRegistrationForm;