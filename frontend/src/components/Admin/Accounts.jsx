import React, { useEffect, useState } from "react";
import {
  Button, TextField, Box, Typography, IconButton, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Modal,
  TablePagination
} from "@mui/material";
import {
  ArrowUpward, ArrowDownward, Search, Delete, RestoreFromTrash
} from "@mui/icons-material";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

const Account = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/get-users");
      const storedDeletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
      const fetchedUsers = response.data.users;

      const activeUsers = fetchedUsers.filter(user =>
        !storedDeletedUsers.some(deleted => deleted._id === user._id)
      );

      setUsers(activeUsers);
      setFilteredUsers(activeUsers);
      setDeletedUsers(storedDeletedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const totalAccounts = users.length;
  const adminCount = users.filter(user => user.role.toLowerCase() === "admin").length;
  const userCount = totalAccounts - adminCount;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    setFilteredUsers(users.filter(user =>
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    ));
  };

  const handleSort = () => {
    setFilteredUsers([...filteredUsers].sort((a, b) =>
      sortOrder === "asc" ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username)
    ));
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = (userId) => {
    const storedDeletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
    const userToDelete = users.find(user => user._id === userId);

    if (!storedDeletedUsers.some(deleted => deleted._id === userId)) {
      storedDeletedUsers.push(userToDelete);
      localStorage.setItem("deletedUsers", JSON.stringify(storedDeletedUsers));
    }

    setUsers(users.filter(user => user._id !== userId));
    setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
    setDeletedUsers(storedDeletedUsers);
  };

  const handleRestore = (userId) => {
    const userToRestore = deletedUsers.find(user => user._id === userId);
    setUsers([...users, userToRestore]);
    setDeletedUsers(deletedUsers.filter(user => user._id !== userId));
    localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers.filter(user => user._id !== userId)));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Data for the BarChart
  const chartData = [
    { category: "Accounts", Admins: adminCount, Users: userCount }
  ];

  return (
    <Box sx={{ display: "flex", gap: "20px", padding: "20px", width: "100%" }}>
      {/* Left Side - Account Management */}
      <Box sx={{ flex: 2 }}>
        {/* Search, Sort & Recycle Bin */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
          <TextField
            variant="outlined"
            placeholder="Search Users"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{ startAdornment: <Search sx={{ marginRight: "10px", color: "#fff" }} /> }}
            sx={{ 
              backgroundColor: "#8a619b", 
              borderRadius: "4px", 
              width: "300px", 
              ml: 35, 
              mb: 1,
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#9b71ad" },
                "&:hover fieldset": { borderColor: "#b590c7" },
                "&.Mui-focused fieldset": { borderColor: "#b590c7" },
              },
            }}
          />
          <Button onClick={handleSort} sx={{ color: "#fff", fontWeight: "bold" }}>
            {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
          </Button>
          <IconButton onClick={toggleModal} sx={{ color: "#fff" }}>
            <RestoreFromTrash />
          </IconButton>
        </Box>

        {/* Users Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: "#67407a", borderRadius: "8px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#8a619b" }}>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#fff" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#fff" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#fff" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user._id}>
                  <TableCell sx={{ fontFamily: "'Lora'", color: "#fff" }}>{user.username}</TableCell>
                  <TableCell sx={{ fontFamily: "'Lora'", color: "#fff" }}>{user.email}</TableCell>
                  <TableCell sx={{ fontFamily: "'Lora'", color: "#fff" }}>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(user._id)} sx={{ color: "#ff6b6b" }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={isModalOpen} onClose={toggleModal}>
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#67407a",
            padding: "20px",
            borderRadius: "8px",
            width: "700px",
            boxShadow: 24
          }}>
            <Typography variant="h6" sx={{ marginBottom: "20px", fontFamily: "'Fraunces'", fontWeight: "bold", color: "#fff", borderBottom: "1px solid #9b71ad" }}>
              Recycle Bin
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#8a619b", borderRadius: "8px" }}>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#fff" }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#fff" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#fff" }}>Restore</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deletedUsers.map((user) => (
                  <TableRow key={user._id} sx={{ backgroundColor: "#67407a", borderRadius: "8px" }}>
                    <TableCell sx={{ color: "#fff" }}>{user.username}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleRestore(user._id)}
                        color="primary"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#b590c7',
                        }}
                      >
                        <RestoreFromTrash sx={{ fontSize: "1rem" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Modal>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: '#fff' }}
        />
      </Box>

      {/* Right Side - Total Accounts & Graph */}
      <Box sx={{ flex: 1, ml: 5 }}>
        {/* Total Accounts */}
        <Paper sx={{ padding: "15px", backgroundColor: "#8a619b", borderRadius: "8px", textAlign: "center", marginBottom: "20px", ml: 5, width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: '#fff' }}>Total Accounts Registered</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: '#fff' }}>{totalAccounts}</Typography>
        </Paper>

        {/* Admin vs User Graph */}
        <Paper sx={{ padding: "5px", backgroundColor: "#8a619b", borderRadius: "8px", ml: 5, width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px", fontFamily: "'Lora'", color: '#fff', textAlign: "center" }}>Admin & User Count</Typography>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#75538a", borderColor: "#9b71ad" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar dataKey="Admins" fill="#75538a">
                <LabelList dataKey="Admins" position="top" fill="#fff" fontSize={12} formatter={(value) => value.toLocaleString()} />
              </Bar>
              <Bar dataKey="Users" fill="#67407a">
                <LabelList dataKey="Users" position="top" fill="#fff" fontSize={12} formatter={(value) => value.toLocaleString()} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Account;