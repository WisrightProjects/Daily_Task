import api from "./api";

// READ - Get all tasks
export const getTasks = async () => {
  const response = await api.get("/todos");
  return response.data;
};

// READ - Get single task
export const getTaskById = async (id) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

// CREATE - Create task
export const createTask = async (taskData) => {
  const response = await api.post("/todos", taskData);
  return response.data;
};

// UPDATE - Update task
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/todos/${id}`, taskData);
  return response.data;
};

// DELETE - Delete task
export const deleteTask = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};