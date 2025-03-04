import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";  // Homepage component
import Login from "./pages/LoginPage";  // Login page component
import DashboardPage from "./pages/DashboardPage";  // Dashboard page component
import AdminPanel from "./pages/AdminPanel";
import ProfitGoal from "./pages/ProfitGoal"
import { AuthProvider } from './context/AuthContext';


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />  
        <Route path="/dashboard" element={<DashboardPage />} />  
        <Route path="/admin" element={<AdminPanel />} />  
        <Route path="/profit" element={<ProfitGoal />} /> 
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;



