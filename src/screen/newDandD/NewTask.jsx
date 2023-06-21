import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import { Stack, Box, Typography, Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewTask({ task, index, status, editTask }) {
  const [openDel, setOpenDel] = React.useState(false);

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };
  // console.log("task from new task :>> ", task);
  const [formValues, setFormValues] = useState({
    content: task.content,
    description: task.description,
    status: status,
    id: task.id,
  });

  const [open, setOpen] = React.useState(false);

  const handleTitleChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      content: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      description: event.target.value,
    }));
  };

  const handleStatusChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      status: event.target.value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log("task :>> ", task, status);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues({
      content: "",
      description: "",
      status: status,
      id: task.id,
    });
  };

  const handleEdit = (event) => {
    handleClose();
    event.preventDefault();
    console.log(formValues);
    setFormValues({
      content: "",
      description: "",
      status: status,
      id: task.id,
    });
    editTask(formValues);
  };

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
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClickOpen}
            >
              Edit
            </Button>
            <div>
              <Button variant="text" color="error" onClick={handleClickOpenDel}>
                Del
              </Button>
              <Dialog
                open={openDel}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDel}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Sure to delete this Task?"}</DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDel}>cancel</Button>
                  <Button color="error" onClick={handleCloseDel}>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Edit"}</DialogTitle>
              <DialogContent>
                <FormControl>
                  <TextField
                    id="standard-basic"
                    label="task title"
                    variant="standard"
                    value={formValues.content}
                    onChange={handleTitleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="task description"
                    variant="standard"
                    value={formValues.description}
                    onChange={handleDescriptionChange}
                  />
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={status}
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel
                      value="todo"
                      control={<Radio />}
                      label="Todo"
                    />
                    <FormControlLabel
                      value="doing"
                      control={<Radio />}
                      label="Doing"
                    />
                    <FormControlLabel
                      value="done"
                      control={<Radio />}
                      label="Done"
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEdit}>Update</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      )}
    </Draggable>
  );
}

export default NewTask;
