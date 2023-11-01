// useLogin.ts
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === "loggedin") {
        setUserData(data.user);
      } else {
        setError(
          data.message ||
            "Authentication failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An error occurred: " + err);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    userData,
    error,
  };
};
