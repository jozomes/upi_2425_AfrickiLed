const express = require("express");
const cors = require("cors")
 
const app = express();
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Pozdrav od Express poslužitelja!");
  });

const PORT = 3000;
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!, radi li zna li se' });
});
app.listen(PORT, () => {
  console.log(`Server sluša zahtjeve na portu ${PORT}`);
});

