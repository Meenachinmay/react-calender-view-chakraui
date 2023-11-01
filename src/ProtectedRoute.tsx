import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./context/GlobalContext"; // Path to your GlobalContext file

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
}: {
  element: React.ReactNode;
}) => {
  const { authState } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated, navigate to the login page
    // if (!authState) {
    //   navigate("/login");
    // }

  }, [authState]);

  // If the user is authenticated, render the passed in element (i.e., the protected route component)
  return <>{element}</>;
};

export default ProtectedRoute;
