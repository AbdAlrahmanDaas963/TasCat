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
import Boards from "./screen/kanbanBoard/Boards";
import LandingPage from "./screen/Landing/LandingPage";
import Tasks from "./screen/newDandD/Tasks";
import LoginPage from "./screen/registration/LoginPage";
import SignupPage from "./screen/registration/SignupPage";
import Drawer from "./screen/newDandD/drawer/Drawer";
import App from "./App";

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
    path: "/boards",
    element: <Boards />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/app",
    element: <App />,
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
