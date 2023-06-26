import axios from "axios";

const Api = axios.create({
  baseURL: "https://my-json-server.typicode.com/AbdAlrahmanDaas963/json-data/",
});

// const Api = axios.create({
//   baseURL: "http://localhost:3000/",
// });

export const getBoard = async (boardId) => {
  if (!boardId) return null;

  try {
    const response = await Api.get(`/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching board:", error);
    throw error;
  }
};

export const addBoard = async (board) => {
  return await Api.post("/boards", board, {
    headers: { "Cache-Control": "no-cache" },
  });
};

export const deleteBoard = async (board) => {
  console.log("api id :>> ", board.id);
  return await Api.delete(
    `/boards/${board.id.toString()}`,
    board.id.toString()
  );
};

export const getBoards = async () => {
  const respone = await Api.get("/boards");
  return respone.data;
};
export const updateOnDrag = async (board) => {
  return await Api.put(`/boards/${board.id}/`, board, {
    headers: { "Cache-Control": "no-cache" },
  });
};
export default Api;
