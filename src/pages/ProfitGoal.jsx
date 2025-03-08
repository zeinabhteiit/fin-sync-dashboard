import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ReportChart from '../components/Analytics';

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
  const [editingId, setEditingId] = useState(null);
  const [editingTargetProfit, setEditingTargetProfit] = useState('');
  const [editingStartDate, setEditingStartDate] = useState('');
  const [editingEndDate, setEditingEndDate] = useState('');
  const [originalProfitGoal, setOriginalProfitGoal] = useState(null); // Store original profit goal being edited

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

  const handleEdit = (profitGoal) => {
    setEditingId(profitGoal.id);
    setEditingTargetProfit(profitGoal.target_profit != null ? profitGoal.target_profit : '');
    setEditingStartDate(profitGoal.start_date != null ? profitGoal.start_date: '');
    setEditingEndDate(profitGoal.end_date != null ? profitGoal.end_date : '');

    setOriginalProfitGoal({
      targetProfit: profitGoal.target_profit != null ? profitGoal.target_profit : '',
      startDate: profitGoal.start_date  != null ? profitGoal.start_date : '',
      endDate: profitGoal.end_date  != null ? profitGoal.end_date : '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setOriginalProfitGoal(null);
  };
  const handleUpdate = async (id) => {
    if (!originalProfitGoal) {
      setError('Original profit goal not found.');
      return;
    }

    const updatePayload = {};

    if (editingTargetProfit !== originalProfitGoal.targetProfit) {
      updatePayload.targetProfit = editingTargetProfit;
    }
    if (editingStartDate !== originalProfitGoal.startDate) {
      updatePayload.startDate = editingStartDate;
    }
    if (editingEndDate !== originalProfitGoal.endDate) {
      updatePayload.endDate = editingEndDate;
    }

    console.log("Final updatePayload:", updatePayload);

    if (Object.keys(updatePayload).length === 0) {
      setError('At least one field is required to update.');
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/profit-goals/${id}`,
        updatePayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response:", response.data); // Debugging

      if (response.status === 200) {
        setSuccess('Profit goal updated successfully!');
        setEditingId(null);
        setOriginalProfitGoal(null);
        fetchProfitGoals();
      } else {
        setError('Failed to update profit goal.');
      }
    } catch (err) {
      console.error('Error updating profit goal:', err.response?.data);
      setError(err.response?.data?.error || 'Failed to update profit goal');
    }
  };

  const currentProfitGoal = profitGoals.length > 0 ? profitGoals[0].target_profit : 0;

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
                {editingId === profitGoal.id ? (
                  <>
                    <div>
                      <label>Target Profit:</label>
                      <input
                        type="number"
                        value={editingTargetProfit}
                        onChange={(e) => setEditingTargetProfit(e.target.value || '')}
                      />
                    </div>
                    <div>
                      <label>Start Date:</label>
                      <input
                        type="date"
                        value={editingStartDate}
                        onChange={(e) => setEditingStartDate(e.target.value || '')}
                      />
                    </div>
                    <div>
                      <label>End Date:</label>
                      <input
                        type="date"
                        value={editingEndDate}
                        onChange={(e) => setEditingEndDate(e.target.value || '')}
                      />
                    </div>
                    <button onClick={() => handleUpdate(profitGoal.id)} style={styles.editButton}>
                      Update
                    </button>
                    <button onClick={handleCancelEdit} style={styles.cancelButton}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <strong>Target Profit:</strong> {profitGoal.target_profit} |
                    <strong> Start Date:</strong> {profitGoal.start_date} |
                    <strong> End Date:</strong> {profitGoal.end_date}
                    {userRole === 'superAdmin' && (
                      <>
                        <button onClick={() => handleEdit(profitGoal)} style={styles.editButton}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(profitGoal.id)} style={styles.deleteButton}>
                          Delete
                        </button>
                      </>
                    )}
                  </>
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
        <ReportChart profitGoal={currentProfitGoal} />
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
  editButton: {
    marginLeft: '10px',
    backgroundColor: 'pink',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  cancelButton: {
    marginLeft: '10px',
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};
