const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Database setup (in-memory)
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

// API route for fetching songs
app.get('/api/songs', (req, res) => {
  db.all("SELECT * FROM songs", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Serve the frontend app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
