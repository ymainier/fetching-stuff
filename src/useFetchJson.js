import { useState, useReducer, useEffect } from "react";

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

export function useFetchJson() {
  const [url, setUrl] = useState("");

  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatch({ type: "INIT" });
    if (!url) return;
    const controller = new AbortController();
    const request = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await fetch(url, {signal: controller.signal});
        const data = await response.json();
        dispatch({ type: "SUCCESS", data });
      } catch (e) {
        if (e.name === 'AbortError') return;
        dispatch({ type: "ERROR" });
      }
    };
    request();

    return function cleanup() {
      controller.abort();
    }
  }, [url]);
  return [setUrl, state.data, state.isLoading, state.isError];
}
