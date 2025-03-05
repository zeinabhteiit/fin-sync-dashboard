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
    const fetchProfitGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profit-goals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Axios Response:', response);
        console.log('Axios Response Data:', response.data);

        if (response.data && Array.isArray(response.data)) {
          setProfitGoals(response.data);  
        } else if (response.data && typeof response.data === 'object' && response.data.error) {
          setError(response.data.error); 
        } else {
          console.log('No profit goals data or not an array');
          setProfitGoals([]); 
        }
      } catch (err) {
        console.error('Error fetching profit goals:', err);
        setError(err.response?.data?.error || 'Failed to fetch profit goals');
      }
    };

    fetchProfitGoals();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== 'superAdmin') {
      setError('Unauthorized: Only Super Admins can create profit goals.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/profit-goals`, {
        targetProfit,
        startDate,
        endDate,
        userId: userId, // Automatically include user ID from auth context
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Create Profit Goal Response:', response);
      setSuccess(response.data.message);
      setError(null);
      setTargetProfit('');
      setStartDate('');
      setEndDate('');

      const updatedGoals = await axios.get(`http://localhost:5000/api/profit-goals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Updated Profit Goals Response:', updatedGoals);
      if (updatedGoals.data && Array.isArray(updatedGoals.data)) {
        setProfitGoals(updatedGoals.data);  
      } else {
        console.log('No updated profit goals data or not an array');
        setProfitGoals([]); 
      }
    } catch (err) {
      console.error('Error creating profit goal:', err);
      setError(err.response?.data?.error || 'Failed to create profit goal');
      setSuccess(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2>Profit Goals</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <ul>
          {profitGoals.length > 0 ? (
            profitGoals.map((profitGoal) => (
              <li key={profitGoal.id}>
                <strong>Target Profit:</strong> {profitGoal.target_profit} |
                <strong> Start Date:</strong> {profitGoal.start_date} |
                <strong> End Date:</strong> {profitGoal.end_date}
              </li>
            ))
          ) : (
            <p>No profit goals found. (Check console logs!)</p>
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
    marginLeft: '500px'
  },
  content: {
    width: '100%',
    maxWidth: '800px', 
    padding: '20px',
    backgroundColor: '#fff', 
    borderRadius: '8px', 
  },
};
