import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { applyCoupon } from "../../services/couponApi";

export default function Coupons({ onApplyCoupon }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", success: null });

  const themeC = createTheme({
    palette: {
      primary: {
        main: "#4b2a19",
      },
    },
  });

  const CouponSchema = Yup.object().shape({
    coupon: Yup.string().min("Coupon should be at least 3 characters"),
  });

  const formik = useFormik({
    initialValues: {
      coupon: "",
    },
    validationSchema: CouponSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        setFeedback({ message: "", success: null });
        const response = await applyCoupon({ couponCode: values.coupon });

        // Trigger parent function with coupon code and discount
        if (onApplyCoupon) {
          onApplyCoupon({
            couponCode: values.coupon,
            discount: response.discount,
          });
        }

        setFeedback({
          message: response.message || "Coupon applied successfully!",
          success: true,
        });

      } catch (error) {
        setFeedback({
          message: error.response?.message || "Invalid coupon",
          success: false,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          id="coupon"
          name="coupon"
          label="Coupon Code"
          value={values.coupon}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.coupon && Boolean(errors.coupon)}
          helperText={touched.coupon && errors.coupon}
          size="medium"
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "var(--primary)" },
              "&:hover fieldset": { borderColor: "var(--primary)" },
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary)",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--primary)",
              "&.Mui-focused": {
                color: "var(--primary)",
              },
            },
            input: { color: "var(--text)" },
            label: { color: "var(--primary)" },
          }}
        />
        <ThemeProvider theme={themeC}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              height: "60px",
              backgroundColor: "var(--primary)",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Apply"
            )}
          </Button>
        </ThemeProvider>
      </Box>

      {feedback.message && (
        <Alert severity={feedback.success ? "success" : "error"}>
          {feedback.message}
        </Alert>
      )}
    </Box>
  );
}
