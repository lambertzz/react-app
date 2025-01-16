// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
    
  ]);


  const updateList = (person) => {
    setCharacters([...characters, person]); // Add the new person to the list
  };

  return (
    <div>
      <h1>Character List</h1>
      <Form handleSubmit={updateList} />
      <ul>
        {characters.map((character, index) => (
          <li key={index}>{character}</li>
        ))}
      </ul>
    </div>
  );
}

function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }


function MyApp() {
  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form />
    </div>
  );
}
export default MyApp;