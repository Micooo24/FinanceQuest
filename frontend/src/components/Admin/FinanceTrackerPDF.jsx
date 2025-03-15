import React from "react";
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Register Font
Font.register({
  family: "Lora",
  src: "/assets/fonts/Lora-Medium.ttf",
  fontWeight: "normal",
  format: "truetype",
});

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: { padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontFamily: "Lora" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, fontFamily: "Lora" },
  section: { marginBottom: 15 },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    fontFamily: "Roboto",
  },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    textAlign: "center",
    minHeight: 15,
    wordWrap: "break-word",
    fontFamily: "Roboto",
    borderRightWidth: 1,
    borderColor: "#000",
  },
  lastCell: {
    borderRightWidth: 0,
  },
  logo: { width: 50, height: 50 },
  reportContainer: { padding: 10, borderTopWidth: 1, borderColor: "#000" },
  reportText: { fontSize: 12, marginBottom: 5, textAlign: "justify", fontFamily: "Roboto" },
  watermarkContainer: { position: "absolute", width: "100%", height: "100%", zIndex: -1 },
  watermarkText: {
    fontSize: 30,
    color: "rgba(200, 200, 200, 0.3)",
    position: "absolute",
    fontFamily: "Lora",
  },
  userDetails: { 
    fontSize: 12, 
    marginBottom: 10, 
    fontFamily: "Roboto" 
  },
});

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

const Watermark = () => (
  <View style={styles.watermarkContainer}>
    {[...Array(10)].map((_, row) =>
      [...Array(5)].map((_, col) => (
        <Text
          key={`${row}-${col}`}
          style={{
            ...styles.watermarkText,
            top: row * 100,
            left: col * 150,
            transform: "rotate(-45deg)",
          }}
        >
          FinanceQuest
        </Text>
      ))
    )}
  </View>
);

const FinanceTrackerPDF = ({ user, categories }) => {
  const financialReport = generateFinancialReport(user);

  return (
    <Document>
      {/* Transaction Logs Pages */}
      {categories.map(({ title, data }, categoryIndex) => {
        const maxRowsPerPage = 25;
        const tableChunks = [];

        for (let i = 0; i < data.length; i += maxRowsPerPage) {
          tableChunks.push(data.slice(i, i + maxRowsPerPage));
        }

        return tableChunks.map((chunk, chunkIndex) => {
          const isFirstPage = categoryIndex === 0 && chunkIndex === 0;

          return (
            <Page key={`${title}-${chunkIndex}`} size="A4" style={styles.page}>
              <Watermark />
              <View style={styles.header}>
                <Image src="/assets/TUPLogo.png" style={styles.logo} />
                <Text style={styles.title}>Financial Tracker Logs</Text>
                <Image src="/assets/financial.png" style={styles.logo} />
              </View>

              {isFirstPage && (
                <View style={styles.userDetails}>
                  <Text>Name: {user.username || "N/A"}</Text>
                </View>
              )}

              <Text style={styles.title}>{title}</Text>

              <View style={styles.table}>
                <View style={styles.row} wrap={false}>
                  <Text style={styles.cell}>Category</Text>
                  <Text style={styles.cell}>Expected</Text>
                  <Text style={styles.cell}>Actual</Text>
                  <Text style={[styles.cell, styles.lastCell]}>Status</Text>
                </View>

                {chunk.map((item, index) => (
                  <View key={index} style={styles.row} wrap={false}>
                    <Text style={styles.cell}>{item.category || "N/A"}</Text>
                    <Text style={styles.cell}>₱{(item.expected || 0).toLocaleString()}</Text>
                    <Text style={styles.cell}>₱{(item.actual || 0).toLocaleString()}</Text>
                    <Text style={[styles.cell, styles.lastCell]}>{item.done ? "Done" : "Pending"}</Text>
                  </View>
                ))}
              </View>
            </Page>
          );
        });
      })}
    </Document>
  );
};

export default FinanceTrackerPDF;