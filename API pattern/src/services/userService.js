import api from "../api/axios";

const userService = {
  // Get all users
  getAll: () => {
    return api.get("/users");
  },

  // Get user by ID
  getById: (id) => {
    return api.get(`/users/${id}`);
  },

  // Create user
  create: (userData) => {
    return api.post("/users", userData);
  },

  // Update user
  update: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  // Delete user
  delete: (id) => {
    return api.delete(`/users/${id}`);
  },
};

export default userService;