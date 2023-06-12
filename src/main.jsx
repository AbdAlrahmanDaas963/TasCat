import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import theme from "./config/muiTheme";

import "./index.css";
import DragTasks from "./screen/DragTasks";
import Kanban from "./screen/kanbanBoard/Kanban";
import LandingPage from "./screen/Landing/LandingPage";
import NewBoard from "./screen/newDandD/NewBoard";
import LoginPage from "./screen/registration/LoginPage";
import SignupPage from "./screen/registration/SignupPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dragtasks",
    element: <DragTasks />,
  },
  {
    path: "/kanban",
    element: <Kanban />,
  },
  {
    path: "/newboard",
    element: <NewBoard />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);
