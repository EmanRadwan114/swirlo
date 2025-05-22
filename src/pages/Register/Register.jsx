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

export default function Register() {
  // Validation Schema
  const regSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
      .min(3, "At least 3 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is Required"),
  });
  // Submit
  const onSubmit = () => {
    console.log("submitted");
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPass: "",
      },
      validationSchema: regSchema,
      onSubmit,
    });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            id="userName"
            name="userName"
            label="User Name"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userName && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
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
            id="confirmPass"
            name="confirmPass"
            label="Confirm Password"
            type="password"
            value={values.confirmPass}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPass && errors.confirmPass}
            helperText={touched.confirmPass && errors.confirmPass}
          />
          <Typography variant="subtitle1">
            Already Have Account?{" "}
            <Typography
              component={Link}
              to="/login"
              sx={{ color: "var(--primary)", cursor: "pointer" }}
            >
              Sign In
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
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
