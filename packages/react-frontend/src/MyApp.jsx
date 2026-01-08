import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
  ]);
  function updateList(person){
    setCharacters([...characters, person]);
  }
  function removeOneCharacter(index) {
    const updated = characters.filter((characters, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit = {updateList} />
    </div>
  );
}
export default MyApp;
