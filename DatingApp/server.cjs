const express = require("express");
const cors = require("cors")
const jwt = require('jsonwebtoken');

//potrebno za zapis korisnika
const fs = require("fs")
const path = require("path")

const multer = require("multer")

const app = express();
//MIDDLEWARE
app.use(cors());
app.use(express.json());

const provjeriToken = (req, res, next)=>{
  const authZaglavlje = req.headers['authorization'];
  if(!authZaglavlje) return res.status(403).send('Ne postoji autorizacijsko zaglavlje');

  const token = authZaglavlje.split(' ')[1];
  if (!token) return res.status(403).send('Bearer token nije pronaden');

  try{
    const dekodiraniToken = jwt.verify(token, 'getCommit');
    req.korisnik = dekodiraniToken;
  }catch(err){
    return res.status(401).send('Neispravni token');
  }

  return next();
}

const provjeriUlogu = ()=> (req, res, next)=>{
  if (req.korisnik.korisnik && req.korisnik.korisnik.isAdmin) {
    next();
  } else{
    res.status(403).send('Zabranjen pristup');
  }
}

const uploadFolder = path.join(__dirname, 'profilePictures');
if(!fs.existsSync(uploadFolder)){
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, uploadFolder);
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage})


///////////////////////////////////////
const USERS_FILE = path.join(__dirname, 'users.json');
let users = [];
if(fs.existsSync(USERS_FILE)) {
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  users = JSON.parse(data);
}

function saveUsersToFile() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

const ADMIN_FILE = path.join(__dirname, 'admin.json');
let prijave = [];
if (fs.existsSync(ADMIN_FILE)) {
  const adminData = fs.readFileSync(ADMIN_FILE, 'utf-8');
  prijave = JSON.parse(adminData);
}

function saveReportsToFile(){
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(prijave, null, 2));
}
///////////////////////////////////////////////

app.get("/", (req, res) => {
    res.send("Pozdrav od Express poslužitelja!");
  });

const PORT = 5000;
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!, radi li zna li se' });
});
app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});

app.get('/users', (req, res) => {
  console.log("Primljen zahtjev za '/users' endpoint");
  console.log("Korisnici:", users);
  if(users.length==0){console.log("nema korisnika");}
  res.json({message:"radi molim te"});
});

app.get('/admin', provjeriToken, provjeriUlogu, (req, res) =>{
  res.send('Jeli radi ovo samo za admine');
});


app.get('/users/:mail', (req, res) => {
  const potentialMail = req.params.mail;

  const existingUser = users.find(user => user.email.toLowerCase() === potentialMail);

  if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
  }

  return res.status(200).json({message:"Ne postoji korisnik, sve ok!"})
});


app.get('/login', (req, res) =>{
  const {email, lozinka} = req.query;
  try {
    if(!email || !lozinka){
      return res.status(400).json({error:'Sva polja moraju biti popunjena!'});
    }
    const korisnik=users.find(user => user.email===email && user.lozinka ===lozinka);
  
    if(!korisnik){
      return res.status(401).json({error: "Neispravni podatci"});
    }
    //res.status(200).json({message:"Uspješna prijava!", korisnik});
    const token = jwt.sign(
      {korisnik: korisnik},
      'getCommit',
      {expiresIn: '1h'}
    );
    res.json({token});
  } catch (error) {
    res.status(500).send(error.message);
  }
  
});



app.patch('/update/:mail', (req,res) =>{
  const potentialMail = req.params.mail.toLowerCase();

  const existingUser = users.find(user => user.email.toLowerCase() === potentialMail);

  if (!existingUser) {
      return res.status(404).json({ error: 'Nije pronaden taj korisnik' });
  }

  existingUser.detalji = {
    ...existingUser.detalji,
    ...req.body.detalji,
  };

  fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
    if (err) {
        console.log("Failed to write updated data to file");
        return;
    }
    console.log("Updated file successfully");
    return res.status(200).json({message:"azuriran korisnik", existingUser});
  });
});


app.get('/usporediLikes', provjeriToken, (req, res)=>{
  const korisnik = req.korisnik.korisnik;
  const likedUsers = korisnik.liked;
  const medusobniLike = [];
  users.forEach(user => {
    if (likedUsers.includes(user.email) && user.liked.includes(korisnik.email)) {
      console.log(`medusobni like: ${user.mail}`);
      medusobniLike.push(user.email);
    }
  });

  return res.status(200).json({message:"medusobni like: ", medusobniLike});
});


app.get('/browse', provjeriToken, (req,res) =>{
  const likedUsers = req.korisnik.korisnik.liked;
  const blockedUsers = req.korisnik.korisnik.blokirani;
  const filteredUsers = users.filter(user => !likedUsers.includes(user.email) && !blockedUsers.includes(user.email) && user.email != req.korisnik.korisnik.email && !user.isAdmin);
  res.send(filteredUsers);
});


app.post('/report', provjeriToken, (req, res) => {
  try {
    if (!req.body.noviReport) {
      return res.status(404).json({message: "Poslan je prazan mail"});
    }

    if (prijave.includes(req.body.noviReport)) {
      return res.status(200).json({message:"korisnik je vec prijavljen"});
    }

    prijave.push(req.body.noviReport);

    fs.writeFile(ADMIN_FILE, JSON.stringify(prijave, null, 2), (err) => {
      if (err) {
          console.log("Failed to write updated data to file");
          return;
      }
      console.log("Updated file successfully");
      prijave = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf-8'));
      return res.status(200).json({message:"azurirani su prijavljeni korisnici"});
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Greska pri dodavanje u bloked"});
  }
})

app.patch('/block', provjeriToken, (req, res)=>{
  try{
    const korisnik = users.find(user => user.email.toLowerCase() === req.korisnik.korisnik.email);

    if (!korisnik) {
        return res.status(404).json({ error: 'Nije pronaden taj korisnik' });
    }

    if (korisnik.blokirani.includes(req.body.noviBlok)) {
      return res.status(200).json({message:"korisnik je vec blokiran"});
    }
    
    console.log(req.body.noviBlok);
    korisnik.blokirani.push(req.body.noviBlok);

    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) {
          console.log("Failed to write updated data to file");
          return;
      }
      console.log("Updated file successfully");
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      return res.status(200).json({message:"azurirani su blokirani korisnici", korisnik});
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Greska pri dodavanje u bloked"});
  }
})

app.patch('/browse/like', provjeriToken, (req,res)=>{
  try{
    const korisnik = users.find(user => user.email.toLowerCase() === req.korisnik.korisnik.email);

    if (!korisnik) {
        return res.status(404).json({ error: 'Nije pronaden taj korisnik' });
    }

    if (korisnik.liked.includes(req.body.newLike)) {
      return res.status(200).json({message:"korisnik je vec like-a"});
    }
    
    korisnik.liked.push(req.body.newLike);

    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) {
          console.log("Failed to write updated data to file");
          return;
      }
      console.log("Updated file successfully");
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      return res.status(200).json({message:"azuriran liked", korisnik});
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Greska pri dodavanje u liked"});
  }
});


app.post('/users', (req, res) => {
  const newUser = req.body;

  const requiredFields = ['email', 'ime', 'prezime', 'lozinka', 'smjer'];
  for (const field of requiredFields) {
      if (!newUser[field]) {
          return res.status(400).json({ error: `Field ${field} is required` });
      }
  }

  // detalje dodati naknadno
  //email mora biti jedinstven
  const existingUser = users.find(user => user.email === newUser.email);
  if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
  }

  // Add the user to the list
  const userToAdd = {
      ...newUser,
      liked: [],
      blokirani: [],
      isAdmin: false,
      putanjaZaSliku: []
  };
  users.push(userToAdd);

  // Save to file
  saveUsersToFile();

  res.status(201).json(userToAdd);
});




app.post('/upload-profile-picture', upload.array('profileImages', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
  }

  const { email } = req.body;
  const user = users.find(user => user.email === email);
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

  
  if (!Array.isArray(user.putanjaZaSliku)) {
      user.putanjaZaSliku = [];
  }

  const imageUrls = req.files.map(file => `http://localhost:5000/profilePictures/${file.filename}`);
  user.putanjaZaSliku.push(...imageUrls);
  saveUsersToFile();

  res.status(200).json({ putanjaZaSliku: user.putanjaZaSliku });
});

app.use('/profilePictures', express.static('profilePictures'));

//brisanje korisnika
app.delete('/users/:email', (req, res) => {
  const email = req.params.email.toLowerCase();

  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Korisnik nije pronađen' });
  }

  users.splice(userIndex, 1); // Ukloni korisnika iz liste
  saveUsersToFile(); // Spremi ažuriranu listu u datoteku

  const prijavljenIndex = prijave.findIndex(element => element === email);
  prijave.splice(prijavljenIndex, 1);
  saveReportsToFile();

  res.status(200).json({ message: `Korisnik s emailom ${email} uspješno uklonjen` });
});

app.delete('/odbaci/:email', (req, res) =>{
  const email = req.params.email.toLowerCase();
  const prijavljenIndex = prijave.findIndex(element => element === email);
  prijave.splice(prijavljenIndex, 1);
  saveReportsToFile();

  res.status(200).json({ message: `Korisnik s emailom ${email} uspješno uklonjen s liste prijava` });
})


app.get('/prijavljeni', (req, res) =>{
  try {
    return res.status(200).json({message: "uspjesno dohvaceni prijavljeni korisnici", prijave});
  } catch (error) {
    return res.status(500).json({message: "greska u dohvacanje prijavljenih"});
  }
})