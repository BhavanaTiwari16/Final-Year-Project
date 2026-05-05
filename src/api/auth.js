// src/api/auth.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const signUp = (data) => API.post("/signup", data);
export const verify = (data) => API.post("/verify", data);
export const register = (data, config) => API.post("/register", data, config);
export const login = (data) => API.post("/login", data);

// ✅ FIXED
export const logout = () => API.post("/logout");

export const forgotPassword = (data) =>
  API.post("/forget-password", data);

export const resetPassword = (token, data) =>
  API.post(`/reset-password-link/${token}`, data);