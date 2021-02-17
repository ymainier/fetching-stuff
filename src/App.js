import "./App.css";
import { createContext, useContext, useRef, useState } from "react";
import { useFetchJson } from "./useFetchJson";

const API = "https://pokeapi.co/api/v2";

const ThemeContext = createContext();
const UserContext = createContext();

function PokemonForm() {
  const inputRef = useRef(null);
  const [setUrl, data, isLoading, isError] = useFetchJson();
  const { isLight } = useContext(ThemeContext);
  const { name, login, logout } = useContext(UserContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const name = inputRef.current.value;
        setUrl(`${API}/pokemon/${name}`);
      }}
      style={{
        backgroundColor: isLight() ? "pink" : "red",
      }}
    >
      <input type="text" ref={inputRef} />
      <input type="submit" value="search" />
      {isError && <div>Something went wrong :(</div>}
      {isLoading && <div>Loading...</div>}
      {data && data.sprites && (
        <img src={data.sprites["front_default"]} alt={data.name} />
      )}

      <hr />
      {name ? <p>Hi I'm {name}</p> : <p>not looged in</p>}
      {name ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
    </form>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(true);

  return (
    <div>
      <UserContext.Provider value={{
        name: user,
        login: () => setUser('Yann'),
        logout: () => setUser(null),
      }}>
        <ThemeContext.Provider
          value={{
            isLight: () => theme === "light",
          }}
        >
          {show ? <PokemonForm /> : <p>Nothing to see here</p>}
        </ThemeContext.Provider>
      </UserContext.Provider>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"}
      </button>
      <button
        onClick={() =>
          setTheme((theme) => (theme === "light" ? "dark" : "light"))
        }
      >
        {theme === "light" ? "Set to dark" : "Set to light"}
      </button>
    </div>
  );
}

export default App;
