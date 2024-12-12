// wanderlust-react/src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/analytics', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAnalytics(response.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        };

        fetchAnalytics();
    }, []);

    if (!analytics) {
        return <div>Loading analytics...</div>;
    }

    const data = {
        labels: analytics.listings.map(listing => listing.title),
        datasets: [
            {
                label: 'Views',
                data: analytics.listings.map(listing => listing.views),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Bookings',
                data: analytics.listings.map(listing => listing.bookings.length),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Revenue',
                data: analytics.listings.map(listing => listing.price * listing.bookings.length),
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="container mt-5">
            <h2>Property Analytics</h2>
            <Bar data={data} options={options} />
            <div className="mt-4">
                <h4>Total Views: {analytics.totalViews}</h4>
                <h4>Total Bookings: {analytics.totalBookings}</h4>
                <h4>Total Revenue: &#8377; {analytics.totalRevenue.toLocaleString("en-IN")}</h4>
            </div>
        </div>
    );
};

export default Dashboard;
