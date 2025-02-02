import React from "react";
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
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Year",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 100, 95],
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
        <h3 style={titleStyle}>Daily Active Players</h3>
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
          <h3 style={titleStyle}>Finance Literacy Rank</h3>
          <div style={chartCanvasStyle}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
