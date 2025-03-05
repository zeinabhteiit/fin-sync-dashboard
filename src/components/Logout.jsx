import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutLink = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the signOutUser function on the backend
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <li>
      <button onClick={handleLogout}>Logout</button>
    </li>
  );
};

export default LogoutLink;
