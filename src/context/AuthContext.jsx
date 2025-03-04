import { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signOut, signUpAdmin } from '../context/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await signIn(email, password);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setToken(response.data.access_token);
    } catch (error) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  };
    // Register admin function
    const register = async (email, password) => {
        try {
          const response = await signUpAdmin(email, password);
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setUser(response.data.user);
          setToken(response.data.access_token);
        } catch (error) {
          console.error(error.response.data.error);
          throw new Error(error.response.data.error);
        }
      };

  const logout = async () => {
    await signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
