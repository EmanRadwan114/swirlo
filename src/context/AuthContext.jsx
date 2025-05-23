import { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register, getCurrentUser } from "../services/authApi";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // State user to store login info (local state)
  const [userState, setUserState] = useState(()=>{const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const queryClient = useQueryClient();

  // useQuery fetches current user data
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      const userData = {
        name:data.user.name,
        email:data.user.email,
        role:data.user.role,
      }
      localStorage.setItem("user",JSON.stringify(userData))
      console.log("Login successful, role:", userData);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password, role }) =>
      register({ name, email, password, role }),
    onSuccess: (data) => {
      if (data.user) {
        console.log("sign up successfully go to login page");
        // queryClient.setQueryData(["auth", "user"], data.user);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(["auth", "user"]);
      localStorage.removeItem("user")
      setUserState(null);
      navigate("/");
    },
  });

  const handleLoginSuccess = (decoded, token, navigate) => {
    setUserState({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      token,
    });
    navigate("/");
  };

  const handleLogout = (navigate) => {
   
  };

  const handelLoginError = () => {
    console.log("error in login with google api ");
  };

  const value = {
    user: userState || user, 
    isLoading,
    isAuthenticated: !!user && !isError,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isLoading,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isLoading,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isLoading,
    error: loginMutation.error || registerMutation.error,
    role: (userState || user)?.role,
    handleLoginSuccess,
    handleLogout,
    handelLoginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
