import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL; // Define the API_URL

const AdminPanel = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/admins`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
  
        console.log("API Response:", response.data); // Debugging log
  
        setAdmins(response.data.admins || []); // Ensure it's always an array
      } catch (error) {
        console.error('Error fetching admins:', error.response?.data?.error || error.message);
        setAdmins([]); // Set empty array to avoid undefined issues
      }
    };
  
    fetchAdmins();
  }, []);
  
  const handleDeleteAdmin = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      await axios.delete(`${API_URL}/api/auth/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAdmins(admins.filter((admin) => admin.id !== adminId));
    } catch (error) {
      console.error('Error deleting admin:', error.response?.data?.error || error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/signout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Clear the token from local storage
      localStorage.removeItem('token');
      // Optionally redirect the user or update the state
      window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      console.error('Error signing out:', error.response?.data?.error || error.message);
    }
  };
  

  return (
    <div>
      <h2>All Admins</h2>
      <button onClick={handleSignOut}>Sign Out</button> {/* Add Sign Out button */}
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.name} - {admin.email} 
            <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;