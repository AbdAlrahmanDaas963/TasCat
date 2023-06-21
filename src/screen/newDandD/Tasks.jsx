import React from "react";

import { v4 as uuidv4 } from "uuid";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { updateOnDrag, getBoard } from "../../api/kanbanApi";

import { Stack, Typography } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import NewCol from "./NewCol";

function Tasks({ boardId, boardTitle = "gym" }) {
  const {
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
    // console.log("newTasks :>> ", newTasks);
    updateByDrag.mutate({
      tasks: newTasks,
      id: boardId,
      title: boardTitle,
    });
    await queryClient.refetchQueries("boards");
  };

  // !

  const addTask = async (formValues) => {
    console.log("formValues :>> ", formValues);
    const taskData = {
      id: uuidv4(), // Replace with a unique ID for the new task
      content: formValues.taskTitle,
      description: formValues.taskDescription,
    };

    const updatedBoard = JSON.parse(JSON.stringify(tasCat)); // Make a deep copy of the board object
    updatedBoard.tasks["todo"].push(taskData); // Add the new task to the appropriate status array

    console.log("updatedBoard :>> ", updatedBoard);
    updateByDrag.mutate({
      tasks: updatedBoard.tasks,
      id: updatedBoard.id,
      title: updatedBoard.title,
    });
    await queryClient.refetchQueries("boards");
  };
  const editTask = async (formValues) => {
    console.log("formValues from tasks editTask fun :>> ", formValues);
    // const updatedBoard = tasCat.tasks.map((taskItem) => {
    //   if (taskItem.id === formValues.id) {
    //     return { ...taskItem, ...formValues };
    //   }
    // });
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

    // const taskData = {
    //   id: uuidv4(), // Replace with a unique ID for the new task
    //   content: formValues.taskTitle,
    //   description: formValues.taskDescription,
    // };

    // const updatedBoard = JSON.parse(JSON.stringify(tasCat)); // Make a deep copy of the board object
    // updatedBoard.tasks["todo"].push(taskData); // Add the new task to the appropriate status array

    // console.log("updatedBoard :>> ", updatedBoard);
    updateByDrag.mutate({
      tasks: updatedBoard.tasks,
      id: updatedBoard.id,
      title: updatedBoard.title,
    });
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
  // if (tasCat) return <h1>^_^ {boardId} </h1>;

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
        {boardTitle.title}
      </Typography>
      <Stack marginTop={"50px"} direction={"row"} justifyContent={"center"}>
        <Stack
          sx={{
            margin: "0 50px",
            border: "0px solid white",
            borderRadius: "7px",
            padding: "0 50px",
            color: "white",
          }}
        >
          <h2>Todo</h2>
          {/* {todo && <NewCol tasks={tasCat.tasks.todo} status="todo" />} */}
          <NewCol
            handleAddTask={addTask}
            handleEditTask={editTask}
            boardId={boardId}
            tasks={tasCat.tasks.todo}
            status="todo"
          />
        </Stack>
        <Stack
          sx={{
            margin: "0 50px",
            border: "0px solid white",
            borderRadius: "7px",
            padding: "0 50px",
            color: "white",
          }}
        >
          <h2>Doing</h2>
          {/* {doing && <NewCol tasks={tasCat.tasks.doing} status="doing" />} */}
          <NewCol
            handleAddTask={addTask}
            handleEditTask={editTask}
            boardId={boardId}
            tasks={tasCat.tasks.doing}
            status="doing"
          />
        </Stack>
        <Stack
          sx={{
            margin: "0 50px",
            border: "0px solid white",
            borderRadius: "7px",
            padding: "0 50px",
            color: "white",
          }}
        >
          <h2>Done</h2>
          {/* {done && <NewCol tasks={tasCat.tasks.done} status="done" />} */}
          <NewCol
            handleAddTask={addTask}
            handleEditTask={editTask}
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
