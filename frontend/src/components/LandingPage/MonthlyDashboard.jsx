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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Money, AccountBalanceWallet, MonetizationOn, AttachMoney, ShoppingCart, Savings, Home, SportsEsports, Article, TravelExplore, Info, Login } from "@mui/icons-material";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Pie, Bar } from "react-chartjs-2";
import 'chart.js/auto';
import axios from "axios";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TrackerReport from "./TrackerReport";
import Navbar from './Navbar';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
const [warningMessage, setWarningMessage] = useState("");

  // State to control dialog open/close and form data
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "income", "expenses", "bills", "savings"
  const [formValues, setFormValues] = useState({
    subcategory: "",
    customSubcategory: "",
    category: "",
    expected: "",
    actual: "",
    due: "",
  });
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const userId = localStorage.getItem("userId");

  const categories = {
    Expenses: {
      "Payments/Dues": ["Housing Bills", "Rent", "Mortgage", "Property Tax", "Loan Payments"],
      Utilities: ["Electricity", "Water", "Gas", "Internet", "Phone", "Garbage Collection"],
      Insurance: ["Health Insurance", "Life Insurance", "Vehicle Insurance", "Home Insurance", "Travel Insurance"],
      "Education Bills": ["Tuition Fees", "Student Loan Payments", "School Supplies", "Online Courses"],
      "Food Expenses": ["Groceries", "Snacks", "Beverages", "Fast Food"],
      Transportation: ["Gas", "Public Transportation", "Ride-Sharing Services", "Vehicle Maintenance"],
      "Savings & Investments": ["Emergency Fund", "Retirement Savings", "Debt Repayment", "Stock Market Investments"],
      Others: ["Charitable Donations", "Unexpected Expenses", "Pet Expenses"],
    },
    Bills: {
      Subscriptions: ["Netflix", "Gym Membership", "Cloud Storage", "Magazine Subscriptions", "Music Streaming"],
      Entertainment: ["Movies/Cinema", "Concerts", "Gaming", "Hobbies", "Streaming Services"],
      Shopping: ["Clothes", "Accessories", "Gadgets", "Home Decor", "Books"],
      "Dining Out": ["Restaurants", "Cafes", "Takeout/Delivery", "Street Food"],
      "Travel Expenses": ["Flights", "Hotels", "Vacations", "Transportation Rentals"],
      Others: ["Special Occasions", "Gifts", "Event Tickets"],
    },
    Savings: {
      "Emergency Fund": ["Medical Emergencies", "Job Loss Fund", "Unexpected Repairs"],
      "Retirement Savings": ["401(k)", "Pension Plan", "IRA Contributions"],
      "Debt Repayment": ["Credit Card Payments", "Student Loan Repayments", "Car Loan Payments"],
      "Investments": ["Stocks", "Bonds", "Mutual Funds", "Real Estate"],
      "Savings Account Deposits": ["Monthly Savings", "High-Interest Savings Accounts"],
      "Sinking Fund": ["Planned Future Expenses", "Car Purchase", "Wedding Fund", "Vacation Fund"],
      Others: ["Tax Savings", "Investment in Business"],
    },
    Income: {
      "Salary/Wages": ["Full-Time Job", "Part-Time Job", "Overtime Pay"],
      "Freelance/Side Hustle Earnings": ["Freelance Writing", "Graphic Design", "Online Tutoring"],
      "Business Income": ["E-commerce Sales", "Consulting Services", "Passive Income Streams"],
      "Rental Income": ["Apartment Rental", "Car Rental", "Vacation Home Rental"],
      "Dividends": ["Stock Dividends", "Mutual Fund Dividends", "Real Estate Investment Trusts (REITs)"],
      "Government Benefits": ["SSS", "GSIS", "Unemployment Benefits", "Disability Benefits"],
      "Bonuses/Commissions": ["Performance Bonus", "Referral Bonus", "Sales Commission"],
      "Gifts or Allowances": ["Holiday Gifts", "Parental Support", "Scholarships"],
      Others: ["Lottery Winnings", "Cash Prizes", "Refunds/Rebates"],
    },
  };
  
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

 // Modify the handleCheckboxChange function
const handleCheckboxChange = (category, type, index, checked) => {
  const updatedData = [...data];

  // Find the current item
  const currentItem = type === "income" ? incomeData[index] :
                      type === "expenses" ? expensesData[index] :
                      type === "bills" ? billsData[index] :
                      savingsData[index];

  // Check if the actual values exceed the actual income
  if ((type === "expenses" || type === "bills") && currentItem.actual > totalIncome) {
    setWarningMessage("Expenses exceed Income. Please adjust your expenses.");
    setWarningDialogOpen(true);
    return;
  }

  updatedData.forEach((entry, entryIndex) => {
    if (Array.isArray(entry[type])) {
      updatedData[entryIndex] = {
        ...entry,
        [type]: entry[type].map(item =>
          item.category === category && item.expected === currentItem.expected && item.actual === currentItem.actual && item.due === currentItem.due
            ? { ...item, done: checked }
            : item
        ),
      };
    }
  });

  updatedData.forEach((updatedRecord) => {
    if (!updatedRecord.tracker_id) {
      console.error("Missing tracker_id for update.");
      return;
    }

    axios
      .put(
        `http://127.0.0.1:8000/monthly_tracker/update-tracker/${updatedRecord.tracker_id}`,
        updatedRecord
      )
      .then(response => {
        setData(updatedData);
        const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth);
        fetchFinanceData(parseInt(currentYear), monthIndex + 1);
      })
      .catch(error => {
        console.error("Error updating the 'done' status:", error);
      });
  });
};


  const handleAiAnalysis = async () => {
    try {
      const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth) + 1;
  
      if (!userId || !currentYear || !monthIndex || !hasData) {
        setAiAnalysis("No data available for AI analysis.");
        return;
      }
  
      const response = await axios.post(`http://127.0.0.1:8000/ai/analyze/${userId}/${currentYear}/${monthIndex}`);
      setAiAnalysis(response.data.analysis);
  
      if (hasData) {
        axios
          .get(`http://127.0.0.1:8000/ai/get-analysis/${userId}/${currentYear}/${monthIndex}`)
          .then((response) => {
            if (response.data.analysis) {
              setAiAnalysis(response.data.analysis);
            } else {
              setAiAnalysis("No data available for AI analysis.");
            }
          })
          .catch((error) => {
            console.error("Error fetching AI analysis:", error);
            setAiAnalysis("Unable to generate AI insights.");
          });
      }
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
      setAiAnalysis("Unable to generate AI insights.");
    }
  };
  
  useEffect(() => {
    handleAiAnalysis();
  }, [selectedMonth, currentYear]);

  const totalIncome = incomeData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);
  const totalExpenses = expensesData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);
  const totalBills = billsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);
  const totalCombinedExpenses = totalExpenses + totalBills;
  const additionalSavings = savingsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0);
  const totalsavings = (totalIncome - totalCombinedExpenses) + additionalSavings;
  
  const pieData = {
    labels: hasData ? ['Savings', 'Total Income'] : ['No data recorded'],
    datasets: [
      {
        data: hasData ? [totalsavings, totalIncome] : [1],
        backgroundColor: hasData ? ['#5e3967', '#6a0dad'] : ['#d3d3d3'],
        borderColor: hasData ? ['#4a2d52', '#500b8b'] : ['#c0c0c0'],
        borderWidth: 2,
        hoverBackgroundColor: hasData ? ['#7e4987', '#8627d1'] : ['#e0e0e0'],
        hoverOffset: 15,
      },
    ],
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: "'Lilita One'",
            size: 14
          },
          color: '#5e3967',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(94, 57, 103, 0.8)',
        titleFont: {
          family: "'Lilita One'",
          size: 16
        },
        bodyFont: {
          family: "'Lilita One'",
          size: 14
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₱${value} (${percentage}%)`;
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          family: "'Lilita One'",
          size: 14
        },
        align: 'center',
        anchor: 'center',
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}:\n${percentage}%`;
        }
      }
    },
    // Remove the cutout property to have a solid pie chart
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };
  
  const barData = {
    labels: hasData ? ["Income", "Needs", "Wants", "Savings"] : ["No data recorded"],
    datasets: hasData ? [
      {
        label: "Actual",
        data: [totalIncome, totalExpenses, totalBills, totalsavings],
        backgroundColor: "#6a0dad",
        borderColor: "#500b8b",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "#8a2be2",
        barPercentage: 0.75,
        categoryPercentage: 0.8,
      },
      {
        label: "Expected",
        data: [
          incomeData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
          expensesData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
          billsData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
          savingsData.filter(item => item.done).reduce((total, item) => total + item.expected, 0),
        ],
        backgroundColor: "#5e3967",
        borderColor: "#432848",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "#7a4c86",
        barPercentage: 0.75,
        categoryPercentage: 0.8,
      }
    ] : [
      {
        label: "No data",
        data: [1],
        backgroundColor: "#d3d3d3",
        borderColor: "#b3b3b3",
        borderWidth: 2,
        borderRadius: 6,
      }
    ],
  };
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(94, 57, 103, 0.1)',
        },
        ticks: {
          font: {
            family: "'Lilita One'",
            size: 12
          },
          color: '#5e3967',
          callback: function(value) {
            return '₱' + value;
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Lilita One'",
            size: 14
          },
          color: '#5e3967'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: "'Lilita One'",
            size: 14
          },
          color: '#5e3967',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(94, 57, 103, 0.8)',
        titleFont: {
          family: "'Lilita One'",
          size: 16
        },
        bodyFont: {
          family: "'Lilita One'",
          size: 14
        },
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ₱${value}`;
          }
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };
  // Handlers for create dialog
  const handleOpenDialog = (type) => {
    setDialogType(type);
    setFormValues({   subcategory: "", customSubcategory: "",category: "", expected: "", actual: "", due: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  
    // If the category is changed to "Others", clear the subcategory
    if (field === "category" && value === "Others") {
      setFormValues(prev => ({ ...prev, subcategory: "", customSubcategory: "" }));
    }
  
    // If the subcategory is changed to "Others", clear the custom subcategory
    if (field === "subcategory" && value === "Others") {
      setFormValues(prev => ({ ...prev, customSubcategory: "" }));
    }
  };
  const handleCreateRecord = async () => {
    // Ensure numeric values are properly parsed
    const newRecord = {
      category: formValues.category === "Others" ? formValues.customSubcategory : formValues.subcategory,
      subcategory: formValues.subcategory === "Others" ? formValues.customSubcategory : formValues.subcategory,
      expected: parseFloat(formValues.expected) || 0,
      actual: parseFloat(formValues.actual) || 0,
      done: dialogType === "income" || dialogType === "savings" ? true : false, // Set done to true for income and savings
      ...(dialogType === "expenses" || dialogType === "bills" ? { due: formValues.due } : {}),
    };
  
    try {
      // Convert selectedMonth to its corresponding index (1-indexed)
      const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth) + 1;
  
      // Send request to create tracker
      const response = await axios.post(`http://127.0.0.1:8000/monthly_tracker/create-tracker`, {
        year: currentYear,
        month: monthIndex,
        user_id: userId,
        [dialogType]: [newRecord], // Ensure the new record is included in the correct array
      });
  
      if (response.data.success) {
        // Refetch data after creation
        fetchFinanceData(parseInt(currentYear), monthIndex);
      } else {
        console.error("Failed to create new record:", response.data);
      }
  
      setOpenDialog(false);
      // Refetch data after closing the dialog
      fetchFinanceData(parseInt(currentYear), monthIndex);
    } catch (error) {
      console.error("Error creating new record:", error);
    }
  };
  
  const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(selectedMonth) + 1;

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
                  barData={barData}
                  aiAnalysis={aiAnalysis}     
                  />}
                  fileName="FinanceTrackerReport.pdf"
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

    
        {/* Financial Summary (Total Income, Expenses, Savings, Remaining Budget, Personal Savings) */}
        <Box sx={{ flex: 2, fontFamily: "'Lilita One'", pr: 4 }}>
          {[
            { label: "Total Income", amount: hasData ? totalIncome : 0, color: "#6a0dad", icon: <Money fontSize="large" /> },
            { label: "Total Expenses", amount: hasData ? totalCombinedExpenses : 0, color: "#c2185b", icon: <ShoppingCart fontSize="large" /> },
            { label: "Savings", amount: hasData ? totalsavings : 0, color: "#4caf50", icon: <Savings fontSize="large" /> },
            { label: "Remaining Budget", amount: hasData ? (totalIncome - totalCombinedExpenses) : 0, color: "#ff9800", icon: <AccountBalanceWallet fontSize="large" /> },
            { label: "Personal Savings", amount: hasData ? savingsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0) : 0, color: "#3f51b5", icon: <AssuredWorkloadIcon fontSize="large" /> }
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
                    value={
                      item.label === "Total Expenses" ? (totalIncome ? (totalCombinedExpenses / totalIncome) * 100 : 0) :
                      item.label === "Savings" ? (totalsavings ? (totalsavings / totalsavings) * 100 : 0) :
                      item.label === "Total Income" ? (totalIncome ? (totalIncome / totalIncome) * 100 : 0) :
                      item.label === "Remaining Budget" ? (totalIncome ? ((totalIncome - totalCombinedExpenses) / totalIncome) * 100 : 0) :
                      item.label === "Personal Savings" ? (totalIncome ? (savingsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0) / totalIncome) * 100 : 0) :
                      100
                    }
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
          <Pie data={pieData} options={pieOptions} plugins={[ChartDataLabels]} width={600} height={250} />
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
                  {hasData && incomeData.some(item => item.done) && (
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell>₱{incomeData.filter(item => item.done).reduce((total, item) => total + item.expected, 0)}</TableCell>
                      <TableCell>₱{incomeData.filter(item => item.done).reduce((total, item) => total + item.actual, 0)}</TableCell>
                      <TableCell></TableCell>
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967" }}>Essential Expenses </Typography>
              <Button variant="contained" onClick={() => handleOpenDialog("expenses")} sx={{ backgroundColor: "#c2185b" }}>Create</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Expected</TableCell>
                    <TableCell>Actual</TableCell>
                    <TableCell>Payment Date</TableCell>
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
                  {hasData && expensesData.some(item => item.done) && (
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell>₱{expensesData.filter(item => item.done).reduce((total, item) => total + item.expected, 0)}</TableCell>
                      <TableCell>₱{expensesData.filter(item => item.done).reduce((total, item) => total + item.actual, 0)}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
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
          {/* Savings Breakdown Table */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967" }}>Personal Savings</Typography>
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
                  {hasData && savingsData.some(item => item.done) && (
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell>₱{savingsData.filter(item => item.done).reduce((total, item) => total + item.expected, 0)}</TableCell>
                      <TableCell>₱{savingsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Divider sx={{ my: 5 }} />

          {/* Bills Breakdown Table */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#5e3967" }}>Discretionary Expenses </Typography>
              <Button variant="contained" onClick={() => handleOpenDialog("bills")} sx={{ backgroundColor: "#5e3967" }}>Create</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Expected</TableCell>
                    <TableCell>Actual</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Done</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hasData ? billsData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>₱{item.expected}</TableCell>
                      <TableCell>₱{item.actual}</TableCell>
                      <TableCell>{item.due}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.done}
                          onChange={(e) => handleCheckboxChange(item.category, "bills", index, e.target.checked)}
                        />
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No data recorded</TableCell>
                    </TableRow>
                  )}
                  {hasData && billsData.some(item => item.done) && (
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell>₱{billsData.filter(item => item.done).reduce((total, item) => total + item.expected, 0)}</TableCell>
                      <TableCell>₱{billsData.filter(item => item.done).reduce((total, item) => total + item.actual, 0)}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Paper>


      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
    <DialogTitle sx={{ fontFamily: "'Lilita One'" }}>
      Create New Record
    </DialogTitle>
    <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {(dialogType === "expenses" || dialogType === "bills" || dialogType === "savings" || dialogType === "income") ? (
        <>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formValues.category}
              onChange={(e) => handleFormChange("category", e.target.value)}
              label="Category"
            >
              {Object.keys(categories[dialogType.charAt(0).toUpperCase() + dialogType.slice(1)]).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formValues.category === "Others" ? (
            <TextField
              label="Custom Category"
              value={formValues.customSubcategory}
              onChange={(e) => handleFormChange("customSubcategory", e.target.value)}
              fullWidth
              sx={{ fontFamily: "'Lilita One'" }}
            />
          ) : (
            formValues.category && (
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={formValues.subcategory}
                  onChange={(e) => handleFormChange("subcategory", e.target.value)}
                  label="Subcategory"
                >
                  {categories[dialogType.charAt(0).toUpperCase() + dialogType.slice(1)][formValues.category].map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          )}
          {formValues.subcategory === "Others" && (
            <TextField
              label="Custom Subcategory"
              value={formValues.customSubcategory}
              onChange={(e) => handleFormChange("customSubcategory", e.target.value)}
              fullWidth
              sx={{ fontFamily: "'Lilita One'" }}
            />
          )}
        </>
      ) : (
        <TextField
          label="Category"
          value={formValues.category}
          onChange={(e) => handleFormChange("category", e.target.value)}
          fullWidth
          sx={{ fontFamily: "'Lilita One'" }}
        />
      )}
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
      {(dialogType === "expenses" || dialogType === "bills") && (
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

<Dialog
  open={errorDialogOpen}
  onClose={() => setErrorDialogOpen(false)}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  PaperProps={{
    style: {
      backgroundColor: '#f3e5f5',
      borderRadius: '15px',
      padding: '20px',
    },
  }}
>
  <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "'Lilita One'", color: '#c2185b' }}>
    {"Error"}
  </DialogTitle>
  <DialogContent>
    <Typography id="alert-dialog-description" sx={{ fontFamily: "'Lilita One'", color: '#5e3967' }}>
      {errorMessage}
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setErrorDialogOpen(false)} sx={{ fontFamily: "'Lilita One'", color: '#fff', backgroundColor: '#c2185b', '&:hover': { backgroundColor: '#a31545' } }} autoFocus>
      Close
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={warningDialogOpen}
  onClose={() => setWarningDialogOpen(false)}
  aria-labelledby="warning-dialog-title"
  aria-describedby="warning-dialog-description"
  PaperProps={{
    style: {
      backgroundColor: '#351742',
      borderRadius: '15px',
      padding: '20px',
    },
  }}
>
  <DialogTitle id="warning-dialog-title" sx={{ fontFamily: "'Lilita One'", textAlign: 'center',color: 'White' }}>
    {"Warning"}
  </DialogTitle>
  <DialogContent>
    <Typography id="warning-dialog-description" sx={{ fontFamily: "'Lilita One'", color: 'white' }}>
      {warningMessage}
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setWarningDialogOpen(false)} sx={{ fontFamily: "'Lilita One'", color: '#fff', backgroundColor: '#009797', '&:hover': { backgroundColor: '#009797' } }} autoFocus>
      Close
    </Button>
  </DialogActions>
</Dialog>   
    </Box>
  );
};

export default FinanceTracker;