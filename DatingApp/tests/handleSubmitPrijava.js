// path/to/your/function.js
const axios = require('axios');
const jwtDecode = require('jwt-decode');
const handleSubmit = async ({ email, lozinka, setError, navigate, setCurrentUser }) => {
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
        console.error("Greška: ", error.message);
    }
};

module.exports = handleSubmit;
