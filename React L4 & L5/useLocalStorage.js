import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue !== null
      ? JSON.parse(storedValue)
      : initialValue;
  });

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}

export default useLocalStorage;

import useLocalStorage from "./useLocalStorage";

function App() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
      />

      <p>Hello, {name}</p>
    </div>
  );
}

export default App;