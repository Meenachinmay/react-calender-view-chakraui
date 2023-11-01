// Login.tsx
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("chinmayanand896@icloud.com");
  const [password, setPassword] = useState("chinmay");

  const { login, loading, userData, error } = useLogin();

  const navigate = useNavigate();

  const handleLogin = async () => {
    login(email, password);
  };

  useEffect(() => {
    if (userData) {
      navigate("/zoom");
    }
    if (error) {
      alert(error);
    }
  }, [userData, error]);

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
            width: "auto",
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
