const axios = require('axios');
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
module.exports = JedinstvenMail;