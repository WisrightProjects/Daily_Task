import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function TaskManager() {
  // =========================
  // TASK STATE
  // =========================

  const [tasks, setTasks] = useState([]);

  // =========================
  // LOADING STATES
  // =========================

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // =========================
  // ERROR STATE
  // =========================

  const [error, setError] = useState("");

  // =========================
  // CREATE FORM STATE
  // =========================

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // =========================
  // EDIT STATE
  // =========================

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] =
    useState("");

  // =====================================================
  // READ - FETCH TASKS
  // =====================================================

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        // JSONPlaceholder uses "title" and "completed"
        // so we convert the data to our task format.
        const formattedTasks = data
          .slice(0, 10)
          .map((task) => ({
            id: task.id,
            title: task.title,
            description: "",
            completed: task.completed,
          }));

        setTasks(formattedTasks);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // =====================================================
  // CREATE - CREATE NEW TASK
  // =====================================================

  const handleCreate = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (title.trim().length < 3) {
      setError(
        "Task title must be at least 3 characters."
      );
      return;
    }

    try {
      setCreating(true);

      const newTask = {
        title: title.trim(),
        description: description.trim(),
        completed: false,
      };

      const createdTask = await createTask(newTask);

      // JSONPlaceholder returns the created object
      const formattedTask = {
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.description || "",
        completed: createdTask.completed || false,
      };

      setTasks((prevTasks) => [
        ...prevTasks,
        formattedTask,
      ]);

      // Clear form
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Failed to create task.");
    } finally {
      setCreating(false);
    }
  };

  // =====================================================
  // UPDATE - START EDITING
  // =====================================================

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setError("");
  };

  // =====================================================
  // UPDATE - CANCEL EDITING
  // =====================================================

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setError("");
  };

  // =====================================================
  // UPDATE - SAVE EDITED TASK
  // =====================================================

  const handleUpdate = async (id) => {
    setError("");

    // Validation
    if (!editTitle.trim()) {
      setError("Task title is required.");
      return;
    }

    if (editTitle.trim().length < 3) {
      setError(
        "Task title must be at least 3 characters."
      );
      return;
    }

    try {
      setUpdatingId(id);

      const updatedData = {
        title: editTitle.trim(),
        description: editDescription.trim(),
      };

      const updatedTask = await updateTask(
        id,
        updatedData
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updatedTask,
                id: task.id,
              }
            : task
        )
      );

      handleCancelEdit();
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // TOGGLE COMPLETION - OPTIMISTIC UPDATE
  // =====================================================

  const handleToggleComplete = async (task) => {
    const previousCompleted = task.completed;
    const newCompleted = !previousCompleted;

    // ---------------------------------------------
    // STEP 1: Optimistically update UI immediately
    // ---------------------------------------------

    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === task.id
          ? {
              ...item,
              completed: newCompleted,
            }
          : item
      )
    );

    try {
      setError("");

      // ---------------------------------------------
      // STEP 2: Update server
      // ---------------------------------------------

      await updateTask(task.id, {
        title: task.title,
        completed: newCompleted,
      });
    } catch (err) {
      console.error(err);

      // ---------------------------------------------
      // STEP 3: Rollback if API fails
      // ---------------------------------------------

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === task.id
            ? {
                ...item,
                completed: previousCompleted,
              }
            : item
        )
      );

      setError(
        "Failed to update task completion status."
      );
    }
  };

  // =====================================================
  // DELETE - DELETE TASK
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      // Delete from server
      await deleteTask(id);

      // Remove from local state
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Task Manager</h1>

      {/* ERROR MESSAGE */}

      {error && (
        <div
          style={{
            backgroundColor: "#ffe5e5",
            color: "#c00",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      {/* =================================================
          CREATE TASK FORM
          ================================================= */}

      <form
        onSubmit={handleCreate}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h2>Create New Task</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Task Title</strong>
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter task title"
            disabled={creating}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <strong>Description</strong>
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Enter task description"
            disabled={creating}
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={creating}
          style={{
            padding: "10px 20px",
            cursor: creating
              ? "not-allowed"
              : "pointer",
          }}
        >
          {creating ? "Creating..." : "Create Task"}
        </button>
      </form>

      {/* =================================================
          TASK LIST
          ================================================= */}

      <h2>Tasks</h2>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              {/* =================================================
                  EDIT MODE
                  ================================================= */}

              {editingId === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(e.target.value)
                    }
                    disabled={
                      updatingId === task.id
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      boxSizing: "border-box",
                    }}
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(
                        e.target.value
                      )
                    }
                    disabled={
                      updatingId === task.id
                    }
                    rows="3"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      boxSizing: "border-box",
                    }}
                  />

                  <div>
                    <button
                      onClick={() =>
                        handleUpdate(task.id)
                      }
                      disabled={
                        updatingId === task.id
                      }
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      {updatingId === task.id
                        ? "Saving..."
                        : "Save"}
                    </button>

                    <button
                      onClick={handleCancelEdit}
                      disabled={
                        updatingId === task.id
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* =================================================
                   NORMAL TASK VIEW
                   ================================================= */

                <div>
                  {/* COMPLETION CHECKBOX */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        handleToggleComplete(task)
                      }
                    />

                    <strong
                      style={{
                        textDecoration:
                          task.completed
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {task.title}
                    </strong>
                  </div>

                  {/* DESCRIPTION */}

                  {task.description && (
                    <p>{task.description}</p>
                  )}

                  {/* STATUS */}

                  <p>
                    Status:{" "}
                    <strong>
                      {task.completed
                        ? "Completed"
                        : "Pending"}
                    </strong>
                  </p>

                  {/* ACTION BUTTONS */}

                  <button
                    onClick={() =>
                      handleEdit(task)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(task.id)
                    }
                    disabled={
                      deletingId === task.id
                    }
                  >
                    {deletingId === task.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskManager;