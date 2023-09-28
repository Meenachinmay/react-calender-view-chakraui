import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import ContextWrapper from "./context/ContextWraper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </ChakraProvider>
  </React.StrictMode>
);
