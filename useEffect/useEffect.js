import { useEffect, useState } from "react";

function App() {
  // 1. Persistent Counter using localStorage
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? Number(savedCount) : 0;
  });

  // 2. User input for document title
  const [name, setName] = useState("");

  // 3. Stopwatch
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 4. Countdown timer
  const [countdown, setCountdown] = useState(10);
  const [countdownRunning, setCountdownRunning] = useState(false);

  // 5. Window dimensions
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 6. API posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Component mounted
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  // Update document title
  useEffect(() => {
    document.title = name || `Count: ${count}`;
  }, [name, count]);

  // Save counter to localStorage
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  // Stopwatch interval
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  // Countdown timer
  useEffect(() => {
    if (!countdownRunning || countdown <= 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countdownRunning, countdown]);

  // Alert when countdown reaches zero
  useEffect(() => {
    if (countdown === 0) {
      alert("Countdown finished!");
      setCountdownRunning(false);
    }
  }, [countdown]);

  // Escape key event listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        console.log("Escape key pressed");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Window resize event listener
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch posts from JSONPlaceholder API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React useEffect Practice</h1>

      {/* Document Title Based on User Input */}
      <section>
        <h2>Document Title Updater</h2>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
      </section>

      <hr />

      {/* Persistent Counter */}
      <section>
        <h2>Persistent Counter: {count}</h2>

        <button onClick={() => setCount((prev) => prev + 1)}>
          Increment
        </button>

        <button onClick={() => setCount((prev) => prev - 1)}>
          Decrement
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </section>

      <hr />

      {/* Stopwatch */}
      <section>
        <h2>Stopwatch: {seconds} seconds</h2>

        <button onClick={() => setIsRunning(true)}>
          Start
        </button>

        <button onClick={() => setIsRunning(false)}>
          Stop
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </section>

      <hr />

      {/* Countdown Timer */}
      <section>
        <h2>Countdown: {countdown} seconds</h2>

        <button onClick={() => setCountdownRunning(true)}>
          Start
        </button>

        <button onClick={() => setCountdownRunning(false)}>
          Pause
        </button>

        <button
          onClick={() => {
            setCountdown(10);
            setCountdownRunning(true);
          }}
        >
          Reset
        </button>
      </section>

      <hr />

      {/* Window Dimensions */}
      <section>
        <h2>Window Dimensions</h2>

        <p>Width: {dimensions.width}px</p>
        <p>Height: {dimensions.height}px</p>
      </section>

      <hr />

      {/* Keyboard Event */}
      <section>
        <h2>Keyboard Event</h2>
        <p>Press the Escape key and check the browser console.</p>
      </section>

      <hr />

      {/* Posts API */}
      <section>
        <h2>Posts from API</h2>

        {loading && <p>Loading posts...</p>}

        {error && <p>Error: {error}</p>}

        {!loading &&
          !error &&
          posts.slice(0, 5).map((post) => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
      </section>
    </div>
  );
}

export default App;