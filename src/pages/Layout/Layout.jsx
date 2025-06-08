import { Outlet, useLocation } from "react-router";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/apiUrl";

export default function Layout() {
  const location = useLocation();

  const hideLayoutPaths = ["/login", "/register"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

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
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ScrollToTop />
      {!shouldHideLayout && <Navbar />}
      <Outlet></Outlet>
      {!shouldHideLayout && <Footer />}
    </Box>
  );
}
