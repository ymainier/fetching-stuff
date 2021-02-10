import "./App.css";
import { useState, useRef } from "react";
import { useFetchJson } from "./useFetchJson";

const API = "https://pokeapi.co/api/v2";

function PokemonForm() {
  const inputRef = useRef(null);
  const [setUrl, data, isLoading, isError] = useFetchJson();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const name = inputRef.current.value;
        setUrl(`${API}/pokemon/${name}`);
      }}
    >
      <input
        type="text"
        ref={inputRef}
      />
      <input type="submit" value="search" />
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
