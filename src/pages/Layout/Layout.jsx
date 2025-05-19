import { Outlet, useLocation } from "react-router";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
  const location = useLocation();

  const hideLayoutPaths = ["/login", "/register"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Outlet></Outlet>
      {!shouldHideLayout && <Footer />}
    </>
  );
}
