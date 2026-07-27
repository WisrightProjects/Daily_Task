import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((currentCount) => currentCount + 1);
  };

  const decrement = () => {
    setCount((currentCount) => currentCount - 1);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return {
    count,
    increment,
    decrement,
    reset,
  };
}

export default useCounter;

import useCounter from "./useCounter";

function App() {
  const {
    count,
    increment,
    decrement,
    reset,
  } = useCounter(0);

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;