import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const promise = fetch(
      `http://localhost:8000/users/${characters[index].id}`,
      {
        method: "DELETE",
      },
    );
    promise.then((res) => {
      if (res.status === 204) {
        const updated = characters.filter((characters, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
      else{
        console.error("Error deleting user:", res.statusText);
      }
    });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => (res.status === 201 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setCharacters([...characters, json]);
        }
      })
      .catch((error) => console.error("Error posting user:", error));
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
