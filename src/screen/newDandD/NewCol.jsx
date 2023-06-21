import React, { useState } from "react";
import NewTask from "./NewTask";
import { StrictModeDroppable } from "../../helpers/StrictModeDroppable";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Stack, TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewCol({ tasks, status, boardId, handleAddTask, handleEditTask }) {
  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    taskTitle: "",
    taskDescription: "",
    taskStatus: status,
  });

  const handleTitleChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      taskTitle: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      taskDescription: event.target.value,
    }));
  };

  const handleStatusChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      taskStatus: event.target.value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues({
      taskTitle: "",
      taskDescription: "",
      taskStatus: status,
    });
  };

  const handleSubmit = (event) => {
    handleClose();
    event.preventDefault();
    console.log(formValues);
    setFormValues({
      taskTitle: "",
      taskDescription: "",
      taskStatus: status,
    });
    handleAddTask(formValues);
  };

  if (!tasks) return <p>loading tasks</p>;
  return (
    <Stack width={"200px"}>
      <StrictModeDroppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <NewTask
                status={status}
                key={task.id}
                task={task}
                index={index}
                editTask={handleEditTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
      <div>
        <Button fullWidth variant="outlined" onClick={handleClickOpen}>
          Add +
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            Add new task for board with id = {boardId} and status = {status}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              adding new meaww
            </DialogContentText>
            <FormControl>
              <TextField
                id="standard-basic"
                label="task title"
                variant="standard"
                value={formValues.taskTitle}
                onChange={handleTitleChange}
              />
              <TextField
                id="standard-basic"
                label="task description"
                variant="standard"
                value={formValues.taskDescription}
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
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Stack>
  );
}

export default NewCol;
