import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginImg from "../../assets/login1.jpeg";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const {login, handleLoginSuccess, handelLoginError } = useAuth();

  const navigate = useNavigate();
  const onSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    handleLoginSuccess(decoded, credentialResponse.credential, navigate);
  };
  
  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      console.error("Response data:", error.response.data);
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
        height: "100vh",
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
          sx={{ mb: 4, color: "var(--gold)" }}
        >
          Sign In
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
                  borderColor: "var(--gold)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--gold)",
                  borderWidth: "2px",
                },
                input: {
                  color: "var(--text)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--gold)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--gold)",
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
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={touched.password && Boolean(errors.password)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--gold)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--gold)",
                  borderWidth: "2px",
                },
                input: {
                  color: "var(--text)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--gold)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--gold)",
              },
            }}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                    sx={{ color: "var(--accent)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {touched.password && errors.password && (
              <FormHelperText>{errors.password}</FormHelperText>
            )}
          </FormControl>

          <Divider sx={{ m: 1, color: "var(--gold)", fontSize: 18 }}>
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
              sx={{ color: "var(--gold)", cursor: "pointer" }}
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
              backgroundColor: "var(--gold)",
              "&:hover": {
                backgroundColor: "var(--primary)",
              },
            }}
          >
            Sign In
          </Button>
        </Stack>
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
          alt="coffe shop swerllo"
          src={loginImg}
        />
      </Box>
    </Box>
  );
}
