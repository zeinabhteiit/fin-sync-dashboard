import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await register(email, password);
        alert('Registration successful! Please log in.');
        setIsSignUp(false);
      } else {
        await login(email, password);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'pink', 
      height: '100vh', 
      width: '100vw', 
      marginLeft: '-500px',  // Changed to -500px
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ textAlign: 'center', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ color: 'purple' }}>Welcome to the Company Financial Tracker!</h1>
        <p style={{ color: 'purple' }}>Manage your finances efficiently!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ margin: '10px 10px', padding: '10px', borderRadius: '4px', border: '1px solid purple' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ margin: '10px 10px', padding: '10px', borderRadius: '4px', border: '1px solid purple' }}
          />

          {/* Login button now below the inputs */}
          <button type="submit" style={{ backgroundColor: 'purple', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>

          <p 
            onClick={() => setIsSignUp(!isSignUp)} 
            style={{ cursor: 'pointer', color: 'purple', textDecoration: 'underline', margin: '20px 0' }}
          >
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; 