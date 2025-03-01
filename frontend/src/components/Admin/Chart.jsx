import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = () => {
  const [registeredPlayersData, setRegisteredPlayersData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const fetchRegisteredPlayersData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/get-users");
        const users = response.data.users;

        // Initialize grouped data with all months
        const groupedData = {
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
          Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
        };

        // Process data to group by month
        users.forEach(user => {
          const createdAt = new Date(user.created_at);
          const month = createdAt.toLocaleDateString('default', { month: 'short' });
          groupedData[month]++;
        });

        // Convert grouped data to chart data format
        const labels = Object.keys(groupedData);
        const counts = Object.values(groupedData);

        setRegisteredPlayersData({ labels, counts });
      } catch (error) {
        console.error("Error fetching registered players data:", error);
      }
    };

    fetchRegisteredPlayersData();
  }, []);

  const lineData = {
    labels: registeredPlayersData.labels,
    datasets: [
      {
        label: "Registered Players",
        data: registeredPlayersData.counts,
        borderColor: "rgba(0, 123, 255, 0.9)",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "rgba(0, 123, 255, 0.9)",
        pointBorderColor: "rgba(0, 123, 255, 0.9)",
        pointBorderWidth: 1,
        tension: 0.4,
        shadowColor: "rgba(0, 123, 255, 0.8)",
        shadowBlur: 100,
      },
    ],
  };

  const barData = {
    labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
    datasets: [
      {
        label: "Year",
        data: [50, 30, 20, 75, 100, 45],
        backgroundColor: "rgba(255, 99, 132, 0)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          font: {
            size: 14,
            weight: "bold",
          },
          boxWidth: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(0, 123, 255, 0.8)",
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        ticks: { color: "white", font: { weight: "bold" } },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "white", font: { weight: "bold" } },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  const chartContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
  };

  const chartRowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
  };

  const chartStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "450px",
    height: "280px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "12px",
    padding: "15px",
    overflow: "hidden",
  };

  const titleStyle = {
    color: "white",
    marginBottom: "10px",
    textAlign: "left",
    width: "100%",
  };

  const chartCanvasStyle = {
    flexGrow: 1,
    width: "100%",
  };

  return (
    <div style={chartContainerStyle}>
      <div style={{ ...chartStyle, maxWidth: "1030px" }}>
        <h3 style={titleStyle}>Registered Players by Month</h3>
        <div style={chartCanvasStyle}>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      <div style={chartRowStyle}>
        <div style={chartStyle}>
          <h3 style={titleStyle}>Leaderboard</h3>
          <div style={chartCanvasStyle}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div style={chartStyle}>
          <h3 style={titleStyle}>Top 10 Players</h3>
          <div style={chartCanvasStyle}>
            <Bar data={barData} options={lineOptions} />
          </div>
        </div>

        <div style={chartStyle}>
          <h3 style={titleStyle}></h3>
          <div style={chartCanvasStyle}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;