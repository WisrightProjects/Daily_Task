import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;

import useWindowSize from "./useWindowSize";

function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h2>Window Dimensions</h2>

      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}

export default App;