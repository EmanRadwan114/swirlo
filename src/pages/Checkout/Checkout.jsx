import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Coupons from "../../components/Coupons/Coupons";
import MultiCardSlider from "../../components/slider/slider";

export default function Checkout() {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Validation Schema
  const CheckoutSchema = Yup.object().shape({
    address: Yup.string()
      .min(3, "Address should be at least 3 characters")
      .required("Address is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  // Formik Setup
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        address: "",
        paymentMethod: "cash",
      },
      validationSchema: CheckoutSchema,
      onSubmit: (values) => {
        console.log("Submitted values:", values);
        alert("Order Placed Successfully!");
      },
    });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        p: 2,
        gap: 2,
      }}
    >
      {/* LEFT SIDE: Address + Payment */}
      <Box
        sx={{
          flex: 2,
          backgroundColor: "#fff",
          // backgroundImage:"url('')",
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
   
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            color: "var(--primary)",
            fontFamily: "Pacifico, cursive",
          }}
        >
          CheckOut
        </Typography>

        <Box
          sx={{
            background: "var(--custom-gradient)",
            // bgcolor: "var(--gold)",
            height: "5px",
            width: { xs: "80%", md: "18rem" },
            mb: 4,
          }}
        />

        <Box sx={{ width: "100%", padding: 2 }}>
          <MultiCardSlider />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mx: "auto",
            width: "80%",
          }}
        >
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Shipping Address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
          />

          <TextField
            select
            fullWidth
            id="paymentMethod"
            name="paymentMethod"
            label="Payment Method"
            value={values.paymentMethod}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.paymentMethod && Boolean(errors.paymentMethod)}
            helperText={touched.paymentMethod && errors.paymentMethod}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "var(--primary)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 2,
              mt: 2,
              "&:hover": {
                backgroundColor: "var(--secondary)",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>

      {/* RIGHT SIDE: Coupons + Summary */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "var(--main-background)",
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Coupons />

        <Box sx={{ borderTop: "1px solid #ddd", pt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1">EGP 3344</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body1">Shipping:</Typography>
            <Typography variant="body1">EGP 34</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              mt: 2,
              borderTop: "1px solid #ccc",
              pt: 2,
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">EGP 3378</Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "var(--primary)",
              fontWeight: "bold",
              color: "#fff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "var(--secondary)",
              },
            }}
          >
            Place Order
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="src/assets/coup.png"
              alt="Placeholder"
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "auto",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
