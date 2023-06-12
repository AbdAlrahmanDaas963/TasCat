import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { getBoards, addBoard, deleteBoard } from "../../api/kanbanApi";

import { Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import tasCatSvg from "../../assets/TasCat.svg";

import { v4 as uuidv4 } from "uuid";
import SureDialog from "../../components/common/SureDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Kanban() {
  const uniqueId = uuidv4();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const [openSure, setOpenSure] = useState(false);
  const [boardToDel, setboardToDel] = useState("");
  const [newBoard, setNewBoard] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: boards,
  } = useQuery("tasks", getBoards);
  // ? add it to force refresh ^^ , { refetchInterval: 1000 }
  console.log("tasks :>> ", boards);

  const handleAddBoardButton = async (e) => {
    e.preventDefault();
    addBoardMutation.mutate({ id: uniqueId, title: newBoard });
    setNewBoard("");
    handleClose();
    await queryClient.refetchQueries("boards");
  };

  const handleDeleteBoardButton = (id) => {
    setboardToDel(id);
    setOpenSure(true);
    console.log("id :>> ", id);
    deleteBoardMutation.mutate({ id });
    handleMenuClose();
  };

  const addBoardMutation = useMutation(addBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
  const deleteBoardMutation = useMutation(deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });

  if (isLoading) return <h1>Loading Boards ...</h1>;
  if (isError) return <h1>{error.message}</h1>;
  if (boards.length === 0) return <h1>you don't have boards</h1>;

  return (
    <Stack
      height={"100vh"}
      minHeight={"500px"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      direction={"column"}
    >
      <img src={tasCatSvg} alt="" />
      <Stack direction={"row"} justifyContent={"space-evenly"} width={"100%"}>
        {boards.map((item, index) => (
          <Stack
            key={index}
            border={"2px solid white"}
            sx={{ width: "200px", height: "100px", borderRadius: "7px" }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Link to={"/newboard"} state={{ data: item }}>
              <Typography color={"white"}>{item.title}</Typography>
            </Link>
            <SureDialog
              open={openSure}
              boardName={item.title}
              boardId={item.id}
              sureDelete={handleDeleteBoardButton}
            />
          </Stack>
        ))}
      </Stack>
      <div>
        <Button
          variant="outlined"
          sx={{
            width: "200px",
            height: "100px",
            borderRadius: "7px",
            border: "2px solid white",
            color: "white",
          }}
          onClick={handleClickOpen}
        >
          Add Board +
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add Board"}</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              placeholder="Board Title"
              value={newBoard}
              onChange={(e) => setNewBoard(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color={"inherit"} onClick={handleClose}>
              Close
            </Button>
            <Button color={"success"} onClick={handleAddBoardButton}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Stack>
  );
}

export default Kanban;
