import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import FourthWeek from "./FourthWeek"; 

const scenarios = [
  {
    question: "Your child comes home from school with an urgent project deadline. The teacher has emphasized that this project is crucial for their grades, and they need materials costing ₱2,000. You didn’t account for this expense, and covering it could impact your budget for other essentials",
    options: [
      { text: "Fully fund the project with quality materials (₱2,000)", cost: 2000, bonus: 0, result: "Your child completes their project to a high standard, which may improve their grades and boost their confidence. However, this significantly reduces your cash for the week, making it harder to cover other necessities" },
      { text: "Buy only essential supplies and encourage resourcefulness (₱1,000)", cost: 1000, bonus: 0, result: "Your child learns to work within limitations, still completing their project but without premium materials. Their grades may not be affected much, and you preserve more of your budget" },
      { text: "Delay the project expense and risk the consequences", cost: 0, bonus: 0, result: "Your child struggles to complete the project, and their grades might suffer. Additionally, they may feel discouraged. You keep your money, but at the cost of their academic progress" }
    ]
  },
  {
    question: "Your electricity bill has arrived, totaling ₱2,500. You can pay it immediately to avoid extra fees, but doing so will limit your funds for groceries and other needs",
    options: [
      { text: "Pay the full bill on time", cost: 2500, bonus: 0, result: " You ensure continued electricity service and avoid penalties. However, this significantly reduces your available cash for other needs" },
    ]
  },
  {
    question: "While browsing through an online shopping platform, you come across a limited-time offer on an item you've been eyeing for months. The price is far lower than usual, but the item is not an immediate necessity. You’re torn between the desire to buy it now and the realization that it wasn’t in your original budget",
    options: [
      { text: "Buy the item now, even though it's outside your budget (₱2,500)", cost: 2500, bonus: 0, result: "You’re thrilled with the deal, and the item will surely add value in the long run. However, your finances will be tighter this week, and you may have to adjust other expenses or delay other important purchases" },
      { text: "Purchase the item with a payment plan or installment(₱500)", cost: 500, bonus: 0, result: "You get the item you desire without a major hit to your current finances, as the cost will be spread out. However, you’ll be paying for it over time, and you need to ensure future payments won’t strain your budget" },
      { text: "Wait for a more reasonable sale in the future", cost: 0, bonus: 0, result: " You delay the purchase, but this gives you time to save for it properly. However, you risk missing out on this sale, and the item might become more expensive later" }
    ]
  },
  {
    question: "You’ve suddenly developed a health issue that requires medical attention. It’s not an emergency, but it’s something you should address soon to prevent complications down the road. Unfortunately, you didn’t set aside money for medical expenses, so you need to figure out how to pay for it while managing your finances",
    options: [
      { text: "Pay for treatment in full right away, using your savings (₱2,000)", cost: 2000, bonus: 0, result: "You prioritize getting the treatment you need immediately, ensuring that your health issue is resolved quickly. However, this will leave your savings severely depleted, and you may struggle with other expenses over the next few weeks" },
      { text: "Use your health insurance and pay for the deductible (₱500)", cost: 500, bonus: 0, result: "You decide to use your health insurance, which reduces the immediate cost, but you still need to pay for the deductible. This way, you can address your health issue while keeping some of your savings intact for other expenses" },
      { text: "Opt for a more affordable treatment, which may take longer to heal (₱1,000)", cost: 1000, bonus: 0, result: "You choose a more budget-friendly treatment option. While this will save you money now, it may take longer to recover, and there’s a risk that your condition could worsen or come back, requiring further treatment later" }
    ]
  },
  {
    question: "After a busy day, you’re tired and debating whether to cook at home or order food delivery. Both choices have their merits, but you need to decide whether the convenience of eating out is worth the extra cost, or if cooking will allow you to save money and eat healthier",
    options: [
      { text: "Order food delivery for convenience (₱700)", cost: 700, bonus: 0, result: "You enjoy a meal without lifting a finger, but the added costs of delivery fees, service charges, and tip make it far more expensive than cooking at home. While you save time and energy, you will have to adjust your budget elsewhere to account for the additional spending" },
      { text: "Cook a meal at home using ingredients you already have (₱300)", cost: 300, bonus: 0, result: "You prepare a healthy, satisfying meal that costs much less than ordering delivery. Although this requires more time and effort, it allows you to stick to your budget and enjoy a home-cooked meal" },
      { text: "Cook a quick, low-cost meal using fewer ingredients (₱150)", cost: 150, bonus: 0, result: "You opt for a simple, quick meal that costs even less than your usual home-cooked dishes. While it’s economical, you might not feel as satisfied as you would with a more elaborate meal" }
    ]
  },
  {
    question: "While browsing through your social media, you come across an ad for an online gambling platform offering a big jackpot for a small initial stake. You’ve been feeling the pressure of some financial goals lately, and the temptation of potentially solving your problems with a lucky win is tempting. But deep down, you know it’s a risky decision",
    options: [
      { text: "Place a large bet, hoping to hit the jackpot (₱3,500)", cost: 3500, bonus: 0, result: "You go all in, hoping that the gamble will pay off and solve your financial issues. If you win, you’ll have a significant amount of money to use for your goals. However, if you lose, it will set you back and make it harder to recover financially" },
      { text: "Place a small bet, keeping the risk manageable (₱1,500)", cost: 1500, bonus: 0, result: "You bet a small amount, which allows you to participate without risking too much. While your potential reward is smaller, you feel less stressed about the possibility of a major loss. If you win, it could still be a nice boost to your finances, but losing won’t have as big an impact" },
      { text: "Skip the gamble and save your money", cost: 0, bonus: 0, result: "You decide not to risk your money and instead focus on safer, more stable ways to reach your financial goals. While you miss out on the thrill of gambling, you avoid the risk of losing money and maintain your financial stability" }
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