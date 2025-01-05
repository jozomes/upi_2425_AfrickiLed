import { useState } from 'react';
import stil from '../cssFiles/LoginForm.module.css';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [error, setError] = useState("");

    // Niz postojećih korisnika, dok se ne prebacimo na server
    const postojeciKorisnici = [
        { email: "korisnik1@pmfst.hr", lozinka: "lozinka123" },
        { email: "korisnik2@pmfst.hr", lozinka: "sifra456" },
        { email: "korisnik3@pmfst.hr", lozinka: "tajna789" },
    ];

    const handleSubmit = () => {
        if (!email || !lozinka) {
            setError("Sva polja moraju biti popunjena.");
            return;
        }

        const korisnik = postojeciKorisnici.find(
            (korisnik) => korisnik.email === email && korisnik.lozinka === lozinka
        );

        if (!korisnik) {
            setError("Neispravni podaci za prijavu.");
            return;
        }

        setError("");
        console.log("Email:", email);
        console.log("Lozinka:", lozinka);
        alert("Prijava uspješna!");
    };

    return (
        <div className={stil.container}>
            <div className={stil.header}>
                <div className={stil.text}>Prijava</div>
                <div className={stil.underline}></div>
            </div>

            <div className={stil.inputs}>
                Email: <br />
                <div className={stil.input}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                Lozinka: <br />
                <div className={stil.input}>
                    <input
                        type="password"
                        placeholder="Lozinka"
                        value={lozinka}
                        onChange={(e) => setLozinka(e.target.value)}
                    />
                </div>
            </div>

            {error && <div className={stil.error}>{error}</div>}

            <div className={stil.submitc}>
                <div className={stil.submit} onClick={handleSubmit}>
                    Prijava
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
