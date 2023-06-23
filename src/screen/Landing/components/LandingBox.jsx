import React from "react";
import { Stack, Typography } from "@mui/material";

function LandingBox({ title, desc, icon }) {
  return (
    <Stack
      sx={{
        border: "1px solid white",
        padding: "15px 30px",
        borderRadius: "20px",
        background:
          "linear-gradient(180deg, rgba(40, 48, 72, 0.7) 0%, #283048 100%)",
      }}
      width={"350px"}
      height={"113px"}
      direction={"row"}
    >
      <img src={icon} alt="" width={"50px"} />
      <Stack sx={{ color: "white", paddingLeft: "30px" }} direction={"column"}>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            fontWeight: "200",
            fontSize: "13px",
          }}
        >
          {desc}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default LandingBox;
