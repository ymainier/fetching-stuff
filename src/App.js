import "./App.css";
import { useState } from "react";
import { useFetchJson } from "./useFetchJson";

const API = "https://pokeapi.co/api/v2";

function PokemonForm() {
  const [name, setName] = useState("");
  const [setUrl, data, isLoading, isError] = useFetchJson();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUrl(`${API}/pokemon/${name}`);
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" value="search" />
      <div>We are searching for {name}</div>
      {isError && <div>Something went wrong :(</div>}
      {isLoading && <div>Loading...</div>}
      {data && data.sprites && (
        <img src={data.sprites["front_default"]} alt={data.name} />
      )}
    </form>
  );
}

function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      {show ? <PokemonForm /> : <p>Nothing to see here</p>}
      <button onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'}</button>
    </div>
  );
}

export default App;
