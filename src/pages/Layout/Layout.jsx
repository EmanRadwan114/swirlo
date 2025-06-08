import { Outlet, useLocation } from "react-router";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { Box } from "@mui/material";

export default function Layout() {
  const location = useLocation();

  const hideLayoutPaths = ["/login", "/register"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

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
