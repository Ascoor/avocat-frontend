 
// App.jsx
import React from "react"; 
import { SidebarProvider } from "./utils/SidebarContext";
import ThemeProvider from "./utils/ThemeContext";
import {   Routes, Route } from "react-router-dom";
import AuthWrapper from "./components/layout/Auth";
import Guest from "./components/layout/Guest";
import useAuth from "./components/layout/AuthTool/AuthUser";
import { SpinnerProvider } from "./components/context/SpinnerContext";
import './App.css';

const App = () => {
  const { getToken } = useAuth();

  return (
    <ThemeProvider>
      <SpinnerProvider>
        <SidebarProvider>
 
            <Routes>
              <Route path="*" element={!getToken() ? <Guest /> : <AuthWrapper />} />
            </Routes>
      
        </SidebarProvider>
      </SpinnerProvider>
    </ThemeProvider>
  );
};

export default App;
