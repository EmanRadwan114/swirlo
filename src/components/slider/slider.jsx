import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useOrders } from "../../context/OrdersContext";
import "swiper/css";
import "swiper/css/navigation";

export default function MultiCardSlider() {
  const { getCartItems } = useOrders();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCartItems();
        setCartItems(res.data.data); // assuming data is in res.data.data
      } catch (err) {
        console.error("Error fetching cart items", err);
      }
    };

    fetchData();
  }, [getCartItems]);

  return (
    <Box
      sx={{
        maxHeight: 900,
        maxWidth: { lg: "800px", xl: "1200px" },
        mt: 4,
        px: 2,
      }}
    >
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        loop={false}
        style={{
          padding: "20px 0",
          "--swiper-navigation-color": "#815334",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 1.5 },
          960: { slidesPerView: 2 },
          1200: { slidesPerView: 2.5 },
          1350: { slidesPerView: 3 },
          1500: { slidesPerView: 3.5 },
        }}
      >
        {cartItems.map((item, index) => (
          <SwiperSlide key={item._id || index}>
            <Card
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(129, 83, 52, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 16px rgba(129, 83, 52, 0.15)",
                },
                minHeight: "370px",
                backgroundColor: "#f9f9f7",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.productId.thumbnail}
                alt={item.productId.title}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  backgroundColor: "#e5e5da",
                }}
              />
              <CardContent
                sx={{
                  p: 3,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#815334",
                    fontWeight: 700,
                    mb: 1,
                    fontSize: "1.1rem",
                  }}
                >
                  {item.productId.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#ab795a",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Qty: {item.quantity} x {item.productId.price}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#815334",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    EGP {item.quantity * item.productId.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
