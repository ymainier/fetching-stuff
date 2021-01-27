import "./App.css";
import { useState, useEffect } from "react";

const API = "https://pokeapi.co/api/v2";

function usePokeApi() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    setData(null);
    setIsError(false);
    if (!url) return;
    const request = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch(e) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    request();
  }, [url]);
  return [setUrl, data, isLoading, isError];
}

function App() {
  const [name, setName] = useState("");
  const [setUrl, data, isLoading, isError] = usePokeApi();

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
      {data && data.sprites && <img src={data.sprites["front_default"]} alt={data.name} />}
    </form>
  );
}

export default App;
