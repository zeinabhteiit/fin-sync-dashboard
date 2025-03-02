import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";  // Homepage component
import LoginPage from "./pages/LoginPage";  // Login page component
import DashboardPage from "./pages/DashboardPage";  // Dashboard page component
//import AdminPanel from "./pages/AdminPanel";  // Admin panel page component
// import Categories from "./pages/Categories";  // Categories page component
//import Transactions from "./pages/Transactions";  // Transactions page component
//import Analytics from "./pages/Analytics";  // Analytics page component
// import Logout from "./pages/Logout";  // Logout page component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Homepage */}
        <Route path="/login" element={<LoginPage />} />  {/* Login Page */}
        <Route path="/dashboard" element={<DashboardPage />} />  {/* Dashboard */}
        {/* <Route path="/admin" element={<AdminPanel />} />  Admin Panel */}
        {/* <Route path="/categories" element={<Categories />} />  Categories */}
        {/* <Route path="/transactions" element={<Transactions />} />  Transactions */}
        {/* <Route path="/analytics" element={<Analytics />} />  Analytics */}
        {/* <Route path="/logout" element={<Logout />} />  Logout */}
      </Routes>
    </Router>
  );
};

export default App;



