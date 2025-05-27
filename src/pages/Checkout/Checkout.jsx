import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Coupons from "../../components/Coupons/Coupons";
import MultiCardSlider from "../../components/slider/slider";
import { useOrders } from "../../context/OrdersContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import beans from "../../assets/beans.png";
export default function Checkout() {
  // const isMobile = useMediaQuery("(max-width:600px)");
  const { getCartItems, createOrder, getShippingPrice, checkout } = useOrders();
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const shippingPrice = getShippingPrice();
  const [cart, setCartItems] = useState([]);

  const themeC = createTheme({
    palette: {
      primary: {
        main: "#4b2a19",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCartItems();
        setCartItems(res.data.data);
      } catch (err) {
        console.error("Error fetching cart items", err);
      }
    };

    fetchData();
  }, [getCartItems]);

  const calculateSubtotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const totalPrice = subtotal - couponDiscount + shippingPrice;

  const CheckoutSchema = Yup.object().shape({
    address: Yup.string()
      .min(3, "Address should be at least 3 characters")
      .required("Address is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      paymentMethod: "cash",
    },
    validationSchema: CheckoutSchema,
    onSubmit: async (values) => {
      const orderData = {
        shippingAddress: values.address,
        paymentMethod: values.paymentMethod,
        totalPrice,
        ...(couponCode && { couponCode }),
      };

      console.log("Submitting order data:", orderData);

      setLoading(true); // Set loading to true before sending the request

      try {
        const res = await createOrder(orderData);

        if (values.paymentMethod === "online") {
          const { sessionId } = res.data; // Get session ID from the backend
          console.log("Session ID for Stripe:", sessionId);
          await checkout(sessionId); // Handle online payment via Stripe
        } else {
          toast.success("Order placed successfully!");
          navigate("/profile"); // Redirect to orders page
        }
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Something went wrong, please try again!");
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    },
  });
  const handleCouponApply = ({ couponCode, discount }) => {
    setCouponCode(couponCode);
    setCouponDiscount(discount);
  };

  function handlePayNow() {
    formik.handleSubmit();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        p: 2,
        gap: 2,
        alignItems: "start",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 2,
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
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Shipping Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            sx={{
              "& .MuiInputLabel-root": {
                color: "var(--green-color)",
                "&.Mui-focused": {
                  color: "var(--green-color)",
                },
              },
            }}
          />

          <TextField
            select
            fullWidth
            id="paymentMethod"
            name="paymentMethod"
            label="Payment Method"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.paymentMethod &&
              Boolean(formik.errors.paymentMethod)
            }
            helperText={
              formik.touched.paymentMethod && formik.errors.paymentMethod
            }
            sx={{
              "& .MuiInputLabel-root": {
                color: "var(--green-color)",
                "&.Mui-focused": {
                  color: "var(--green-color)",
                },
              },
            }}
          >
            <MenuItem value="cash">Cash on Delivery</MenuItem>
            <MenuItem value="online">Online Payment</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          background: "var(--secondary)",
          position: "sticky",
          top: 80,
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: { xs: "100%", sm: "70%", lg: "80%" },
          height: "fit-content",
          mt: { xs: 4, lg: 8 },
          mx: "auto",
        }}
      >
        <Coupons onApplyCoupon={handleCouponApply} />

        <Box sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1">EGP {subtotal}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body1">Shipping:</Typography>
            <Typography variant="body1">EGP {shippingPrice}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body1">Discount:</Typography>
            <Typography variant="body1">EGP {couponDiscount}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              mt: 2,
              pt: 2,
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">EGP {totalPrice}</Typography>
          </Box>
          <ThemeProvider theme={themeC}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handlePayNow}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Processing..." : "Pay Now"}{" "}
              {/* Show loading text when in loading state */}
            </Button>
          </ThemeProvider>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <img
              src="src/assets/coup.png"
              alt="Coupon"
              style={{ width: "100%", maxWidth: "320px", height: "auto" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
