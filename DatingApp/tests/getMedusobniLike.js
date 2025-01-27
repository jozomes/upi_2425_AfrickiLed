const axios = require('axios');
async function GetMedusobniLike(){
      try {
        const res = await axios.get('http://localhost:5000/usporediLikes',
          { 
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        const dohvaceniMedusobniLikeovi = res.data.medusobniLike;
        setMedusobniLikeovi(dohvaceniMedusobniLikeovi);
        localStorage.setItem("medusobniLike", dohvaceniMedusobniLikeovi);
        
        console.log(`Imate ${dohvaceniMedusobniLikeovi.length} medusobnih like-ova`);

      } catch (error) {
        console.log(error);
      }
    }
module.exports = GetMedusobniLike;