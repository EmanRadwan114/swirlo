import { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, PostUserByGoogle } from "../services/authApi";
import { toast } from "react-toastify";
import userServices from "../services/userApi";
import api from "../utils/apiUrl";

let hasLoggedOut = false;

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userState, setUserState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      hasLoggedOut = false; // ✅ Reset logout flag on successful login

      queryClient.setQueryData(["auth", "user"], data.user);
      const userData = {
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUserState(userData);
      console.log("Login successful, role:", userData);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password, role }) =>
      register({ name, email, password, role }),
    onSuccess: (data) => {
      if (data.user) {
        console.log("Sign up successful, go to login page");
        // You might redirect to login here
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: userServices.logout,
    onSuccess: () => {
      queryClient.removeQueries(["auth", "user"]);
      localStorage.removeItem("user");
      setUserState(null);
    },
  });

  const handleLoginSuccess = async (decoded, token, navigate) => {
    try {
      const userData = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        token,
        iss: decoded.iss,
      };
      setUserState(userData);
      await PostUserByGoogle({ token });
      hasLoggedOut = false;
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
      toast.success("Logged In Successfully!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handelLoginError = () => {
    console.log("Error in login with Google API");
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.status === 401 && !hasLoggedOut) {
          hasLoggedOut = true;
          queryClient.removeQueries(["auth", "user"]);
          localStorage.removeItem("user");
          setUserState(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = {
    user: userState,
    isAuthenticated: !!userState,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isLoading,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isLoading,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isLoading,
    error: loginMutation.error || registerMutation.error,
    role: userState?.role,
    handleLoginSuccess,
    handelLoginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
