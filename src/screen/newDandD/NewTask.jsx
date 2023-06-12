import React from "react";

import { Draggable } from "react-beautiful-dnd";
import { Stack, Box, Typography } from "@mui/material";

function NewTask({ task, index }) {
  // console.log("task from new task :>> ", task.content);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Box
          sx={{
            background: "#3F4965",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
            borderRadius: "8px",
            minWidth: "200px",
            minHeight: "50px",
            margin: "0 0 15px 0",
            padding: "10px",
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Stack>
            <Typography fontWeight={"700"} fontSize={"20px"}>
              {task.content}
            </Typography>
            <Typography fontWeight={"400"} fontSize={"15px"}>
              {task.description}
            </Typography>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
}

export default NewTask;
