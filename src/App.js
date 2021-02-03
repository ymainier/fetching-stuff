import "./App.css";
import { useState, useEffect, useReducer } from "react";

const API = "https://pokeapi.co/api/v2";

function fetchReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, data: null, isError: false };
    case "LOADING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return { ...state, data: action.data, isLoading: false };
    case "ERROR":
      return { ...state, isError: true, isLoading: false };
    default:
      return state;
  }
}

function usePokeApi() {
  const [url, setUrl] = useState("");

  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatch({ type: "INIT" });
    if (!url) return;
    const request = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: "SUCCESS", data });
      } catch (e) {
        dispatch({ type: "ERROR" });
      }
    };
    request();
  }, [url]);
  return [setUrl, state.data, state.isLoading, state.isError];
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
      {data && data.sprites && (
        <img src={data.sprites["front_default"]} alt={data.name} />
      )}
    </form>
  );
}

export default App;
