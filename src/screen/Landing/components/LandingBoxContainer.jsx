import React from "react";

import { styled } from "@mui/system";
import { Stack, Grid, Paper } from "@mui/material";
import LandingBox from "./LandingBox";

import pin from "../../../assets/pin.svg";
import mail from "../../../assets/mail.svg";
import alarm from "../../../assets/alarm.svg";
import paper from "../../../assets/paper.svg";

function LandingBoxContainer() {
  const four = [
    {
      id: 1,
      title: "organize your tasks",
      desc: "process of arranging and structuring a set of tasks or activities in a logical and efficient manner.",
      icon: paper,
    },
    {
      id: 2,
      title: "set reminders",
      desc: "Setting reminders refers to the process of creating notifications or alerts to remind oneself of important tasks or events at a specific time or date",
      icon: alarm,
    },
    {
      id: 3,
      title: "prioritize your workload",
      desc: "Prioritizing your workload refers to the process of ranking tasks or activities in order of importance or urgency, and allocating your time and resources accordingly",
      icon: pin,
    },
    {
      id: 4,
      title: "ensuring that you stay on track",
      desc: "Staying on track refers to maintaining focus and making progress towards your goals or objectives. This involves setting clear and specific goals, breaking them down into manageable tasks",
      icon: mail,
    },
  ];
  return (
    <Grid
      container
      spacing={2}
      minHeight={"300px"}
      sx={{ border: "0px solid red", padding: " 0 300px" }}
    >
      {four.map((item) => (
        <Grid
          key={item.id}
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            border: "0px solid blue",
            padding: "10px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(9.5px)",
          }}
        >
          <LandingBox icon={item.icon} title={item.title} desc={item.desc} />
        </Grid>
      ))}
    </Grid>
  );
}

export default LandingBoxContainer;

{
  /* <Stack>
      <LandingBox
        title={"organize your tasks"}
        desc={
          "process of arranging and structuring a set of tasks or activities in a logical and efficient manner."
        }
      />
      <LandingBox
        title={"organize your tasks"}
        desc={
          "process of arranging and structuring a set of tasks or activities in a logical and efficient manner."
        }
      />
      <LandingBox
        title={"organize your tasks"}
        desc={
          "process of arranging and structuring a set of tasks or activities in a logical and efficient manner."
        }
      />
      <LandingBox
        title={"organize your tasks"}
        desc={
          "process of arranging and structuring a set of tasks or activities in a logical and efficient manner."
        }
      />
    </Stack> */
}
