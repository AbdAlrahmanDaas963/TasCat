import React from "react";

import { Input, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { Draggable } from "react-beautiful-dnd";
import RowRadioButtonsGroup from "../components/RowRadioButtonsGroup";

interface ItemProps {
  text: string;
  index: number;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TaskCard: React.FC<ItemProps> = ({ text, index }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Draggable draggableId={text} index={index}>
        {(provided) => (
          <Stack
            onClick={handleClickOpen}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {text}
          </Stack>
        )}
      </Draggable>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Task"}</DialogTitle>

        <DialogContent id="alert-dialog-slide-description">
          <Stack>
            <TextField
              id="standard-helperText"
              label="Title"
              defaultValue="Default"
              variant="standard"
            />
            <TextField
              id="standard-helperText2"
              label="Description"
              defaultValue="Default Value"
              variant="standard"
            />
          </Stack>
          <RowRadioButtonsGroup />
        </DialogContent>

        <DialogActions>
          <Button color={"inherit"} onClick={handleClose}>
            Close
          </Button>
          <Button color={"success"} onClick={handleClose}>
            Save
          </Button>
          <Button color={"error"} onClick={handleClose}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskCard;
