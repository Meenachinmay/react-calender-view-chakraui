import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import ContextWrapper from "./context/ContextWraper.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth-pages-components/Login.tsx";
import Zoom from "./components/zoom/Zoom.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/zoom",
    element: <Zoom />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextWrapper>
        <RouterProvider router={router} />
      </ContextWrapper>
    </ChakraProvider>
  </React.StrictMode>
);
