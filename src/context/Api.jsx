import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust based on your backend

// Sign Up (Admin or Super Admin)
export const signUp = async (email, password, isSuperAdmin = false) => {
  const endpoint = isSuperAdmin ? '/create-super-admin' : '/signup-admin';
  return await axios.post(`${API_URL}${endpoint}`, { email, password });
};

// Sign In
export const signIn = async (email, password) => {
  return await axios.post(`${API_URL}/signin`, { email, password });
};

// Sign Out
export const signOut = async () => {
  return await axios.post(`${API_URL}/signout`);
};

// Get All Admins (Super Admin Only)
export const getAllAdmins = async (token) => {
  return await axios.get(`${API_URL}/admins`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete Admin (Super Admin Only)
export const deleteAdmin = async (adminId, token) => {
  return await axios.delete(`${API_URL}/admin/${adminId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
