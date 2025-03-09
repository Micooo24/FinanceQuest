import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import FourthWeek from "./FourthWeek"; 

const scenarios = [
    {
      question: "Your child comes home from school with an urgent project deadline. The teacher has emphasized that this project is crucial for their grades, and they need materials costing ₱2,000. You didn’t account for this expense, and covering it could impact your budget for other essentials.",
      options: [
        { text: "Fully fund the project with quality materials (₱1,300)", cost: 1300, bonus: 0, result: "Your child completes their project to a high standard, improving their grades and confidence. However, this significantly reduces your cash for the week, making it harder to cover other necessities." },
        { text: "Buy only essential supplies and encourage resourcefulness (₱800)", cost: 800, bonus: 0, result: "Your child learns to work within limitations, completing the project with decent materials. Their grades may not be affected much, and you preserve more of your budget." },
        { text: "Find secondhand or borrowed materials (₱300)", cost: 300, bonus: 0, result: "You save a lot by sourcing secondhand materials, but the project quality may suffer, and your child might feel disadvantaged." }
      ]
    },
    {
      question: "Your electricity bill has arrived, totaling ₱2,500. You can pay it immediately to avoid extra fees, but doing so will limit your funds for groceries and other needs.",
      options: [
        { text: "Pay the full bill on time (₱2,500)", cost: 2500, bonus: 0, result: "You ensure continued electricity service and avoid penalties, but your available cash for other needs is significantly reduced." }
      ]
    },
    {
      question: "While browsing through an online shopping platform, you come across a limited-time offer on an item you've been eyeing for months. The price is far lower than usual, but the item is not an immediate necessity.",
      options: [
        { text: "Buy the item now, even though it's outside your budget (₱2,500)", cost: 2500, bonus: 0, result: "You’re thrilled with the deal, and the item will add value in the long run, but your finances will be tighter this week." },
        { text: "Purchase the item with a payment plan or installment (₱700)", cost: 700, bonus: 0, result: "You get the item without a major hit to your current finances, but you’ll be locked into future payments, which could affect future budgeting." }
      ]
    },
    {
      question: "You’ve suddenly developed a health issue that requires medical attention. It’s not an emergency, but it’s something you should address soon to prevent complications.",
      options: [
        { text: "Pay for treatment in full right away (₱1,800)", cost: 1800, bonus: 0, result: "You get immediate treatment, ensuring your health doesn't worsen, but your savings take a major hit." },
        { text: "Use your health insurance and pay for the deductible (₱1,000)", cost: 1000, bonus: 0, result: "You take advantage of your insurance, reducing immediate costs, but you still have to cover the deductible." },
        { text: "Opt for a more affordable treatment, which may take longer to heal (₱800)", cost: 800, bonus: 0, result: "You save money now, but the treatment might be slower, and there’s a risk of needing further medical attention later." }
      ]
    },
    {
      question: "After a busy day, you’re tired and debating whether to cook at home or order food delivery.",
      options: [
        { text: "Order food delivery for convenience (₱700)", cost: 700, bonus: 0, result: "You enjoy a meal without effort, but it’s costly, and you need to adjust your budget elsewhere." },
        { text: "Cook a meal at home using ingredients you already have (₱400)", cost: 400, bonus: 0, result: "You prepare a healthy, satisfying meal at a lower cost, but it requires more time and effort." },
        { text: "Cook a quick, low-cost meal using fewer ingredients (₱200)", cost: 200, bonus: 0, result: "You save the most money, but the meal might not be as satisfying or nutritious." }
      ]
    },
    {
      question: "While browsing through your social media, you come across an ad for an online gambling platform offering a big jackpot for a small initial stake.",
      options: [
        { text: "Place a large bet, hoping to hit the jackpot (₱1,500)", cost: 1500, bonus: 3500, result: "You risk a large amount with the potential for high rewards, but the likelihood of losing is greater. Luckily you won ₱3,500" },
        { text: "Place a small bet, keeping the risk manageable (₱700)", cost: 700, bonus: 400, result: "You limit your losses but still engage in risky gambling that could become a bad habit. Unfortunetly, you lost ₱300" }
      ]
    },
  {
      question: "It’s payday! After a long month of hard work, your salary is finally in your account. The relief of knowing your bills are covered and there’s room for a little extra spending is a great feeling.",
      options: [
          {
              text: "Proceed",
              pay: 0 
          }
      ]
  }
];

export const balanceHistory = [];

function ThirdWeek({ day, handleNextDay, balance, setBalance, selectedJob }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showQuestion, setShowQuestion] = useState(true);
    const [animateQuestionOut, setAnimateQuestionOut] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [animateResultOut, setAnimateResultOut] = useState(false);
    const [transitionToFourthWeek, setTransitionToFourthWeek] = useState(false); 
    const [gameOver, setGameOver] = useState(false); 
    const [balanceHistory, setBalanceHistory] = useState([]); 

    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex);
        const selectedOption = scenarios[day - 15].options[optionIndex]; 
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
        handleNextDay();
        const jobPay = selectedJob.pay -  selectedJob.totalDeductions;
        setBalance((prevBalance) => prevBalance + jobPay);
        setShowResult(true);
        setTransitionToFourthWeek(true); 
    };

    const handleRetry = () => {
        setGameOver(false);
        window.location.reload(); 
    };

    const handleQuit = () => {
        window.location.href = "/menu";
    };

    useEffect(() => {
        balanceHistory.push({ day, balance });
    }, [balance]);

    const currentScenario = scenarios[day - 15]; 

    if (transitionToFourthWeek) {
        return <FourthWeek day={day} balance={balance} setBalance={setBalance} handleNextDay={handleNextDay} selectedJob={selectedJob} />;
    }

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
                    {day === 21 && (
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
                        You’ve received your weekly salary of ₱{selectedJob.pay}. After deductions of ₱{selectedJob.totalDeductions} for taxes, contributions, and other withholdings, you’re left with the amount that you can now plan to use for the week
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
                        onClick={day === 21 ? handleReceiveSalary : handleNextButton}
                    >
                        {day === 21 ? "Receive Salary" : "Next Day"}
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

export default ThirdWeek;