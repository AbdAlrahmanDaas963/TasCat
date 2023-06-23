import React from "react";
import { motion } from "framer-motion";

import catPrint from "../assets/catPrint.svg";
import { Box, Stack } from "@mui/material";

const catVar1 = {
  slide: {
    opacity: 0,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0,
    },
  },
  slideReverse: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const catVar2 = {
  slide: {
    opacity: 0,
    transition: {
      delay: "0.2",
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0,
    },
  },
  slideReverse: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const catVar3 = {
  slide: {
    opacity: 0,
    transition: {
      delay: "0.4",
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0,
    },
  },
  slideReverse: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const catVar4 = {
  slide: {
    opacity: 0,
    transition: {
      delay: "0.8",
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0,
    },
  },
  slideReverse: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const catVar5 = {
  slide: {
    opacity: 0,
    transition: {
      delay: "1",
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0,
    },
  },
  slideReverse: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const catVar6 = {
  slide: {
    opacity: 0,
    transition: {
      delay: "1.2",
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0,
    },
  },
  slideReverse: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

function Loading() {
  return (
    <Stack alignItems={"center"} direction={"column"}>
      <motion.h3
        style={{ color: "white" }}
        variants={catVar1}
        animate={"slide"}
      >
        Loading
      </motion.h3>
      <Stack direction={"row"} alignItems={"start"}>
        <Box marginTop={"30px"}>
          <motion.img
            variants={catVar1}
            animate={"slide"}
            src={catPrint}
            alt=""
            width={"50px"}
          />
        </Box>
        <Box marginTop={"0px"}>
          <motion.img
            variants={catVar2}
            animate={"slide"}
            src={catPrint}
            alt=""
            width={"50px"}
          />
        </Box>
        <Box marginTop={"30px"}>
          <motion.img
            variants={catVar3}
            animate={"slide"}
            src={catPrint}
            alt=""
            width={"50px"}
          />
        </Box>
        <Box marginTop={"0px"}>
          <motion.img
            variants={catVar4}
            animate={"slide"}
            src={catPrint}
            alt=""
            width={"50px"}
          />
        </Box>
        <Box marginTop={"30px"}>
          <motion.img
            variants={catVar5}
            animate={"slide"}
            src={catPrint}
            alt=""
            width={"50px"}
          />
        </Box>
        <Box marginTop={"0px"}>
          <motion.img
            variants={catVar6}
            animate={"slide"}
            src={catPrint}
            alt=""
            width={"50px"}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Loading;
