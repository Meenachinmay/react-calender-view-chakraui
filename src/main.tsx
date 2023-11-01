import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import ContextWrapper from "./context/ContextWraper.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth-pages-components/Login.tsx";
import Zoom from "./components/zoom/Zoom.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/zoom",
    element: <ProtectedRoute element={<Zoom />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextWrapper>
        <Navbar />
        <RouterProvider router={router} />
      </ContextWrapper>
    </ChakraProvider>
  </React.StrictMode>
);
