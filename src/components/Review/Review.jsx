import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, createTheme, FormControl, FormHelperText, TextareaAutosize, TextField, ThemeProvider } from "@mui/material";
import { addReview, getReviews } from "../../services/productsApi";
import PaginationComponent from "../Pagination/PaginationComp";
export default function Review() {
  let { id } = useParams();
  console.log(id);
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reviews", id, page],
    queryFn: () => getReviews(id, page),
  });

  function handlePagination(value) {
    setPage(value);
  }
  const submitReviewSchema = Yup.object().shape({
    rate: Yup.number().min(0).max(5).required("Rating is required"),
    description: Yup.string().min(8, "Description must be at least 8 characters").required("Description is required"),
  });
  async function onSubmit() {
    try {
      console.log(values.rate, values.description);
      await addReview(id, {
        rating: values.rate,
        description: values.description,
      });
      toast.success("Thanks for sharing your opinion❤");
      setPage(1);
      if (page == 1) {
        refetch();
      }
      setFieldValue("rate", 0);
      setFieldValue("description", "");
      setTouched({ rate: false, description: false });
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      console.error("Response data:", error.response.data);
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setTouched } = useFormik({
    initialValues: {
      rate: 0,
      description: "",
    },
    validationSchema: submitReviewSchema,
    onSubmit,
  });
  const themeC = createTheme({
    palette: {
      primary: {
        main: "#4b2a19",
      },
    },
  });
  let totalPages = data?.totalPages;
  return (
    <>
      <Stack flexDirection={"column"} sx={{ backgroundColor: "var(--light-bg)", color: "var(--main-text)" }} minHeight={"60vh"} p={5}>
        <Typography variant="h4" sx={{ color: "var(--primary)" }}>
          Customer Reviews
        </Typography>
        <Stack flexDirection={{ xs: "column", md: "row" }}>
          <Stack flexDirection={"column"} gap={2} flex={1} justifyContent={"center"} alignItems={"center"} p={3}>
            {isLoading ? (
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            ) : (
              <>
                {data?.data.map((review) => {
                  return (
                    <Stack key={review?._id} p={2} borderRadius={2} border={2} sx={{ borderColor: "rgb(175, 169, 135)" }} minWidth={"100%"}>
                      <Stack flexDirection={"row"} justifyContent={"space-between"}>
                        <Typography variant="h6">{review?.user.name}</Typography>
                        <Rating value={+review?.rating} precision={0.5} readOnly size="large" sx={{ mt: 1 }} />
                      </Stack>
                      <Box
                        sx={{
                          background: "var(--custom-gradient)",
                          height: "3px",
                          width: { xs: "40%", md: "14rem" },
                          mb: 2,
                        }}
                      />
                      <Typography variant="p" pl={0.5} fontSize={"1.2rem"}>
                        {review?.description}
                      </Typography>
                    </Stack>
                  );
                })}
                <PaginationComponent currentPage={page} totalPages={totalPages} handlePagination={handlePagination}></PaginationComponent>
              </>
            )}
          </Stack>
          <Stack flexDirection={"column"} flex={1} px={5} pt={5} border={3} borderRadius={2} sx={{ borderColor: "rgb(175, 169, 135)" }}>
            <Typography variant="h4" sx={{ color: "var(--primary)" }}>
              Add a Review
            </Typography>
            <Stack mt={4} pl={1} component={"form"} onSubmit={handleSubmit}>
              <Typography variant="p">Add your Rating</Typography>
              <FormControl error={touched.rate && Boolean(errors.rate)} sx={{ mt: 2 }}>
                <Rating
                  name="rate"
                  value={values.rate}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => {
                    setFieldValue("rate", newValue);
                  }}
                  onBlur={handleBlur}
                />
                {touched.rate && errors.rate && <FormHelperText>{errors.rate}</FormHelperText>}
              </FormControl>
              <Stack mt={5}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "var(--tertiary)",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--tertiary)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--tertiary)",
                        borderWidth: "2px",
                      },
                      input: {
                        color: "var(--text)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--tertiary)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--tertiary)",
                    },
                  }}
                  fullWidth
                  multiline
                  minRows={3}
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <ThemeProvider theme={themeC}>
                  <Button
                    sx={{ textTransform: "none", width: "fit-content", alignSelf: "center", px: 4, fontSize: "1rem", mt: 3 }}
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Submit Review
                  </Button>
                </ThemeProvider>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
