
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// db
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE songs (id INTEGER PRIMARY KEY, name TEXT, status TEXT)");

  const stmt = db.prepare("INSERT INTO songs (name, status) VALUES (?, ?)");
  stmt.run("Humble", "hot");
  stmt.run("Money Trees", "fav");
  stmt.run("Count me out", "fav");
  stmt.run("Die hard", "hot");
  stmt.run("Rich spirit", "fav");
  stmt.run("N95", "fav");
  stmt.finalize();
});

app.get('/api/songs', (req, res) => {
  db.all("SELECT * FROM songs", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
