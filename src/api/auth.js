// src/api/auth.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000" // change to your backend
});

export const signUp = (data) => API.post("/signup", data);
export const verify = (data) => API.post("/verify", data);
export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const logout = () => API.post("/user/logout");
export const forgotPassword = (data) => API.post("/user/forget-pass", data);
export const resetPassword = (token, data) =>
  API.post(`/user/reset-password-link/${token}`, data);