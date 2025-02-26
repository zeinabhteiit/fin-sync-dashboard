import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "./styles/global.css";
import "./styles/dashboard.css";
import "./styles/sidebar.css";

const App = () => {
  return (
    <div className="app">
      <Dashboard />
    </div>
  );
};


export default App;
