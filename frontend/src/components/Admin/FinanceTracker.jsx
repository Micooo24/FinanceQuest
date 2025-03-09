import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { Close, ExpandMore } from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FinanceTrackerPDF from "./FinanceTrackerPDF"; 
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, BarChart , Bar  } from "recharts";


const COLORS = ["#DAD2FF", "#B2A5FF", "#C5BAFF", "#5e3967", "#8c2fc7"];

const FinanceTracker = () => {
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/monthly_tracker/get-all-tracker');
        const groupedTrackers = groupByUser(response.data);
        setTrackers(groupedTrackers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trackers:", error);
        setLoading(false);
      }
    };

    fetchTrackers();
  }, []);

  const groupByUser = (data) => {
    const userMap = {};
  
    data.forEach((tracker) => {
      const userId = tracker.user_id || "Unknown";
      
      if (!userMap[userId]) {
        userMap[userId] = {
          user_id: userId,
          username: tracker.username || "Unknown",
          categorizedRecords: {
            bills: [],
            expenses: [],
            income: [],
            savings: [],
          },
        };
      }
  
      ["bills", "expenses", "income", "savings"].forEach((type) => {
        if (Array.isArray(tracker[type])) {
          userMap[userId].categorizedRecords[type] = [
            ...(userMap[userId].categorizedRecords[type] || []),
            ...tracker[type].map(item => ({
              ...item,
              category: item.category || "N/A"  // Ensure subcategory exists
            }))
          ];
        }
      });
    });
  
    return Object.values(userMap);
  };
  

  const generateDailyExpensesData = (expenses) => {
    return expenses.map((expense, index) => ({
      day: `Entry ${index + 1}`,
      amount: expense.actual,
    }));
  };

  const generateExpensesBreakdownData = (expenses) => {
    const categoryTotals = {};
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.actual;
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  // Function to prepare spending breakdown data (expected vs actual)
const generateSpendingBreakdownData = (expenses) => {
  return expenses.map(expense => ({
    category: expense.category,
    expected: expense.expected || 0,
    actual: expense.actual || 0,
  }));
};

// Function to prepare income distribution data
const generateIncomeDistributionData = (income) => {
  const categoryTotals = {};
  income.forEach(entry => {
    categoryTotals[entry.category] = (categoryTotals[entry.category] || 0) + entry.actual;
  });
  return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
};
const generateFinancialReport = (user) => {
  if (!user || !user.categorizedRecords) {
    return "User data is unavailable. Please check your input.";
  }

  const { categorizedRecords } = user;
  const incomeTotal = categorizedRecords.income.reduce((sum, entry) => sum + entry.actual, 0);
  const expenseTotal = categorizedRecords.expenses.reduce((sum, entry) => sum + entry.actual, 0);
  const savingsTotal = categorizedRecords.savings.reduce((sum, entry) => sum + entry.actual, 0);
  const billsTotal = categorizedRecords.bills.reduce((sum, entry) => sum + entry.actual, 0);

  const surplusOrDeficit = incomeTotal - (expenseTotal + billsTotal);
  const savingsRate = ((savingsTotal / incomeTotal) * 100).toFixed(2);
  const highestSpendingCategory = categorizedRecords.expenses.reduce((max, entry) => 
    entry.actual > max.actual ? entry : max, { actual: 0 });

  return `
    Overall Financial Standing: ${surplusOrDeficit >= 0 ? 'Surplus ✅' : 'Deficit ❌'}
    Total Income: ₱${incomeTotal.toLocaleString()}
    Total Expenses: ₱${expenseTotal.toLocaleString()}
    Total Bills: ₱${billsTotal.toLocaleString()}
    Total Savings: ₱${savingsTotal.toLocaleString()}
    Savings Rate: ${savingsRate}% of total income
    Highest Spending Category: ${highestSpendingCategory.category || "N/A"} (₱${highestSpendingCategory.actual.toLocaleString()})

    Insights & Recommendations:
    Managing your finances effectively is crucial for long-term financial stability. Based on your financial summary, here are some key insights and recommendations:
    
    Spending Behavior: You spent a total of ₱${expenseTotal.toLocaleString()}, which ${expenseTotal > incomeTotal ? "exceeds" : "is within"} your income. If you are overspending, consider cutting back on discretionary expenses such as dining out (₱${categorizedRecords.expenses.find(e => e.category === 'Dining')?.actual.toLocaleString() || 0}), shopping (₱${categorizedRecords.expenses.find(e => e.category === 'Shopping')?.actual.toLocaleString() || 0}), and entertainment (₱${categorizedRecords.expenses.find(e => e.category === 'Entertainment')?.actual.toLocaleString() || 0}). Following the 50/30/20 rule can help you better allocate your income.
    
    Savings Analysis: You have saved ₱${savingsTotal.toLocaleString()}, which is ${savingsRate}% of your income. Ideally, you should aim for at least 20%. If you're below this, try automating transfers to a dedicated savings account each payday. If you’re already saving well, consider placing some of it into high-yield accounts or low-risk investments.
    
    Investment Potential: Since your savings exceed ₱5,000, you might consider investing in beginner-friendly options like mutual funds or government bonds. If your savings are lower, focus on building your emergency fund first. Your current emergency fund stands at ₱${savingsTotal.toLocaleString()}, which ${savingsTotal >= incomeTotal * 0.3 ? "is within a safe range" : "should be increased to cover 3-6 months of expenses"}.
    
    Bill Management: Your fixed expenses amount to ₱${billsTotal.toLocaleString()}, accounting for ${(billsTotal / incomeTotal * 100).toFixed(2)}% of your income. ${billsTotal > (incomeTotal * 0.5) ? "This exceeds the recommended 50%, so consider negotiating rent or utility rates and reducing fixed commitments." : "Your fixed expenses are well-balanced, but always review your bills to ensure they remain manageable."}
    
    Debt Considerations: If you have any debts, prioritize paying off high-interest loans first. Check your credit card balance and outstanding loans—your total debt obligations amount to ₱${categorizedRecords.expenses.find(e => e.category === 'Debt Payment')?.actual.toLocaleString() || 0}. Using strategies like the debt avalanche method can help you reduce financial strain efficiently.
    
    Long-Term Financial Planning: Consider setting long-term financial goals such as homeownership, business ventures, or retirement planning. If you haven’t yet, you may want to start investing in Pag-IBIG MP2 or other long-term financial instruments. Additionally, securing insurance (health, life, accident) can protect against unforeseen financial difficulties.
    
    Final Thoughts: Your financial situation is ${surplusOrDeficit >= 0 ? "showing positive signs, allowing for savings and investments. Keep refining your financial habits." : "in a deficit, meaning your spending exceeds your income. Consider adjusting your budget, reducing unnecessary expenses, and finding ways to increase your earnings."}

  `;
};


  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C5BAFF" }}>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trackers.map((tracker) => (
              <TableRow key={tracker.user_id} sx={{ backgroundColor: "#DAD2FF" }}>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{tracker.user_id}</TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{tracker.username}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setOpenModal(tracker)}>
                    <ExpandMore />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {/* Modal for Transaction Logs */}
      <Modal open={Boolean(openModal)} onClose={() => setOpenModal(null)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", height: "90%", bgcolor: "#DAD2FF", boxShadow: 24, p: 4, overflowY: "auto" , fontFamily: "'Lora'"}}>
          <IconButton onClick={() => setOpenModal(null)} sx={{ position: "absolute", top: 10, right: 10 }}>
            <Close />
          </IconButton>

          <h3>Expenses Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={generateDailyExpensesData(openModal?.categorizedRecords.expenses || [])}>
            <XAxis dataKey="day" />
            <YAxis tickFormatter={(value) => `₱${value.toLocaleString()}`} /> {/* Adds ₱ sign to Y-axis */}
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} /> {/* Adds ₱ sign to tooltip */}
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>


          <h3>Expenses Breakdown</h3>
          <ResponsiveContainer width="100%" height={400}>
  <PieChart>
    <Pie 
      data={generateExpensesBreakdownData(openModal?.categorizedRecords.expenses || [])} 
      dataKey="value" 
      nameKey="name" 
      cx="50%" cy="50%" 
      outerRadius={150} 
      fill="#82ca9d" 
      paddingAngle={3} // Adds spacing between slices
      label={({ name, value, percent }) => 
        percent > 0.05 ? `${name}: ₱${value.toLocaleString()}` : ""
      } // Hide labels for tiny slices
      labelLine={false} // Remove unnecessary lines
    >
      {generateExpensesBreakdownData(openModal?.categorizedRecords.expenses || []).map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
  </PieChart>
</ResponsiveContainer>


          {/* Spending Breakdown (Expected vs. Actual) */}
          <h3>Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={generateSpendingBreakdownData(openModal?.categorizedRecords.expenses || [])}>
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `₱${value.toLocaleString()}`} />
              <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="expected" fill="#8c2fc7" name="Expected" />
              <Bar dataKey="actual" fill="#5e3967" name="Actual" />
            </BarChart>
          </ResponsiveContainer>

          {/* Income Distribution (Pie Chart) */}
          <h3>Income Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
  <PieChart>
    <Pie
      data={generateIncomeDistributionData(openModal?.categorizedRecords.income || [])}
      dataKey="value"
      nameKey="name"
      cx="50%" cy="50%"
      outerRadius={150}
      fill="#8c2fc7"
      paddingAngle={3} // Adds spacing between slices
      label={({ name, value, percent }) => 
        percent > 0.05 ? `${name}: ₱${value.toLocaleString()}` : ""
      } // Hides labels for tiny values
      labelLine={false} // Removes label lines to reduce clutter
    >
      {generateIncomeDistributionData(openModal?.categorizedRecords.income || []).map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
  </PieChart>
</ResponsiveContainer>



          <h2  sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Transaction Logs for {openModal?.username}</h2>

          {/* Category Dropdown */}
          <FormControl fullWidth>
            <InputLabel style={{ fontFamily: "'Lora'", }}>Select Category</InputLabel>
            <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}  style={{ fontFamily: "'Lora'", bgcolor: "#DAD2FF"}}>
              <MenuItem  sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#000" , }} value="all">All Categories</MenuItem>
              <MenuItem  sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#000" }} value="bills">Bills</MenuItem>
              <MenuItem  sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#000" }}value="expenses">Expenses</MenuItem>
              <MenuItem  sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#000" }}value="income">Income</MenuItem>
              <MenuItem  sx={{ fontWeight: "bold", fontFamily: "'Lora'", color: "#000" }}value="savings">Savings</MenuItem>
            </Select>
          </FormControl>

          {/* Conditionally render the selected category's table */}
          {selectedCategory === "all" ? (
            <>
              <PDFDownloadLink
                document={
                  <FinanceTrackerPDF
                    user={openModal}
                    categories={[
                      { title: "Bills", data: openModal?.categorizedRecords.bills || [] },
                      { title: "Expenses", data: openModal?.categorizedRecords.expenses || [] },
                      { title: "Income", data: openModal?.categorizedRecords.income || [] },
                      { title: "Savings", data: openModal?.categorizedRecords.savings || [] },
                    ]}
                  />
                }
                fileName={`TransactionLogs_${openModal?.username}.pdf`}
                style={{
                  display: "block",
                  marginLeft: "950px",
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#8c2fc7",
                  color: "white",
                  textAlign: "center",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontFamily: "'Lora'",
                }}
              >
                {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
              </PDFDownloadLink>

             {/* Two-column layout */}
             <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                {/* First Row: Bills & Expenses */}
                <Grid item xs={6}>
                  <CategoryTable title="Bills" data={openModal?.categorizedRecords.bills || []} />
                </Grid>
                <Grid item xs={6}>
                  <CategoryTable title="Expenses" data={openModal?.categorizedRecords.expenses || []} />
                </Grid>

                {/* Second Row: Income & Savings */}
                <Grid item xs={6}>
                  <CategoryTable title="Income" data={openModal?.categorizedRecords.income || []} />
                </Grid>
                <Grid item xs={6}>
                  <CategoryTable title="Savings" data={openModal?.categorizedRecords.savings || []} />
                </Grid>
              </Grid>


              <Box sx={{ marginTop: "20px", padding: "20px", bgcolor: "#F7F7FF", borderRadius: "10px", marginBottom: "20px" }}>
              <h2>Financial Report for {openModal?.username || "User"}</h2>
              <p style={{ whiteSpace: "pre-line", fontFamily: "'Lora'" }}>
                {openModal ? generateFinancialReport(openModal) : "Loading financial data..."}
              </p>
            </Box>
            </>
          ) : (
            <CategoryTable title={selectedCategory} data={openModal?.categorizedRecords[selectedCategory] || []} />

            
          )}


        </Box>
      </Modal>
    </div>
  );
};

const CategoryTable = ({ title, data }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  // Calculate total expected and actual values
  const totalExpected = data.reduce((sum, item) => sum + (item.expected || 0), 0);
  const totalActual = data.reduce((sum, item) => sum + (item.actual || 0), 0);

  return (
    <div style={{ marginTop: "10px" }}>
      <h3>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#B2A5FF", fontWeight: "bold", fontFamily: "'Fraunces'" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Subcategory</TableCell>
              <TableCell style={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Expected</TableCell>
              <TableCell style={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Actual</TableCell>
             
              <TableCell style={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && Array.isArray(data) && data.length > 0 ? (
              <>
                {data.slice(0, visibleCount).map((item, index) => (
                  <TableRow style={{ backgroundColor: "#DAD2FF", fontWeight: "bold" }} key={index}>
                    <TableCell style={{ fontFamily: "'Lora'" }}>{item.category || "N/A"}</TableCell>
                    <TableCell style={{ fontFamily: "'Lora'" }}>₱{item.expected?.toLocaleString() || "N/A"}</TableCell>
                    <TableCell style={{ fontFamily: "'Lora'" }}>₱{item.actual?.toLocaleString() || "N/A"}</TableCell>
              
                    <TableCell>{item.done ? "✅" : "❌"}</TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow style={{ backgroundColor: "#C5BAFF", fontWeight: "bold" }}>
                  <TableCell>Total</TableCell>
                  <TableCell>₱{totalExpected.toLocaleString()}</TableCell>
                  <TableCell>₱{totalActual.toLocaleString()}</TableCell>
                  <TableCell colSpan={2}></TableCell> {/* Empty cells for alignment */}
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Load More Button */}
      {visibleCount < data.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 10)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            backgroundColor: "#8c2fc7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "'Lora'",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};



export default FinanceTracker;
