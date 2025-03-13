import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";

const SavingGamePDF = async (finalBalance, weeklyBalances, analysis) => {
  try {
    // Calculate weekly expenses
    const weeklyExpenses = weeklyBalances.map((balance, index) => {
      const previousBalance = index === 0 ? 5000 : weeklyBalances[index - 1];
      return Math.abs(previousBalance - balance);
    });

    // Calculate total weekly expenses
    const totalWeeklyExpenses = weeklyExpenses.reduce(
      (acc, expense) => acc + expense,
      0
    );

    // Calculate average weekly expenses
    const averageWeeklyExpenses = totalWeeklyExpenses / weeklyBalances.length;

    // Generate chart data
    const weeklyBalanceChartData = generateChartData(
      weeklyBalances,
      "Weekly Balances",
      "#4CAF50"
    );
    const weeklyExpenseChartData = generateChartData(
      weeklyExpenses,
      "Weekly Expenses",
      "#FF6B6B"
    );

    // Create HTML content for the PDF - styled exactly like FinanceTrackerPDF
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Financial Summary</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700&display=swap');
          
          body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .page {
            padding: 20px;
            page-break-after: always;
            position: relative;
          }
          .page:last-child {
            page-break-after: avoid;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            border-bottom: 1px solid #000;
            padding-bottom: 10px;
          }
          .title {
            font-family: 'Lora', serif;
            font-size: 18px;
            font-weight: bold;
            color: #000;
          }
          .logo {
            font-size: 24px;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .section {
            margin-bottom: 15px;
          }
          .section-title {
            font-family: 'Lora', serif;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .table {
            width: 100%;
            border: 1px solid #000;
            border-collapse: collapse;
            margin-bottom: 10px;
          }
          .table-row {
            display: flex;
            border-bottom: 1px solid #000;
          }
          .table-row:last-child {
            border-bottom: none;
          }
          .table-cell {
            flex: 1;
            padding: 5px;
            font-size: 10px;
            text-align: center;
            min-height: 15px;
            font-family: 'Roboto', sans-serif;
            border-right: 1px solid #000;
          }
          .table-cell:last-child {
            border-right: none;
          }
          .report-container {
            padding: 10px;
            border-top: 1px solid #000;
          }
          .report-text {
            font-size: 12px;
            margin-bottom: 5px;
            text-align: justify;
            font-family: 'Roboto', sans-serif;
          }
          .watermark-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
          }
          .watermark-text {
            font-family: 'Lora', serif;
            font-size: 30px;
            color: rgba(200, 200, 200, 0.3);
            position: absolute;
            transform: rotate(-45deg);
          }
          .footer {
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #666;
          }
          .chart-container {
            width: 100%;
            margin: 15px 0;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <!-- Page 1: Overview and Weekly Expenses -->
        <div class="page">
          <!-- Watermarks -->
          <div class="watermark-container">
            ${Array(10)
              .fill()
              .map((_, row) =>
                Array(5)
                  .fill()
                  .map(
                    (_, col) => `
                <div class="watermark-text" style="top: ${row * 100}px; left: ${
                      col * 150
                    }px;">
                  FinanceQuest
                </div>
              `
                  )
                  .join("")
              )
              .join("")}
          </div>
          
          <!-- Header -->
          <div class="header">
            <div class="title">Financial Tracker Logs</div>

          </div>
          
          <!-- Weekly Balances Table -->
          <div class="section">
            <div class="section-title">Weekly Balances</div>
            <div class="table">
              <div class="table-row">
                <div class="table-cell">Week</div>
                <div class="table-cell">Balance</div>
                <div class="table-cell">Expense</div>
                <div class="table-cell">Status</div>
              </div>
              ${weeklyBalances
                .map(
                  (balance, index) => `
                <div class="table-row">
                  <div class="table-cell">Week ${index + 1}</div>
                  <div class="table-cell">₱${balance.toLocaleString()}</div>
                  <div class="table-cell">₱${weeklyExpenses[
                    index
                  ].toLocaleString()}</div>
                  <div class="table-cell">${
                    balance >= (index === 0 ? 5000 : weeklyBalances[index - 1])
                      ? "Surplus"
                      : "Deficit"
                  }</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          
          <!-- Overview Section -->
          <div class="section">
            <div class="section-title">Financial Overview</div>
            <div class="table">
              <div class="table-row">
                <div class="table-cell">Category</div>
                <div class="table-cell">Amount</div>
                <div class="table-cell">Status</div>
              </div>
              <div class="table-row">
                <div class="table-cell">Starting Balance</div>
                <div class="table-cell">₱5,000.00</div>
                <div class="table-cell">Initial</div>
              </div>
              <div class="table-row">
                <div class="table-cell">Final Balance</div>
                <div class="table-cell">₱${finalBalance.toLocaleString()}</div>
                <div class="table-cell">${
                  finalBalance >= 5000 ? "Increased" : "Decreased"
                }</div>
              </div>
              <div class="table-row">
                <div class="table-cell">Total Expenses</div>
                <div class="table-cell">₱${totalWeeklyExpenses.toLocaleString()}</div>
                <div class="table-cell">${
                  totalWeeklyExpenses < 5000 ? "Controlled" : "High"
                }</div>
              </div>
              <div class="table-row">
                <div class="table-cell">Average Weekly</div>
                <div class="table-cell">₱${averageWeeklyExpenses.toLocaleString()}</div>
                <div class="table-cell">${
                  averageWeeklyExpenses < 1250 ? "Good" : "Review"
                }</div>
              </div>
            </div>
          </div>
          
          <!-- Weekly Balance Chart -->
          <div class="chart-container">
            <div class="section-title">Weekly Balances Chart</div>
            ${weeklyBalanceChartData}
          </div>
          
          <div class="footer">
            FinanceQuest Saving Game Analysis - Page 1/2
          </div>
        </div>
        
        <!-- Page 2: Analysis and Summary -->
        <div class="page">
          <!-- Watermarks -->
          <div class="watermark-container">
            ${Array(10)
              .fill()
              .map((_, row) =>
                Array(5)
                  .fill()
                  .map(
                    (_, col) => `
                <div class="watermark-text" style="top: ${row * 100}px; left: ${
                      col * 150
                    }px;">
                  FinanceQuest
                </div>
              `
                  )
                  .join("")
              )
              .join("")}
          </div>
          
          <!-- Header -->
          <div class="header">
            <div class="title">Financial Report Summary</div>
          </div>
          
          <!-- Financial Analysis -->
          <div class="report-container">
            <div class="section-title">Financial Analysis</div>
            <div class="report-text">
              <strong>Overall Financial Standing:</strong> ${
                finalBalance >= 5000 ? "Surplus ✅" : "Deficit ❌"
              }<br>
              <strong>Starting Balance:</strong> ₱5,000.00<br>
              <strong>Final Balance:</strong> ₱${finalBalance.toLocaleString()}<br>
              <strong>Total Expenses:</strong> ₱${totalWeeklyExpenses.toLocaleString()}<br>
              <strong>Average Weekly Expense:</strong> ₱${averageWeeklyExpenses.toLocaleString()}<br>
              <strong>Net Change:</strong> ₱${(
                finalBalance - 5000
              ).toLocaleString()} (${(
      ((finalBalance - 5000) / 5000) *
      100
    ).toFixed(2)}%)<br>
              <br>
              <strong>FinanceQuest Analysis:</strong><br>
              ${analysis || "Analysis not available."}
            </div>
          </div>
          
          <!-- Spending Pattern Insights -->
          <div class="report-container">
            <div class="section-title">Spending Pattern Insights</div>
            <div class="report-text">
              <strong>Weekly Spending Pattern:</strong> ${
                weeklyExpenses.every(
                  (exp, i, arr) => i === 0 || exp <= arr[i - 1]
                )
                  ? "Decreasing trend - Good financial discipline."
                  : weeklyExpenses.every(
                      (exp, i, arr) => i === 0 || exp >= arr[i - 1]
                    )
                  ? "Increasing trend - Potentially concerning spending habits."
                  : "Fluctuating expenses - Inconsistent spending pattern."
              }<br>
              <strong>Highest Weekly Expense:</strong> ₱${Math.max(
                ...weeklyExpenses
              ).toLocaleString()}<br>
              <strong>Lowest Weekly Expense:</strong> ₱${Math.min(
                ...weeklyExpenses
              ).toLocaleString()}<br>
              <strong>Expense Volatility:</strong> ₱${(
                Math.max(...weeklyExpenses) - Math.min(...weeklyExpenses)
              ).toLocaleString()}<br>
              <br>
              <strong>Recommendations:</strong><br>
              ${
                averageWeeklyExpenses < 300
                  ? "• Excellent spending control - Consider investing surplus funds<br>• Continue maintaining disciplined spending habits<br>• Look into potential investment opportunities for growth"
                  : averageWeeklyExpenses < 800
                  ? "• Moderate spending - Review expenses for optimization<br>• Create a more detailed budget to track spending categories<br>• Consider setting aside more for savings"
                  : "• High spending level - Identify areas to reduce expenses<br>• Create a strict budget and adhere to spending limits<br>• Focus on essential expenses and cut discretionary spending"
              }
            </div>
          </div>
          
          <!-- Weekly Expenses Chart -->
          <div class="chart-container">
            <div class="section-title">Weekly Expenses Chart</div>
            ${weeklyExpenseChartData}
          </div>
          
          <div class="footer">
            FinanceQuest Saving Game Analysis - Page 2/2
          </div>
        </div>
      </body>
    </html>
    `;

    console.log("Generating PDF file...");

    // Generate the PDF file
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
      filename: "FinanceQuestSaving.pdf",
    });

    console.log("PDF generated at:", uri);

    try {
      // Share the PDF
      if (await Sharing.isAvailableAsync()) {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const filename = `FinanceQuest_SavingAnalysis_${date.getFullYear()}${month}${day}_${hours}${minutes}.pdf`;

        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Save Financial Summary",
          UTI: "com.adobe.pdf",
          filename: filename,
          saveToFiles: true,
        });
        return {
          success: true,
          uri: uri,
          filename,
          saved: true,
        };
      } else {
        Alert.alert("Error", "Sharing is not available on this device.");
        return {
          success: false,
          error: "Sharing not available",
        };
      }
    } catch (error) {
      console.error("Error sharing PDF:", error);
      Alert.alert("Error", "Could not share PDF. Please try again.");
      return {
        success: false,
        error: error.message,
      };
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    Alert.alert("Error", "Failed to generate PDF. Please try again.");
    return { success: false, error: error.message };
  }
};

// Function to generate SVG chart data
function generateChartData(data, label, color) {
  const maxValue = Math.max(...data) * 1.1; // Add 10% padding
  const chartWidth = 500;
  const chartHeight = 180;
  const barWidth = (chartWidth - 60) / data.length - 10;
  const barSpacing = 10;

  // Generate SVG for bar chart
  return `
    <svg width="${chartWidth}" height="${chartHeight}" xmlns="http://www.w3.org/2000/svg">
      <!-- Y-axis and grid lines -->
      <line x1="50" y1="10" x2="50" y2="${
        chartHeight - 20
      }" stroke="black" stroke-width="1"/>
      <line x1="45" y1="${chartHeight - 20}" x2="${chartWidth}" y2="${
    chartHeight - 20
  }" stroke="black" stroke-width="1"/>
      
      <!-- Bars -->
      ${data
        .map((value, index) => {
          const barHeight = (value / maxValue) * (chartHeight - 40);
          const x = 60 + index * (barWidth + barSpacing);
          const y = chartHeight - 20 - barHeight;

          return `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${color}" />
          <text x="${x + barWidth / 2}" y="${
            chartHeight - 5
          }" font-family="Roboto" font-size="8" text-anchor="middle">W${
            index + 1
          }</text>
          <text x="${x + barWidth / 2}" y="${
            y - 5
          }" font-family="Roboto" font-size="8" text-anchor="middle">₱${value.toLocaleString()}</text>
        `;
        })
        .join("")}
      
      <!-- Y-axis labels -->
      <text x="45" y="20" font-family="Roboto" font-size="8" text-anchor="end">₱${maxValue.toFixed(
        0
      )}</text>
      <text x="45" y="${
        chartHeight - 20
      }" font-family="Roboto" font-size="8" text-anchor="end">₱0</text>
      <text x="45" y="${
        (chartHeight - 20) / 2
      }" font-family="Roboto" font-size="8" text-anchor="end">₱${(
    maxValue / 2
  ).toFixed(0)}</text>
      
      <!-- Chart title -->
      <text x="${chartWidth / 2}" y="${
    chartHeight - 30
  }" font-family="Lora" font-size="10" text-anchor="middle" dominant-baseline="hanging">${label}</text>
    </svg>
  `;
}

export default SavingGamePDF;
