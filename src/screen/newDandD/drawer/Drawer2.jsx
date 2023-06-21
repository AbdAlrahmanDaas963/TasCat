import React, { useState } from "react";
import {
  ListItem,
  Stack,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";

function Drawer2() {
  const [boards, setBoards] = useState([
    { id: 1, title: "gym" },
    { id: 2, title: "work" },
    { id: 3, title: "gym" },
    { id: 4, title: "school" },
  ]);
  const [selectedBoardId, setSelectedBoardId] = useState();

  return (
    <Stack direction={"row"}>
      <Stack width={"300px"} height={"100vh"} border={"1px solid white"}>
        <List>
          {/* {boards.map((item, index) => (
            <ListItem
              key={item.id}
              onClick={setSelectedBoardId(item.id)}
              disablePadding
            >
              <ListItemButton>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))} */}
          {boards.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => setSelectedBoardId(item.id)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
      <Stack width={"100%"} height={"100vh"} border={"1px solid red"}>
        Tasks
      </Stack>
    </Stack>
  );
}

export default Drawer2;
