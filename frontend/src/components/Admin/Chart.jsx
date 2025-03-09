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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

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
  
        // Count Users and Admins separately
        const admins = users.filter(user => user.role.toLowerCase() === "admin").length;
        const regularUsers = users.filter(user => user.role.toLowerCase() === "user").length;
  
        // Update states
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
    
        console.log("API Response:", response.data);
        console.log("Users Data:", users.map(user => user.role)); // Check roles
    
        const groupedData = {
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
          Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
        };
    
        users.forEach(user => {
          if (user.role) { 
            const role = user.role.toLowerCase(); // Normalize role to lowercase
            
            if (role === "user" || role === "admin") { // Include both users & admins
              if (user.created_at) { // Only use created_at now
                const date = new Date(user.created_at);
                
                if (!isNaN(date)) { // Check if the date is valid
                  const month = date.toLocaleString("default", { month: "short" });
                  groupedData[month] = (groupedData[month] || 0) + 1;
                } else {
                  console.warn("Invalid date format:", user.created_at);
                }
              } else {
                console.warn("Missing created_at for user:", user);
              }
            }
          }
        });
        
    
        console.log("Processed Data:", groupedData); // Debug processed results
    
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

        users.forEach(user => {
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
          admins: Object.values(groupedData).map(data => data.admins),
          users: Object.values(groupedData).map(data => data.users),
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
        backgroundColor: ["#C5BAFF", "#B2A5FF", "#DAD2FF", "#5e3967", "#9966ff"],
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
        backgroundColor: "#C5BAFF",
      },
      {
        label: "Users",
        data: adminUserData.users,
        backgroundColor: "#B2A5FF",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        backgroundColor: "#B2A5FF",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    scales: {
      x: { stacked: false },
      y: { stacked: false },
    },
  };

  const lineData = {
    labels: registeredPlayersData.labels,
    datasets: [
      {
        label: "Registered Players",
        data: registeredPlayersData.counts,
        borderColor: "#B2A5FF",
        backgroundColor: "#C5BAFF",
        borderWidth: 3,
        pointBackgroundColor: "#C5BAFF",
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
        backgroundColor: ["#B2A5FF", "#C5BAFF"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: "#451d6b", font: { size: 12, weight: "bold" } } },
      tooltip: {
        backgroundColor: "#C5BAFF",
        titleColor: "#451d6b",
        bodyColor: "#451d6b",
        borderColor: "#451d6b",
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      x: { ticks: { color: "#451d6b" }, grid: { color: "#C5BAFF" } },
      y: { ticks: { color: "#451d6b" }, grid: { color: "#C5BAFF" } },
    },
  };


  const pieData = {
    labels: ["Admins", "Users"],
    datasets: [
      {
        data: [adminCount, userCount],
        backgroundColor: ["#C5BAFF", "#B2A5FF"], // Admins: Purple, Users: Teal
        hoverBackgroundColor: ["#DAD2FF", "#DAD2FF"],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        gap: "20px",
        padding: "20px",
      }}
    >
      {/* Line Chart */}
      <div style={{ width: "100%", maxWidth: "800px", height: "300px" , marginBottom: "50px"}}>
        <h3 style={{ color: "#451d6b", textAlign: "center", fontFamily: "'Lora'" }}>
          Registered Accounts by Month
        </h3>
        <Line data={lineData} options={chartOptions} />
      </div>

      <div className="dashboard-charts-container">
      <IconButton
        className="home-button"
        onClick={navigateHome}
        aria-label="home"
        sx={{ position: "absolute", top: "20px", left: "20px", color: "#009797" }}
      >
        <HomeIcon fontSize="large" />
      </IconButton>

      <h1
  style={{
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#451d6b",
    padding: "15px",
    borderRadius: "12px",
    textTransform: "uppercase",
    marginBottom: "20px",
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
  }}
>
  {["savings", "investing", "budgeting"].map((tab) => (
    <button
      key={tab}
      onClick={() => handleTabChange(tab)}
      style={{
        background:
        activeTab === tab
        ? "linear-gradient(45deg, #B2A5FF, #C5BAFF)"
        : "linear-gradient(45deg, #DAD2FF, #B2A5FF)",
        color: "#5e3967",
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

<div style={{ width: "100%", maxWidth: "800px", height: "400px", marginBottom: "50px" }}>
  <h3 style={{ color: "#451d6b", textAlign: "center", fontFamily: "'Lora'" }}>
    Quest Leaderboard
  </h3>
  <Bar data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
</div>

    </div>
  
      {/* Total Accounts Info */}
      <div
        style={{
          width: "80%",
          maxWidth: "500px",
          textAlign: "center",
          backgroundColor: "#C5BAFF",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "70px",
        }}
      >
        <h3 style={{ color: "#451d6b", fontSize: "18px", fontFamily: "'Lora'" }}>
          Total Accounts Registered
        </h3>
        <h2 style={{ color: "#451d6b", fontSize: "22px", fontWeight: "bold" }}>{totalAccounts}</h2>
        <p style={{ color: "#451d6b", fontSize: "16px" }}>
          <b>Admin:</b> {adminCount} | <b>User:</b> {userCount}
        </p>
      </div>
  
      {/* Doughnut and Bar Chart Section */}
     {/* Doughnut and Bar Chart Section */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribute evenly
    alignItems: "center",
    width: "100%",
    maxWidth: "900px",
    gap: "20px",
  }}
>
  {/* Doughnut Chart */}
  <div style={{ flex: "1", minWidth: "280px", maxWidth: "300px", height: "300px" }}>
    <h3 style={{ color: "#451d6b", textAlign: "center" }}>Total Active Users</h3>
    <Doughnut data={gaugeData} options={{ cutout: "40%" }} />
  </div>

  {/* Bar Chart */}
  <div style={{ flex: "1", minWidth: "280px", maxWidth: "300px", height: "300px" }}>
    <h3 style={{ color: "#451d6b", textAlign: "center" }}>Admin & User Registrations by Month</h3>
    <Bar data={barData} options={barOptions} />
  </div>

  {/* Pie Chart */}
  <div style={{ flex: "1", minWidth: "280px", maxWidth: "300px", height: "300px" }}>
    <h3 style={{ color: "#451d6b", textAlign: "center" }}>Admin vs. User Distribution</h3>
    <Doughnut data={pieData} options={{ cutout: "0%" }} />
  </div>
</div>




    </div>
  
  
  );
};

export default DashboardCharts;
