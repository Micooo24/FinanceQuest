import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const UserDataTable = () => {
  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginRight: 1, backgroundColor: "#3f51b5", '&:hover': { backgroundColor: "#2c387e" } }}
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ backgroundColor: "#d32f2f", '&:hover': { backgroundColor: "#9a0007" } }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "User 1", email: "user1@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "User 2", email: "user2@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "User 3", email: "user3@example.com", role: "User", status: "Active" },
  ];

  return (
    <Box sx={{ padding: "20px", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", pb: 2 }}>
        User Table
      </Typography>
      <Divider sx={{ backgroundColor: "white" }} />

      {/* User Table Format */}
      <Box sx={{ height: 400, width: "100%", mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            color: "White",
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "transparent",
              color: "Black",
            },
            ".MuiDataGrid-cell": {
              backgroundColor: "transparent",
              borderBottom: "1px solid #3f51b5",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#2c387e",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserDataTable;
