import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  typography: {
    h3: {
      fontSize: "3rem",
      color: "white",
    },
  },
});

export default theme;
