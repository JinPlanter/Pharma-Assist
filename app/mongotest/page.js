// pages/auth.js
"use client";
import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [action, setAction] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role, action }),
      });

      if (!response.ok) {
        throw new Error("HTTP Status " + response.status);
      }
      else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>
      </label>
      <label>
        Action:
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          required
        >
          <option value="login">Login</option>
          <option value="register">Register</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
