import React, { useEffect, useState } from "react";
import { Button, TextField, IconButton, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Search, Edit, Delete, ToggleOn, ToggleOff, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // Default: Ascending

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/get-users");
            const userOnly = response.data.users.filter(user => user.role !== "admin");
            setUsers(userOnly);
            setFilteredUsers(userOnly);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:8000/admin/toggle-user-status/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/admin/delete-user/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Search Users by Username or Email
    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    // Sort Users by Username
    const handleSort = () => {
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            return sortOrder === "asc"
                ? a.username.localeCompare(b.username)
                : b.username.localeCompare(a.username);
        });

        setFilteredUsers(sortedUsers);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
    };

    return (
        <div style={{ padding: "20px", color: "#fff", width: "1000px", margin: "auto", fontFamily: "'Fraunces'" }}>
            
            {/* Search and Sorting */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "25px" }}>
            <Typography variant="h4" sx={{ marginBottom: "20px", fontFamily: "'Fraunces'", fontWeight: "bold" }}>
                    Account Deactivation
            </Typography>
                <TextField 
                    variant="outlined"
                    placeholder="Search Users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{ startAdornment: <Search sx={{ marginRight: "10px" }} /> }}
                    sx={{ backgroundColor: "#DAD2FF", borderRadius: "4px", width: "270px", marginLeft: "300px" }}
                />
                <Button 
                    onClick={handleSort}
                    sx={{ color: "#fff", fontWeight: "bold" }}
                >
                     {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                </Button>
            </Box>

            {/* User Table */}
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
                        {filteredUsers.map((user) => (
                            <TableRow key={user._id} sx={{ backgroundColor: "#DAD2FF", marginTop: "15px", borderRadius: "8px" }}>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.username}</TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.email}</TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.role}</TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'", color: user.is_active ? "green" : "red" }}>
                                    {user.is_active ? "Active" : "Deactivated"}
                                </TableCell>
                                <TableCell sx={{ fontFamily: "'Lilita One'" }}>
                                    {/* Toggle Status */}
                                    <IconButton onClick={() => handleToggleStatus(user._id)} color="primary">
                                        {user.is_active ? <ToggleOn /> : <ToggleOff />}
                                    </IconButton>
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Users;
