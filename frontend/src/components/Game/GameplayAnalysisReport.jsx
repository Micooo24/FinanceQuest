import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import axios from "axios";
import tuplogo from "/assets/TUPLogo.png";
import fqlogo from "/assets/financial.jpg";

// Register fonts
Font.register({
  family: "Lilita One",
  src: "https://fonts.gstatic.com/s/lilitaone/v6/i7dPIFZ9Zz-WBtRtedDbUEY.ttf",
});

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});

// Register the font
Font.register({
  family: "Lora",
  src: "/assets/fonts/Lora-Medium.ttf",
  fontWeight: "normal",
  format: "truetype",
});

// Styles
const styles = StyleSheet.create({
  page: { padding: 30, position: "relative", fontFamily: "Lora" },
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
  },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "25%",
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

const GameplayReport = ({ playerData, analysis }) => {
    const [userDetails, setUserDetails] = useState({ username: "", email: "" });
  
    // Fetch user details from localStorage
    const username = localStorage.getItem("username")
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
    return (
      <Document>
        <Page style={styles.page}>
          <Watermark />
          <View style={styles.header}>
            <Image style={styles.logo} src={tuplogo} />
            <Text style={styles.heading}>FINANCE QUEST GAMEPLAY REPORT</Text>
            <Image style={styles.logo} src={fqlogo} />
          </View>
  
          {/* User Details and Financial Summary */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.section}>
              <Text style={styles.heading}>User Details</Text>
              <Text style={styles.heading}>Username: {username}</Text>
              <Text style={styles.text}>Date: {currentDate}</Text>
              <Text style={styles.text}>Time: {currentTime}</Text>
            </View>
  
            <View style={styles.section}>
              <Text style={styles.heading}>Player Statistics</Text>
              <Text style={styles.text}>Money: ₱{playerData?.money || '0'}</Text>
              <Text style={styles.text}>Points Earned: {new Intl.NumberFormat().format(
                (playerData?.q1_outcome?.points_earned || 0) +
                (playerData?.sq1_outcome?.points_earned || 0) +
                (playerData?.q2_outcome?.points_earned || 0) +
                (playerData?.sq2_outcome?.points_earned || 0) +
                (playerData?.q3_outcome?.points_earned || 0) 
              )}</Text>
              <Text style={styles.text}>Medals: {playerData?.medals ? playerData.medals.length : '0'}</Text>
            </View>
          </View>
  
          {/* Quest Decisions */}
          <View style={styles.section}>
            <Text style={styles.heading}>Quest Decisions</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Quest</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Decision</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Points Earned</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Money Earned</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>Money Spent</Text></View>
              </View>
              {[
                { quest: "Quest 1", decision: playerData?.q1_decision, points: playerData?.q1_outcome?.points_earned, earned: playerData?.q1_outcome?.money_earned, spent: playerData?.q1_outcome?.money_spent },
                { quest: "Side Quest 1", decision: playerData?.sq1_done ? 'Completed' : 'Not attempted', points: playerData?.sq1_outcome?.points_earned, earned: playerData?.sq1_outcome?.money_earned, spent: playerData?.sq1_outcome?.money_spent },
                { quest: "Quest 2", decision: playerData?.q2_decision, points: playerData?.q2_outcome?.points_earned, earned: playerData?.q2_outcome?.money_earned, spent: playerData?.q2_outcome?.money_spent },
                { quest: "Side Quest 2", decision: playerData?.sq2_decision, points: playerData?.sq2_outcome?.points_earned, earned: playerData?.sq2_outcome?.money_earned, spent: playerData?.sq2_outcome?.money_spent },
                { quest: "Quest 3", decision: playerData?.q3_decision, points: playerData?.q3_outcome?.points_earned, earned: playerData?.q3_outcome?.money_earned, spent: playerData?.q3_outcome?.money_spent },
              ].map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{item.quest || 'None'}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{item.decision || 'None'}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>{item.points || '0'}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>₱{item.earned || '0'}</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>₱{item.spent || '0' }</Text></View>
                </View>
              ))}
            </View>
          </View>
        </Page>
  
        <Page style={styles.page}>
          {/* AI Analysis */}
          <View style={styles.section}>
            <Text style={styles.heading}>FinanceQuest Feedback</Text>
            <Text style={[styles.text, { textAlign: "justify", lineHeight: 1.2, marginBottom: 0 }]}>{analysis}</Text>
            <Watermark />
          </View>
        </Page>
      </Document>
    );
  };
  
  export default GameplayReport;