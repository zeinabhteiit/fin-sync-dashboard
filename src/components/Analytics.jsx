import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";
const endpoints = [
    "fixed-income",
    "fixed-expenses",
    "recurring-expenses",
    "recurring-incomes"
];

const INCOME_CATEGORY_ID = "a225765f-8d0c-4c87-86e1-360d48e0ff3d";
const EXPENSE_CATEGORY_ID = "09315312-047c-43d5-8106-2aec9047e119";

const ReportChart = ({ profitGoal }) => {
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    endpoints.map(endpoint => axios.get(`${API_BASE}/${endpoint}`))
                );

                const combinedData = responses.flatMap(res => res.data);
                setData(combinedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (profitGoal && data.length > 0) { // Ensure data is loaded
            const calculateProgress = () => {
                // Filter data for the year
                const currentYear = new Date().getFullYear();
                const yearlyData = data.filter(item => {
                    const itemDate = new Date(item.date || item.start);
                    return itemDate.getFullYear() === currentYear;
                });

                const totalIncome = yearlyData
                    .filter(item => item.category_id === INCOME_CATEGORY_ID)
                    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

                const totalExpenses = yearlyData
                    .filter(item => item.category_id === EXPENSE_CATEGORY_ID)
                    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

                const netProfit = totalIncome - totalExpenses;
                const newProgress = Math.min((netProfit / profitGoal) * 100, 100);
                setProgress(newProgress);
            };

            calculateProgress();
        }
    }, [data, profitGoal]);

    return (
        <div>
            <h3>Yearly Progress Towards Goal: {progress.toFixed(2)}%</h3>
            <div style={{
                width: '100%',
                backgroundColor: '#eee',
                height: '20px',
                position: 'relative'
            }}>
                <div style={{
                    width: `${progress}%`,
                    backgroundColor: 'purple',
                    height: '100%',
                    transition: 'width 0.3s ease',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}></div>
                <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '5px',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontSize: '0.8em',
                    zIndex: 1,
                    mixBlendMode: 'difference'
                }}>{progress.toFixed(0)}%</span>
            </div>
        </div>
    );
};

export default ReportChart;
