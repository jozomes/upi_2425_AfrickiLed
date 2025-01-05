import { useState } from "react";
import stil from '../cssFiles/LoginForm.module.css'

function RegistrationForm() {
  const [formaPodaci, postaviPodatke] = useState({
    email: "",
    lozinka: "",
    ponovi_lozinku: "",
    smjer: "",
    ime: "",
    prezime: "",
  });

  const smjerovi = ["Informatika", "Informatika-tehnika", "Matematika", "Fizika ","Biologija-kemija"];

  function promjenaUlaza(event) {
    const { name, value } = event.target;
    postaviPodatke({ ...formaPodaci, [name]: value });
  }

  return (
    <div className={stil.container}>
      <div className={stil.header}>
        <div className={stil.text}>Registracija</div>
        <div className={stil.underline}></div>
      </div>

      <form>
        <div className={stil.inputs}>
        {/* Email */}

        <div>
          <label htmlFor="email">Email:</label>
          <div  className={stil.input}>
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

        {/* Lozinka */}
        <div>
          <label htmlFor="lozinka">Lozinka:</label>
          <div  className={stil.input}>
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

        {/* Ponovi Lozinku */}
        <div>
          <label htmlFor="ponovi_lozinku">Ponovljena lozinka:</label>
          <div  className={stil.input}>
          <input
            id="ponovi_lozinku"
            type="password"
            name="ponovi_lozinku"
            value={formaPodaci.ponovi_lozinku}
            placeholder="Ponovljena lozinka"
            onChange={promjenaUlaza}
            required
          />
          </div>
        </div>

        {/* Smjer */}
        <div>
          <label htmlFor="smjer">Smjer:</label>
          <div  className={stil.input}>
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

        {/* Ime */}
        <div>
          <label htmlFor="ime">Ime:</label>
          <div  className={stil.input}>
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

        {/* Prezime */}
        <div>
          <label htmlFor="prezime">Prezime:</label>
          <div  className={stil.input}>
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
        </div>
        <div className={stil.submitc}>
          <div className={stil.submit}>Registracija</div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;