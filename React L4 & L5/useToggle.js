import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((previousValue) => !previousValue);
  };

  return [value, toggle];
}

export default useToggle;

import useToggle from "./useToggle";

function App() {
  const [isVisible, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isVisible ? "Hide" : "Show"}
      </button>

      {isVisible && <p>Content is visible</p>}
    </div>
  );
}

export default App;