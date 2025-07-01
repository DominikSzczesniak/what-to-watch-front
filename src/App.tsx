import React, { useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { router } from "./router";
import { UserContext } from "./AppContext";

const App = () => {
  const [userId, setUserId] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ userId, setUserId }}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
