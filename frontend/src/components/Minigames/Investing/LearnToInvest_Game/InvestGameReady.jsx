import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  slides,
  useSlides,
  useDescriptionBankInvest,
} from "./functions_Investment_Game";
import { Box, Typography, TextField } from "@mui/material";
import { HelpOutline, Close, Balance } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const InvestGameReady = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("Balance");
  const [profit, setProfit] = useState(0);
  const [interest, setInterest] = useState(5); // Initial interest rate
  const [interestRE, setInterestRE] = useState(5); // Initial interest rate
  const [interestData, setInterestData] = useState([]);
  const [interestDataSM, setInterestDataSM] = useState([]);
  const [showGameScreen, setShowGameScreen] = useState(false);
  const [isTheGameFinished, setIsTheGameFinished] = useState(false);
  //investment to unlock
  const [showRealEstate, setShowRealEstate] = useState(false);
  const [showHowToPlayRE, setShowHowToPlayRE] = useState(true);
  const [showDescriptionRealEstate, setShowDescriptionRealEstate] =
    useState(false);
  const [balanceRE, setBalanceRE] = useState(0); // User's investment balance
  const [profitRE, setProfitRE] = useState(0); // Profit generated from investments
  const [investmentRE, setInvestmentRE] = useState(""); // Input amount for investment
  const [profitMF, setProfitMF] = useState(0); // Default profit is 0
  const [balanceMF, setBalanceMF] = useState(0); // Default balance is 0
  const [investmentMF, setInvestmentMF] = useState(0); // Default investment amount is 0
  const [interestMF, setInterestMF] = useState(0); // Default interest rate is 0
  const [interestSM, setInterestSM] = useState(0); // Default interest rate is 0
  const [showDescriptionMutualFunds, setShowDescriptionMutualFunds] =
    useState(false); // Default to not showing description
  const [showDescriptionStockMarket, setShowDescriptionStockMarket] =
    useState(false);
  const [showHowToPlayMF, setShowHowToPlayMF] = useState(true); // Default to not showing "How to Play"
  const [showMutualFunds, setShowMutualFunds] = useState(false);
  const [showStockMarket, setShowStockMarket] = useState(false);
  const [year, setYear] = useState(1); // Start with Year 1
  const [progress, setProgress] = useState(0); // Progress bar percentage
  const [bankBalance, setBankBalance] = useState(0); // Initial bank balance
  const [inputValue, setInputValue] = useState(""); // Input value for deposit/withdraw
  // UI
  const [showInput, setShowInput] = useState(false);
  const [actionType, setActionType] = useState(""); // "Withdraw" or "Deposit"
  const { currentSlide, nextSlide, prevSlide } = useSlides();
  const [isPaused, setIsPaused] = useState(false); // State to control the timer
  // sidebar
  const [pocketCash, setPocketCash] = useState(4000); // Initial pocket cash
  const [netWorth, setNetWorth] = useState(4000); // Initial net worth
  //stockMArket
  const [showHowToPlaySM, setShowHowToPlaySM] = useState(true);
  const [profitSM, setProfitSM] = useState(0); // Default profit is 0
  const [balanceSM, setBalanceSM] = useState(0); // Default balance is 0
  //---
  // Function to toggle the real estate description
  const toggleDescriptionRealEstate = () => {
    setShowDescriptionRealEstate(!showDescriptionRealEstate);
  };
  const toggleDescriptionMF = () => {
    setShowDescriptionMutualFunds(!showDescriptionMutualFunds);
  };

  const toggleDescriptionSM = () => {
    setShowDescriptionStockMarket(!showDescriptionStockMarket);
  };

  const { showDescriptionBankInfo, toggleDescriptionBankInvest } =
    useDescriptionBankInvest();

  const handleButtonClick = (type) => {
    setActionType(type);
    setShowInput(true);
  };

  const handleGotItClick = () => {
    setShowGameScreen(true); // Set showGameScreen to true when clicked
  };

  const handleInputSubmit = () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (actionType === "Withdraw") {
      if (bankBalance >= amount) {
        setBankBalance((prev) => prev - amount);
        setPocketCash((prev) => prev + amount);
      } else {
        alert("Insufficient bank balance.");
      }
    } else if (actionType === "Deposit") {
      if (pocketCash >= amount) {
        setPocketCash((prev) => prev - amount);
        setBankBalance((prev) => prev + amount);
      } else {
        alert("Insufficient pocket money.");
      }
    }

    setInputValue(""); // Clear the input field
    setShowInput(false); // Hide the input field
  };

  // Handle MAX button to fill the input with maximum available amount
  const handleMaxClick = () => {
    if (actionType === "Withdraw") {
      setInputValue(bankBalance.toString());
    } else if (actionType === "Deposit") {
      setInputValue(pocketCash.toString());
    }
  };
  // Function to handle buying a property
  const handleBuyRE = () => {
    const amountRE = parseFloat(investmentRE);

    if (isNaN(amountRE)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (amountRE < 20000) {
      alert("The minimum investment amount is php20,000.");
      return;
    }

    if (amountRE > pocketCash) {
      alert("You do not have enough pocket cash to make this investment.");
      return;
    }

    // Deduct the investment amount from pocketCashRE and update balanceRE
    setBalanceRE((prevBalanceRE) => prevBalanceRE + amountRE);
    setPocketCash((prev) => prev - amountRE);
    setInvestmentRE(""); // Clear the input field after successful transaction
  };

  // Function to handle selling investments
  const handleSellRE = () => {
    const totalBalanceRE = balanceRE + profitRE; // Calculate total balance
    setPocketCash((prev) => prev + totalBalanceRE); // Add to pocket cash
    setBalanceRE(0); // Reset balance to 0
    setProfitRE(0); // Reset profit to 0
  };

  // Function to handle buying a mutual fund
  const handleBuyMF = () => {
    const amountMF = parseFloat(investmentMF);

    if (isNaN(amountMF)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (amountMF < 10000) {
      alert("The minimum investment amount is php10,000.");
      return;
    }

    if (amountMF > pocketCash) {
      alert("You do not have enough pocket cash to make this investment.");
      return;
    }

    // Deduct the investment amount from pocketCash and update balanceMF
    setBalanceMF((prevBalanceMF) => prevBalanceMF + amountMF);
    setPocketCash((prev) => prev - amountMF);
    setInvestmentMF(""); // Clear the input field after successful transaction
  };

  // Function to handle selling mutual funds
  const handleSellMF = () => {
    const totalBalanceMF = balanceMF + profitMF; // Calculate total balance
    setPocketCash((prev) => prev + totalBalanceMF); // Add to pocket cash
    setBalanceMF(0); // Reset balance to 0
    setProfitMF(0); // Reset profit to 0
  };

  const generateTrendData = (currentInterest) => {
    return [
      { time: "T-3", interest: Math.random() * (12 - 5) + 5 },
      { time: "T-2", interest: Math.random() * (12 - 5) + 5 },
      { time: "T-1", interest: Math.random() * (12 - 5) + 5 },
      { time: "Now", interest: currentInterest },
    ];
  };
  const data = generateTrendData(interestRE);

  //stock Market
  // Function to generate a random interest rate
  const generateRandomInterestSM = () => {
    const minInterest = -50; // Minimum loss (-50%)
    const maxInterest = 25; // Maximum gain (+25%)
    return (Math.random() * (maxInterest - minInterest) + minInterest) / 100; // Convert to decimal
  };

  const handleSetInvestmentPercent = (percent) => {
    // Parse the percentage value
    const percentageValue =
      percent === "Max" ? 1 : parseFloat(percent.replace("%", "")) / 100;
    const investmentAmount = pocketCash * percentageValue; // Calculate investment amount

    if (investmentAmount > pocketCash) {
      console.log("Not enough pocket cash to invest");
      return; // Prevent investment if insufficient pocket cash
    }

    // Deduct from PocketCash and update BalanceSM
    setPocketCash((prevPocketCash) => {
      const updatedPocketCash = prevPocketCash - investmentAmount;
      console.log(
        `Invested ₱${investmentAmount.toFixed(
          2
        )}, remaining pocket cash: ₱${updatedPocketCash.toFixed(2)}`
      );
      return updatedPocketCash;
    });
    setBalanceSM((prevBalanceSM) => prevBalanceSM + investmentAmount);
  };

  const handleSellSM = () => {
    // Add 100% of both profit and balance to pocketCash
    const totalAmount = balanceSM + profitSM;

    setPocketCash((prevPocketCash) => prevPocketCash + totalAmount);

    // Reset balance and profit after selling
    setBalanceSM(0);
    setProfitSM(0);

    // Update NetWorth (assuming NetWorth is tracked)
    const updatedNetWorth = pocketCash + balanceSM + profitSM;
    console.log(
      `Sold ₱${totalAmount.toFixed(2)}, new pocket cash: ₱${(
        pocketCash + totalAmount
      ).toFixed(2)}, updated net worth: ₱${updatedNetWorth.toFixed(2)}`
    );
  };
  //--

  // Calculate the data for the chart dynamically
  const chartData = [
    { name: "Stock Market Profit", value: profitSM, color: "#ff7300" },
    { name: "Mutual Funds Profit", value: profitMF, color: "#ff00cc" },
    { name: "Real Estate Profit", value: profitRE, color: "#00ccff" },
    { name: "Bank Savings Profit", value: profit, color: "#33cc33" },
  ];
  const balanceData = [
    { name: "Stock Market Balance", value: balanceSM, color: "#ff7300" },
    { name: "Mutual Funds Balance", value: balanceMF, color: "#ff00cc" },
    { name: "Real Estate Balance", value: balanceRE, color: "#00ccff" },
    { name: "Bank Savings Balance", value: Balance, color: "#33cc33" },
  ];
  //4000 every 15 seconds
  useEffect(() => {
    if (showGameScreen && !isPaused) {
      let timeElapsed = 0;

      const gameTimer = setInterval(() => {
        timeElapsed += 1;

        // Update progress bar (start from 100% and decrease to 0%)
        setProgress(100 - (timeElapsed / 30) * 100);

        if (timeElapsed === 15 || timeElapsed === 30) {
          // Add ₱4,000 every 15 seconds to pocket cash and net worth
          setPocketCash((prev) => prev + 4000);
          setNetWorth((prev) => prev + 4000);
        }

        if (timeElapsed >= 30) {
          clearInterval(gameTimer); // Stop the current timer
          setProgress(100); // Reset progress bar to 100%
          setYear((prevYear) => {
            const nextYear = prevYear + 1;

            // Pause the game on specific years
            if (nextYear === 2 || nextYear === 4 || nextYear === 6) {
              setIsPaused(true);
            }

            // Update investment visibility based on year
            setShowRealEstate(nextYear >= 2 && nextYear <= 10);
            setShowMutualFunds(nextYear >= 4 && nextYear <= 10);
            setShowStockMarket(nextYear >= 6 && nextYear <= 10);

            if (nextYear > 10) {
              // Stop game if it is the 10th year
              setIsTheGameFinished(true);
              setShowGameScreen(false);
              setIsPaused(true);
            }
            return nextYear;
          });
          timeElapsed = 0; // Reset timeElapsed
        }
      }, 10); // Update every second

      return () => clearInterval(gameTimer); // Cleanup on component unmount or screen change
    }
  }, [showGameScreen, isPaused, year]);

  // Interest changes every 10 seconds
  useEffect(() => {
    const changeInterest = () => {
      const newInterest = (Math.random() * 4).toFixed(2); // Random float between 0.01 and 10.00
      setInterest(Math.max(parseFloat(newInterest), 0.01)); // Ensure it’s at least 0.01
    };

    const interestInterval = setInterval(changeInterest, 10000);

    return () => clearInterval(interestInterval); // Cleanup on unmount
  }, []);

  // Update profit and bankBalance every 5 seconds
  useEffect(() => {
    const profitInterval = setInterval(() => {
      if (!isPaused) {
        // Calculate incremental profit based on current bank balance and interest
        const incrementProfit = (bankBalance * interest) / 100;
        setProfit((prevProfit) => prevProfit + incrementProfit); // Update total profit
        setBankBalance((prevBalance) => prevBalance + incrementProfit); // Add profit to bank balance
      }
    }, 5000);

    return () => clearInterval(profitInterval); // Cleanup on unmount
  }, [bankBalance, interest, isPaused]); // Re-run if bankBalance, interest, or isPaused changes

  // Function to calculate and update interest for Real Estate (RE) every 30 seconds
  useEffect(() => {
    const intervalRE = setInterval(() => {
      if (!isPaused && balanceRE > 0) {
        const interestRE = Math.random() * (15 - 5) + 5; // Random interest rate (5% - 15%)
        const newProfitRE = (balanceRE * interestRE) / 100;
        setProfitRE((prevProfitRE) => prevProfitRE + newProfitRE);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalRE); // Cleanup on component unmount
  }, [balanceRE, isPaused]);

  // Function to calculate and update interest for Stock Market (SM) every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && balanceSM > 0) {
        const randomInterest = generateRandomInterestSM();
        setInterestSM(randomInterest);

        // Calculate profit based on the updated balance
        const newProfit = balanceSM * Math.pow(1 + randomInterest, 1); // Profit = Balance × (1 + interest)^1
        setProfitSM(newProfit - balanceSM); // Subtract initial balance to get net profit
      }
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [balanceSM, isPaused]);

  // Function to calculate and update interest for Mutual Funds (MF) every 30 seconds
  useEffect(() => {
    const intervalMF = setInterval(() => {
      if (!isPaused && balanceMF > 0) {
        const randomInterest = Math.random() * (35 - 5) + 5; // Random interest rate (5% - 35%)
        console.log("Generated Interest:", randomInterest); // Debug log
        setInterestMF(randomInterest); // Store interest rate in state

        const newProfitMF = (balanceMF * randomInterest) / 100;
        setProfitMF((prevProfitMF) => prevProfitMF + newProfitMF);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalMF); // Clean up interval
  }, [balanceMF, isPaused]);

  // Update the graph whenever interestMF changes
  useEffect(() => {
    if (interestMF !== undefined && interestMF !== null) {
      console.log("Updating Graph with Interest:", interestMF); // Debug log
      setInterestData((prevData) => [
        ...prevData,
        {
          name: `Point ${prevData.length + 1}`,
          interest: parseFloat(interestMF.toFixed(2)),
        },
      ]);
    }
  }, [interestMF]);

  // Update the graph whenever interestMF changes
  useEffect(() => {
    if (interestSM !== undefined && interestSM !== null) {
      console.log("Updating Graph with Interest:", interestSM); // Debug log
      setInterestDataSM((prevData) => [
        ...prevData,
        {
          name: ` ${prevData.length + 1}`,
          interest: parseFloat(interestSM.toFixed(2)),
        },
      ]);
    }
  }, [interestSM]);

  // Update net worth whenever balance or profit changes
  useEffect(() => {
    setNetWorth(
      bankBalance +
        pocketCash +
        balanceRE +
        profitRE +
        profitMF +
        balanceMF +
        balanceSM +
        profitSM
    );
  }, [
    bankBalance,
    pocketCash,
    balanceRE,
    profitRE,
    profitMF,
    balanceMF,
    balanceSM,
    profitSM,
  ]);

  return (
    <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
      {isTheGameFinished && (
        <div
          id="result-screen"
          style={{
            height: "calc(100vh - 0px)", // Subtract marginBottom to fit within the screen
            width: "100vw", // Full viewport width
            padding: "20px",
            marginBottom: "0", // No additional margin
            backgroundColor: "white", // Parang Blue-Green background
            borderRadius: "15px", // Rounded corners for a playful look
            textAlign: "center", // Centering text horizontally
            display: "flex", // Flexbox for centering content
            flexDirection: "column", // Arrange content in a column
            justifyContent: "flex-start", // Align content to the top
            alignItems: "center", // Horizontally center content
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: "2.5rem",
              marginBottom: "20px",
              fontFamily: "'Lora', sans-serif",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
            }}
          >
            The Results
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              color: "black",
              marginBottom: "20px",
              fontFamily: "'Lora', sans-serif",
            }}
          >
            Your final pocket cash: <strong>₱{pocketCash.toFixed(2)}</strong>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              color: "black",
              marginBottom: "30px",
              fontFamily: "'Lora',  sans-serif",
            }}
          >
            Your final net worth: <strong>₱{netWorth.toFixed(2)}</strong>
          </p>

          {/* Result Details Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginTop: "10px",
                padding: "20px",
                backgroundColor: "#5e3967", // Light Purple background
                borderRadius: "10px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
                width: "45%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{
                  color: "#fff",
                  fontSize: "1.8rem",
                  marginBottom: "15px",
                  fontFamily: "'Comic Sans MS', cursive, sans-serif",
                }}
              >
                Data Analytics
              </h2>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#351742", // Dark Purple
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    <th style={{ padding: "10px", fontSize: "1.5rem" }}>
                      Investment Type
                    </th>
                    <th style={{ padding: "10px", fontSize: "1.5rem" }}>
                      Profit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: "#5e3967" }}>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      Stock Market Profit
                    </td>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      ₱{profitSM.toFixed(2)}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#351742" }}>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      Mutual Funds Profit
                    </td>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      ₱{profitMF.toFixed(2)}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#5e3967" }}>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      Real Estate Profit
                    </td>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      ₱{profitRE.toFixed(2)}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#351742" }}>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      Bank Savings Profit
                    </td>
                    <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                      ₱{profit.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#fff",
                  marginBottom: "15px",
                  fontFamily: "'Comic Sans MS', cursive, sans-serif",
                }}
              >
                Total Profit:{" "}
                <strong>
                  ₱{(profitSM + profitMF + profitRE + profit).toFixed(2)}
                </strong>
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#fff",
                  marginBottom: "15px",
                  fontFamily: "'Comic Sans MS', cursive, sans-serif",
                }}
              >
                Average Profit:{" "}
                <strong>
                  ₱{((profitSM + profitMF + profitRE + profit) / 4).toFixed(2)}
                </strong>
              </p>
            </div>

            {/* Analytics Section on the Right */}
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                backgroundColor: "#351742", // Dark Purple background
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                width: "45%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{
                  color: "#fff",
                  fontSize: "1.6rem",
                  textAlign: "center",
                }}
              >
                Profit Summary{"  "}||{"  "}Balance Summary
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      labelLine={false}
                      isAnimationActive={true}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={balanceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      labelLine={false}
                      isAnimationActive={true}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Restart Button */}
          <button
            onClick={() => {
              window.location.reload();
            }}
            style={{
              padding: "15px 30px",
              backgroundColor: "#351742",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              margin: "20px",
            }}
          >
            Restart Game
          </button>

          <Link to="/Invest_Assessment" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "15px 30px",
                backgroundColor: "#5e3967",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                margin: "20px",
              }}
            >
              Try Assessment
            </button>
          </Link>
        </div>
      )}
      <div
        className="container-investmentMinigame"
        style={{
          height: "100vh",
          background: "#1b1b1b",
          display: "flex",
          flexDirection: "row",
          color: "#d4d4d4",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{
            width: "20%",
            padding: "20px",
            background: "#121212",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#8f8f8f",
            borderRight: "1px solid #444",
          }}
        >
          {showGameScreen ? (
            <div>
              <h1 style={{ color: "#00cac9", textAlign: "center" }}>
                YEAR {year} OF 10
              </h1>
              {/* Progress bar */}
              <div
                style={{
                  margin: "20px auto",
                  width: "80%",
                  height: "10px",
                  background: "#2e2e2e",
                  borderRadius: "5px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`, // Adjust percentage dynamically
                    height: "100%",
                    background: "#d4d4d4",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div>
              <h1 style={{ color: "#00cac9", textAlign: "center" }}>PAUSED</h1>
              {/* Progress bar */}
              <div
                style={{
                  margin: "20px auto",
                  width: "80%",
                  height: "10px",
                  background: "#2e2e2e",
                  borderRadius: "5px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "80%", // Adjust percentage as needed
                    height: "100%",
                    background: "#d4d4d4",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>
            </div>
          )}
          {showGameScreen ? (
            <>
              {/* Stats */}
              <div style={{ marginTop: "20px" }}>
                <p>POCKET CASH</p>
                <h2 style={{ color: "#ffffff" }}>
                  ₱{pocketCash.toLocaleString()}
                </h2>
                <p>OVERALL NET WORTH</p>
                <h2 style={{ color: "#ffffff" }}>
                  ₱{netWorth.toLocaleString()}
                </h2>
              </div>
            </>
          ) : (
            <>
              {/* Stats */}
              <div style={{ marginTop: "20px" }}>
                <p>POCKET CASH</p>
                <h2 style={{ color: "#ffffff" }}>₱4,000.00</h2>
                <p>OVERALL NET WORTH</p>
                <h2 style={{ color: "#ffffff" }}>₱4,000.00</h2>
              </div>
            </>
          )}
        </div>

        <div
          className="main-content"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "20px", // Space between rows
          }}
        >
          {showGameScreen ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px", // Space between rows
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f4f4e2",
                    padding: "20px",
                    height: "250px",
                    width: "700px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    color: "black",
                    margin: "5px",
                  }}
                >
                  <HelpOutline
                    sx={{
                      fontSize: "2rem",
                      color: "#00cac9",
                      display: "flex",
                      alignSelf: "flex-end",
                      cursor: "pointer",
                    }}
                    onClick={toggleDescriptionBankInvest}
                  />
                  <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Bank Account Savings
                  </h1>
                  <div
                    style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px",
                        background:
                          "linear-gradient(to bottom, #f5f5dc, #f5e6c9)",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <select
                          value={selectedView} // Bind the dropdown value to selectedView state
                          onChange={(e) => setSelectedView(e.target.value)} // Update selectedView on change
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "16px",
                            color: "#444",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          <option value="Balance">Balance</option>
                          <option value="Profit">Profit</option>
                        </select>
                      </div>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          margin: 0,
                          color: "#444",
                        }}
                      >
                        ₱
                        {selectedView === "Balance"
                          ? bankBalance.toFixed(2) // Display bank balance
                          : profit.toFixed(2)}{" "}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <button
                      onClick={() => handleButtonClick("Withdraw")}
                      style={{
                        background: "#444",
                        color: "#d4d4d4",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Withdraw
                    </button>
                    <button
                      onClick={() => handleButtonClick("Deposit")}
                      style={{
                        background: "#444",
                        color: "#d4d4d4",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Deposit
                    </button>
                  </div>
                  {showInput && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        background: "#fff",
                        border: "2px solid #444",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        width: "400px",
                      }}
                    >
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#444",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowInput(false)}
                      >
                        ✕
                      </button>
                      <span
                        onClick={handleMaxClick}
                        style={{
                          fontWeight: "bold",
                          color: "#444",
                          cursor: "pointer",
                        }}
                      >
                        MAX
                      </span>
                      <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        placeholder="₱0.00"
                        style={{
                          border: "none",
                          outline: "none",
                          fontSize: "16px",
                          flex: 1,
                          color: "#444",
                        }}
                      />
                      <button
                        onClick={handleInputSubmit}
                        style={{
                          background: "none",
                          border: "none",
                          fontWeight: "bold",
                          color: "#444",
                          cursor: "pointer",
                        }}
                      >
                        {actionType}
                      </button>
                    </div>
                  )}
                  {/* Description Overlay */}
                  {showDescriptionBankInfo && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        textAlign: "start",
                        padding: "15px",
                        color: "white",
                        backgroundColor: "black",
                        height: "210px",
                        width: "720px",
                        alignSelf: "top",
                        position: "absolute",
                        margin: "20px",
                        border: "1px solid white",
                      }}
                    >
                      <Close
                        style={{
                          fontSize: "2rem",
                          color: "white",
                          cursor: "pointer",
                          alignSelf: "flex-end", // Align the close button to the right
                        }}
                        onClick={toggleDescriptionBankInvest}
                      />

                      <h2 style={{ fontSize: "15px", marginBottom: "5px" }}>
                        Bank Investment
                      </h2>
                      <p style={{ fontSize: "15px", marginBottom: "3px" }}>
                        A savings account is a beginner-friendly way to store
                        and grow your money safely. It offers low-risk interest
                        earnings while keeping your funds accessible for
                        emergencies or short-term goals. Ideal for individuals
                        seeking secure and liquid investments.
                      </p>

                      <h4 style={{ fontSize: "12px", marginBottom: "3px" }}>
                        Highlight:{" "}
                        <span style={{ color: "#00cac9" }}>
                          Low-risk savings option
                        </span>
                      </h4>
                      <h4 style={{ fontSize: "12px", marginBottom: "3px" }}>
                        Current Interest:{" "}
                        <span style={{ color: "#00cac9" }}>{interest}%</span>
                      </h4>
                    </div>
                  )}
                </div>

                {/* Other Investments Column */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                    gap: "20px", // Space between cards
                    width: "100%",
                    flexWrap: "wrap", // Ensures responsiveness
                  }}
                >
                  {showRealEstate && (
                    <div>
                      {showHowToPlayRE && (
                        <div
                          style={{
                            height: "100vh", // Full height of the viewport
                            background: "black",
                            color: "white",
                            padding: "20px",
                            display: "flex",
                            justifyContent: "center", // Align items horizontally in the center
                            alignItems: "center", // Align items vertically in the center
                            flexDirection: "column", // Stack elements vertically
                            position: "fixed", // Fixed position to ensure full screen
                            top: 0,
                            left: 0,
                            width: "100%", // Full width of the screen
                            zIndex: 1000, // Ensure it's above other elements
                          }}
                        >
                          <h1
                            style={{
                              fontSize: "50px",
                              marginBottom: "10px",
                              letterSpacing: "3px",
                              color: "#00cac9",
                              padding: "10px",
                            }}
                          >
                            New Investment !
                          </h1>

                          <h1
                            style={{
                              fontSize: "30px",
                              marginBottom: "10px",
                            }}
                          >
                            Real Estate
                          </h1>
                          <p>
                            Real estate investments provide opportunities to
                            grow wealth through property appreciation or rental
                            income. Best for individuals with significant
                            capital and a long-term horizon.
                          </p>
                          <h4>
                            Highlight:{" "}
                            <span style={{ color: "#00cac9" }}>
                              Tangible asset with potential appreciation
                            </span>
                          </h4>
                          <h4>
                            Average ROI:{" "}
                            <span style={{ color: "#00cac9" }}>
                              6%-12% annually
                            </span>
                          </h4>

                          <button
                            onClick={() => {
                              setIsPaused(false); // Resume the game
                              setShowHowToPlayRE(false); // Hide 'how to play'
                            }}
                            style={{
                              backgroundColor: "#00cac9",
                              color: "#fff",
                              padding: "10px 20px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginTop: "20px",
                            }}
                          >
                            Start
                          </button>
                        </div>
                      )}

                      <div
                        style={{
                          width: "300px",
                          height: "300px",
                          border: "2px solid #d1a45f",
                          borderRadius: "10px",
                          backgroundColor: "#fef8e7",
                          padding: "15px",
                          fontFamily: "Arial, sans-serif",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          overlay: "hidden",
                          margin: "5px",
                        }}
                      >
                        <HelpOutline
                          sx={{
                            fontSize: "2rem",
                            color: "#00cac9",
                            display: "flex",
                            alignSelf: "flex-end",
                            cursor: "pointer",
                          }}
                          onClick={toggleDescriptionRealEstate}
                        />
                        {/* Title Section */}
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            marginBottom: "3px",
                          }}
                        >
                          <h2
                            style={{
                              margin: "0",
                              fontSize: "18px",
                              color: "#333",
                            }}
                          >
                            Real Estate
                          </h2>
                        </div>

                        {/* Graph/Visualization */}

                        <Box
                          sx={{
                            width: "70%",
                            height: "30%",
                            background:
                              "linear-gradient(135deg, #e0eafc, #cfdef3)",
                            borderRadius: "8px",
                            marginBottom: "3px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                            padding: "1px",
                          }}
                        >
                          <ResponsiveContainer width="95%" height="100%">
                            <LineChart data={data}>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e4e4e4"
                              />
                              <XAxis dataKey="time" tick={{ fill: "#666" }} />
                              <YAxis domain={[5, 15]} tick={{ fill: "#666" }} />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#fff",
                                  border: "1px solid #ddd",
                                  borderRadius: "8px",
                                }}
                                labelStyle={{ color: "#333" }}
                                itemStyle={{ color: "#43a047" }}
                              />
                              <Line
                                type="monotone"
                                dataKey="interest"
                                stroke="#43a047"
                                strokeWidth={2}
                                dot={{ stroke: "#43a047", strokeWidth: 2 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>

                        {/* Profit Section */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "3px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          <span>🏠 Profit</span>
                          <span
                            style={{ fontWeight: "bold", color: "#00bfa5" }}
                          >
                            ₱{profitRE.toFixed(2)}
                          </span>
                        </div>
                        {/* Balance Section */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "3px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          <span>💰 Balance</span>
                          <span
                            style={{ fontWeight: "bold", color: "#007bff" }}
                          >
                            ₱{balanceRE.toFixed(2)}
                          </span>
                        </div>
                        {/* Input Section */}
                        <TextField
                          fullWidth
                          label="Investment Amount"
                          variant="outlined"
                          type="number"
                          value={investmentRE}
                          onChange={(e) => setInvestmentRE(e.target.value)}
                          sx={{ marginBottom: "20px" }}
                        />

                        {/* Action Buttons */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "#ff6f61",
                              color: "#fff",
                              padding: "10px",
                              width: "45%",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "14px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={handleSellRE}
                          >
                            Sell
                          </button>
                          <button
                            style={{
                              backgroundColor: "#43a047",
                              color: "#fff",
                              padding: "10px",
                              width: "45%",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "14px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={handleBuyRE}
                          >
                            Buy
                          </button>
                        </div>
                        {/* Real Estate Description */}
                        {showDescriptionRealEstate && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              textAlign: "start",
                              padding: "15px",
                              color: "white",
                              backgroundColor: "black",
                              height: "250px",
                              width: "300px",
                              alignSelf: "top",
                              position: "absolute",
                              margin: "20px",
                              border: "1px solid white",
                              zindex: 1,
                            }}
                          >
                            <Close
                              style={{
                                fontSize: "2rem",
                                color: "white",
                                cursor: "pointer",
                                alignSelf: "flex-end", // Align the close button to the right
                              }}
                              onClick={toggleDescriptionRealEstate} // Attach the close function
                            />

                            <h2
                              style={{ fontSize: "15px", marginBottom: "5px" }}
                            >
                              Real Estate Investment
                            </h2>
                            <p
                              style={{ fontSize: "13px", marginBottom: "3px" }}
                            >
                              Real estate investment involves purchasing
                              properties to generate rental income or profit
                              from value appreciation. It's an ideal option for
                              those seeking long-term growth and wealth
                              creation.
                            </p>

                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Highlight:{" "}
                              <span style={{ color: "#00cac9" }}>
                                Long-term wealth creation, Medium Risk
                              </span>
                            </h4>
                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Potential ROI:{" "}
                              <span style={{ color: "#00cac9" }}>8%-32%</span>
                            </h4>
                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Current Interest:{" "}
                              <span style={{ color: "#00cac9" }}>
                                {interestRE}%
                              </span>
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {showMutualFunds && (
                    <div>
                      {showHowToPlayMF && (
                        <div
                          style={{
                            height: "100vh",
                            background: "black",
                            color: "white",
                            padding: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            zIndex: 1000,
                          }}
                        >
                          <h1
                            style={{
                              fontSize: "50px",
                              marginBottom: "10px",
                              letterSpacing: "3px",
                              color: "#00cac9",
                              padding: "10px",
                            }}
                          >
                            New Investment!
                          </h1>

                          <h1
                            style={{
                              fontSize: "30px",
                              marginBottom: "10px",
                            }}
                          >
                            Mutual Funds
                          </h1>
                          <p>
                            Mutual funds are professionally managed investments
                            that pool money from multiple investors to purchase
                            securities. Ideal for individuals looking for
                            diversified, professionally managed portfolios.
                          </p>
                          <h4>
                            Highlight:{" "}
                            <span style={{ color: "#00cac9" }}>
                              Diversified portfolio,Medium Risk
                            </span>
                          </h4>
                          <h4>
                            Average ROI:{" "}
                            <span style={{ color: "#00cac9" }}>
                              8%-15% annually
                            </span>
                          </h4>

                          <button
                            onClick={() => {
                              setIsPaused(false); // Resume the game
                              setShowHowToPlayMF(false); // Hide 'how to play'
                            }}
                            style={{
                              backgroundColor: "#00cac9",
                              color: "#fff",
                              padding: "10px 20px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginTop: "20px",
                            }}
                          >
                            Start
                          </button>
                        </div>
                      )}

                      <div
                        style={{
                          width: "300px",
                          height: "300px",
                          border: "2px solid #d1a45f",
                          borderRadius: "10px",
                          backgroundColor: "#fef8e7",
                          padding: "15px",
                          fontFamily: "Arial, sans-serif",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          overlay: "hidden",
                          margin: "5px",
                        }}
                      >
                        <HelpOutline
                          sx={{
                            fontSize: "2rem",
                            color: "#00cac9",
                            display: "flex",
                            alignSelf: "flex-end",
                            cursor: "pointer",
                          }}
                          onClick={toggleDescriptionMF}
                        />
                        {/* Title Section */}
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h2
                            style={{
                              margin: "0",
                              fontSize: "18px",
                              color: "#333",
                            }}
                          >
                            Mutual Funds
                          </h2>
                        </div>

                        <Box
                          sx={{
                            width: "200px", // Adjusted for a smaller, cute container
                            height: "70px", // Defined height for better visualization
                            backgroundColor: "#f9f9f9", // Soft background
                            borderRadius: "12px", // Rounded corners
                            padding: "5px", // Slightly reduced padding
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Light shadow
                          }}
                        >
                          <ResponsiveContainer width="100%" height={70}>
                            <BarChart
                              data={interestData}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                textAlign: "start",
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="name"
                                fontSize={7} // Smaller font size for axis labels
                                tickLine={false} // Minimalist tick lines
                              />
                              <YAxis
                                domain={[0, 35]}
                                tickFormatter={(value) => `${value}%`}
                                fontSize={7} // Smaller font size for axis values
                                tickLine={false} // Minimalist tick lines
                              />
                              <Tooltip
                                formatter={(value) => `${value}%`}
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "none",
                                  borderRadius: "8px",
                                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                                }}
                              />
                              <Bar
                                dataKey="interest"
                                fill="#ff69b4" // Cute pink color
                                barSize={8} // Smaller bars
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </Box>

                        {/* Profit Section */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "5px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          <span>📈 Profit</span>
                          <span
                            style={{ fontWeight: "bold", color: "#00bfa5" }}
                          >
                            ₱{profitMF.toFixed(2)}
                          </span>
                        </div>
                        {/* Balance Section */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          <span>💰 Balance</span>
                          <span
                            style={{ fontWeight: "bold", color: "#007bff" }}
                          >
                            ₱{balanceMF.toFixed(2)}
                          </span>
                        </div>
                        {/* Input Section */}
                        <TextField
                          fullWidth
                          label="Investment Amount"
                          variant="outlined"
                          type="number"
                          value={investmentMF}
                          onChange={(e) => setInvestmentMF(e.target.value)}
                          sx={{ marginBottom: "20px" }}
                        />

                        {/* Action Buttons */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "#ff6f61",
                              color: "#fff",
                              padding: "10px",
                              width: "45%",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "14px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={handleSellMF}
                          >
                            Sell
                          </button>
                          <button
                            style={{
                              backgroundColor: "#43a047",
                              color: "#fff",
                              padding: "10px",
                              width: "45%",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "14px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={handleBuyMF}
                          >
                            Buy
                          </button>
                        </div>
                        {/* Mutual Funds Description */}
                        {showDescriptionMutualFunds && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              textAlign: "start",
                              padding: "15px",
                              color: "white",
                              backgroundColor: "black",
                              height: "250px",
                              width: "300px",
                              alignSelf: "top",
                              position: "absolute",
                              margin: "20px",
                              border: "1px solid white",
                              zIndex: 1,
                            }}
                          >
                            <Close
                              style={{
                                fontSize: "2rem",
                                color: "white",
                                cursor: "pointer",
                                alignSelf: "flex-end",
                              }}
                              onClick={toggleDescriptionMF}
                            />

                            <h2
                              style={{ fontSize: "15px", marginBottom: "5px" }}
                            >
                              Mutual Funds Investment
                            </h2>
                            <p
                              style={{ fontSize: "13px", marginBottom: "3px" }}
                            >
                              Mutual funds pool money from various investors to
                              invest in a diversified portfolio. It is an
                              excellent choice for investors seeking
                              professional management and diversified risk.
                            </p>

                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Highlight:{" "}
                              <span style={{ color: "#00cac9" }}>
                                Diversified portfolio
                              </span>
                            </h4>
                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Potential ROI:{" "}
                              <span style={{ color: "#00cac9" }}>8%-15%</span>
                            </h4>
                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Current Interest:{" "}
                              <span style={{ color: "#00cac9" }}>
                                {interestMF.toFixed(2)}%
                              </span>
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {showStockMarket && (
                    <div>
                      {showHowToPlaySM && (
                        <div
                          style={{
                            height: "100vh",
                            background: "black",
                            color: "white",
                            padding: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            zIndex: 1000,
                          }}
                        >
                          <h1
                            style={{
                              fontSize: "50px",
                              marginBottom: "10px",
                              letterSpacing: "3px",
                              color: "#00cac9",
                              padding: "10px",
                            }}
                          >
                            New Investment!
                          </h1>

                          <h1
                            style={{
                              fontSize: "30px",
                              marginBottom: "10px",
                            }}
                          >
                            Stock Market
                          </h1>
                          <p>
                            Stock markets allow investors to trade ownership of
                            publicly traded companies. Ideal for individuals
                            looking to invest in equity and track market trends.
                          </p>
                          <h4>
                            Highlight:{" "}
                            <span style={{ color: "#00cac9" }}>
                              Equity ownership, High Risk (due to volatility,
                              market conditions, and company-specific issues)
                            </span>
                          </h4>
                          <h4>
                            Average ROI:{" "}
                            <span style={{ color: "#00cac9" }}>
                              7%-10% annually
                            </span>
                          </h4>

                          <button
                            onClick={() => {
                              setIsPaused(false); // Resume the game
                              setShowHowToPlaySM(false); // Hide 'how to play'
                            }}
                            style={{
                              backgroundColor: "#00cac9",
                              color: "#fff",
                              padding: "10px 20px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginTop: "20px",
                            }}
                          >
                            Start
                          </button>
                        </div>
                      )}

                      <div
                        style={{
                          width: "300px",
                          height: "300px",
                          border: "2px solid #d1a45f",
                          borderRadius: "10px",
                          backgroundColor: "#fef8e7",
                          padding: "15px",
                          fontFamily: "Arial, sans-serif",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          overlay: "hidden",
                          margin: "5px",
                        }}
                      >
                        <HelpOutline
                          sx={{
                            fontSize: "2rem",
                            color: "#00cac9",
                            display: "flex",
                            alignSelf: "flex-end",
                            cursor: "pointer",
                          }}
                          onClick={toggleDescriptionSM}
                        />
                        {/* Title Section */}
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h2
                            style={{
                              margin: "0",
                              fontSize: "18px",
                              color: "#333",
                            }}
                          >
                            Stock Market
                          </h2>
                        </div>

                        <Box
                          sx={{
                            width: "200px", // Adjusted for a smaller, cute container
                            height: "70px", // Defined height for better visualization
                            backgroundColor: "#f9f9f9", // Soft background
                            borderRadius: "12px", // Rounded corners
                            padding: "5px", // Slightly reduced padding
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Light shadow
                          }}
                        >
                          <ResponsiveContainer width="100%" height={70}>
                            <BarChart
                              data={interestDataSM}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                textAlign: "start",
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="name"
                                fontSize={7} // Smaller font size for axis labels
                                tickLine={false} // Minimalist tick lines
                              />
                              <YAxis
                                domain={[0, 35]}
                                tickFormatter={(value) => `${value}%`}
                                fontSize={7} // Smaller font size for axis values
                                tickLine={false} // Minimalist tick lines
                              />
                              <Tooltip
                                formatter={(value) => `${value}%`}
                                contentStyle={{
                                  backgroundColor: "#ffffff",
                                  border: "none",
                                  borderRadius: "8px",
                                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                                }}
                              />
                              <Bar
                                dataKey="interest"
                                fill="#ff69b4" // Cute pink color
                                barSize={8} // Smaller bars
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </Box>

                        {/* Profit Section */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "5px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          <span>📈 Profit</span>
                          <span
                            style={{ fontWeight: "bold", color: "#00bfa5" }}
                          >
                            ₱{profitSM.toFixed(2)}
                          </span>
                        </div>
                        {/* Balance Section */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          <span>💰 Balance</span>
                          <span
                            style={{ fontWeight: "bold", color: "#007bff" }}
                          >
                            ₱{balanceSM.toFixed(2)}
                          </span>
                        </div>
                        {/* Percentage Buttons for Investment */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-around",
                            marginBottom: "20px",
                          }}
                        >
                          {["10%", "25%", "50%", "Max"].map(
                            (percent, index) => (
                              <button
                                key={index}
                                style={{
                                  backgroundColor: "#1976d2",
                                  color: "#fff",
                                  padding: "10px",
                                  width: "20%",
                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                                onClick={() =>
                                  handleSetInvestmentPercent(percent)
                                }
                              >
                                {percent}
                              </button>
                            )
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "#ff6f61",
                              color: "#fff",
                              padding: "10px",
                              width: "45%",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "14px",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={handleSellSM}
                          >
                            Sell
                          </button>
                        </div>
                        {/* Stock Market Description */}
                        {showDescriptionStockMarket && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              textAlign: "start",
                              padding: "15px",
                              color: "white",
                              backgroundColor: "black",
                              height: "250px",
                              width: "300px",
                              alignSelf: "top",
                              position: "absolute",
                              margin: "20px",
                              border: "1px solid white",
                              zIndex: 1,
                            }}
                          >
                            <Close
                              style={{
                                fontSize: "2rem",
                                color: "white",
                                cursor: "pointer",
                                alignSelf: "flex-end",
                              }}
                              onClick={toggleDescriptionSM}
                            />

                            <h2
                              style={{ fontSize: "15px", marginBottom: "5px" }}
                            >
                              Stock Market Investment
                            </h2>
                            <p
                              style={{ fontSize: "13px", marginBottom: "3px" }}
                            >
                              Stock markets pool money from various investors to
                              trade in equities. It provides an opportunity for
                              equity ownership and professional tracking of
                              market trends.
                            </p>

                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Highlight:{" "}
                              <span style={{ color: "#00cac9" }}>
                                Equity ownership
                              </span>
                            </h4>
                            <h4
                              style={{ fontSize: "11px", marginBottom: "3px" }}
                            >
                              Current Interest:{" "}
                              <span style={{ color: "#00cac9" }}>
                                {interestSM.toFixed(2)}%
                              </span>
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 style={{ color: "#00cac9", marginBottom: "20px" }}>
                SAVINGS ACCOUNT
              </h1>
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="#d4d4d4"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0c-.69 0-1.292.409-1.621 1H2.58a1 1 0 0 0-.813.419L.205 3.753A.5.5 0 0 0 0 4.12V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4.12a.5.5 0 0 0-.205-.367L14.234 1.419A1 1 0 0 0 13.42 1H9.621A1.994 1.994 0 0 0 8 0zM4.5 9.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1h2zM3 12a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0v-.5A.5.5 0 0 1 3 12zm9.5-2.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1h2zM11 12a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0v-.5a.5.5 0 0 1 .5-.5z" />
                </svg>
              </div>

              {/* Slide Content */}
              <p
                style={{
                  marginBottom: "20px",
                  maxWidth: "600px",
                  lineHeight: "1.6",
                }}
              >
                {slides[currentSlide].text
                  .split(slides[currentSlide].highlight)
                  .map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index !==
                        slides[currentSlide].text.split(
                          slides[currentSlide].highlight
                        ).length -
                          1 && (
                        <span style={{ color: "#f5d58d", fontWeight: "bold" }}>
                          {slides[currentSlide].highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
              </p>

              {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* Previous button */}
                {currentSlide > 0 && (
                  <button
                    onClick={prevSlide}
                    style={{
                      background: "#444",
                      color: "#d4d4d4",
                      padding: "10px 20px",
                      border: "none",
                      margin: "0 10px",
                      borderRadius: "5px",
                    }}
                  >
                    &#x3c;
                  </button>
                )}

                {/* Got it button */}
                {currentSlide === slides.length - 1 && (
                  <button
                    onClick={handleGotItClick}
                    style={{
                      background: "#00cac9",
                      color: "black",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Got it
                  </button>
                )}

                {/* Next button */}
                {currentSlide < slides.length - 1 && (
                  <button
                    onClick={nextSlide}
                    style={{
                      background: "#444",
                      color: "#d4d4d4",
                      padding: "10px 20px",
                      border: "none",
                      margin: "0 10px",
                      borderRadius: "5px",
                    }}
                  >
                    &#x3e;
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestGameReady;
