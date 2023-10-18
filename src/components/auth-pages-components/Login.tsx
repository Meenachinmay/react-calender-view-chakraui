// Login.tsx
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("chinmayanand896@icloud.com");
  const [password, setPassword] = useState("chinmay");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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

      if (response.ok) {
        const data = await response.text();
        console.log(data);

        if (data === "loggedin") {
          // Handle successful authentication
          window.location.href = "/zoom"; // Replace with your desired navigation route
        } else {
          alert("Authentication failed. Please check your credentials.");
        }
      } else {
        const errorData = await response.json();
        // Displaying the server error message (if any)
        alert(errorData.message || "Server error occurred.");
      }
    } catch (error) {
      alert("An error occurred: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        width={"full"}
        gap={"10px"}
        flexDir={"column"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            padding: "10px",
            backgroundColor: "lightgray",
            width: "300px",
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            padding: "10px",
            backgroundColor: "lightgray",
            width: "300px",
          }}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: "lightblue",
            width: "100px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </Flex>
    </>
  );
}

export default Login;
