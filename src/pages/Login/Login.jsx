import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";

export default function Login() {
  // Validation Schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  });
  // Submit
  const onSubmit = () => {
    console.log("submitted");
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // full height
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "var(--primary)" }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--primary)", // normal state
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)", // hover state
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary)", // focus state
                  borderWidth: "2px",
                },
              },
              input: {
                color: "var(--text)", // text color
              },
              label: {
                color: "var(--primary)", // label color
              },
            }}
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--primary)", // normal state
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)", // hover state
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary)", // focus state
                  borderWidth: "2px",
                },
              },
              input: {
                color: "var(--text)", // text color
              },
              label: {
                color: "var(--primary)", // label color
              },
            }}
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
          />
          <Typography variant="subtitle1">
            Don't Have Account? {""}
            <Typography
              component={Link}
              to="/register"
              sx={{ color: "var(--primary)", cursor: "pointer" }}
            >
              Sign Up
            </Typography>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "var(--primary)",
              "&:hover": {
                backgroundColor: "var(--secondary)", // slightly darker for hover effect
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt="coffe shop"
          src="https://i.pinimg.com/736x/ae/dd/0a/aedd0a44a89d19f6be16bdff578f4a44.jpg"
        />
      </Box>
    </Box>
  );
}
