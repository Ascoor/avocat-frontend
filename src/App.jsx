import React from "react";
import { SidebarProvider } from "./utils/SidebarContext";
import Auth from "./components/layout/Auth";

import { Route, Routes } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext'; 
import useAuth from "./components/layout/AuthTool/AuthUser";
import Guest from "./components/layout/Guest";
const App = () => {

      const { getToken } = useAuth();
    return (
        <ThemeProvider>

        <SidebarProvider>
             <Routes>

        <Route
              path='*'
              element={!getToken() ? <Guest /> : <Auth />}
              />
              </Routes>
        </SidebarProvider>
        </ThemeProvider>
    );
};

export default App;
