import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    orcado: Palette["primary"];
    realizado: Palette["primary"];
  }
  interface PaletteOptions {
    orcado?: PaletteOptions["primary"];
    realizado?: PaletteOptions["primary"];
  }
}
