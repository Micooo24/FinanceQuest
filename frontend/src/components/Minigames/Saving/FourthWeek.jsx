import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Import the chart library
import FirstWeek, { balanceHistory as firstWeekBalanceHistory } from './FirstWeek'; // Import FirstWeek component and its balance history
import SecondWeek, { balanceHistory as secondWeekBalanceHistory } from './SecondWeek'; // Import SecondWeek component and its balance history
import ThirdWeek, { balanceHistory as thirdWeekBalanceHistory } from './ThirdWeek'; // Import ThirdWeek component and its balance history
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import SavingsReport from './SavingsReport';

const scenarios = [
    {
        question: "You’ve accumulated some credit card debt over the past few months, and the interest is now piling up. You’ve made only the minimum payments, but it’s clear that the debt is growing. You need to decide how to tackle it moving forward",
        options: [
          { text: "Pay off the entire debt at once (₱8,000)", cost: 8000, bonus: 0, result: "You pay off the entire balance of your credit card in one go, eliminating interest charges and freeing yourself from the burden of debt. However, this will leave you with very little savings and might impact other financial goals, such as building an emergency fund" },
          { text: "Continue making minimum payments and focus on saving for an emergency fund (₱1,800)", cost: 1800, bonus: 0, result: "You decide to keep making minimum payments, which will take longer to pay off the debt but allows you to start building an emergency fund. This could help protect you from future financial emergencies, but you’ll still face growing interest" },
          { text: "Transfer the balance to a low-interest loan (₱1,200/month)", cost: 1200, bonus: 0, result: "You transfer the credit card debt to a personal loan with a lower interest rate. While the monthly payments are manageable, you will still need to commit to paying off the loan over a longer period, and it will delay your ability to save" }
        ]
      },
      {
        question: "You receive an invitation to a relative’s wedding, which requires travel and purchasing a gift. While you want to attend to show support, it’s going to take a significant portion of your available funds for the month",
        options: [
          { text: "Attend the wedding, covering travel and gift expenses (₱4,000)", cost: 4000, bonus: 0, result: "You receive proper treatment, recover quickly, and maintain productivity at work." },
          { text: "Attend the wedding but with a cheaper gift and cost-saving travel (₱2,000)", cost: 2000, bonus: 0, result: "You save money, but your illness may worsen. This increases the risk of missing work due to sickness on Day 17." },
          { text: "Politely decline the invitation and focus on saving", cost: 0, bonus: 0, result: "You save money, but your illness may worsen. This increases the risk of missing work due to sickness on Day 17." }
        ]
      },
      {
        question: "It’s your birthday, and you’re considering throwing a party to celebrate with friends and family. You want to make it special, but the costs could quickly add up, leaving you with less money for other priorities",
        options: [
          { text: "Throw a large party with all the extras (₱5,000)", cost: 5000, bonus: 0, result: "You go all out, booking a venue, ordering catering, and buying decorations. The party is a huge success, and everyone has a great time, but it leaves a substantial dent in your finances" },
          { text: "Host a small get-together at home with affordable food (₱3,500)", cost: 3500, bonus: 0, result: "You keep the celebration smaller and more affordable, hosting a party at home with homemade food and simple decorations. While it’s not as extravagant, everyone still has fun, and you preserve your finances" },
          { text: "Skip the party and save the money for future goals", cost: 0, bonus: 0, result: "You decide to forgo the celebration and instead use the money for your savings or an important purchase. While it may not feel as festive, you ensure your financial stability for the long run" }
        ]
      },
      {
        question: "You’ve been eyeing a new gadget for weeks, and now, an online store is offering a huge discount for a limited time. The price is great, but it’s still a significant amount of money. You’ve been saving for a while, but your emergency fund is still not fully built up",
        options: [
          { text: "Buy the gadget on sale right away (₱10,000)", cost: 10000, bonus: 0, result: "You decide to purchase the gadget because the deal feels too good to pass up. While you enjoy your new item, your savings take a hit, and you may find yourself in a pinch if an emergency arises in the near future" },
          { text: "Wait for the next sale and use the opportunity to build your emergency fund", cost: 0, bonus: 0, result: "You resist the temptation to buy right away and instead focus on building your emergency fund. While you might have to wait longer for the gadget, you’re improving your financial security in case of unexpected costs" },
          { text: "Buy the gadget using a credit card in installments (₱2,000/month)", cost:2000, bonus: 0, result: "You purchase the gadget and pay in installments, which allows you to get it now without draining your savings. However, you will face monthly payments, which could strain your finances and delay your ability to save for future goals" }
        ]
      },
      {
        question: "A distant relative approaches you for help in paying for their college tuition fees. They explain that without your support, they might not be able to continue their education. You’re not obligated to help, but saying no might strain your family relationship. You’re also saving for your own future goals and have a limited amount of money at hand",
        options: [
          { text: "Give the full amount requested (₱10,000)", cost: 10000, bonus: 0, result: "You settle your debt, improving your reputation. However, your savings decrease." },
          { text: "Offer a partial amount and explain your financial situation (₱5,000)", cost: 5000, bonus: 0, result: "You keep your savings for now, but your friend is disappointed, which may affect future interactions." },
          { text: "Politely decline and explain that you're unable to help at this time", cost: 0, bonus: 0, result: "You keep your savings for now, but your friend is disappointed, which may affect future interactions." }
        ]
      },
      {
        question: "You’ve been dreaming of a vacation for months, but the costs are higher than expected. You’ve saved up for it, but taking the trip will use up a significant portion of your savings. You must decide if it’s worth it to go, or if you should put it off for a more financially secure future",
        options: [
          { text: "Go on the trip, fully enjoying your vacation (₱15,000)", cost: 15000, bonus: 0, result: "You take the vacation and enjoy a much-needed break, but you deplete your savings and leave yourself vulnerable to unexpected expenses" },
          { text: "Postpone the trip for a year, saving more money ", cost: 0, bonus: 0, result: "You delay the trip, allowing yourself more time to save and plan. While this feels like a sacrifice now, you’ll have a more comfortable vacation later without draining your savings" },
          { text: "Take a shorter, budget-friendly version of the trip (₱8,000)", cost: 8000, bonus: 0, result: "You take a scaled-back version of the trip, which allows you to have a break while preserving more of your savings. It’s not as grand as you imagined, but it offers a nice balance between adventure and responsibility" }
        ]
      },
  {
      question: "Your weekly salary arrives!",
      options: [
          {
              text: "Proceed",
              pay: 0 
          }
      ]
  }
];

function FourthWeek({ day, handleNextDay, balance, setBalance, selectedJob }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showQuestion, setShowQuestion] = useState(true);
    const [animateQuestionOut, setAnimateQuestionOut] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [animateResultOut, setAnimateResultOut] = useState(false);
    const [gameOver, setGameOver] = useState(false); 
    const [gameComplete, setGameComplete] = useState(false); 
    const [balanceHistory, setBalanceHistory] = useState([]); 
    const [aiFeedback, setAiFeedback] = useState('');
    const [showMinibudgetAIDialog, setShowMinibudgetAIDialog] = useState(false);

    useEffect(() => {
        setBalanceHistory(prevHistory => [...prevHistory, { day, balance }]);
    }, [balance]);

    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex);
        const selectedOption = scenarios[day - 22]?.options[optionIndex];
        if (!selectedOption) return; 
        const selectedCost = selectedOption.cost || 0;
        const selectedBonus = selectedOption.bonus || 0;
        const salary = selectedOption.pay || 0;

        setBalance((prevBalance) => {
            let newBalance = prevBalance - selectedCost + selectedBonus + salary;
            return newBalance >= 0 ? newBalance : 0; 
        });

        setTimeout(() => {
            setShowQuestion(false);
            setShowResult(true);
        }, 500);
    };

    const handleNextButton = () => {
        if (balance === 0) {
            setGameOver(true); 
            return; 
        }

        setAnimateResultOut(true);
        setTimeout(() => {
            handleNextDay(); 
            setSelectedOption(null);
            setShowQuestion(true);
            setAnimateQuestionOut(false);
            setShowResult(false);
            setAnimateResultOut(false);
        }, 500);
    };

    const handleReceiveSalary = () => {
        const jobPay = selectedJob.pay - selectedJob.totalDeductions;
        setBalance((prevBalance) => prevBalance + jobPay);
        setShowResult(true);
        setGameComplete(true); 
    };

    const handleRetry = () => {
        setGameOver(false);
        window.location.reload(); 
    };

    const handleQuit = () => {
        window.location.href = "/menu";
    };


const handleContinue = async () => {
    const userId = localStorage.getItem('userId');
    const firstweek = weeklyBalances[0];
    const secondweek = weeklyBalances[1];
    const thirdweek = weeklyBalances[2];
    const fourthweek = weeklyBalances[3];
    const average = avgWeeklyExpenses;

    try {
        await axios.post('http://127.0.0.1:8000/minibudget/create-minibudget', {
            user_id: userId,
            balance: balance,
            firstweek: firstweek,
            secondweek: secondweek,
            thirdweek: thirdweek,
            fourthweek: fourthweek,
            average: average
        });

        await axios.post(`http://127.0.0.1:8000/minibudget_ai/analyze-minibudget/${userId}`);

        const response = await axios.get(`http://127.0.0.1:8000/minibudget_ai/get-minibudget-analysis/${userId}`);
        setAiFeedback(response.data.analysis);
        setGameComplete(false);
        setShowMinibudgetAIDialog(true);
    } catch (error) {
        console.error('Error saving game completion data:', error);
    }
};

    const currentScenario = scenarios[day - 22];

    if (!currentScenario) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    position: "relative",
                    background: "none",
                    textAlign: "center"
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                    No more scenarios available.
                </Typography>
            </Box>
        );
    }

    const combinedBalanceHistory = [
        ...firstWeekBalanceHistory,
        ...secondWeekBalanceHistory,
        ...thirdWeekBalanceHistory,
        ...balanceHistory
    ];

    const weeklyBalances = [
        combinedBalanceHistory[6]?.balance || 0,
        combinedBalanceHistory[13]?.balance || 0,
        combinedBalanceHistory[20]?.balance || 0,
        combinedBalanceHistory[27]?.balance || 0
    ];

  const weeklyExpenses = [
    combinedBalanceHistory[1]?.balance !== undefined && combinedBalanceHistory[6]?.balance !== undefined
        ? Math.abs(combinedBalanceHistory[1].balance - combinedBalanceHistory[6].balance)
        : 0,
    combinedBalanceHistory[7]?.balance !== undefined && combinedBalanceHistory[13]?.balance !== undefined
        ? Math.abs(combinedBalanceHistory[7].balance - combinedBalanceHistory[13].balance)
        : 0,
    combinedBalanceHistory[14]?.balance !== undefined && combinedBalanceHistory[20]?.balance !== undefined
        ? Math.abs(combinedBalanceHistory[14].balance - combinedBalanceHistory[20].balance)
        : 0,
    combinedBalanceHistory[21]?.balance !== undefined && combinedBalanceHistory[27]?.balance !== undefined
        ? Math.abs(combinedBalanceHistory[21].balance - combinedBalanceHistory[27].balance)
        : 0
];
    
    const avgWeeklyExpenses = weeklyExpenses.reduce((acc, expense) => acc + expense, 0) / weeklyExpenses.length;
    const chartData = {
        labels: Array.from({ length: 28 }, (_, i) => `Day ${i}`),
        datasets: [
            {
                label: 'Balance Weekly Progress',
                data: combinedBalanceHistory.slice(0, 29).map(entry => entry.balance),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.4, 
            },
        ],
    };
    
    const shadowPlugin = {
        id: 'shadowPlugin',
        beforeDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            const dataset = chart.data.datasets[0];
            const meta = chart.getDatasetMeta(0);
            const points = meta.data;

            ctx.save();
            ctx.shadowColor = 'rgba(75,192,192,1)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 10;
    
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(75,192,192,0.5)');
            gradient.addColorStop(1, 'rgba(75,192,192,0)');
    
            ctx.fillStyle = gradient;
    
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.lineTo(points[points.length - 1].x, chartArea.bottom);
            ctx.lineTo(points[0].x, chartArea.bottom);
            ctx.closePath();
            ctx.fill();
    
            ctx.restore();
        },
        afterDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.restore();
        }
    };
    
    const chartOptions = {
        plugins: {
            shadowPlugin: shadowPlugin
        },
        elements: {
            line: {
                tension: 0.4 
            }
        }
    };

    const handleDownloadPDF = async () => {
        const pdfDocument = (
            <SavingsReport
                balance={balance}
                weeklyBalances={weeklyBalances}
                weeklyExpenses={weeklyExpenses}
                aiFeedback={aiFeedback}
            />
        );
    
        const blob = await pdf(pdfDocument).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'FinanceQuest_Analysis.pdf';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                position: "relative",
                background: "none",
                textAlign: "center"
            }}
        >
            {showQuestion && (
                <Box
                    sx={{
                        animation: animateQuestionOut ? "zoomOutFadeOut 0.5s forwards" : "zoomInFadeIn 0.5s forwards",
                        width: "70%"
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                       {currentScenario.question}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2 }}>
                        {currentScenario.options.map((option, index) => (
                            <Card
                                key={index}
                                sx={{
                                    minWidth: 200,
                                    textAlign: "center",
                                    p: 2,
                                    backgroundColor: "#444",
                                    borderRadius: 2,
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 0px 15px rgba(0, 202, 201, 0.8)"
                                    }
                                }}
                                onClick={() => handleOptionClick(index)}
                            >
                                <CardContent>
                                    <Typography variant="body1" sx={{ color: "#00cac9", fontWeight: "bold" }}>
                                        {option.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            )}

            {showResult && selectedOption !== null && (
                <Box
                    sx={{
                        backgroundColor: "transparent",
                        border: "1px solid white",
                        backdropFilter: "blur(100px)",
                        padding: 4,
                        borderRadius: 2,
                        width: "60%",
                        animation: animateResultOut ? "zoomOutFadeOut 0.5s forwards" : "zoomInFadeIn 0.5s forwards"
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
                        RESULT <br/><br/>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
                        {currentScenario.options[selectedOption].result}
                    </Typography>
                     {day === 28 && (
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#fff", textAlign: "left" }}>
                        Congratulations!<br/>
                        You've successfully completed Week 4 of your financial journey. You've made thoughtful decisions, navigated challenges, and are now one step closer to mastering your finances! Keep up the great work, and remember that each decision counts toward building a stronger future.<br/>
                        Here’s a quick look at your progress: <br/><br/>
                        You received your weekly salary of ₱{selectedJob.pay}.<br/> 
                        Deductions: ₱{selectedJob.totalDeductions}<br/><br/>
                        Keep going, you're doing amazing!
                        </Typography>
                    )}
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            color: "white",
                            borderColor: "white",
                            "&:hover": {
                                backgroundColor: "#444",
                                borderColor: "gray",
                                boxShadow: "0px 0px 15px rgba(0, 202, 201, 0.8)",
                                color: "white"
                            }
                        }}
                        onClick={day === 28 ? handleReceiveSalary : handleNextButton}
                        >
                            {day === 28 ? "Receive Salary" : "Next Day"}
                    </Button>
                </Box>
            )}

<Dialog 
    open={gameOver} 
    onClose={() => setGameOver(false)}
    PaperProps={{
        sx: {
            borderRadius: 4,
            backgroundColor: "#444",
            color: "#fff",
            textAlign: "center",
            padding: 2,
            border: "2px solid #00cac9",
            boxShadow: "0px 0px 20px #00cac9"
        }
    }}
>
    <DialogTitle sx={{ 
        fontFamily: "'Press Start 2P', cursive", 
        fontSize: "24px", 
        color: "#5e3967",
        textShadow: "2px 2px #000"
    }}>
        Game Over
    </DialogTitle>
    <DialogContent sx={{ 
        fontFamily: "'Press Start 2P', cursive", 
        fontSize: "16px", 
        color: "#fff",
        textShadow: "1px 1px #000"
    }}>
 <Typography variant="h6">It looks like you've run out of money this time, but don't worry—this is just a setback! Take a deep breath and try again. You've got the skills to make it through!</Typography>
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center" }}>
        <Button
            variant="outlined"
            sx={{
                color: "white",
                borderColor: "white",
                fontFamily: "'Press Start 2P', cursive",
                "&:hover": {
                    backgroundColor: "#444",
                    borderColor: "gray",
                    boxShadow: "0px 0px 15px rgba(0, 202, 201, 0.8)",
                    color: "white"
                }
            }}
            onClick={handleRetry}
        >
            Retry
        </Button>
        <Button
            variant="outlined"
            sx={{
                color: "white",
                borderColor: "white",
                fontFamily: "'Press Start 2P', cursive",
                "&:hover": {
                    backgroundColor: "#444",
                    borderColor: "gray",
                    boxShadow: "0px 0px 15px rgba(0, 202, 201, 0.8)",
                    color: "white"
                }
            }}
            onClick={handleQuit}
        >
            Quit
        </Button>
    </DialogActions>
</Dialog>


            <Dialog open={gameComplete} onClose={() => setGameComplete(false)} maxWidth="md" fullWidth    PaperProps={{
        sx: {
            borderRadius: 4,
            backgroundColor: "#444",
            color: "#fff",
            textAlign: "center",
            padding: 2,
            border: "2px solid #00cac9",
            boxShadow: "0px 0px 20px #00cac9"
        }
    }}>
                <DialogTitle sx={{ fontFamily: "'Press Start 2P', cursive", color: "#00cac9", textShadow: "2px 2px #000"}}>Congratulations!</DialogTitle>
                <DialogContent sx={{ textAlign: "center", color: "#fff", backgroundColor: "#444", fontFamily: "'Press Start 2P', cursive"}}>
                    <Typography variant="h6" sx={{ fontFamily: "Lilita One"}}>You have completed the game!</Typography>
                    <Typography variant="h6" sx={{ fontFamily: "Lilita One"}}>Remaining Balance: ₱{balance}</Typography>
                    <Line data={chartData} options={chartOptions} plugins={[shadowPlugin]} /> {/* Display the line chart */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2}}>
                        <Typography variant="body1" sx={{ fontFamily: "Lilita One"}}>1st Week: ₱{weeklyBalances[0]}</Typography>
                        <Typography variant="body1" sx={{ fontFamily: "Lilita One"}}>2nd Week: ₱{weeklyBalances[1]}</Typography>
                        <Typography variant="body1" sx={{ fontFamily: "Lilita One" }}>3rd Week: ₱{weeklyBalances[2]}</Typography>
                        <Typography variant="body1" sx={{ fontFamily: "Lilita One" }}>4th Week: ₱{weeklyBalances[3]}</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2, fontFamily: "Lilita One" }}>Average Weekly Expenses: ₱{avgWeeklyExpenses}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "white",
                            borderColor: "white",
                            fontFamily: "'Press Start 2P', cursive",
                            "&:hover": {
                                backgroundColor: "#444",
                                borderColor: "gray",
                                boxShadow: "0px 0px 15px rgba(0, 202, 201, 0.8)",
                                color: "white"
                            }
                        }}
                        onClick={handleContinue}
                    >
                        Continue
                        </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showMinibudgetAIDialog} onClose={() => setShowMinibudgetAIDialog(false)} maxWidth="md" fullWidth PaperProps={{
                sx: {
                    borderRadius: 4,
                    backgroundColor: "#444",
                    color: "#fff",
                    textAlign: "center",
                    padding: 2,
                    border: "2px solid #00cac9",
                    boxShadow: "0px 0px 20px #00cac9"
                }
            }}>
                <DialogTitle sx={{ fontFamily: "'Press Start 2P', cursive", color: "#00cac9", textShadow: "2px 2px #000"}}>FINANCEQUEST Analysis</DialogTitle>
                <DialogContent sx={{ textAlign: "center", color: "#fff", backgroundColor: "#444", fontFamily: "'Press Start 2P', cursive",  }}>
                    <Typography variant="h6">{aiFeedback}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "white",
                            borderColor: "white",
                            fontFamily: "'Press Start 2P', cursive",
                            "&:hover": {
                                backgroundColor: "#444",
                                borderColor: "gray",
                                boxShadow: "0px 0px 15px rgba(0, 202, 201, 0.8)",
                                color: "white"
                            }
                        }}
                        onClick={handleDownloadPDF}
                    >
                        Download 
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "white",
                            borderColor: "white",
                            fontFamily: "'Press Start 2P', cursive",
                            "&:hover": {
                                backgroundColor: "#444",
                                borderColor: "gray",
                                boxShadow: "0px 0px 15px rgba(0, 202, 201, 0.8)",
                                color: "white"
                            }
                        }}
                        onClick={handleQuit}
                    >
                        Quit
                    </Button>
                </DialogActions>
            </Dialog>

            <style>
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                {`
                    @keyframes zoomInFadeIn {
                        0% { opacity: 0; transform: scale(0.8); }
                        100% { opacity: 1; transform: scale(1); }
                    }
                    @keyframes zoomOutFadeOut {
                        0% { opacity: 1; transform: scale(1); }
                        100% { opacity: 0; transform: scale(1.2); }
                    }
                `}
            </style>
        </Box>
    );
}

export default FourthWeek;