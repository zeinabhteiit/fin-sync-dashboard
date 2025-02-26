import React from "react";
import Sidebar from "./components/Sidebar";
import "./styles/sidebar.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default App;
