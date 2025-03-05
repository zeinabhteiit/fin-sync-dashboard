import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "../styles/Admin.css";

const API_URL = 'http://localhost:5000/api/auth'; // Adjust based on your backend

const AdminPanel = () => {
  const { user, token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get userId & role safely
  const userId = user?.id;
  const userRole = user?.role ; // Normalize role

  // Debugging logs
  useEffect(() => {
    console.log("User:", user);
    console.log("Token:", token);
    console.log("User Role:", userRole);
  }, [user, token, userRole]);

  // Fetch Admins if Super Admin
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }
        if (userRole !== 'superAdmin') {
          setError('Unauthorized: Only Super Admins can access this panel.');
          return;
        }

        console.log("Fetching admins with token:", token);
        const response = await axios.get(`${API_URL}/admins`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(response.data);
      } catch (err) {
        console.error('Error fetching admins:', err);
        setError(err.response?.data?.error || 'Failed to fetch admins');
      }
    };

    fetchAdmins();
  }, [token, userRole]);

  // Create Admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        setError('No token found.');
        return;
      }
      
      const response = await axios.post(`${API_URL}/create-admin`, 
        { email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(response.data.message);
      setError(null);
      setEmail('');
      setPassword('');

      // Refresh admin list
      const updatedAdmins = await axios.get(`${API_URL}/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(updatedAdmins.data);
    } catch (err) {
      console.error('Error creating admin:', err);
      setError(err.response?.data?.error || 'Failed to create admin');
      setSuccess(null);
    }
  };

  // Delete Admin
  const handleDeleteAdmin = async (adminId) => {
    try {
      if (!token) {
        setError('No token found.');
        return;
      }

      await axios.delete(`${API_URL}/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess('Admin deleted successfully');
      setError(null);

      // Refresh admin list
      const updatedAdmins = await axios.get(`${API_URL}/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(updatedAdmins.data);
    } catch (err) {
      console.error('Error deleting admin:', err);
      setError(err.response?.data?.error || 'Failed to delete admin');
      setSuccess(null);
    }
  };

  // Block access if not super admin
  if (!token) {
    return <p>You need to log in to access the admin panel.</p>;
  }

  if (userRole !== 'superAdmin') {
    return <p>You are not authorized to access the admin panel.</p>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <h3>Create Admin</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Create Admin</button>
      </form>

      <h3>All Admins</h3>
      <ul>
        {admins.length > 0 ? (
          admins.map((admin) => (
            <li key={admin.id}>
              <strong>Email:</strong> {admin.email} |
              <strong> Role:</strong> {admin.role} |
              <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No admins found.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;
