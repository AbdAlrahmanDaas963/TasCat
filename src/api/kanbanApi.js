import axios from "axios";

const kanbanApi = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getBoards = async () => {
  const respone = await kanbanApi.get("/boards");
  return respone.data;
};

export const getBoard = async (boardId) => {
  // console.log("from getBoard boardId:>> ", boardId);
  if (!boardId) return null;

  try {
    const response = await kanbanApi.get(`/boards/${boardId}`);
    return response.data;
  } catch (error) {
    // Handle error if the request fails
    console.error("Error fetching board:", error);
    throw error;
  }
};

export const updateOnDrag = async (board) => {
  console.log("board query calling from to functions :>> ", board);
  // console.log("board query id :>> ", id);

  return await kanbanApi.put(`/boards/${board.id}/`, board, {
    headers: { "Cache-Control": "no-cache" },
  });
};

export const addBoard = async (board) => {
  return await kanbanApi.post("/boards", board, {
    headers: { "Cache-Control": "no-cache" },
  });
};

// export const createTask = async ({ boardId, updatedBoard }) => {
//   console.log("boardId from createTask API :>> ", boardId);
//   console.log("updatedBoard from createTask API :>> ", updatedBoard);
//   const response = await axios.post(`/boards/${boardId}/tasks`, updatedBoard);
//   return response.data;
// };

export const deleteBoard = async (board) => {
  console.log("api id :>> ", board.id);
  return await kanbanApi.delete(
    `/boards/${board.id.toString()}`,
    board.id.toString()
  );
};

export default kanbanApi;
