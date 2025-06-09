import {
  Box,
  Button,
  createTheme,
  Divider,
  Skeleton,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useCart } from "../../context/CartContext";
import ClearIcon from "@mui/icons-material/Clear";
import image from "../../assets/emptyCart.png";

export default function Cart() {
  let navigate = useNavigate();
  let { data, page, setPage, isLoading, handleCartRemoval, handleQuantity } =
    useCart();
  function handlePagination(value) {
    setPage(value);
  }

  const themeC = createTheme({
    palette: {
      primary: {
        main: "#4b2a19",
      },
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <>
      {data?.data.length > 0 ? (
        <Stack minHeight="90vh" p={{ xs: 2, md: 6 }} spacing={3} width="100%">
          <Stack flexDirection={{ xs: "column", lg: "row" }}>
            {/* LEFT COLUMN - Cart */}
            <Stack flex={1} spacing={1} alignItems="center">
              {/* Title and Remove Button */}
              <Stack
                width={{ xs: "100%", sm: "80%", md: "70%", lg: "700px" }}
                mt={2}
              >
                <Typography variant="h4" sx={{ color: "var(--gold)" }}>
                  Shopping Cart
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCartRemoval()}
                  sx={{
                    textTransform: "none",
                    width: "fit-content",
                    alignSelf: "end",
                  }}
                >
                  Clear Cart
                </Button>
              </Stack>

              {/* Cart Items */}
              <Stack gap={2} width="100%" alignItems="center">
                {data?.data.map((item) => (
                  <Box
                    key={item._id}
                    border={2}
                    borderColor="rgb(175, 169, 135)"
                    borderRadius={2}
                    p={2}
                    width={{ xs: "100%", sm: "80%", md: "70%", lg: "700px" }}
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={2}
                  >
                    {/* Product Image */}
                    <Box
                      component="img"
                      src={item.productId.thumbnail}
                      alt={item.productId.title}
                      width={{ xs: "100%", sm: "120px" }}
                      height="auto"
                      borderRadius={2}
                    />

                    {/* Product Details */}
                    <Stack flex={1} gap={1}>
                      <Button
                        sx={{
                          alignSelf: "flex-end",
                          color: "var(--primary)",
                          minWidth: 0,
                        }}
                        onClick={() => handleCartRemoval(item.productId._id)}
                      >
                        <ClearIcon />
                      </Button>
                      <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        my={2}
                        flexWrap="wrap"
                        gap={2}
                      >
                        <Typography
                          variant="h6"
                          fontSize={{ xs: "1rem", md: "1.2rem" }}
                        >
                          {item.productId.title}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <ThemeProvider theme={themeC}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleQuantity(
                                  item.productId._id,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </Button>
                            <Typography
                              color="var(--primary)"
                              minWidth="30px"
                              textAlign="center"
                            >
                              {item.quantity}
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                handleQuantity(
                                  item.productId._id,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </ThemeProvider>
                        </Box>
                      </Stack>
                      <Typography
                        alignSelf="flex-end"
                        color="var(--primary)"
                        fontSize="1rem"
                      >
                        EGP{item.productId.price}.00
                      </Typography>
                      <Typography
                        alignSelf="flex-end"
                        fontWeight={700}
                        color="var(--primary)"
                      >
                        Total: EGP{item.productId.price * item.quantity}.00
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>

              <PaginationComponent
                totalPages={data?.totalPages}
                currentPage={page}
                handlePagination={handlePagination}
              />
            </Stack>
            <Stack
              flex={{ xs: 1, sm: 0.4 }}
              position="sticky"
              top={80}
              borderRadius={2}
              bgcolor="var(--secondary)"
              p={3}
              mt={{ xs: 4, lg: 10 }}
              spacing={2}
              mx={"auto"}
              width={{ xs: "100%", sm: "70%", lg: "80%" }}
              height="fit-content"
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">Subtotal:</Typography>
                <Typography>EGP {data?.subtotal}.00</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">Shipping:</Typography>
                <Typography>EGP 50.00</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold" fontSize="1.1rem">
                  Total:
                </Typography>
                <Stack>
                  <Typography fontSize="1.1rem">
                    EGP {data?.subtotal + 50}.00
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    color="text.secondary"
                    alignSelf="end"
                  >
                    including VAT
                  </Typography>
                </Stack>
              </Stack>
              <ThemeProvider theme={themeC}>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              </ThemeProvider>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack
          minHeight={"80vh"}
          p={5}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack alignItems="center" gap={2}>
            <Box
              component="img"
              src={image}
              alt="Empty Cart"
              width={{ xs: "70%", md: "30%" }}
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
            <Typography
              fontSize={{ xs: "1.2rem", md: "1.5rem" }}
              color="var(--gold)"
              textAlign="center"
            >
              Oops! Your cart is lonely. Let’s fix that!
            </Typography>
            <ThemeProvider theme={themeC}>
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                onClick={() => navigate("/menu-items")}
              >
                Start adding!
              </Button>
            </ThemeProvider>
          </Stack>
        </Stack>
      )}
    </>
  );
}
