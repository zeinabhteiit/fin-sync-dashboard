import axios from 'axios';
import { useEffect, useState } from 'react';

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/auth/admins', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAdmins(response.data.admins);
      } catch (error) {
        console.error('Error fetching admins:', error.response?.data?.error || error.message);
      }
    };

    fetchAdmins();
  }, []);

  const handleDeleteAdmin = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      await axios.delete(`/api/auth/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAdmins(admins.filter((admin) => admin.id !== adminId));
    } catch (error) {
      console.error('Error deleting admin:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div>
      <h2>All Admins</h2>
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

export default SuperAdminDashboard;
