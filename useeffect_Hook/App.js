import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // States
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // -----------------------------
  // 1. Fetch API Data
  // -----------------------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // -----------------------------
  // 2. Update Document Title
  // -----------------------------
  useEffect(() => {
    document.title = `Count : ${count}`;
  }, [count]);

  // -----------------------------
  // 3. Window Resize Listener
  // -----------------------------
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // -----------------------------
  // 4. setInterval with Cleanup
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Timer Running...");
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <h1>React useEffect Demo</h1>

      {/* Counter */}
      <div className="card">
        <h2>Counter Example</h2>
        <h1>{count}</h1>

        <button onClick={() => setCount(count + 1)}>Increment</button>

        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>

      {/* Window Width */}
      <div className="card">
        <h2>Window Width</h2>
        <h3>{windowWidth}px</h3>
      </div>

      {/* API Fetch */}
      <div className="card">
        <h2>Users List</h2>

        {loading && <p>Loading Users...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <b>{user.name}</b>
                <br />
                {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;