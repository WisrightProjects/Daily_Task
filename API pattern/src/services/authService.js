import api from "../api/axios";

const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);

    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("authToken");
  },
};

export default authService;