import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([
    
      {
        name: "Charlie",
        job: "Janitor"
      },
      {
        name: "Mac",
        job: "Bouncer"
      },
      {
        name: "Dee",
        job: "Aspring actress"
      },
      {
        name: "Dennis",
        job: "Bartender"
      }
  ]);


  function updateList(person) {
    postUser(person)
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.error("Error adding user:", error);
      });
}


  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    })
    .then(response => {
        if (response.status === 201) {
            return response.json(); 
        } else {
            throw new Error("Failed add user");
        }
    });
}


function removeOneCharacter(id) {
  fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
  })
  .then(response => {
      if (response.status === 204) {
          setCharacters(characters.filter(character => character.id !== id));
      } else {
          throw new Error("Failed delete user");
      }
  })
  .catch(error => console.error("Error deleting user:", error));
}




  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
}
export default MyApp;