import React from "react";
import { Link } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import ButtonApp from "../../components/common/buttonapp/ButtonApp";
import LandingBoxContainer from "./components/LandingBoxContainer";

import Aust from "../../assets/aust.svg";
import TasCatSvg from "../../assets/TasCat.svg";

function LandingPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Stack
        alignItems={"center"}
        justifyContent={"space-evenly"}
        minHeight={"1200px"}
      >
        <Stack
          sx={{
            width: isSmallScreen ? "250px" : "400px",
          }}
        >
          <img src={TasCatSvg} alt="" />
          <Typography
            sx={{
              fontSize: "30px",
              color: "white",
              fontFamily: "Patrick Hand SC, cursive",
              textAlign: "center",
            }}
          >
            Let the Cat arrange business for you
          </Typography>
        </Stack>
        <Link to={"/boards"}>
          <ButtonApp title={"Get Started"} />
        </Link>
        <br />
        <LandingBoxContainer />
        <Stack>
          <Typography
            color={"white"}
            sx={{
              fontFamily: "Patrick Hand SC, cursive",
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            accomplish your goals in a timely manner ,by: <br />
            abdalrahman daas & nour aldaqaq
          </Typography>
        </Stack>
        <img src={Aust} alt="" width={"100px"} height={"100px"} />
      </Stack>
    </Box>
  );
}

export default LandingPage;
