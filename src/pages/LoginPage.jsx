import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
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
    <div>
      <h1>Welcome to the Company Financial Tracker!</h1>
      <p>Manage your finances efficiently!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', color: 'blue' }}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default Login;