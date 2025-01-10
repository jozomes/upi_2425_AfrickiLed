import { useState } from 'react';
import stil from '../cssFiles/LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email || !lozinka) {
            setError("Sva polja moraju biti popunjena.");
            return;
        }
        
        try{
            const response = await fetch(`http://localhost:5000/login?email=${encodeURIComponent(email)}&lozinka=${encodeURIComponent(lozinka)}`)

            const data=await response.json();

            if(!response.ok){
                setError(data.error || "Neispravni podaci za prijavu");
            }

            setError("");
            // alert("Prijava uspješna!");
            navigate("/MainMenu")
        }
        catch(error){
            setError("Došlo je do pogreške s poslužiteljem.");
            //console.error("Greška: ", error);
        }
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

            <div>
                <Link to={"/register"}>Nemas profil?</Link>
            </div>
        </div>
    );
}

export default LoginForm;
