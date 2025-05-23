import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
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
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import loginImg from "../../assets/login1.jpeg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const navigate = useNavigate();
  const {register, isRegistering, error:registerError} = useAuth()

    // Show Password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
  
    const toggleConfPasswordVisibility = () => {
      setShowConfPassword((prev) => !prev);
    };
  
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
          sx={{ mb: 3, color: "var(--gold)" }}
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

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={touched.confirmPass && Boolean(errors.confirmPass)}
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
            <InputLabel htmlFor="confirmPass">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPass"
              name="confirmPass"
              type={showConfPassword ? "text" : "password"}
              value={values.confirmPass}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Confirm Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfPasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showConfPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {touched.confirmPass && errors.confirmPass && (
              <FormHelperText>{errors.confirmPass}</FormHelperText>
            )}
          </FormControl>

          <Typography variant="subtitle1">
            Already Have Account?
            <Typography
              component={Link}
              to="/login"
              sx={{ color: "var(--gold)", cursor: "pointer" }}
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
              backgroundColor: "var(--gold)",
              "&:hover": {
                backgroundColor: "var(--primary)",
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
          alt="coffe shop swerllo"
          src={loginImg}
        />
      </Box>
    </Box>
  );
}
