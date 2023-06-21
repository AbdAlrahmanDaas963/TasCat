import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Tasks from "../Tasks";

import { getBoards } from "../../../api/kanbanApi";
import { useQuery, useMutation, useQueryClient } from "react-query";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  // const [boardswithId, setBoardswithId] = useState([
  //   { id: 1, title: "gym" },
  //   { id: 2, title: "work" },
  //   { id: 3, title: "gym" },
  //   { id: 4, title: "school" },
  // ]);
  const [selectedBoardId, setSelectedBoardId] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const {
    isLoading,
    isError,
    error,
    data: boards,
  } = useQuery("tasks", getBoards);
  console.log("boards :>> ", boards);

  // useEffect(() => {
  //   setBoardswithId(boards);
  // }, [dataGetted]);

  // setBoardswithId(boards);

  // if (boards) {
  //   const newboo = boards.map(({ id, title }) => ({ id, title }));
  //   setBoardswithId(newboo);
  // }
  //

  // useEffect(() => {
  //   const getBoardIds = (boardsArray) => {
  //     if (!boardsArray) return [];
  //     return boardsArray.map(({ id, title }) => ({ id, title }));
  //   };

  //   //
  //   // Usage
  //   const boardIds = getBoardIds(boards);
  //   setBoardswithId(boardIds);

  //   console.log("boardswithId :>> ", boardswithId);
  // }, []);

  if (isLoading) return <h1>looooading</h1>;

  const boardsList = boards.map((item, index) => (
    <ListItem
      key={item.id}
      onClick={() => setSelectedBoardId(item.id)}
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{isLoading ? <h1>loading...</h1> : boardsList}</List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Tasks boardId={selectedBoardId} />
      </Main>
    </Box>
  );
}
