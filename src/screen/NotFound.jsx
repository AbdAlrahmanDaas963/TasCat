import { Stack, Typography } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <Stack
      sx={{ width: "100vw", height: "100vh" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack sx={{ color: "white" }}>
        <Typography
          sx={{
            fontFamily: "Patrick Hand SC, cursive",
            fontSize: "96px",
            lineHeight: "144px",
            letterSpacing: "-0.011em",
            textAlign: "center",
          }}
        >
          meow meow ,404!!
        </Typography>
        <Typography
          sx={{
            fontFamily: "Patrick Hand SC, cursive",
            fontSize: "36px",
            lineHeight: "54px",
            letterSpacing: "-0.011em",
            textAlign: "center",
          }}
        >
          page not found !
        </Typography>
      </Stack>
    </Stack>
  );
}

export default NotFound;
