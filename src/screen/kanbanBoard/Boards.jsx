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
import Skeleton from "@mui/material/Skeleton";

import tasCatSvg from "../../assets/TasCat.svg";
import addboardSvg from "../../assets/addBoard.svg";

import { v4 as uuidv4 } from "uuid";
import SureDialog from "../../components/common/SureDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Boards() {
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
    setNewBoard("");
  };

  const queryClient = useQueryClient();

  const {
    refetch,
    isLoading,
    isError,
    error,
    data: boards,
  } = useQuery("tasks", getBoards);

  // console.log("tasks :>> ", boards);

  const handleAddBoardButton = async (e) => {
    e.preventDefault();
    addBoardMutation.mutate({
      id: uniqueId,
      title: newBoard,
      tasks: {
        todo: [],
        doing: [],
        done: [],
      },
    });
    setNewBoard("");
    handleClose();
    setTimeout(() => {
      refetch();
    }, 100);
    await queryClient.refetchQueries("boards");
  };

  const handleDeleteBoardButton = (id) => {
    setboardToDel(id);
    setOpenSure(true);
    console.log("id :>> ", id);
    deleteBoardMutation.mutate({ id });
    handleMenuClose();
    setTimeout(() => {
      refetch();
    }, 100);
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
  // if (boards.length === 0) return <h1>you don't have boards</h1>;

  return (
    <Stack
      height={"100vh"}
      minHeight={"500px"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      direction={"column"}
    >
      <img src={tasCatSvg} alt="" />
      <Stack
        display={"flex"}
        flexWrap={"wrap"}
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        width={"100%"}
      >
        {boards.map((item, index) => (
          <Stack
            key={index}
            border={"2px solid white"}
            sx={{
              width: "200px",
              height: "100px",
              borderRadius: "7px",
              margin: "10px",
              boxShadow: "0px 6px 8px 0px #00000040",
            }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Link to={"/drawer"} state={{ data: item }}>
              <Typography
                color={"white"}
                sx={{
                  fontSize: "20px",
                  textTransform: "capitalize",
                  fontFamily: "Roboto",
                }}
              >
                {item.title}
              </Typography>
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
            width: "250px",
            height: "70px",
            borderRadius: "7px",
            border: "2px solid white",
            color: "white",
            boxShadow: "0px 6px 8px 0px #00000040",
          }}
          onClick={handleClickOpen}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            width={"100%"}
            height={"100%"}
          >
            <div>New Board</div>
            <img src={addboardSvg} alt="" width={"50px"} />
          </Stack>
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <Stack
            sx={{
              backgroundColor: "#283048",
              border: "1px solid #FFFFFF",
              borderRadius: "7px",
              color: "white",
            }}
          >
            <DialogTitle
              textAlign={"center"}
              sx={{
                fontWeight: "bold",
              }}
            >
              {"NEW BOARD"}
            </DialogTitle>
            <DialogContent sx={{ padding: "25px" }}>
              <TextField
                variant="outlined"
                placeholder="Board Title"
                value={newBoard}
                onChange={(e) => setNewBoard(e.target.value)}
                sx={{ input: { color: "white" } }}
              />
            </DialogContent>
            <DialogActions sx={{ padding: " 0 25px 25px 25px" }}>
              <Button
                color={"inherit"}
                variant="outlined"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                fullWidth
                color={"success"}
                variant="contained"
                onClick={handleAddBoardButton}
                disabled={newBoard === ""}
              >
                Add
              </Button>
            </DialogActions>
          </Stack>
        </Dialog>
      </div>
    </Stack>
  );
}

export default Boards;
