import { useState } from "react";

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
    <div>
      <form>
        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
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

        {/* Lozinka */}
        <div>
          <label htmlFor="lozinka">Lozinka:</label>
          <input
            id="lozinka"
            type="password"
            name="lozinka"
            value={formaPodaci.lozinka}
            onChange={promjenaUlaza}
            required
          />
        </div>

        {/* Ponovi Lozinku */}
        <div>
          <label htmlFor="ponovi_lozinku">Ponovi lozinku:</label>
          <input
            id="ponovi_lozinku"
            type="password"
            name="ponovi_lozinku"
            value={formaPodaci.ponovi_lozinku}
            onChange={promjenaUlaza}
            required
          />
        </div>

        {/* Smjer */}
        <div>
          <label htmlFor="smjer">Smjer:</label>
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

        {/* Ime */}
        <div>
          <label htmlFor="ime">Ime:</label>
          <input
            id="ime"
            type="text"
            name="ime"
            value={formaPodaci.ime}
            onChange={promjenaUlaza}
            required
          />
        </div>

        {/* Prezime */}
        <div>
          <label htmlFor="prezime">Prezime:</label>
          <input
            id="prezime"
            type="text"
            name="prezime"
            value={formaPodaci.prezime}
            onChange={promjenaUlaza}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;