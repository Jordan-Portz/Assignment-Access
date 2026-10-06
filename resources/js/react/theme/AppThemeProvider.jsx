import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

import { ColorModeContext } from "./ColorModeContext";

export default function AppThemeProvider({ children }) {
    const mode = "light";

    useEffect(() => {
        try {
            localStorage.setItem("color-mode", mode);
        } catch {
            // ignore
        }
    }, []);

    const theme = createTheme({
        palette: {
            mode,
            primary: { main: "#007680" },
            secondary: { main: "#6A1B9A" },
        },
        shape: { borderRadius: 8 },
    });

    return (
        <ColorModeContext.Provider value={{ mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
