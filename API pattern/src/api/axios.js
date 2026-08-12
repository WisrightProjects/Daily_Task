import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.error("Unauthorized. Please login again.");
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;

        case 403:
          console.error("Access denied.");
          break;

        case 404:
          console.error("Resource not found.");
          break;

        case 500:
          console.error("Server error. Please try again later.");
          break;

        default:
          console.error(`API Error: ${status}`);
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;