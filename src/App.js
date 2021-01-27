import "./App.css";
import { useState, useEffect } from "react";

const API = "https://pokeapi.co/api/v2";

function usePokeApi() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!url) return;
    const request = async () => {
  
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    request();
  }, [url]);
  return [setUrl, data]
}

function App() {
  const [name, setName] = useState("");
  const [setUrl, data] = usePokeApi();

  return (
    <form onSubmit={e => {
      e.preventDefault();
      setUrl(`${API}/pokemon/${name}`);
    }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" value="search" />
      <div>We are searching for {name}</div>
      <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
    </form>
  );
}

export default App;
