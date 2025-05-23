import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/material";
export default function Review() {
  let reviewsArr = [
    { _id: 1, name: "Nour", rating: 4, desc: "nice" },
    { _id: 2, name: "Nour", rating: 4, desc: "nice" },
    { _id: 3, name: "Nour", rating: 4, desc: "nice" },
  ];
  let [rate, setRate] = useState(0);
  return (
    <>
      <Stack flexDirection={"column"} sx={{ backgroundColor: "var(--light-bg)", color: "var(--main-text)" }} minHeight={"60vh"} p={5}>
        <Typography variant="h4">Customer Reviews</Typography>
        <Stack flexDirection={{ xs: "column", md: "row" }}>
          <Stack flexDirection={"column"} gap={2} flex={1} justifyContent={"center"} alignItems={"center"} p={3}>
            {reviewsArr.map((review) => {
              return (
                <Stack key={review?._id} p={2} borderRadius={2} sx={{ backgroundColor: "rgb(175, 169, 135)" }} minWidth={"100%"}>
                  <Stack flexDirection={"row"} mb={2} justifyContent={"space-between"}>
                    <Typography variant="h6">{review?.name}</Typography>
                    <Typography variant="p">{review?.rating}</Typography>
                  </Stack>
                  <Typography variant="p">{review?.desc}</Typography>
                </Stack>
              );
            })}
          </Stack>
          <Stack flexDirection={"column"} flex={1} p={5} border={1} borderRadius={2}>
            <Typography variant="h5">Add a Review</Typography>
            <Stack my={2}>
              <Typography variant="h6">Your Rating</Typography>
              <Rating name="size-large" defaultValue={0} value={rate} onChange={(event, value) => setRate(value)} size="large" sx={{ mt: 1 }} />
            </Stack>
            <Stack my={2}>
              <TextareaAutosize
                minRows={7}
                placeholder="Leave your comment"
                style={{ width: "100%", borderRadius: "5px", padding: "10px", resize: "vertical" }}
              />
            </Stack>
            <Button
              sx={{ textTransform: "none", width: "fit-content", alignSelf: "center", px: 4, fontSize: "1rem" }}
              variant="contained"
              size="large"
            >
              Submit Review
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
