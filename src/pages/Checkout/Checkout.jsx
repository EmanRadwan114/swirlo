import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Coupons from "../../components/Coupons/Coupons";

export default function Checkout() {
  // Validation Schema
  const CheckoutSchema = Yup.object().shape({
    address: Yup.string()
      .min(3, "Address should be at least 3 characters")
      .required("Address is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  // Submit
  const onSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      address: "",
      paymentMethod: "cash",
    },
    validationSchema: CheckoutSchema,
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
        <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
          Checkout
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="address"
            name="address"
            label="Shipping Address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
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
              },
              input: {
                color: "var(--text)",
              },
              label: {
                color: "var(--primary)",
              },
            }}
          />

          <TextField
            select
            SelectProps={{ native: true }}
            fullWidth
            margin="normal"
            id="paymentMethod"
            name="paymentMethod"
            label="Payment Method"
            value={values.paymentMethod}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.paymentMethod && Boolean(errors.paymentMethod)}
            helperText={touched.paymentMethod && errors.paymentMethod}
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
              },
              input: {
                color: "var(--text)",
              },
              label: {
                color: "var(--primary)",
              },
            }}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </TextField>

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
            Place Order
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
       <Coupons></Coupons>
      </Box>
    </Box>
  );
}
