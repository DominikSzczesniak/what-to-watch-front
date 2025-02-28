import React from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App;
