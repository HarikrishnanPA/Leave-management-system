// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",  // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN BEING SENT:", token);
  console.log("HEADERS:", config.headers);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
