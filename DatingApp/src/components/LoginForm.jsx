import { useState, useContext, useEffect } from 'react';
import stil from '../cssFiles/LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const handleSubmit = async () => {
        if (!email || !lozinka) {
            setError("Sva polja moraju biti popunjena.");
            return;
        }
        
        try{
            const res = await axios.get(`http://localhost:5000/login?email=${encodeURIComponent(email)}&lozinka=${encodeURIComponent(lozinka)}`)
            const token = res.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            setCurrentUser(decoded.korisnik);

            if (decoded.korisnik.isAdmin) {
                navigate("/admin-page");
            }else{
                navigate("/MainMenu");
            }
        }
        catch(error){
            setError("Uneseni su krivi podaci.");
            console.error("Greška: ", error);
        }
    };

    useEffect(() => {
        console.log('currentUser updated: ', currentUser);
    }, [currentUser]);

    useEffect(()=> {
        console.log('currentuser updated: ', currentUser);
    }, [currentUser]);

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
                <Link to={"/register"}  className={stil.noprofile}>Nemaš profil?</Link>
            </div>
        </div>
    );
}

export default LoginForm;
