import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const {register, isRegistering, error:registerError} = useAuth()
  // Validation Schema
  const regSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
      .min(3, "At least 3 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
        "Must contain uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is Required"),
  });
  // Submit
  const onSubmit = async(values) => {
    console.log("submitted", values);

    try{
      await register({name:values.userName, email:values.email,password:values.password, role:"user"})
      navigate('/login')
    }catch(error) {
      console.error("Full error object:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
       
      }
  };}
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
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
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
        <Typography
          component="h1"
          variant="h3"
          sx={{ mb: 3, color: "var(--main-text)" }}
        >
          Sign Up
        </Typography>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: "70%", mt: 1 }}
        >
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--primary)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary)",
                  borderWidth: "2px",
                },
                input: {
                  color: "var(--text)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--primary)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--secondary)",
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
                  borderColor: "var(--primary)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary)",
                  borderWidth: "2px",
                },
                input: {
                  color: "var(--text)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--primary)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--secondary)",
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
                  borderColor: "var(--primary)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary)",
                  borderWidth: "2px",
                },
                input: {
                  color: "var(--text)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--primary)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--secondary)",
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
                  borderColor: "var(--primary)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary)",
                  borderWidth: "2px",
                },
                input: {
                  color: "var(--text)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--primary)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--secondary)",
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
                backgroundColor: "var(--secondary)", 
              },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          display: { xs: "none", md: "flex" },
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
