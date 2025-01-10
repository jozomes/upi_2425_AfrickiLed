const express = require("express");
const cors = require("cors")

//potrebno za zapis korisnika
const fs = require("fs")
const path = require("path")

const multer = require("multer")

const app = express();
//MIDDLEWARE
app.use(cors());
app.use(express.json());

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

  if(!email || !lozinka){
    return res.status(400).json({error:'Sva polja moraju biti popunjena!'});
  }
  const korisnik=users.find(user => user.email===email && user.lozinka ===lozinka);

  if(!korisnik){
    return res.status(401).json({error: "Neispravni podatci"});
  }
  res.status(200).json({message:"Uspješna prijava!", korisnik});
});

app.patch('/update/:mail', (req,res) =>{
  const potentialMail = req.params.mail;

  const existingUser = users.find(user => user.email.toLowerCase() === potentialMail);

  if (!existingUser) {
      return res.status(404).json({ error: 'Nije pronaden taj korisnik' });
  }

  existingUser.detalji = req.body.detalji;

  fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
    if (err) {
        console.log("Failed to write updated data to file");
        return;
    }
    console.log("Updated file successfully");
    return res.status(200).json({message:"azuriran korisnik", existingUser});
  });
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
      liked: [] 
  };
  users.push(userToAdd);

  // Save to file
  saveUsersToFile();

  res.status(201).json(userToAdd);
});

app.post('/upload-profile-picture', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    console.log('Nema slike za upload');
    return res.status(400).json({ message: 'Slika nije poslata' });
  }

  // Generiraj URL za pristup slici
  const imageUrl = `http://localhost:5000/profilePictures/${req.file.filename}`;
  console.log('Slika uspješno spremljena:', req.file.filename);

  // Pošaljite URL slike kao odgovor
  res.status(200).json({
    message: 'Slika uspješno spremljena',
    imageUrl: imageUrl
  });
});

app.use('/profilePictures', express.static('profilePictures'));
