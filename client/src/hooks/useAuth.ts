import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "@/config/config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  checkAuthStatus: () => void;
  isAuthenticated: boolean;
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(() => {
    const token = Cookies.get("token"); // Get the token from cookies
    // console.log("Token: ", token);
    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token ?? "");
        setUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // console.log(email, password);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 && response.data) {
        // console.log(response.data.message);
        // console.log(response.status);
        navigate("/dashboard");
        checkAuthStatus();
      }
    } catch (error) {
      // console.log("Login Failed");
      if (error instanceof Error) {
        throw new Error(error.message || "Login failed");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || "Login failed");
      } else {
        throw new Error("Login failed");
      }
    }
  };

  const logout = async () => {
    // console.log("logging out");
    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      // console.log("Logout Failed");
      console.error(error);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      // console.log(username, email, password);

      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 201 && response.data) {
        // console.log(response.data.message);
        // console.log(response.status);
        navigate("/login");
      }
    } catch (error) {
      // console.log("Registration Failed");
      if (error instanceof Error) {
        throw new Error(error.message || "Registration failed");
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || "Registration failed");
      } else {
        throw new Error("Registration failed");
      }
    }
  };

  return {
    user,
    login,
    logout,
    register,
    checkAuthStatus,
    isAuthenticated: !!user,
  };
};

export default useAuth;
