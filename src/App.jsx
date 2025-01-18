 
// App.jsx
import React from "react"; 
import { SidebarProvider } from "./utils/SidebarContext";
import ThemeProvider from "./utils/ThemeContext";
import {   Routes, Route } from "react-router-dom";
import AuthWrapper from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import useAuth from "./components/auth/AuthUser";
import { SpinnerProvider } from "./context/SpinnerContext";
import './App.css';

const App = () => {
  const { getToken } = useAuth();

  return (
    <ThemeProvider>
      <SpinnerProvider>
        <SidebarProvider>
 
            <Routes>
              <Route path="*" element={!getToken() ? <HomePage /> : <AuthWrapper />} />
            </Routes>
      
        </SidebarProvider>
      </SpinnerProvider>
    </ThemeProvider>
  );
};

export default App;
