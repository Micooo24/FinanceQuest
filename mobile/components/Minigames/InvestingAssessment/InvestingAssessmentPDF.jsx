import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

const InvestingAssessmentPDF = async (
  points,
  totalQuestions,
  resultMessage,
  aiAnalysis
) => {
  try {
    const correctAnswers = points;
    const incorrectAnswers = totalQuestions - points;
    const accuracyRate = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    const currentDate = new Date().toLocaleDateString();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Investment Assessment</title>
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
              font-size: 14px;
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
              font-size: 14px;
              margin-bottom: 5px;
              text-align: justify;
              font-family: 'Roboto', sans-serif;
            }
            .progress-chart {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 20px 0;
            }
            .progress-circle {
              max-width: 200px;
              height: auto;
            }
          </style>
        </head>
        <body>
          <!-- Page 1: Performance Overview -->
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
                  <div class="watermark-text" style="top: ${
                    row * 100
                  }px; left: ${col * 150}px;">
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
              <div class="title">Investment Assessment Report</div>
            </div>

            <!-- Rest of the content following SavingGamePDF structure -->
            <div class="section">
              <div class="section-title">Assessment Results</div>
              <div class="table">
                <div class="table-row">
                  <div class="table-cell">Metric</div>
                  <div class="table-cell">Value</div>
                  <div class="table-cell">Status</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Total Questions</div>
                  <div class="table-cell">${totalQuestions}</div>
                  <div class="table-cell">Base</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Correct Answers</div>
                  <div class="table-cell">${correctAnswers}</div>
                  <div class="table-cell">${
                    correctAnswers >= totalQuestions / 2 ? "Pass" : "Review"
                  }</div>
                </div>
                <div class="table-row">
                  <div class="table-cell">Accuracy Rate</div>
                  <div class="table-cell">${accuracyRate}%</div>
                  <div class="table-cell">${
                    accuracyRate >= 75
                      ? "Excellent"
                      : accuracyRate >= 50
                      ? "Good"
                      : "Needs Work"
                  }</div>
                </div>
              </div>
              
              <div class="chart-container">
                <canvas id="performanceChart"></canvas>
                <script>
                  const ctx = document.getElementById('performanceChart');
                  new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                      labels: ['Correct', 'Incorrect'],
                      datasets: [{
                        data: [${correctAnswers}, ${incorrectAnswers}],
                        backgroundColor: ['#4CAF50', '#FF5252']
                      }]
                    },
                    options: {
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Performance Distribution'
                        }
                      }
                    }
                  });
                </script>
              </div>
            </div>
            <div class="footer">
              FinanceQuest Investment Assessment - Page 1/3
            </div>
          </div>

          <!-- Page 2: Detailed Analysis -->
          <div class="page">
          <div class="watermark-container">
              ${Array(10)
                .fill()
                .map((_, row) =>
                  Array(5)
                    .fill()
                    .map(
                      (_, col) => `
                  <div class="watermark-text" style="top: ${
                    row * 100
                  }px; left: ${col * 150}px;">
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
              <div class="title">Performance Analysis</div>

            </div>
            
            <div class="section">
              <div class="heading">Category Performance</div>
              ${["Investment Basics", "Risk Management", "Market Analysis"]
                .map(
                  (category) => `
                  <div class="category-section">
                    <h3>${category}</h3>
                    <div>${
                      aiAnalysis
                        ?.split("\n\n")
                        .find((section) =>
                          section.toLowerCase().includes(category.toLowerCase())
                        )
                        ?.replace(`${category}:`, "")
                        ?.trim() || "Analysis not available"
                    }</div>
                  </div>
                `
                )
                .join("")}
            </div>
            <div class="footer">
              FinanceQuest Investment Assessment - Page 2/3
            </div>
          </div>

          <!-- Page 3: Recommendations -->
          <div class="page">
            <div class="header">
              <div class="title">Recommendations & Next Steps</div>
              <div class="date">${currentDate}</div>
            </div>
            
            <div class="section">
              <div class="heading">FinanceQuest Analysis & Recommendations</div>
              <div class="analysis-text">
                ${aiAnalysis || "Analysis not available"}
              </div>
              
              <div class="progress-chart">
                <svg class="progress-circle" width="200" height="200" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#f0f0f0" stroke-width="10"/>
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#4CAF50" stroke-width="10"
                    stroke-dasharray="${2 * Math.PI * 90}"
                    stroke-dashoffset="${
                      2 * Math.PI * 90 * (1 - accuracyRate / 100)
                    }"/>
                  <text x="100" y="100" text-anchor="middle" dy=".1em" font-size="40" >${accuracyRate}%</text>
                </svg>
              </div>
            </div>
            <div class="footer">
              FinanceQuest Investment Assessment - Page 3/3
            </div>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
      filename: "FinanceQuestInvestment.pdf",
    });

    if (await Sharing.isAvailableAsync()) {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      const filename = `FinanceQuest_InvestingAnalysis_${date.getFullYear()}${month}${day}_${hours}${minutes}.pdf`;

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Save Investment Assessment Report",
        UTI: "com.adobe.pdf",
        filename: filename,
        saveToFiles: true,
      });
    }

    return { success: true, uri };
  } catch (error) {
    console.error("PDF Generation Error:", error);
    Alert.alert("Error", "Failed to generate PDF. Please try again.", [
      { text: "OK" },
    ]);
    return { success: false, error: error.message };
  }
};

export default InvestingAssessmentPDF;
