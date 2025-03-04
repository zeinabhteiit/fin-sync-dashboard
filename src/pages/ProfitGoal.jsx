import axios from 'axios';
import { useEffect, useState } from 'react';


const ProfitGoals = ({ userRole }) => {
  const [profitGoals, setProfitGoals] = useState([]); // ✅ Ensures initial state is an array
  const [targetProfit, setTargetProfit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfitGoals = async () => {
      try {
        const response = await axios.get(`https://fin-sync.onrender.com/api/profit-goals`);
        console.log('Axios Response:', response);
        console.log('Axios Response Data:', response.data);
    
        if (response.data && Array.isArray(response.data)) {
          setProfitGoals(response.data);  // Set the array directly
        } else if (response.data && typeof response.data === 'object' && response.data.error) {
          setError(response.data.error); // Handle error response
        } else {
          console.log('No profit goals data or not an array');
          setProfitGoals([]); // If no data or not an array, set empty
        }
      } catch (err) {
        console.error('Error fetching profit goals:', err);
        setError(err.response?.data?.error || 'Failed to fetch profit goals');
      }
    };
    
    fetchProfitGoals();
  }, []);

  // Handle form submission (Super Admin only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== 'superAdmin') {
      setError('Unauthorized: Only Super Admins can create profit goals.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/profit-goals`, {
        targetProfit,
        startDate,
        endDate,
        userId,
      });

      console.log('Create Profit Goal Response:', response);
      setSuccess(response.data.message);
      setError(null);
      setTargetProfit('');
      setStartDate('');
      setEndDate('');
      setUserId('');

      // Refresh the list after successful creation
      const updatedGoals = await axios.get(`${API_URL}/profit-goals`);
      console.log('Updated Profit Goals Response:', updatedGoals);
      if (updatedGoals.data && Array.isArray(updatedGoals.data)) {
        setProfitGoals(updatedGoals.data);  // Set the updated array directly
      } else {
        console.log('No updated profit goals data or not an array');
        setProfitGoals([]); // If no data or not an array, set empty
      }
    } catch (err) {
      console.error('Error creating profit goal:', err);
      setError(err.response?.data?.error || 'Failed to create profit goal');
      setSuccess(null);
    }
  };

  return (
    <div>
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

      {userRole === 'superAdmin' && (
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
            <div>
              <label>User ID:</label>
              <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </div>
            <button type="submit">Create Profit Goal</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfitGoals;
