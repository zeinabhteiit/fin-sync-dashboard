import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "../styles/admin.css"

const API_URL = 'http://localhost:5000/api/auth'; // Adjust based on your backend

const AdminPanel = () => {
  const { user, token } = useAuth();
  const userRole = user?.role;

  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${API_URL}/admins`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Axios Response:', response);
        console.log('Axios Response Data:', response.data);

        if (response.data && response.data.admins) {
          setAdmins(response.data.admins);  
        } else if (response.data && typeof response.data === 'object' && response.data.error) {
          setError(response.data.error); 
        } else {
          console.log('No admins data or not an array');
          setAdmins([]); 
        }
      } catch (err) {
        console.error('Error fetching admins:', err);
        setError(err.response?.data?.error || 'Failed to fetch admins');
      }
    };

    if (token && userRole === 'superAdmin') {
      fetchAdmins();
    }
  }, [token, userRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== 'superAdmin') {
      setError('Unauthorized: Only Super Admins can create admins.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup-admin`, {
        email,
        password,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Create Admin Response:', response);
      setSuccess(response.data.message);
      setError(null);
      setEmail('');
      setPassword('');

      const updatedAdminsResponse = await axios.get(`${API_URL}/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (updatedAdminsResponse.data && updatedAdminsResponse.data.admins) {
        setAdmins(updatedAdminsResponse.data.admins);  
      } else {
        console.log('No updated admins data or not an array');
        setAdmins([]); 
      }
    } catch (err) {
      console.error('Error creating admin:', err);
      setError(err.response?.data?.error || 'Failed to create admin');
      setSuccess(null);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      if (userRole !== 'superAdmin') {
        setError('Unauthorized: Only Super Admins can delete admins.');
        return;
      }

      await axios.delete(`${API_URL}/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess('Admin deleted successfully');
      setError(null);

      const updatedAdminsResponse = await axios.get(`${API_URL}/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (updatedAdminsResponse.data && updatedAdminsResponse.data.admins) {
        setAdmins(updatedAdminsResponse.data.admins);  
      } else {
        console.log('No updated admins data or not an array');
        setAdmins([]); 
      }
    } catch (err) {
      console.error('Error deleting admin:', err);
      setError(err.response?.data?.error || 'Failed to delete admin');
      setSuccess(null);
    }
  };

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
