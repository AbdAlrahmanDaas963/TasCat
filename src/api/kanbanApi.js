import axios from "axios";

const kanbanApi = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getBoards = async () => {
  const respone = await kanbanApi.get("/boards");
  return respone.data;
};

export const updateOnDrag = async (board) => {
  console.log("board query :>> ", board);
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

export const deleteBoard = async (board) => {
  console.log("api id :>> ", board.id);
  return await kanbanApi.delete(
    `/boards/${board.id.toString()}`,
    board.id.toString()
  );
};

export default kanbanApi;
