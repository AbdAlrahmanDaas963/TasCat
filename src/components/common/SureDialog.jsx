import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

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
      <Button color="error" variant="outlined" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open ? true : false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure to delete {boardName} Board ?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleDelete}>delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
