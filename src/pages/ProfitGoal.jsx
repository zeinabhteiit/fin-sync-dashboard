import { useEffect, useState } from "react";
import supabase from "../supabase";
import { getAuthToken } from "../Auth";

const ProfitGoalComponent = () => {
  const [profitGoals, setProfitGoals] = useState([]);
  const [formData, setFormData] = useState({
    targetProfit: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profit goals
  useEffect(() => {
    fetchProfitGoals();
  }, []);

  const fetchProfitGoals = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("profit-goals").select("*");
      if (error) throw error;

      setProfitGoals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getAuthToken();
      if (!token) {
        setError("Authentication failed. Please log in again.");
        return;
      }

      const { targetProfit, startDate, endDate } = formData;
      if (!targetProfit || !startDate || !endDate) {
        setError("All fields are required.");
        return;
      }

      const { data, error } = await supabase
        .from("profit-goals")
        .insert([{ targetProfit, startDate, endDate }]);

      if (error) throw error;

      setProfitGoals([...profitGoals, data[0]]); // Update UI instantly
      setFormData({ targetProfit: "", startDate: "", endDate: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Set Profit Goal</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="targetProfit"
          value={formData.targetProfit}
          onChange={handleChange}
          placeholder="Target Profit"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Profit Goal"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Profit Goals List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {profitGoals.map((goal) => (
            <li
              key={goal.id}
              className="p-2 border rounded flex justify-between items-center"
            >
              <span>{goal.targetProfit} (From {goal.startDate} to {goal.endDate})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfitGoalComponent;
