import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import axios from "axios";
import tuplogo from "/assets/TUPLogo.png";
import fqlogo from "/assets/TUPLogo.png";

// Register fonts
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: { padding: 30, position: "relative", fontFamily: "Roboto" },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  heading: { fontSize: 18, textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  text: { fontSize: 12, fontFamily: "Roboto" },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
    borderCollapse: "collapse", // Add this line to collapse borders
  },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableCell: { fontSize: 10, fontFamily: "Roboto" },
  logo: { width: 50, height: 50 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  watermarkContainer: { position: "absolute", width: "100%", height: "100%", zIndex: -1 },
  watermarkText: {
    fontSize: 30,
    color: "rgba(200, 200, 200, 0.3)",
    position: "absolute",
  },
});

// Watermark Component
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

const SavingsReport = ({ balance, weeklyBalances, weeklyExpenses, aiFeedback }) => {
  const [userDetails, setUserDetails] = useState({ username: "", email: "" });
  
  // Fetch user details from localStorage
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken && email) {
      axios
        .get("http://127.0.0.1:8000/admin/get-users", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
          const user = response.data.users.find((user) => user.email === email);
          if (user) {
            setUserDetails({ username: user.username, email: user.email });
          }
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [authToken, email]);

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const avgWeeklyExpenses = weeklyExpenses.reduce((acc, expense) => acc + expense, 0) / weeklyExpenses.length;

  return (
    <Document>
      <Page style={styles.page}>
        <Watermark />
        <View style={styles.header}>
          <Image style={styles.logo} src={tuplogo} />
          <Text style={styles.heading}>FINANCEQUEST REPORT</Text>
          <Image style={styles.logo} src={fqlogo} />
        </View>

        {/* User Details and Financial Summary */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.section}>
            <Text style={styles.heading}>User Details</Text>
            <Text style={styles.text}>User ID: {userId}</Text>
            <Text style={styles.text}>Username: {userDetails.username}</Text>
            <Text style={styles.text}>Email: {userDetails.email}</Text>
            <Text style={styles.text}>Date: {currentDate}</Text>
            <Text style={styles.text}>Time: {currentTime}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Financial Summary</Text>
            <Text style={styles.text}>Remaining Balance: ₱{(balance || 0).toLocaleString()}</Text>
            <Text style={styles.text}>Average Weekly Expenses: ₱{(avgWeeklyExpenses || 0).toLocaleString()}</Text>
          </View>
        </View>
        
        {/* Weekly Balances and Expenses */}
        <View style={styles.section}>
          <Text style={styles.heading}>Weekly Balances and Expenses</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Week</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Balance</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Expenses</Text></View>
            </View>
            {weeklyBalances.map((balance, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{`Week ${index + 1}`}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>₱{(balance || 0).toLocaleString()}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>₱{(weeklyExpenses[index] || 0).toLocaleString()}</Text></View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Analysis */}
        <View style={styles.section}>
          <Text style={styles.heading}>FinanceQuest Feedback</Text>
          <Text style={[styles.text, { textAlign: "justify", lineHeight: 1.5, marginBottom: 0 }]}>{aiFeedback}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SavingsReport;