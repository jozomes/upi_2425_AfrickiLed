const express = require("express");
const cors = require("cors")

//potrebno za zapis korisnika
const fs = require("fs")
const path = require("path")

const app = express();
//MIDDLEWARE
app.use(cors());
app.use(express.json());


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
