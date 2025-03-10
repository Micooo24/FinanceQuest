import React, { useEffect, useState } from "react";
import { Button, TextField, IconButton, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import { Search, ToggleOn, ToggleOff, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [newUsers, setNewUsers] = useState(0);
    const [oldUsers, setOldUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/get-users");
            const userOnly = response.data.users.filter(user => user.role !== "admin");
            setUsers(userOnly);
            setFilteredUsers(userOnly);
            categorizeUsers(userOnly);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const categorizeUsers = (users) => {
        const currentMonth = new Date().getMonth();
        let newUsersCount = 0;
        let oldUsersCount = 0;
        let activeCount = 0;
        let inactiveCount = 0;

        users.forEach(user => {
            const userDate = new Date(user.created_at);
            if (!isNaN(userDate)) {
                if (userDate.getMonth() === currentMonth) {
                    newUsersCount++;
                } else {
                    oldUsersCount++;
                }
            }
            user.is_active ? activeCount++ : inactiveCount++;
        });

        setNewUsers(newUsersCount);
        setOldUsers(oldUsersCount);
        setActiveUsers(activeCount);
        setInactiveUsers(inactiveCount);
    };

    const handleSort = () => {
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            return sortOrder === "asc"
                ? a.username.localeCompare(b.username)
                : b.username.localeCompare(a.username);
        });
        setFilteredUsers(sortedUsers);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:8000/admin/toggle-user-status/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

        // Handle pagination
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
    
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };
    const doughnutData = {
        labels: ["Active Users", "Inactive Users"],
        datasets: [
            {
                data: [activeUsers, inactiveUsers],
                backgroundColor: ["#B2A5FF", "#8c2fc7"],
                borderWidth: 0,
            },
        ],
    };

    const barChartData = {
        labels: ["New Users (This Month)", "Old Users (Past Months)"],
        datasets: [
            {
                label: "User Count",
                data: [newUsers, oldUsers],
                backgroundColor: ["#B2A5FF", "#8c2fc7"],
            },
        ],
    };

    return (
        <div style={{ display: "flex", width: "90vw", margin: "auto", padding: "20px", gap: "30px" }}>
            <div style={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "25px" }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search Users"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{ startAdornment: <Search sx={{ marginRight: "10px" }} /> }}
                        sx={{ backgroundColor: "#C5BAFF", borderRadius: "4px", width: "270px" }}
                    />
                    <Button onClick={handleSort} sx={{ color: "#451d6b", fontWeight: "bold" }}>
                        {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                    </Button>
                </Box>

                <TableContainer component={Paper} sx={{ backgroundColor: "#B2A5FF", borderRadius: "8px" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#C5BAFF", color: "#000" }}>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Username</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                            <TableRow key={user._id} sx={{ backgroundColor: "#DAD2FF", marginTop: "15px", borderRadius: "8px" }}>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.username}</TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.email}</TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.role}</TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'", color: user.is_active ? "green" : "red" }}>
                                    {user.is_active ? "Active" : "Deactivated"}
                                </TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>
                                    <IconButton onClick={() => handleToggleStatus(user._id)} color="primary">
                                        {user.is_active ? <ToggleOn /> : <ToggleOff />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

                {/* Pagination */}
                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            <div style={{ flex: 0.5, padding: "10px", textAlign: "center" }}>
            <h3>New vs Old Users</h3>
            <Bar data={barChartData} options={{ indexAxis: 'y' }} />
                <h3>User Status Overview</h3>
                <Doughnut data={doughnutData} options={{ cutout: "50%" }} />
            </div>
        </div>
    );
};

export default Users;
