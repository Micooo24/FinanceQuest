import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const BudgetingDataTable = () => {
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [budgetingData, setBudgetingData] = useState([
    { id: 1, question: "What is a budget?", choices: "A. A spending plan, B. A savings account, C. A loan", answer: "A" },
    { id: 2, question: "Why is budgeting important?", choices: "A. Helps save money, B. Increases debt, C. No impact", answer: "A" },
  ]);

  const handleEdit = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setBudgetingData((prev) => prev.filter((q) => q.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRow(null);
  };

  const handleSave = () => {
    if (currentRow) {
      setBudgetingData((prev) => prev.map((q) => (q.id === currentRow.id ? currentRow : q)));
    }
    handleClose();
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", pb: 2 }}>
        Budgeting - Question Bank
      </Typography>
      <Divider sx={{ backgroundColor: "white" }} />
      <Box sx={{ mt: 4 }}>
        <DataGrid
          rows={budgetingData}
          columns={[
            { field: "question", headerName: "Question", width: 300 },
            { field: "choices", headerName: "Choices", width: 400 },
            { field: "answer", headerName: "Answer", width: 100 },
            {
              field: "actions",
              headerName: "Actions",
              width: 200,
              renderCell: (params) => (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(params.row)}
                    sx={{ marginRight: 1 }}
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
                </>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            color: "white",
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
      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { maxWidth: "600px", width: "100%", overflow: "hidden" } }}>
        <DialogTitle sx={{ backgroundColor: "#1e1e2f", color: "white", textAlign: "center" }}>
          Edit Question
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#1e1e2f", color: "white", paddingBottom: 2, overflow: "hidden" }}>
          <TextField
            fullWidth
            label="Question"
            margin="dense"
            value={currentRow?.question || ""}
            onChange={(e) => setCurrentRow((prev) => ({ ...prev, question: e.target.value }))}
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
            label="Choices (comma separated)"
            margin="dense"
            value={currentRow?.choices || ""}
            onChange={(e) => setCurrentRow((prev) => ({ ...prev, choices: e.target.value }))}
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
            label="Correct Answer"
            margin="dense"
            value={currentRow?.answer || ""}
            onChange={(e) => setCurrentRow((prev) => ({ ...prev, answer: e.target.value }))}
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
    </Box>
  );
};

export default BudgetingDataTable;
