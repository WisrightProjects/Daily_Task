import { useEffect, useRef } from "react";

function usePrevious(value) {
  const previousValue = useRef();

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
}

export default usePrevious;

import { useState } from "react";
import usePrevious from "./usePrevious";

function App() {
  const [count, setCount] = useState(0);

  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;