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
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from "recharts";

const COLORS = ["#8a619b", "#67407a", "#75538a"];

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
              category: item.category || "N/A"
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

  const generateSpendingBreakdownData = (expenses) => {
    return expenses.map(expense => ({
      category: expense.category,
      expected: expense.expected || 0,
      actual: expense.actual || 0,
    }));
  };

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

  if (loading) return <div style={{ color: "#fff" }}>Loading...</div>;

  return (
    <div style={{ overflowX: "auto", width: "100%",  padding: "20px" }}>
      <TableContainer component={Paper} sx={{ backgroundColor: "#67407a" }} >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#8a619b" }} >
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trackers.map((tracker) => (
              <TableRow key={tracker.user_id} sx={{ backgroundColor: "#67407a" }}>
                <TableCell sx={{ fontFamily: "'Lilita One'", color: "#fff" }}>{tracker.user_id}</TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'", color: "#fff" }}>{tracker.username}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setOpenModal(tracker)} sx={{ color: "#b590c7" }}>
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
        <Box sx={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          width: "90%", 
          height: "90%", 
          bgcolor: "#b392ac", 
          boxShadow: 24, 
          p: 4, 
          overflowY: "auto", 
          fontFamily: "'Lora'" 
        }}>
          <IconButton onClick={() => setOpenModal(null)} sx={{ position: "absolute", top: 10, right: 10, color: "#fff" }}>
            <Close />
          </IconButton>

          <h3 style={{ color: "#fff", mb: 2 }}>Expenses Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateDailyExpensesData(openModal?.categorizedRecords.expenses || [])}>
              <XAxis dataKey="day" stroke="#67407a" />
              <YAxis tickFormatter={(value) => `₱${value.toLocaleString()}`} stroke="#67407a" />
              <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
              <Legend />
              < Line type="monotone" dataKey="amount" stroke="#67407a" />
            </LineChart>
          </ResponsiveContainer>

          <h3 style={{ color: "#fff" }}>Expenses Breakdown</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie 
                data={generateExpensesBreakdownData(openModal?.categorizedRecords.expenses || [])} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={150} 
                paddingAngle={3}
                label={({ name, value, percent }) => percent > 0.05 ? `${name}: ₱${value.toLocaleString()}` : ""}
                labelLine={false}
              >
                {generateExpensesBreakdownData(openModal?.categorizedRecords.expenses || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>

          <h3 style={{ color: "#fff" }}>Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={generateSpendingBreakdownData(openModal?.categorizedRecords.expenses || [])}>
              <XAxis dataKey="category" stroke="#67407a" />
              <YAxis tickFormatter={(value) => `₱${value.toLocaleString()}`} stroke="#67407a" />
              <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="expected" fill="#75538a" name="Expected" />
              <Bar dataKey="actual" fill="#9b71ad" name="Actual" />
            </BarChart>
          </ResponsiveContainer>

          <h3 style={{ color: "#fff" }}>Income Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={generateIncomeDistributionData(openModal?.categorizedRecords.income || [])}
                dataKey="value"
                nameKey="name"
                cx="50%" 
                cy="50%"
                outerRadius={150}
                paddingAngle={3}
                label={({ name, value, percent }) => percent > 0.05 ? `${name}: ₱${value.toLocaleString()}` : ""}
                labelLine={false}
              >
                {generateIncomeDistributionData(openModal?.categorizedRecords.income || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>

          <h2 style={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff", marginBottom: 5}}>Transaction Logs for {openModal?.username}</h2>

          <FormControl fullWidth>
            <InputLabel style={{ fontFamily: "'Lora'", color: "#fff",  }}>Select Category</InputLabel>
            <Select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)} 
              sx={{ fontFamily: "'Lora'", bgcolor: "#67407a", color: "#fff" }}
            >
              <MenuItem sx={{ fontFamily: "'Lora'", color: "#fff" }} value="all">All Categories</MenuItem>
              <MenuItem sx={{ fontFamily: "'Lora'", color: "#fff" }} value="bills">Bills</MenuItem>
              <MenuItem sx={{ fontFamily: "'Lora'", color: "#fff" }} value="expenses">Expenses</MenuItem>
              <MenuItem sx={{ fontFamily: "'Lora'", color: "#fff" }} value="income">Income</MenuItem>
              <MenuItem sx={{ fontFamily: "'Lora'", color: "#fff" }} value="savings">Savings</MenuItem>
            </Select>
          </FormControl>

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
                  backgroundColor: "#67407a",
                  color: "#fff",
                  textAlign: "center",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontFamily: "'Lora'",
                }}
              >
                {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
              </PDFDownloadLink>

              <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                <Grid item xs={6}>
                  <CategoryTable title="Bills" data={openModal?.categorizedRecords.bills || []} />
                </Grid>
                <Grid item xs={6}>
                  <CategoryTable title="Expenses" data={openModal?.categorizedRecords.expenses || []} />
                </Grid>
                <Grid item xs={6}>
                  <CategoryTable title="Income" data={openModal?.categorizedRecords.income || []} />
                </Grid>
                <Grid item xs={6}>
                  <CategoryTable title="Savings" data={openModal?.categorizedRecords.savings || []} />
                </Grid>
              </Grid>
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

  const totalExpected = data.reduce((sum, item) => sum + (item.expected || 0), 0);
  const totalActual = data.reduce((sum, item) => sum + (item.actual || 0), 0);

  return (
    <div style={{ marginTop: "10px" }}>
      <h3 style={{ color: "#fff" }}>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#75538a" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>Subcategory</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>Expected</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>Actual</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && Array.isArray(data) && data.length > 0 ? (
              <>
                {data.slice(0, visibleCount).map((item, index) => (
                  <TableRow key={index} sx={{ backgroundColor: "#67407a" }}>
                    <TableCell sx={{ fontFamily: "'Lora'", color: "#fff" }}>{item.category || "N/A"}</TableCell>
                    <TableCell sx={{ fontFamily: "'Lora'", color: "#fff" }}>₱{item.expected?.toLocaleString() || "N/A"}</TableCell>
                    <TableCell sx={{ fontFamily: "'Lora'", color: "#fff" }}>₱{item.actual?.toLocaleString() || "N/A"}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{item.done ? "✅" : "❌"}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: "#8a619b" }}>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>₱{totalExpected.toLocaleString()}</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff" }}>₱{totalActual.toLocaleString()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", color: "#fff" }}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {visibleCount < data.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 10)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            backgroundColor: "#b590c7",
            color: "#fff",
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