import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspiring Actress" },
    { name: "Dennis", job: "Bartender" },
  ]);

  function removeOneCharacter(index) {
    const updated = characters.filter((characters, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  );
}
export default MyApp;
