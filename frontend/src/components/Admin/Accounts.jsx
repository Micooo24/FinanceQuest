import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal } from "@mui/material";
import { ArrowUpward, ArrowDownward, Search, Delete, RestoreFromTrash } from "@mui/icons-material";
import axios from "axios";

const Account = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting state
  const [isModalOpen, setIsModalOpen] = useState(false); // Recycle bin modal state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/get-users");
      const storedDeletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
      const fetchedUsers = response.data.users;

      // Filter out deleted users based on the stored list in localStorage
      const activeUsers = fetchedUsers.filter(user => !storedDeletedUsers.some(deleted => deleted._id === user._id));
      setUsers(activeUsers);
      setFilteredUsers(activeUsers);
      setDeletedUsers(storedDeletedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Search Users
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Sorting Function
  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      return sortOrder === "asc"
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    });

    setFilteredUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Soft delete a user (mark as deleted in localStorage)
  const handleDelete = (userId) => {
    const storedDeletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
    const userToDelete = users.find(user => user._id === userId);

    if (!storedDeletedUsers.some(deleted => deleted._id === userId)) {
      storedDeletedUsers.push(userToDelete);
      localStorage.setItem("deletedUsers", JSON.stringify(storedDeletedUsers));
    }

    // Filter out the deleted user from the UI
    const updatedUsers = users.filter(user => user._id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setDeletedUsers(storedDeletedUsers);
  };

  // Restore a deleted user from the recycle bin
  const handleRestore = (userId) => {
    const userToRestore = deletedUsers.find(user => user._id === userId);
    const updatedDeletedUsers = deletedUsers.filter(user => user._id !== userId);

    const updatedUsers = [...users, userToRestore];
    setUsers(updatedUsers);
    setDeletedUsers(updatedDeletedUsers);

    localStorage.setItem("deletedUsers", JSON.stringify(updatedDeletedUsers)); // Update localStorage
  };

  // Open and close the modal for recycle bin
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={{ padding: "20px", color: "#fff", width: "1000px", margin: "auto", fontFamily: "'Fraunces'" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "25px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", fontFamily: "'Fraunces'", fontWeight: "bold" }}>
          Users Management
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search Users"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{ startAdornment: <Search sx={{ marginRight: "10px" }} /> }}
          sx={{ backgroundColor: "#DAD2FF", borderRadius: "4px", width: "300px", marginLeft: "300px" }}
        />
        <Button onClick={handleSort} sx={{ color: "#fff", fontWeight: "bold" }}>
          {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#B2A5FF", borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C5BAFF", color: "#000" }}>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Birthday</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id} sx={{ backgroundColor: "#DAD2FF", borderRadius: "8px" }}>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.username}</TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.email}</TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.role}</TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{user.birthday}</TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>
                  <IconButton onClick={() => handleDelete(user._id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recycle Bin Icon */}
      <IconButton onClick={toggleModal} sx={{ position: "fixed", top: 20, right: 20, color: "#fff", fontSize: "2rem" }}>
        <RestoreFromTrash />
      </IconButton>

      {/* Modal to show deleted users */}
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#C5BAFF",
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
          boxShadow: 24
        }}>
          <Typography variant="h6" sx={{ marginBottom: "20px", fontFamily: "'Fraunces'", fontWeight: "bold" }}>
            Recycle Bin
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Restore</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                        onClick={() => handleRestore(user._id)}
                        color="primary"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
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
    </div>
  );
};

export default Account;
