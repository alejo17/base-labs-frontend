import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(BACKEND+"get-user/", {
        withCredentials: true,
      })
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}