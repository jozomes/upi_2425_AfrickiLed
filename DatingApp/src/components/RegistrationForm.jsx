import { useState } from "react";
import stil from '../cssFiles/LoginForm.module.css';

function RegistrationForm() {
  const [formaPodaci, postaviPodatke] = useState({
    email: "",
    lozinka: "",
    ponovi_lozinku: "",
    smjer: "",
    ime: "",
    prezime: "",
  });

  const [error, setError] = useState("");

  const smjerovi = ["Informatika", "Informatika-tehnika", "Matematika", "Fizika ", "Biologija-kemija"];

  function promjenaUlaza(event) {
    const { name, value } = event.target;
    postaviPodatke({ ...formaPodaci, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const postojiKorisnik = postojeciKorisnici.some(
      (korisnik) => korisnik.email === formaPodaci.email
    );

    if (postojiKorisnik) {
      setError("Korisnik s ovim emailom već postoji.");
      return;
    }


    if (!formaPodaci.email.includes("@pmfst")) {
      setError("Email mora sadržavati '@pmfst'.");
      return;
    }

    if (formaPodaci.lozinka.length < 6) {
      setError("Lozinka mora imati najmanje 6 znakova.");
      return;
    }

    if (formaPodaci.lozinka !== formaPodaci.ponovi_lozinku) {
      setError("Lozinke se ne podudaraju.");
      return;
    }

    if (!formaPodaci.smjer) {
      setError("Morate odabrati smjer.");
      return;
    }

    if (!formaPodaci.ime || !formaPodaci.prezime) {
      setError("Ime i prezime moraju biti popunjeni.");
      return;
    }

    setError("");
    console.log("Podaci za registraciju:", formaPodaci);
    alert("Registracija uspješna!");
  }

  return (
    <div className={stil.container}>
      <div className={stil.header}>
        <div className={stil.text}>Registracija</div>
        <div className={stil.underline}></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={stil.inputs}>
          {/* Email */}
          <div>
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
          </div>

          {/* Lozinka */}
          <div>
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
          </div>

          {/* Ponovi Lozinku */}
          <div>
            <label htmlFor="ponovi_lozinku">Ponovljena lozinka:</label>
            <div className={stil.input}>
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
          </div>

          {/* Ime */}
          <div>
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
          </div>

          {/* Prezime */}
          <div>
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
          </div>
        </div>

        {error && <div className={stil.error}>{error}</div>}

        <div className={stil.submitc}>
          <button type="submit" className={stil.submit}>
            Registracija
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
