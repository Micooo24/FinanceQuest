import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DashboardCharts = () => {
  const [registeredPlayersData, setRegisteredPlayersData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
  const [adminUserData, setAdminUserData] = useState({
    labels: [],
    admins: [],
    users: [],
  });
  const [leaderboards, setLeaderboards] = useState({
    savings: [],
    investing: [],
    budgeting: [],
  });
  const [activeTab, setActiveTab] = useState("savings");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchTotalAccounts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/get-users");
        const users = response.data.users;
        const admins = users.filter((user) => user.role.toLowerCase() === "admin").length;
        const regularUsers = users.filter((user) => user.role.toLowerCase() === "user").length;
        setAdminCount(admins);
        setUserCount(regularUsers);
        setTotalAccounts(admins + regularUsers);
      } catch (error) {
        console.error("Error fetching total accounts:", error);
      }
    };
    fetchTotalAccounts();
  }, []);

  useEffect(() => {
    const fetchRegisteredPlayersData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/get-users");
        const users = response.data.users;
        const groupedData = {
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
          Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
        };
        users.forEach((user) => {
          if (user.role) {
            const role = user.role.toLowerCase();
            if (role === "user" || role === "admin") {
              if (user.created_at) {
                const date = new Date(user.created_at);
                if (!isNaN(date)) {
                  const month = date.toLocaleString("default", { month: "short" });
                  groupedData[month] = (groupedData[month] || 0) + 1;
                }
              }
            }
          }
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

  useEffect(() => {
    const fetchAdminUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/get-users");
        const users = response.data.users;
        const groupedData = {
          Jan: { admins: 0, users: 0 }, Feb: { admins: 0, users: 0 }, Mar: { admins: 0, users: 0 },
          Apr: { admins: 0, users: 0 }, May: { admins: 0, users: 0 }, Jun: { admins: 0, users: 0 },
          Jul: { admins: 0, users: 0 }, Aug: { admins: 0, users: 0 }, Sep: { admins: 0, users: 0 },
          Oct: { admins: 0, users: 0 }, Nov: { admins: 0, users: 0 }, Dec: { admins: 0, users: 0 }
        };
        users.forEach((user) => {
          if (user.created_at && user.role) {
            const date = new Date(user.created_at);
            if (!isNaN(date)) {
              const month = date.toLocaleString("default", { month: "short" });
              if (user.role.toLowerCase() === "admin") {
                groupedData[month].admins++;
              } else if (user.role.toLowerCase() === "user") {
                groupedData[month].users++;
              }
            }
          }
        });
        setAdminUserData({
          labels: Object.keys(groupedData),
          admins: Object.values(groupedData).map((data) => data.admins),
          users: Object.values(groupedData).map((data) => data.users),
        });
      } catch (error) {
        console.error("Error fetching admin/user data:", error);
      }
    };
    fetchAdminUserData();
  }, []);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const [savingsRes, investingRes, budgetingRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/leaderboards/get-savings"),
          axios.get("http://127.0.0.1:8000/leaderboards/get-investments"),
          axios.get("http://127.0.0.1:8000/leaderboards/get-budgets"),
        ]);
        setLeaderboards({
          savings: savingsRes.data.map((player) => ({
            username: player.username,
            score: player.balance,
          })),
          investing: investingRes.data.map((player) => ({
            username: player.username,
            score: player.score,
          })),
          budgeting: budgetingRes.data.map((player) => ({
            username: player.username,
            score: player.money,
          })),
        });
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboards();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const navigateHome = () => {
    navigate("/dashboard");
  };

  const currentLeaderboard = leaderboards[activeTab] || [];

  const chartData = {
    labels: currentLeaderboard.map((player) => player.username),
    datasets: [
      {
        label: activeTab === "investing" ? "Score" : "Money",
        data: currentLeaderboard.map((player) => player.score),
        backgroundColor: ["#6d4c7d", "#4b2e5a", "#805c92", "#9b7aaf", "#5a3f6b"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: adminUserData.labels,
    datasets: [
      {
        label: "Admins",
        data: adminUserData.admins,
        backgroundColor: "#6d4c7d",
      },
      {
        label: "Users",
        data: adminUserData.users,
        backgroundColor: "#4b2e5a",
      },
    ],
  };

  const lineData = {
    labels: registeredPlayersData.labels,
    datasets: [
      {
        label: "Registered Players",
        data: registeredPlayersData.counts,
        borderColor: "#805c92",
        backgroundColor: "#5a3f6b",
        borderWidth: 3,
        pointBackgroundColor: "#6d4c7d",
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const gaugeData = {
    labels: ["Active Users", "Deactivated Users"],
    datasets: [
      {
        data: [activeUsers, inactiveUsers],
        backgroundColor: ["#6d4c7d", "#4b2e5a"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Admins", "Users"],
    datasets: [
      {
        data: [adminCount, userCount],
        backgroundColor: ["#6d4c7d", "#4b2e5a"],
        hoverBackgroundColor: ["#805c92", "#9b7aaf"],
        borderWidth: 1,
      },
    ],
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
          font: { size: 12, weight: "bold" },
        },
      },
      tooltip: {
        backgroundColor: "#5a3f6b",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#805c92",
        borderWidth: 1,
        cornerRadius: 6,
      },
      datalabels: {
        display: true,
        color: "#fff",
        font: {
          weight: "bold",
          size: 10,
        },
        formatter: (value, context) => {
          if (value <= 0) return "";
          if (context.dataset.label === "Money") {
            return `₱${value.toLocaleString()}`; // Peso sign for Savings and Budgeting
          }
          if (context.dataset.label === "Score") {
            return value.toLocaleString(); // No peso sign for Investing
          }
          if (
            context.chart.data.labels[context.dataIndex].includes("Admin") ||
            context.chart.data.labels[context.dataIndex].includes("User")
          ) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          }
          return value.toLocaleString();
        },
        anchor: "center",
        align: "center",
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#5a3f6b" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#5a3f6b" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        gap: "20px",
        padding: "20px",
      }}
    >
      {/* Top Container: Summary and Total Accounts */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "1200px",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Registered Accounts Card */}
        <div
          style={{
            flex: "2",
            minWidth: "300px",
            backgroundColor: "#4b2e5a",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3 style={{ color: "#fff", textAlign: "center", fontFamily: "'Lora'" }}>
            Registered Accounts by Month
          </h3>
          <div style={{ height: "250px" }}>
            <Line
              data={lineData}
              options={{
                ...commonChartOptions,
                plugins: {
                  ...commonChartOptions.plugins,
                  datalabels: {
                    ...commonChartOptions.plugins.datalabels,
                    anchor: "end",
                    align: "top",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Total Accounts Card */}
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            maxWidth: "200px",
            backgroundColor: "#4b2e5a",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            height: "200px",
            marginTop: "50px",
          }}
        >
          <h3 style={{ color: "#fff", fontSize: "18px", fontFamily: "'Lora'", marginTop: "50px" }}>
            Total Accounts Registered
          </h3>
          <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: "bold" }}>
            {totalAccounts}
          </h2>
          <p style={{ color: "#fff", fontSize: "16px" }}>
            <b>Admin:</b> {adminCount} | <b>User:</b> {userCount}
          </p>
        </div>
      </div>

      {/* Middle Container: Pie Charts */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "1200px",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Total Active Users */}
        <div
          style={{
            flex: "1",
            minWidth: "280px",
            maxWidth: "300px",
            backgroundColor: "#4b2e5a",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3 style={{ color: "#fff", textAlign: "center", fontFamily: "'Lora'" }}>
            Total Active Users
          </h3>
          <div style={{ height: "280px" }}>
            <Doughnut
              data={gaugeData}
              options={{
                ...commonChartOptions,
                cutout: "40%",
              }}
            />
          </div>
        </div>

        {/* Admin & User Registrations */}
        <div
          style={{
            flex: "1",
            minWidth: "280px",
            maxWidth: "350px",
            backgroundColor: "#4b2e5a",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3 style={{ color: "#fff", textAlign: "center", fontFamily: "'Lora'" }}>
            Admin & User Registrations by Month
          </h3>
          <div style={{ height: "250px" }}>
            <Bar data={barData} options={commonChartOptions} />
          </div>
        </div>

        {/* Admin vs User Distribution */}
        <div
          style={{
            flex: "1",
            minWidth: "280px",
            maxWidth: "350px",
            backgroundColor: "#4b2e5a",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3 style={{ color: "#fff", textAlign: "center", fontFamily: "'Lora'" }}>
            Admin vs User Distribution
          </h3>
          <div style={{ height: "250px" }}>
            <Doughnut
              data={pieData}
              options={{
                ...commonChartOptions,
                cutout: "0%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Container: Leaderboard */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#4b2e5a",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "40px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            padding: "15px",
            borderRadius: "12px",
            textTransform: "uppercase",
            marginBottom: "20px",
            fontFamily: "'Lora'",
          }}
        >
          🏆 Quest Leaderboard 🏆
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {[ "budgeting","savings", "investing"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              style={{
                background:
                  activeTab === tab
                    ? "linear-gradient(45deg, #6d4c7d, #4b2e5a)"
                    : "linear-gradient(45deg, #805c92, #5a3f6b)",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
                transform: activeTab === tab ? "scale(1.1)" : "scale(1)",
                fontFamily: "'Lora'",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) =>
                (e.target.style.transform = activeTab === tab ? "scale(1.1)" : "scale(1)")
              }
            >
              {tab === "savings" && "💰 Savings Battle"}
              {tab === "investing" && "📈 Investing Assessment"}
              {tab === "budgeting" && "📊 Budget Quest"}
            </button>
          ))}
        </div>

        <div style={{ height: "350px" }}>
          <Bar data={chartData} options={commonChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;