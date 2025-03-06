import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfitGoal = () => {
  const { user, token } = useAuth();
  const userId = user?.id;
  const userRole = user?.role;

  const [profitGoals, setProfitGoals] = useState([]);
  const [targetProfit, setTargetProfit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchProfitGoals();
  }, [token]);

  const fetchProfitGoals = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/profit-goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setProfitGoals(response.data);
      } else {
        setProfitGoals([]);
      }
    } catch (err) {
      console.error('Error fetching profit goals:', err);
      setError(err.response?.data?.error || 'Failed to fetch profit goals');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== 'superAdmin') {
      setError('Unauthorized: Only Super Admins can create profit goals.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/profit-goals`,
        { targetProfit, startDate, endDate, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(response.data.message);
      setError(null);
      setTargetProfit('');
      setStartDate('');
      setEndDate('');
      fetchProfitGoals();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create profit goal');
      setSuccess(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this profit goal?')) return;
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/profit-goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setSuccess('Profit goal deleted successfully!');
        fetchProfitGoals();
      } else {
        setError('Failed to delete profit goal.');
      }
    } catch (err) {
      console.error('Error deleting profit goal:', err);
      setError(err.response?.data?.error || 'Failed to delete profit goal');
    }
  };
  
  
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2>Profit Goals</h2>
        {error && <p style={{ color: 'purple' }}>{error}</p>}
        {success && <p style={{ color: 'pink' }}>{success}</p>}

        <ul>
          {profitGoals.length > 0 ? (
            profitGoals.map((profitGoal) => (
              <li key={profitGoal.id}>
                <strong>Target Profit:</strong> {profitGoal.target_profit} |
                <strong> Start Date:</strong> {profitGoal.start_date} |
                <strong> End Date:</strong> {profitGoal.end_date}
                {userRole === 'superAdmin' && (
                  <button onClick={() => handleDelete(profitGoal.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                )}
              </li>
            ))
          ) : (
            <p>No profit goals found.</p>
          )}
        </ul>

        {userRole === 'superAdmin' ? (
          <div>
            <h2>Create Profit Goal</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Target Profit:</label>
                <input type="number" value={targetProfit} onChange={(e) => setTargetProfit(e.target.value)} required />
              </div>
              <div>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
              </div>
              <button type="submit">Create Profit Goal</button>
            </form>
          </div>
        ) : (
          <p>You are not authorized to create profit goals.</p>
        )}
      </div>
    </div>
  );
};

export default ProfitGoal;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  content: {
    width: '100%',
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
  },
  deleteButton: {
    marginLeft: '10px',
    backgroundColor: 'pink',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};
