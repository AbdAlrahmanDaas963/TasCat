import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SureDialog({
  openSure,
  sureDelete,
  boardId,
  boardName,
}) {
  const [open, setOpen] = React.useState(openSure);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    sureDelete(boardId);
  };

  return (
    <div>
      <Button
        endIcon={<DeleteIcon />}
        color="error"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open ? true : false}
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
            Are you sure to delete {boardName} Board ?
          </DialogTitle>

          <DialogActions sx={{ padding: " 0 25px 25px 25px" }}>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              delete
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
}
