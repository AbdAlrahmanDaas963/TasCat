import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { updateOnDrag, getBoard } from "../../api/kanbanApi";

import { Box, Stack, Typography } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import NewCol from "./NewCol";

function Tasks({ boardId, boardTitle }) {
  // const [title, setTitle] = useState(boardTitle);
  const {
    refetch,
    isLoading,
    isError,
    error,
    data: tasCat,
  } = useQuery(["board", boardId], () => getBoard(boardId));

  console.log("tasCat :>> ", tasCat);
  // console.log("todo :>> ", todo);

  const queryClient = useQueryClient();
  const updateByDrag = useMutation(updateOnDrag, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });

  const updateBoards = async (newTasks) => {
    updateByDrag.mutate({
      tasks: newTasks,
      id: tasCat.id,
      title: tasCat.title,
    });
    setTimeout(() => {
      refetch();
    }, 200);
    await queryClient.refetchQueries("boards");
  };

  const addTask = async (formValues) => {
    const taskData = {
      id: uuidv4(),
      content: formValues.taskTitle,
      description: formValues.taskDescription,
    };

    const updatedBoard = JSON.parse(JSON.stringify(tasCat)); // Make a deep copy of the board object
    updatedBoard.tasks[formValues.taskStatus].push(taskData); // Add the new task to the appropriate status array

    updateByDrag.mutate({
      tasks: updatedBoard.tasks,
      id: updatedBoard.id,
      title: updatedBoard.title,
    });
    setTimeout(() => {
      refetch();
    }, 200);
    await queryClient.refetchQueries("boards");
    queryClient.refetchQueries();
  };

  const deleteTask = async (taskId) => {
    console.log("taskId :>> ", taskId);

    const updatedBoard = tasCat;

    for (const status in updatedBoard.tasks) {
      if (Object.prototype.hasOwnProperty.call(updatedBoard.tasks, status)) {
        const tasks = updatedBoard.tasks[status];

        // Find the index of the task with the given ID
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          // Delete the task from the array
          tasks.splice(taskIndex, 1);

          console.log("Task deleted successfully.");

          // Exit the loop since the task is found and deleted
          console.log("updatedBoard :>> ", updatedBoard);
          updateByDrag.mutate({
            tasks: updatedBoard.tasks,
            id: updatedBoard.id,
            title: updatedBoard.title,
          });

          await queryClient.refetchQueries("boards");
          return;
        }
      }
    }
  };
  const editTask = async (formValues) => {
    console.log("formValues from tasks editTask fun :>> ", formValues);

    const updatedBoard = {
      ...tasCat,
      tasks: {
        ...tasCat.tasks,
        todo: tasCat.tasks.todo.map((task) =>
          task.id === formValues.id ? { ...task, ...formValues } : task
        ),
        doing: tasCat.tasks.doing.map((task) =>
          task.id === formValues.id ? { ...task, ...formValues } : task
        ),
        done: tasCat.tasks.done.map((task) =>
          task.id === formValues.id ? { ...task, ...formValues } : task
        ),
      },
    };
    console.log("updatedBoard from tasks editTask fun :>> ", updatedBoard);

    updateByDrag.mutate({
      tasks: updatedBoard.tasks,
      id: updatedBoard.id,
      title: updatedBoard.title,
    });
    setTimeout(() => {
      refetch();
    }, 200);
    await queryClient.refetchQueries("boards");
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // Check if the destination is a valid drop target
    if (!destination) {
      return;
    }

    // Retrieve the source and destination column IDs
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    // Check if the task was dropped in the same column or a different column
    const isSameColumn = sourceColumnId === destinationColumnId;

    // Handle reordering within the same column
    if (isSameColumn) {
      // Retrieve the source column tasks
      const sourceColumnTasks = Array.from(tasCat.tasks[sourceColumnId]);

      // Retrieve the task from the source column
      const task = sourceColumnTasks[source.index];

      // Remove the task from the source column
      sourceColumnTasks.splice(source.index, 1);

      // Insert the task into the same column at the correct index
      sourceColumnTasks.splice(destination.index, 0, task);

      // Update the board with the new task positions
      const updatedBoard = {
        ...tasCat.tasks,
        [sourceColumnId]: sourceColumnTasks,
      };

      // Update the state with the updated board
      //? setTasks(updatedBoard);
      updateBoards(updatedBoard);
    } else {
      // Handle moving between columns
      // Retrieve the source and destination column tasks
      const sourceColumnTasks = Array.from(tasCat.tasks[sourceColumnId]);
      const destinationColumnTasks = Array.from(
        tasCat.tasks[destinationColumnId]
      );

      // Retrieve the task from the source column
      const task = sourceColumnTasks[source.index];

      // Remove the task from the source column
      sourceColumnTasks.splice(source.index, 1);

      // Insert the task into the destination column at the correct index
      destinationColumnTasks.splice(destination.index, 0, task);

      // Update the board with the new task positions
      const updatedBoard = {
        ...tasCat.tasks,
        [sourceColumnId]: sourceColumnTasks,
        [destinationColumnId]: destinationColumnTasks,
      };

      // Update the state with the updated board
      //? setTasks(updatedBoard);
      updateBoards(updatedBoard);
    }

    // console.log("board mutation :>> ", tasks);

    // updateByDrag.mutate({
    //   tasks: tasks,
    //   id: board.id,
    //   title: board.title,
    // });
    // await queryClient.refetchQueries("boards");
  };

  if (isLoading) return <h1>it is loading...</h1>;
  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!boardId) return <h1>Please choose board to view!</h1>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Typography
        color={"white"}
        sx={{
          fontFamily: "Patrick Hand SC, cursive",
          fontSize: "40px",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        {tasCat.title}
      </Typography>
      <Stack
        marginTop={"50px"}
        display={"flex"}
        flexWrap={"wrap"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Stack
          sx={{
            marginBottom: "50px",
            border: "0px solid white",
            borderRadius: "7px",
            padding: "0 10px",
            color: "white",
          }}
        >
          <Box
            sx={{
              padding: "0px 16px 0px 16px",
              borderRadius: "8px",
              justify: "space-between",
              background: "#8E8EFF5E",
              boxShadow: "0px 2px 5px 0px #00000040",
              fontSize: "20px",
              fontWeight: "300",

              height: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Todo
          </Box>
          <NewCol
            handleAddTask={addTask}
            handleEditTask={editTask}
            handleDeleteTask={deleteTask}
            boardId={boardId}
            tasks={tasCat.tasks.todo}
            status="todo"
          />
        </Stack>
        <Stack
          sx={{
            marginBottom: "50px",
            border: "0px solid white",
            borderRadius: "7px",
            padding: "0 10px",
            color: "white",
          }}
        >
          <Box
            sx={{
              padding: "0px 16px 0px 16px",
              borderRadius: "8px",
              justify: "space-between",
              background: "#8E8EFF5E",
              boxShadow: "0px 2px 5px 0px #00000040",
              fontSize: "20px",
              fontWeight: "300",

              height: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Doing
          </Box>
          <NewCol
            handleAddTask={addTask}
            handleEditTask={editTask}
            handleDeleteTask={deleteTask}
            boardId={boardId}
            tasks={tasCat.tasks.doing}
            status="doing"
          />
        </Stack>
        <Stack
          sx={{
            marginBottom: "50px",
            border: "0px solid white",
            borderRadius: "7px",
            padding: "0 10px",
            color: "white",
          }}
        >
          <Box
            sx={{
              padding: "0px 16px 0px 16px",
              borderRadius: "8px",
              justify: "space-between",
              background: "#8E8EFF5E",
              boxShadow: "0px 2px 5px 0px #00000040",
              fontSize: "20px",
              fontWeight: "300",

              height: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Done
          </Box>
          <NewCol
            handleAddTask={addTask}
            handleEditTask={editTask}
            handleDeleteTask={deleteTask}
            boardId={boardId}
            tasks={tasCat.tasks.done}
            status="done"
          />
        </Stack>
      </Stack>
    </DragDropContext>
  );
}

export default Tasks;
