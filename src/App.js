import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button';

const user = {
  name: "Kendrick Lamar",
  birthDate: "17.06.1987",
  imageUrl: "https://i.pinimg.com/564x/82/63/32/826332a5fbe6f0cb0a824a5d03efb8a1.jpg",
  imageSize: 250,
  theme: {
    backgroundColor: "white",
  },
};

export default function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const list = songs.map((song) => <li key={song.id}>{song.name}</li>);

  console.log("rerender App");
  console.log(list);

  return (
    <div style={user.theme}>
      <h1 className="username">{user.name} test</h1>
      <img
        alt={user.name}
        src={user.imageUrl}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
      <h3>Birth Date : {user.birthDate}</h3>
      <h4>Songs:</h4>
      <ul>{list}</ul>
      <pre>How many songs out of list have you listened?</pre>
      <Button />
    </div>
  );
}
