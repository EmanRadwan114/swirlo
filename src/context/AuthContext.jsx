import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register, getCurrentUser } from "../services/authApi";

const AuthContext = createContext();

export default function  AuthProvider  ({ children }) {
  const queryClient = useQueryClient();

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
    mutationFn: ({ email, password, role }) => login({ email, password, role }),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password, role }) =>
      register({ name, email, password, role }),
    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(["auth", "user"], data.user);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(["auth", "user"]);
    },
  });

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isLoading,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isLoading,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isLoading,
    error: loginMutation.error || registerMutation.error,
    role: user?.role, // Add role to context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
