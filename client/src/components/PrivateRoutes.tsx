import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";

const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/protected`, {
          withCredentials: true,
        });

        // console.log(response.data);
        // console.log("Status", response.status);
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  // console.log(isAuthenticated);
  return (
    // <Route
    //   {...rest}
    //   element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    // />

    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
