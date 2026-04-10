import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { login, register } from "./api/auth";

/* ===== GLOBAL FUNCTIONS ===== */

// Tab switching
function switchTab(name, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));

  el.classList.add('active');
  document.getElementById('panel-' + name)?.classList.add('active');
}

function switchTabByName(name) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => t.classList.remove('active'));

  if (name === 'register') tabs[1]?.classList.add('active');
  else tabs[0]?.classList.add('active');

  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + name)?.classList.add('active');

  return false;
}

// ✅ LOGIN (FIXED)
function handleLogin() {
  const email = document.getElementById("login-email")?.value;
  const password = document.getElementById("login-password")?.value;

  if (!email || !password) {
    console.error("Login inputs missing");
    return;
  }

  const btn = document.querySelector('#panel-login .btn-submit');
  if (!btn) return;

  btn.textContent = 'Signing you in…';

  login({ email, password })
    .then(() => {
      btn.textContent = '✓ Welcome back 💚';
    })
    .catch(() => {
      btn.textContent = 'Login failed ❌';
    });
}

// ✅ REGISTER (FIXED)
function handleRegister() {
  const firstName = document.getElementById("reg-firstname")?.value;
  const lastName = document.getElementById("reg-lastname")?.value;
  const email = document.getElementById("reg-email")?.value;
  const password = document.getElementById("reg-password")?.value;

  const data = {
    name: `${firstName}${lastName}`, // 👈 THIS LINE HERE
    email,
    password: "Password@123"
  };

  const btn = document.querySelector('#panel-register .btn-submit');
  if (!btn) return;

  btn.textContent = 'Creating your safe space…';

  register(data)
    .then(() => {
      btn.textContent = '✓ Account created 🌸';
    })
    .catch(() => {
      btn.textContent = 'Registration failed ❌';
    });
}

/* ===== ATTACH TO WINDOW ===== */
window.switchTab = switchTab;
window.switchTabByName = switchTabByName;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;

/* ===== RENDER APP ===== */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);