// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logoImg from "../../assets/logo3.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", to: "/home" },
    { label: "Menu", to: "/menu-items" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <>
      <AppBar
        position={
          !scrolled &&
          (location.pathname === "/home" || location.pathname === "/")
            ? "absolute"
            : "sticky"
        }
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor:
            !scrolled &&
            (location.pathname === "/home" || location.pathname === "/")
              ? "transparent"
              : "var(--light-bg)",
          transition: "all 0.3s ease",
          backdropFilter: "blur(8px)",
          boxShadow:
            !scrolled &&
            (location.pathname === "/home" || location.pathname === "/")
              ? "none"
              : "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 10,
          overflowX: "hidden",
        }}>
        <Toolbar
          sx={{
            maxWidth: "1450px",
            width: "100%",
            marginX: "auto",
            justifyContent: "space-between",
            display: "flex",
            padding: "0",
          }}>
          {/* Left: Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}>
            <Box
              component="img"
              src={logoImg}
              alt="Logo"
              sx={{ height: 35, width: "auto", mb: 1.5 }}
            />
          </Box>

          {/* Center: Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map(({ label, to }) => (
                <Typography
                  key={to}
                  component={RouterLink}
                  to={to}
                  sx={{
                    fontWeight: 600,
                    textDecoration: "none",
                    color:
                      location.pathname === to
                        ? "var(--primary)"
                        : "var(--tertiary)",
                    "&:hover, &:active": {
                      color: "var(--primary)",
                    },
                  }}>
                  {label}
                </Typography>
              ))}
            </Box>
          )}

          {/* Right: Search + Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid",
                  borderColor: "var(--tertiary)",
                  backgroundColor: "grey.100",
                  borderRadius: 2,
                  px: 1,
                  py: 0.5,
                  mx: 2,
                }}
                component="form"
                onSubmit={handleSubmit}>
                <SearchIcon
                  fontSize="small"
                  sx={{ color: "var(--tertiary)" }}
                />
                <InputBase
                  placeholder="Search…"
                  sx={{ ml: 1, color: "var(--tertiary)" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
            )}

            <Box sx={{ mr: isMobile ? 0 : 5 }}>
              <IconButton
                component={RouterLink}
                to={"/profile"}
                sx={{
                  color:
                    location.pathname === "/profile"
                      ? "var(--primary)"
                      : "var(--tertiary)",
                  "&:hover, &:active": {
                    color: "var(--primary)",
                  },
                }}>
                <AccountCircleIcon />
              </IconButton>
              <IconButton
                component={RouterLink}
                to={"/favorites"}
                sx={{
                  color:
                    location.pathname === "/favorites"
                      ? "var(--primary)"
                      : "var(--tertiary)",
                  "&:hover, &:active": {
                    color: "var(--primary)",
                  },
                }}>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton
                component={RouterLink}
                to={"/cart"}
                sx={{
                  color:
                    location.pathname === "/cart"
                      ? "var(--primary)"
                      : "var(--tertiary)",
                  "&:hover, &:active": {
                    color: "var(--primary)",
                  },
                }}>
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>

          {isMobile && (
            <IconButton
              sx={{
                mr: 4,
                color: "var(--tertiary)",
                "&:hover, &:active": {
                  color: "var(--primary)",
                },
              }}
              onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "var(--light-bg)",
          },
        }}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid",
              borderColor: "var(--tertiary)",
              backgroundColor: "grey.100",
              borderRadius: 2,
              px: 1,
              py: 0.5,
              mx: 2,
              mb: 1,
            }}
            component="form"
            onSubmit={handleSubmit}>
            <SearchIcon fontSize="small" sx={{ color: "var(--tertiary)" }} />
            <InputBase
              placeholder="Search…"
              sx={{ ml: 1, color: "var(--tertiary)" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <List>
            {navLinks.map(({ label, to }) => (
              <ListItem
                button
                key={to}
                component={RouterLink}
                to={to}
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color:
                    location.pathname === to
                      ? "var(--primary)"
                      : "var(--tertiary)",
                  "&:hover, &:active": {
                    color: "var(--primary)",
                  },
                }}
                onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
