import { useEffect } from "react";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import api from "./utils/apiUrl";

function App() {
  const { logout } = useAuth();

  useEffect(() => {
    // Set up the interceptor
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await logout();
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout]);
  return <></>;
}

export default App;
