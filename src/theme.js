import { createTheme } from "@mui/material/styles";

const darkBg = "#0D0F1A";
const darkPaper = "#161929";

export function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: "#6C63FF", light: "#8B83FF", dark: "#4F46E5" },
      secondary: { main: "#FF6B9D" },
      success: { main: "#00D4AA" },
      warning: { main: "#FFB547" },
      error: { main: "#FF5252" },
      background: {
        default: mode === "dark" ? darkBg : "#F0F2F8",
        paper: mode === "dark" ? darkPaper : "#FFFFFF",
      },
      text: {
        primary: mode === "dark" ? "#E8EAF6" : "#1A1D2E",
        secondary: mode === "dark" ? "#9CA3C4" : "#6B7194",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h4: { fontWeight: 800, letterSpacing: "-0.02em" },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 10,
            padding: "8px 20px",
          },
          contained: {
            boxShadow: "0 4px 14px rgba(108, 99, 255, 0.35)",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(108, 99, 255, 0.5)",
              transform: "translateY(-1px)",
            },
          },
          outlined: {
            borderWidth: 2,
            "&:hover": { borderWidth: 2 },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: "none",
            border: mode === "dark"
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.04)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none", borderRadius: 16 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, fontSize: "0.75rem" },
        },
      },
    },
  });
}
