import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = () => {
  const [registeredPlayersData, setRegisteredPlayersData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0); // Add this!


  useEffect(() => {
    const fetchRegisteredPlayersData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/get-users");
        const users = response.data.users;

        const groupedData = {
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
          Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
        };

        users.forEach(user => {
          const createdAt = new Date(user.created_at);
          const month = createdAt.toLocaleDateString('default', { month: 'short' });
          groupedData[month]++;
        });

        setRegisteredPlayersData({
          labels: Object.keys(groupedData),
          counts: Object.values(groupedData),
        });
      } catch (error) {
        console.error("Error fetching registered players data:", error);
      }
    };

    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/active-users");
        setActiveUsers(response.data.active_users);
        setInactiveUsers(response.data.inactive_users);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };
    

    fetchRegisteredPlayersData();
    fetchActiveUsers();
  }, []);

  const lineData = {
    labels: registeredPlayersData.labels,
    datasets: [
      {
        label: "Registered Players",
        data: registeredPlayersData.counts,
        borderColor: "#8c2fc7",
        backgroundColor: "rgba(140, 47, 199, 0.3)",
        borderWidth: 3,
        pointBackgroundColor: "#5e3967",
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
    datasets: [
      {
        label: "Top Players",
        data: [50, 30, 20, 75, 100, 45],
        backgroundColor: ["#8c2fc7", "#451d6b","#5e3967"],
        borderColor: "#8c2fc7",
        borderWidth: 2,
      },
    ],
  };

  const gaugeData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [activeUsers, inactiveUsers], 
        backgroundColor: ["#00cac9", "#8c2fc7"],
        borderWidth: 0,
      },
    ],
  };
  
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: "white", font: { size: 14, weight: "bold" } } },
      tooltip: {
        backgroundColor: "#000",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "#8c2fc7",
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "90vw",
      height: "100vh",
      gap: "25px",
    }}>
      <div style={{ width: "90%", height: "50%" }}>
        <h3 style={{ color: "white", marginBottom: "5px" }}>Registered Players by Month</h3>
        <Line data={lineData} options={chartOptions} />
      </div>

      <div style={{
        display: "flex",
        width: "90%",
        height: "50%",
        gap: "25px",
        justifyContent: "space-between",
      }}>
        <div style={{ width: "25%", height: "100%", marginTop: "50px" }}>
          <h3 style={{ color: "white", marginBottom: "5px" }}>Leaderboard</h3>
          <Line data={lineData} options={chartOptions} />
        </div>

        <div style={{ width: "25%", height: "100%", marginTop: "50px" }}>
          <h3 style={{ color: "white", marginBottom: "5px" }}>Top 10 Players</h3>
          <Bar data={barData} options={chartOptions} />
        </div>

        

        <div style={{ width: "25%", height: "100%", marginTop: "50px" }}>
          <h3 style={{ color: "white", marginBottom: "5px" }}>Total Active Users</h3>
          <Doughnut data={gaugeData} options={{ cutout: "70%" }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
