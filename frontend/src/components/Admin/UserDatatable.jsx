import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const UserDataTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    birthday: "",
    role: "User",
    password: "",
    verified: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/get-users");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        if (!data.users || !Array.isArray(data.users)) {
          throw new Error("Invalid response format");
        }

        
        const formattedUsers = data.users.map((user, index) => ({
          id: user._id ? user._id.toString() : index, 
          username: user.username,
          email: user.email,
          birthday: user.birthday || "N/A",
          img_path: user.img_path || "No Image",
          role: user.role || "User",
          deleted: user.deleted || false,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:8000/admin/delete-user/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setSelectedImage(null);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
    setNewUser({
      username: "",
      email: "",
      birthday: "",
      role: "User",
      password: "",
      verified: false,
    });
    setSelectedImage(null);
  };

  const handleSave = async () => {
    if (selectedUser && window.confirm("Are you sure you want to update this user?")) {
      const formData = new FormData();
      formData.append("username", selectedUser.username);
      formData.append("email", selectedUser.email);
      formData.append("birthday", selectedUser.birthday);
      formData.append("role", selectedUser.role);
      if (selectedImage) {
        formData.append("img_file", selectedImage);
      }

      try {
        const response = await fetch(`http://localhost:8000/admin/update-user/${selectedUser.id}`, {
          method: "PUT",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("User updated successfully:", data);

        setUsers((prev) => prev.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
        handleClose();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleCreateSave = async () => {
    const formData = new FormData();
    formData.append("username", newUser.username);
    formData.append("email", newUser.email);
    formData.append("birthday", newUser.birthday);
    formData.append("role", newUser.role);
    formData.append("password", newUser.password);
    formData.append("verified", newUser.verified);
    if (selectedImage) {
      formData.append("img_file", selectedImage);
    }

    try {
      const response = await fetch("http://localhost:8000/admin/create-user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("User created successfully:", data);

      setUsers((prev) => [...prev, data.user]);
      handleCreateClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedUser((prev) => ({ ...prev, img_path: URL.createObjectURL(file) }));
    }
  };

  const handleNewImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setNewUser((prev) => ({ ...prev, img_path: URL.createObjectURL(file) }));
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "username", headerName: "Username", width: 180 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "birthday", headerName: "Birthday", width: 120 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: 'img_path',
      headerName: 'Profile Image',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: '10%' }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            sx={{ marginRight: 1, backgroundColor: "#00cac9", color: "white" }}
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red", color: "white" }}
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "30px", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          User DataTable
        </Typography>
        <Button
          variant="contained"
          sx={{ marginRight: 1, backgroundColor: "#00cac9", color: "white" }}
          onClick={() => setCreateOpen(true)}
        >
          Create User
        </Button>
      </Box>
      <Divider sx={{ backgroundColor: "white" }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress sx={{ color: "white" }} />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <Box sx={{ height: 400, width: "100%", mt: 2 }}>
          <DataGrid
            rows={users.filter(user => !user.deleted)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              color: "white",
              ".MuiDataGrid-columnHeaders": { backgroundColor: "transparent", color: "black" },
              ".MuiDataGrid-cell": { backgroundColor: "transparent", borderBottom: "1px solid #3f51b5" },
              "& .MuiDataGrid-cell:focus": { outline: "none" },
              "& .MuiDataGrid-row:hover": { backgroundColor: "#00cac9" },
            }}
          />
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { maxWidth: "600px", width: "100%", overflow: "hidden" } }}>
        <DialogTitle sx={{ backgroundColor: "#1e1e2f", color: "white", textAlign: "center" }}>
          Edit User
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#1e1e2f", color: "white", paddingBottom: 2, overflow: "hidden" }}>
          {selectedUser && (
            <>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img
                  src={selectedUser.img_path}
                  alt="Profile"
                  style={{ width: 230, height: 200, borderRadius: '10%', border: '2px solid white' }}
                />
              </Box>
              <Button
                variant="contained"
                component="label"
                sx={{ display: "block", margin: "0 auto 12px auto", color: "white", border: "1px solid purple", "&:hover": { backgroundColor: "#00cac9" } }}
              >
                Choose Image
                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <TextField
                fullWidth
                label="Username"
                margin="dense"
                value={selectedUser.username}
                onChange={(e) => setSelectedUser((prev) => ({ ...prev, username: e.target.value }))}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  marginBottom: "12px",
                  color: "white",
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser((prev) => ({ ...prev, email: e.target.value }))}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  marginBottom: "12px",
                  color: "white",
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Birthday"
                type="date"
                margin="dense"
                value={selectedUser.birthday}
                onChange={(e) => setSelectedUser((prev) => ({ ...prev, birthday: e.target.value }))}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  marginBottom: "12px",
                  color: "white",
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Role"
                margin="dense"
                value={selectedUser.role}
                onChange={(e) => setSelectedUser((prev) => ({ ...prev, role: e.target.value }))}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  marginBottom: "12px",
                  color: "white",
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#1e1e2f", justifyContent: "center" }}>
          <Button onClick={handleClose} sx={{ color: "white", border: "1px solid white", "&:hover": { backgroundColor: "#2c387e" } }}>
            Cancel
          </Button>
          <Button onClick={handleSave} sx={{ color: "#f44336", border: "1px solid #f44336", "&:hover": { backgroundColor: "#ff7961" } }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={createOpen} onClose={handleCreateClose} sx={{ "& .MuiDialog-paper": { maxWidth: "600px", width: "100%", overflow: "hidden" } }}>
        <DialogTitle sx={{ backgroundColor: "#1e1e2f", color: "white", textAlign: "center" }}>
          Create User
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#1e1e2f", color: "white", paddingBottom: 2, overflow: "hidden" }}>
          <>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img
                src={newUser.img_path || "No Image"}
                alt="Profile"
                style={{ width: 230, height: 200, borderRadius: '10%', border: '2px solid white' }}
              />
            </Box>
            <Button
              variant="contained"
              component="label"
              sx={{ display: "block", margin: "0 auto 12px auto", color: "white", border: "1px solid purple", "&:hover": { backgroundColor: "#2c387e" } }}
            >
              Choose Image
              <input
                type="file"
                hidden
                onChange={handleNewImageChange}
              />
            </Button>
            <TextField
              fullWidth
              label="Username"
              margin="dense"
              value={newUser.username}
              onChange={(e) => setNewUser((prev) => ({ ...prev, username: e.target.value }))}
              sx={{
                backgroundColor: "transparent",
                border: "1px solid white",
                marginBottom: "12px",
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              margin="dense"
              value={newUser.email}
              onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
              sx={{
                backgroundColor: "transparent",
                border: "1px solid white",
                marginBottom: "12px",
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              label="Birthday"
              type="date"
              margin="dense"
              value={newUser.birthday}
              onChange={(e) => setNewUser((prev) => ({ ...prev, birthday: e.target.value }))}
              sx={{
                backgroundColor: "transparent",
                border: "1px solid white",
                marginBottom: "12px",
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              label="Role"
              margin="dense"
              value={newUser.role}
              onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))}
              sx={{
                backgroundColor: "transparent",
                border: "1px solid white",
                marginBottom: "12px",
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="dense"
              value={newUser.password}
              onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
              sx={{
                backgroundColor: "transparent",
                border: "1px solid white",
                marginBottom: "12px",
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                },
              }}
            />
          </>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#1e1e2f", justifyContent: "center" }}>
          <Button onClick={handleCreateClose} sx={{ color: "white", border: "1px solid white", "&:hover": { backgroundColor: "#2c387e" } }}>
            Cancel
          </Button>
          <Button onClick={handleCreateSave} sx={{ color: "#f44336", border: "1px solid #f44336", "&:hover": { backgroundColor: "#ff7961" } }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    
  );
};

export default UserDataTable;