const JedinstvenMail = require('./JedinstvenMail.js'); 
const axios = require('axios');
const ParseData = (formaPodaci) => {
    return {
        email: formaPodaci.email,
        password: formaPodaci.lozinka,
        // Add other necessary transformations here
    };
  };
const SendData = async (event, formaPodaci, navigate, PohranaSlike, alertFunction) => { 
    event.preventDefault();
  
    if (!formaPodaci.email.endsWith("@pmfst.hr")) {
      alertFunction("Unesite pmfst.hr domenu"); 
      return;
    }

    if (formaPodaci.lozinka != formaPodaci.ponovi_lozinku) {
        alertFunction("Lozinke se ne podudaraju");
        return;
    }

    const jedinstven = await JedinstvenMail(formaPodaci.email);
    if (!jedinstven) {
        alertFunction("Ovaj mail se vec koristi");
        return;
    }

    const zaSlanje = ParseData(formaPodaci);
    console.log(zaSlanje);

    try {
        const response = await axios.post('http://localhost:5000/users', zaSlanje);
        console.log(response);
        await PohranaSlike();
        alertFunction("Registracija uspješna!");
        navigate("/");
    } catch (err) {
        console.error("Greška prilikom slanja podataka:", err);
        alertFunction("Došlo je do greške prilikom registracije.");
    }
}
module.exports = SendData;