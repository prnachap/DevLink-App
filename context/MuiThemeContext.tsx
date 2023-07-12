"use client";
import { StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    custom: {
      hanPurple: string;
      paleViolet: string;
      Lavender: string;
      darkCharcoal: string;
      nickel: string;
      lightSilver: string;
      lotion: string;
      white: string;
      coralRed: string;
    };
  }
  interface PaletteOptions {
    custom: {
      hanPurple: string;
      paleViolet: string;
      Lavender: string;
      darkCharcoal: string;
      nickel: string;
      lightSilver: string;
      lotion: string;
      white: string;
      coralRed: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ["Instrument Sans", "sans-serif"].join(","),
  },
  palette: {
    custom: {
      hanPurple: "#633CFF",
      paleViolet: "#BEADFF",
      Lavender: "#EFEBFF",
      darkCharcoal: "#333333",
      nickel: "#737373",
      lightSilver: "#D9D9D9",
      lotion: "#FAFAFA",
      white: "#FFFFFF",
      coralRed: "#FF3939",
    },
  },
});
const MuiThemeContext = ({ children }: { children?: React.ReactNode }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeContext;
