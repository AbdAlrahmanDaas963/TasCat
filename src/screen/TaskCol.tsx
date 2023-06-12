import React from "react";
import TaskCard from "./TaskCard";
import { StrictModeDroppable } from "../helpers/StrictModeDroppable";

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}

const TaskCol: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  console.log("list :>> ", list);
  return (
    <StrictModeDroppable droppableId={id}>
      {(provided) => (
        <div
          style={{
            padding: "24px 0",
            display: "flex",
            flexDirection: "column",
            marginTop: 8,
          }}
        >
          <h2 style={{ margin: 0, padding: "0 16px" }}>{id}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "120px",
              backgroundColor: "#ddd",
              borderRadius: 8,
              padding: 16,
              flexGrow: 1,
              marginTop: 8,
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <TaskCard key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default TaskCol;
