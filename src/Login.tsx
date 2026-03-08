
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        BACKEND+"login/",
        { username, password },
        { withCredentials: true }
      );

      navigate("/dashboard")
    } catch {
      alert("Invalid credentials")
    }
  };

  return (
    <form onSubmit={handleLogin}>
        <div style={{ marginTop: "100px", textAlign: "center" }}>
        <h2>Login</h2>
        <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type="submit">Login</button>
        </div>
    </form>
  );
}