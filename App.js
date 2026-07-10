import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [search, setSearch] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [likes, setLikes] = useState(0);

  const users = [
    "Surya",
    "Rahul",
    "Kumar",
    "Arun",
    "Priya",
    "Deepa",
    "Vijay"
  ];

  const addTodo = () => {
    if (task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={darkMode ? "dark app" : "app"}>

      <h1>Interactive Dashboard</h1>

      {/* Counter */}

      <div className="card">
        <h2>Counter</h2>
        <h3>{count}</h3>

        <button onClick={() => setCount(count + 1)}>+</button>

        <button onClick={() => setCount(count - 1)}>-</button>

        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* Theme */}

      <div className="card">
        <h2>Theme Toggle</h2>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Profile */}

      <div className="card">

        <h2>User Profile</h2>

        <button onClick={() => setShowProfile(!showProfile)}>
          {showProfile ? "Hide" : "Show"}
        </button>

        {showProfile && (
          <div className="profile">
            <h3>Surya Dinesh</h3>
            <p>Frontend Developer</p>
          </div>
        )}

      </div>

      {/* Search */}

      <div className="card">

        <h2>Search Users</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>

      </div>

      {/* Todo */}

      <div className="card">

        <h2>Todo List</h2>

        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>

      </div>

      {/* Like */}

      <div className="card">

        <h2>Like Button</h2>

        <h3>{likes} Likes</h3>

        <button onClick={() => setLikes(likes + 1)}>
          👍 Like
        </button>

      </div>

      {/* Dashboard Stats */}

      <div className="card">

        <h2>Dashboard Statistics</h2>

        <p>Total Todos : {todos.length}</p>

        <p>Total Likes : {likes}</p>

        <p>Counter Value : {count}</p>

        <p>Users Found : {filteredUsers.length}</p>

      </div>

    </div>
  );
}

export default App;