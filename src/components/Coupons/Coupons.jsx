import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { applyCoupon } from "../../services/couponApi";

export default function Coupons({ onApplyCoupon }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", success: null });

  const CouponSchema = Yup.object().shape({
    coupon: Yup.string().required("Coupon code is required"),
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

        resetForm();
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
        maxWidth: "400px",
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
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "var(--primary)" },
              "&:hover fieldset": { borderColor: "var(--accent)" },
              "&.Mui-focused fieldset": {
                borderColor: "var(--secondary)",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--green-color)",
              "&.Mui-focused": {
                color: "var(--green-color)",
              },
            },
            input: { color: "var(--text)" },
            label: { color: "var(--primary)" },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            height: "56px",
            backgroundColor: "var(--primary)",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "var(--secondary)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Apply"
          )}
        </Button>
      </Box>

      {feedback.message && (
        <Alert severity={feedback.success ? "success" : "error"}>
          {feedback.message}
        </Alert>
      )}
    </Box>
  );
}
