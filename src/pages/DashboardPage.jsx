import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Transactions from "../components/Transactions";
import Analytics from "../components/Analytics";
import Card from "../components/Card";
import "../styles/Dashboard.css"; // Correct path to your CSS file

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession(); // Check session from Supabase

      console.log("Session:", session);  // Log session for debugging
      if (error) {
        console.error("Error fetching session:", error);
      }

      if (!session) {
        navigate("/login");  // If no session, navigate to login page
      } else {
        setUser(session.user);  // Set user if session exists
        setLoading(false);  // Stop loading once session is confirmed
      }
    };

    checkSession();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;  // Loading message

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>FinSync</h1>
        {user ? (
           <p> Dashboard </p>
          // <p>Welcome, {user.email}</p> // Display the user email if session exists
        ) : (
          <p>No user found</p>
        )}
        
        {/* Dashboard Widgets Section */}
        <div className="dashboard-widgets">
          <Card />
          <Analytics />
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


