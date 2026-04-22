import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#012244" : "#00152e",
      },
      secondary: {
        main: mode === "light" ? "#1976d2" : "#1976d2",
      },
      orcado: {
        main: "#0081A8",
        light: "#B8DAF7",
      },
      realizado: {
        main: "#5E9134",
        light: "#c7DAB6",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
  });
