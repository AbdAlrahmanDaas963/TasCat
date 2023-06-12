import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { updateOnDrag } from "../../api/kanbanApi";

import { Stack, Typography } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import NewCol from "./NewCol";

function NewBoard() {
  const location = useLocation();
  // const data = location.state?.data;

  const [board, setBoard] = useState(location.state?.data);
  const [tasks, setTasks] = useState(board.tasks);

  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const queryClient = useQueryClient();

  // const initialData = {
  //   todo: [
  //     { id: "task1", content: "Task 1", status: "todo" },
  //     { id: "task2", content: "Task 2", status: "todo" },
  //     // Add more tasks
  //   ],
  //   doing: [
  //     // Tasks in the "Doing" column
  //   ],
  //   done: [
  //     // Tasks in the "Done" column
  //   ],
  // };

  // console.log("data :>> ", data);

  // const todo = data.todo[0].list;
  // const doing = data.doing[0].list;
  // const done = data.done[0].list;

  const updateByDrag = useMutation(updateOnDrag, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });

  useEffect(() => {
    console.log("board :>> ", board);
    console.log("board mutation :>> ", tasks);

    async function update() {
      updateByDrag.mutate({
        tasks: tasks,
        id: board.id,
        title: board.title,
      });
      await queryClient.refetchQueries("boards");
    }
    update();
    // setBoard(data);
    if (board) {
      setTodo(tasks.todo ? tasks.todo : []);
      setDoing(tasks.doing ? tasks.doing : []);
      setDone(tasks.done ? tasks.done : []);
    }
  }, [board, tasks]);

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
      const sourceColumnTasks = Array.from(tasks[sourceColumnId]);

      // Retrieve the task from the source column
      const task = sourceColumnTasks[source.index];

      // Remove the task from the source column
      sourceColumnTasks.splice(source.index, 1);

      // Insert the task into the same column at the correct index
      sourceColumnTasks.splice(destination.index, 0, task);

      // Update the board with the new task positions
      const updatedBoard = {
        ...tasks,
        [sourceColumnId]: sourceColumnTasks,
      };

      // Update the state with the updated board
      setTasks(updatedBoard);
    } else {
      // Handle moving between columns
      // Retrieve the source and destination column tasks
      const sourceColumnTasks = Array.from(tasks[sourceColumnId]);
      const destinationColumnTasks = Array.from(tasks[destinationColumnId]);

      // Retrieve the task from the source column
      const task = sourceColumnTasks[source.index];

      // Remove the task from the source column
      sourceColumnTasks.splice(source.index, 1);

      // Insert the task into the destination column at the correct index
      destinationColumnTasks.splice(destination.index, 0, task);

      // Update the board with the new task positions
      const updatedBoard = {
        ...tasks,
        [sourceColumnId]: sourceColumnTasks,
        [destinationColumnId]: destinationColumnTasks,
      };

      // Update the state with the updated board
      setTasks(updatedBoard);
    }

    // console.log("board mutation :>> ", tasks);

    // updateByDrag.mutate({
    //   tasks: tasks,
    //   id: board.id,
    //   title: board.title,
    // });
    // await queryClient.refetchQueries("boards");
  };

  if (!board) return <h1>Loading ...</h1>;

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
        {board.title}
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
          {todo && <NewCol tasks={todo} status="todo" />}
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
          {doing && <NewCol tasks={doing} status="doing" />}
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
          {done && <NewCol tasks={done} status="done" />}
        </Stack>
      </Stack>
    </DragDropContext>
  );
}

export default NewBoard;
