import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8082/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000, // 10 second timeout
});

// Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network Error:", error.message);
      if (error.code === "ECONNABORTED") {
        error.message = "Request timeout. Please check your connection.";
      } else if (error.message === "Network Error") {
        error.message = "Cannot connect to server. Please ensure the backend is running on http://localhost:8082";
      }
    }
    // Handle 401 Unauthorized - clear token and redirect
    if (error.response?.status === 401) {
      localStorage.clear();
      // Only redirect if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
