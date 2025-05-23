import React, { useContext } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, handleLoginSuccess, handelLoginError } = useAuth();
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    handleLoginSuccess(decoded, credentialResponse.credential, navigate);
  };

  const onError = () => {
    handelLoginError();
  };
  // Validation Schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
        "Must contain uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
  });
  const onSubmit = async (values) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      navigate("/");
    } catch (error) {
      console.error("Full error object:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
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
        <Typography
          component="h1"
          variant="h3"
          sx={{ mb: 4, color: "var(--main-text)" }}
        >
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
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
          <Divider sx={{ m: 1, color: "var(--primary)", fontSize: 18 }}>
            or
          </Divider>
          <Box sx={{ mt: 2 }}>
            <GoogleLogin onSuccess={onSuccess} onError={onError} />
          </Box>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
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
                backgroundColor: "var(--secondary)",
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
          display: { xs: "none", md: "flex" },
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
