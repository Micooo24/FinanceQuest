import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import axios from 'axios';
import tuplogo from '/assets/TUPLogo.png'; // Make sure the path to the logo is correct
import fqlogo from '/assets/TUPLogo.png';

// Register a font that supports the Philippine Peso (₱) symbol
Font.register({
  family: 'Lilita One',
  src: 'https://fonts.gstatic.com/s/lilitaone/v6/i7dPIFZ9Zz-WBtRtedDbUEY.ttf',
});

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf',
});

// Styles
const styles = StyleSheet.create({
  page: { padding: 30, position: 'relative', fontFamily: 'Lilita One' },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  heading: { fontSize: 18, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  text: { fontSize: 12, fontFamily: 'Roboto' },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: { flexDirection: 'row' },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCell: { fontSize: 10, fontFamily: 'Roboto' },
  logo: { width: 50, height: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  watermarkContainer: { position: 'absolute', width: '100%', height: '100%', zIndex: -1 },
  watermarkText: {
    fontSize: 30,
    color: 'rgba(200, 200, 200, 0.3)',
    position: 'absolute',
  },
});

// Function to generate repeating watermark
const Watermark = () => (
  <View style={styles.watermarkContainer}>
    {[...Array(10)].map((_, row) => (
      [...Array(5)].map((_, col) => (
        <Text
          key={`${row}-${col}`}
          style={{
            ...styles.watermarkText,
            top: row * 100,
            left: col * 150,
            transform: 'rotate(-45deg)',
          }}
        >
          FinanceQuest
        </Text>
      ))
    ))}
  </View>
);

// Main Report Component
const TrackerReport = ({ totalIncome, totalExpenses, totalsavings, incomeData, expensesData, billsData, savingsData }) => {
  const [userDetails, setUserDetails] = useState({ username: '', email: '' });
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken && email) {
      axios.get("http://127.0.0.1:8000/admin/get-users", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        const user = response.data.users.find(user => user.email === email);
        if (user) {
          setUserDetails({
            username: user.username,
            email: user.email,
          });
        }
      })
      .catch(error => console.error("Error fetching user details:", error));
    }
  }, [authToken, email]);

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <Document>
      <Page style={styles.page} render={({ pageNumber, totalPages }) => (
        <>
          <Watermark />
          <View style={styles.header}>
            <Image style={styles.logo} src={tuplogo} />
            <Text style={styles.heading}>FINANCE TRACKER REPORT</Text>
            <Image style={styles.logo} src={fqlogo} />
          </View>

          {/* User Details and Financial Summary */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              <Text style={styles.text}>Total Income: ₱{totalIncome.toLocaleString()}</Text>
              <Text style={styles.text}>Total Expenses: ₱{totalExpenses.toLocaleString()}</Text>
              <Text style={styles.text}>Savings: ₱{totalsavings.toLocaleString()}</Text>
            </View>
          </View>

          {/* Data Tables */}
          {[{ title: 'Income Data', data: incomeData }, { title: 'Expenses Data', data: expensesData }, { title: 'Bills Data', data: billsData }, { title: 'Savings Data', data: savingsData }].map((section, idx) => (
            <View key={idx} style={styles.section} wrap={false}>
              <Text style={{ ...styles.heading, textAlign: 'left' }}>{section.title}</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>Category</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>Expected</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>Actual</Text></View>
                  <View style={styles.tableCol}><Text style={styles.tableCell}>Done</Text></View>
                  {section.title === 'Expenses Data' && <View style={styles.tableCol}><Text style={styles.tableCell}>Due Date</Text></View>}
                </View>
                {section.data.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{item.category}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>₱{item.expected.toLocaleString()}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>₱{item.actual.toLocaleString()}</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{item.done ? 'Completed' : 'Pending'}</Text></View>
                    {section.title === 'Expenses Data' && <View style={styles.tableCol}><Text style={styles.tableCell}>{item.due}</Text></View>}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </>
      )}>
      </Page>
    </Document>
  );
};

export default TrackerReport;