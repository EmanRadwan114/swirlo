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

export default function Coupons() {
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

        // Fake delay for demo purpose (remove if applyCoupon is async already)
        const response = await applyCoupon({ couponCode: values.coupon }); // real API call
        console.log(response);
        setFeedback({
          message: response.message || "Coupon applied successfully!",
          success: true,
        });
        resetForm();
      } catch (error) {
        setFeedback({
          // message:error.response?.data?.message || "Invalid coupon or something went wrong.",
          message: "Invalid coupon",
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
      {/* === Group TextField + Button Side by Side === */}
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
            input: { color: "var(--text)" },
            label: { color: "var(--primary)" },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            height: "56px", // same height as TextField
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

      {/* ✅ Feedback Message */}
      {feedback.message && (
        <Alert severity={feedback.success ? "success" : "error"}>
          {feedback.message}
        </Alert>
      )}
    </Box>
  );
}
