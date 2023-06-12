import React from "react";
import { Button, Typography } from "@mui/material";

import catPrint from "../../../assets/catPrint.svg";
function ButtonApp({ title }) {
  return (
    <Button
      sx={{
        background:
          "linear-gradient(87.16deg, rgba(78, 90, 95, 0.1656) 0.03%, rgba(190, 204, 209, 0.24) 100.03%)",
        border: "2px solid #FFFFFF",
        boxShadow: "0px 7px 4px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(4px)",
        width: "213.88px",
        height: "55.44px",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontWeight: "600",
          fontSize: "19px",
          lineHeight: "35px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <img src={catPrint} alt="" width={"50px"} />
    </Button>
  );
}

export default ButtonApp;
