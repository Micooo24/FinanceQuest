import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { AttachMoney, ShoppingCart, Savings, Home, SportsEsports, Article, TravelExplore, Info, Login } from "@mui/icons-material";
import { Pie, Bar } from "react-chartjs-2";
import 'chart.js/auto';
import axios from "axios";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TrackerReport from "./TrackerReport";

// Navbar Component
const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 15,
        left: "5%",
        width: "90%",
        backgroundColor: "#331540",
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
        borderRadius: "100px",
        height: "10%",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
        <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
          Finance Quest
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <IconButton component={Link} to="/" sx={{ color: "#fff" }}>
            <Home />
          </IconButton>
          <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}>
            <SportsEsports />
          </IconButton>
          <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}>
            <Article />
          </IconButton>
          <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}>
            <TravelExplore />
          </IconButton>
          <IconButton component={Link} to="/about" sx={{ color: "#fff" }}>
            <Info />
          </IconButton>
          <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}>
            <Login />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// FinanceTracker Component
const FinanceTracker = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // +1 to make the month 1-indexed
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date().getMonth()]
  );

  const [data, setData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [billsData, setBillsData] = useState([]);
  const [savingsData, setSavingsData] = useState([]);
  const [hasData, setHasData] = useState(true);

  // State to control dialog open/close and form data
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "income", "expenses", "bills", "savings"
  const [formValues, setFormValues] = useState({
    category: "",
    expected: "",
    actual: "",
    due: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => { 
    if(!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const fetchFinanceData = async (year, month) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/monthly_tracker/get-tracker/${year}/${month}/${userId}`);
      const allData = response.data;

      // Filter data to match the selected year and month
      const filteredData = allData.filter(entry => entry.year === year && entry.month === month);

      if (filteredData.length > 0) {
        // Ensure each entry has a tracker_id
        const updatedFilteredData = filteredData.map(entry => ({
          ...entry,
          tracker_id: entry._id || null, // Ensure tracker_id exists
        }));

        setData(updatedFilteredData);

        // Log to verify tracker_id is present
        console.log("Fetched Data:", updatedFilteredData);

        // Extract finance categories separately
        const allIncome = updatedFilteredData.flatMap(entry => entry.income || []);
        const allExpenses = updatedFilteredData.flatMap(entry => entry.expenses || []);
        const allBills = updatedFilteredData.flatMap(entry => entry.bills || []);
        const allSavings = updatedFilteredData.flatMap(entry => entry.savings || []);

        setIncomeData(allIncome);
        setExpensesData(allExpenses);
        setBillsData(allBills);
        setSavingsData(allSavings);
        setHasData(true);
      } else {
        setHasData(false);
        setData([]);
        setIncomeData([]);
        setExpensesData([]);
        setBillsData([]);
        setSavingsData([]);
      }
    } catch (error) {
      console.error("Error fetching finance data:", error);
      setHasData(false);
    }
  };

  useEffect(() => {
    const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth);
    fetchFinanceData(parseInt(currentYear), monthIndex + 1); // Convert to 1-indexed month and parse year as integer
  }, [selectedMonth, currentYear]);

  const handleCheckboxChange = (category, type, index, checked) => {
    const updatedData = [...data];

    updatedData.forEach((entry, entryIndex) => {
      if (Array.isArray(entry[type])) {
        updatedData[entryIndex] = {
          ...entry,
          [type]: entry[type].map(item =>
            item.category === category ? { ...item, done: checked } : item
          ),
        };
      }
    });

    updatedData.forEach((updatedRecord) => {
      if (!updatedRecord.tracker_id) {
        console.error("Missing tracker_id for update.");
        return;
      }

      // Log the data being sent in the PUT request
      console.log("Updating record:", updatedRecord);

      axios
        .put(
          `http://127.0.0.1:8000/monthly_tracker/update-tracker/${updatedRecord.tracker_id}`,
          updatedRecord
        )
        .then(response => {
          setData(updatedData);
          // Refetch data after update
          const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth);
          fetchFinanceData(parseInt(currentYear), monthIndex + 1);
        })
        .catch(error => {
          console.error("Error updating the 'done' status:", error);
        });
    });
  };

  const totalIncome = incomeData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);
  const totalExpenses = expensesData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);
  const totalBills = billsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);
  const totalsavings = savingsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);

  const pieData = {
    labels: hasData ? ['Savings', 'Total Income'] : ['No data recorded'],
    datasets: [
      {
        data: hasData ? [totalsavings, totalIncome] : [1],
        backgroundColor: hasData ? ['#4caf50', '#6a0dad'] : ['#d3d3d3'],
      },
    ],
  };

  const barData = {
    labels: hasData ? ["Income", "Expenses", "Bills", "Savings"] : ["No data recorded"],
    datasets: hasData ? [
      {
        label: "Actual",
        data: [totalIncome, totalExpenses, totalBills, totalsavings],
        backgroundColor: "#4caf50",
      },
      {
        label: "Expected",
        data: [
          incomeData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
          expensesData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
          billsData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
          savingsData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
        ],
        backgroundColor: "#c2185b",
      }
    ] : [
      {
        label: "No data",
        data: [1],
        backgroundColor: "#d3d3d3",
      }
    ],
  };

  // Handlers for create dialog
  const handleOpenDialog = (type) => {
    setDialogType(type);
    setFormValues({ category: "", expected: "", actual: "", due: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateRecord = async () => {
    // Ensure numeric values are properly parsed
    const newRecord = {
      category: formValues.category,
      expected: parseFloat(formValues.expected) || 0,
      actual: parseFloat(formValues.actual) || 0,
      done: false,
      ...(dialogType === "expenses" && { due: formValues.due }),
    };

    try {
      // Send request to create tracker
      const response = await axios.post(`http://127.0.0.1:8000/monthly_tracker/create-tracker`, {
        year: currentYear,
        month: currentMonth,
        user_id: userId,
        [dialogType]: [newRecord], // Ensure the new record is included in the correct array
      });

      if (response.data.success) {
        // Refetch data after creation
        const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth);
        fetchFinanceData(parseInt(currentYear), monthIndex + 1);
      } else {
        console.error("Failed to create new record:", response.data);
      }

      setOpenDialog(false);
      // Refetch data after closing the dialog
      const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth);
      fetchFinanceData(parseInt(currentYear), monthIndex + 1);
    } catch (error) {
      console.error("Error creating new record:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #5e3967, #351742)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 5,
      }}
    >
      {/* Navbar */}
      <Navbar />

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 12, gap: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", color: "#fff", mt: 10 }}>
            Finance Tracker
          </Typography>
          <Typography sx={{ fontSize: "1.2rem", fontFamily: "'Lilita One'", color: "#fff", textAlign: "center" }}>
            Keep track of your expenses and manage your finances with ease.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <PDFDownloadLink
                 document={<TrackerReport 
                  totalIncome={totalIncome} 
                  totalExpenses={totalExpenses} 
                  totalsavings={totalsavings} 
                  incomeData={incomeData} 
                  expensesData={expensesData} 
                  billsData={billsData} 
                  savingsData={savingsData} 
                  pieData={pieData} 
                  barData={barData} />}
          >
            {({ loading }) => (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6a0dad",
              color: "#fff",
              fontFamily: "'Lilita One'",
              fontSize: "1rem",
              padding: "10px 20px",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
            backgroundColor: "#5e3967",
              },
            }}
          >
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
            )}
          </PDFDownloadLink>
        </Box>


        {/* First Paper - Selection, Summary, Graphs */}
      <Paper elevation={3} sx={{ maxWidth: 1800, mx: "auto", mt: 8, p: 4, display: "flex", alignItems: "center", borderRadius: 3, flexDirection: { xs: "column", md: "row" }, mb: 6 }}>
        {/* Left - Month/Year Selection and Summary */}
        <Box sx={{ flex: 1, fontFamily: "'Lilita One'", pr: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: "6.5rem", color: "#5e3967", fontFamily: "'Lilita One'", position: "relative", display: "inline-block", textShadow: "2px 2px 0px #ffffff, 4px 4px 0px #c2b5dd" }}>
            {selectedMonth}
          </Typography>

          {/* Month and Year Select Dropdown */}
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#5e3967" }}>Select Month:</Typography>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #5e3967", fontFamily: "'Lilita One'", fontSize: "1rem", color: "#5e3967", backgroundColor: "#f3e5f5" }}>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#5e3967" }}>Select Year:</Typography>
            <select value={currentYear} onChange={(e) => setCurrentYear(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #5e3967", fontFamily: "'Lilita One'", fontSize: "1rem", color: "#5e3967", backgroundColor: "#f3e5f5" }}>
              {Array.from({ length: 11 }).map((_, index) => (
                <option key={index} value={2025 + index}>{2025 + index}</option>
              ))}
            </select>
          </Box>

          <Divider sx={{ my: 5 }} />

    
        {/* Financial Summary (Total Income, Expenses, Savings) */}
        <Box sx={{ flex: 2, fontFamily: "'Lilita One'", pr: 4 }}>
          {[
            { label: "Total Income", amount: hasData ? totalIncome : 0, color: "#6a0dad", icon: <AttachMoney fontSize="large" /> },
            { label: "Total Expenses", amount: hasData ? totalExpenses : 0, color: "#c2185b", icon: <ShoppingCart fontSize="large" /> },
            { label: "Savings", amount: hasData ? totalsavings : 0, color: "#4caf50", icon: <Savings fontSize="large" /> }
          ].map((item, index) => (
            <Paper key={index} elevation={3} sx={{ display: "flex", alignItems: "center", p: 2, my: 2, borderRadius: 5, backgroundColor: "#f3e5f5", width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {item.icon}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: item.color }}>
                    {item.label}: ₱{item.amount}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.label === "Total Expenses" ? (totalIncome ? (totalExpenses / totalIncome) * 100 : 0) : (item.label === "Savings" ? (totalIncome ? (totalsavings / totalIncome) * 100 : 0) : 100)}
                    sx={{ width: "100%", height: 8, borderRadius: 2, bgcolor: "#d1c4e9" }}
                  />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 5, bgcolor: "#5e3967" }} />

        {/* Right - Graphs */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mb: 2 }}>Monthly Saving Rate</Typography>
          <Box sx={{ maxWidth: 350, mx: "auto" }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} width={600} height={250} />
          </Box>

          <Divider sx={{ my: 5 }} />    

          <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967", mt: 4, mb: 2 }}>Actual vs Expected Finances</Typography>
          <Box sx={{ maxWidth: 350, mx: "auto" }}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} width={600} height={250} />
          </Box>
        </Box>
      </Paper>

      {/* Second Paper - Tables */}
      <Paper elevation={3} sx={{ maxWidth: 1800, mx: "auto", mt: 8, p: 4, display: "flex", flexDirection: "row", borderRadius: 3 }}>
        {/* Left - Income and Expenses Tables */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Income Breakdown Table */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967" }}>Income Breakdown</Typography>
              <Button variant="contained" onClick={() => handleOpenDialog("income")} sx={{ backgroundColor: "#6a0dad" }}>Create</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Expected</TableCell>
                    <TableCell>Actual</TableCell>
                    <TableCell>Done</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hasData ? incomeData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₱{item.expected}</TableCell>
                      <TableCell>₱{item.actual}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.done}
                          onChange={(e) => handleCheckboxChange(item.category, "income", index, e.target.checked)}
                        />
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No data recorded</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Divider sx={{ my: 5 }} />

          {/* Expenses Breakdown Table */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967" }}>Expenses Breakdown</Typography>
              <Button variant="contained" onClick={() => handleOpenDialog("expenses")} sx={{ backgroundColor: "#c2185b" }}>Create</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Expected</TableCell>
                    <TableCell>Actual</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Done</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hasData ? expensesData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₱{item.expected}</TableCell>
                      <TableCell>₱{item.actual}</TableCell>  
                      <TableCell>{item.due}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.done}
                          onChange={(e) => handleCheckboxChange(item.category, "expenses", index, e.target.checked)}
                        />
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No data recorded</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 5, bgcolor: "#5e3967" }} />
        
        {/* Right - Bills and Savings Tables */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Bills Breakdown Table */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967" }}>Bills Breakdown</Typography>
              <Button variant="contained" onClick={() => handleOpenDialog("bills")} sx={{ backgroundColor: "#5e3967" }}>Create</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Expected</TableCell>
                    <TableCell>Actual</TableCell>
                    <TableCell>Done</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hasData ? billsData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₱{item.expected}</TableCell>
                      <TableCell>₱{item.actual}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.done}
                          onChange={(e) => handleCheckboxChange(item.category, "bills", index, e.target.checked)}
                        />
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No data recorded</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Divider sx={{ my: 5 }} />

          {/* Savings Breakdown Table */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967" }}>Savings Breakdown</Typography>
              <Button variant="contained" onClick={() => handleOpenDialog("savings")} sx={{ backgroundColor: "#4caf50" }}>Create</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Expected</TableCell>
                    <TableCell>Actual</TableCell>
                    <TableCell>Done</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hasData ? savingsData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₱{item.expected}</TableCell>
                      <TableCell>₱{item.actual}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.done}
                          onChange={(e) => handleCheckboxChange(item.category, "savings", index, e.target.checked)}
                        />
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No data recorded</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Paper>

      {/* Dialog for Creating Records */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: "'Lilita One'" }}>
          Create New {dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} Record
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Category"
            value={formValues.category}
            onChange={(e) => handleFormChange("category", e.target.value)}
            fullWidth
            sx={{ fontFamily: "'Lilita One'" }}
          />
          <TextField
            label="Expected"
            type="number"
            value={formValues.expected}
            onChange={(e) => handleFormChange("expected", e.target.value)}
            fullWidth
            sx={{ fontFamily: "'Lilita One'" }}
          />
          <TextField
            label="Actual"
            type="number"
            value={formValues.actual}
            onChange={(e) => handleFormChange("actual", e.target.value)}
            fullWidth
            sx={{ fontFamily: "'Lilita One'" }}
          />
          {dialogType === "expenses" && (
            <TextField
              label="Due Date"
              type="date"
              value={formValues.due}
              onChange={(e) => handleFormChange("due", e.target.value)}
              fullWidth
              sx={{ fontFamily: "'Lilita One'" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ fontFamily: "'Lilita One'" }}>Cancel</Button>
          <Button onClick={handleCreateRecord} variant="contained" sx={{ fontFamily: "'Lilita One'" }}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinanceTracker;