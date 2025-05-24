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
        const response = await applyCoupon(values.coupon); // real API call
        setFeedback({
          message: "Coupon applied successfully!",
          success: true,
        });
        resetForm();
      } catch (error) {
        setFeedback({
          message: "Invalid coupon or something went wrong.",
          success: false,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <Box sx={{ display: "flex", height: "350px" }}>
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
        <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
          Coupon
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            id="coupon"
            name="coupon"
            label="Coupon Code"
            value={values.coupon}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.coupon && Boolean(errors.coupon)}
            helperText={touched.coupon && errors.coupon}
            sx={{
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
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "var(--primary)",
              "&:hover": {
                backgroundColor: "var(--secondary)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Apply Coupon"
            )}
          </Button>

          {/* ✅ Feedback Message */}
          {feedback.message && (
            <Alert
              severity={feedback.success ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              {feedback.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
}
