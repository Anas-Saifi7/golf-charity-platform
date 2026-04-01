import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 🔥 TOKEN ATTACH
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token); // DEBUG

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;