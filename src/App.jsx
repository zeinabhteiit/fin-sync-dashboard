import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";  // Homepage component
import LoginPage from "./pages/LoginPage";  // Login page component
import DashboardPage from "./pages/DashboardPage";  // Dashboard page component
import AdminPanel from "./pages/AdminPanel";
import ProfitGoal from "./pages/ProfitGoal"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/dashboard" element={<DashboardPage />} />  
        <Route path="/admin" element={<AdminPanel />} />  
        <Route path="/profit" element={<ProfitGoal />} /> 
      </Routes>
    </Router>
  );
};

export default App;



