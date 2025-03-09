import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ThirdWeek from "./ThirdWeek"; 

const scenarios = [
    {
        question: "The summer heat is unbearable, and just when you need it the most, your electric fan stops working. With high temperatures making it difficult to sleep and focus, you must decide whether to repair, replace, or endure the discomfort",
        options: [
          { text: " Repair the electric fan (₱800)", cost: 800, bonus: 0, result: "You spent ₱800 to repair the fan, keeping your home comfortable. This helps you sleep better, preventing fatigue from affecting your work performance." },
          { text: "Buy a new electric fan (₱1,500)", cost: 1500, bonus: 0, result: "A brand-new fan ensures long-term reliability, saving you from future repair costs. However, it’s a bigger expense that takes a noticeable chunk from your budget. If you can afford it, this is a long-term investment" },
          { text: "Do nothing and endure the heat (₱300)", cost: 300, bonus: 0, result: "You save money, but at the cost of your comfort. Over time, the heat might force you to seek alternative ways to cool down, such as eating out in air-conditioned places or visiting malls, which could lead to unnecessary spending" }
        ]
      },
      {
        question: "While preparing breakfast, you notice water pooling under the kitchen sink. A pipe is leaking, and ignoring it could lead to expensive water damage. Should you act now or delay the repair?",
        options: [
          { text: "Hire a professional plumber for a permanent fix (₱1,500)", cost: 1500, bonus: 0, result: "The leak is properly fixed, preventing further damage. This protects your kitchen from costly water damage and mold growth. While this expense reduces your savings now, it prevents significantly higher repair costs later" },
          { text: "Apply a temporary DIY fix (₱500)", cost: 500, bonus: 0, result: "You reduce the leak for now, delaying the need for a major repair. However, this is only a short-term solution, and the problem may worsen, eventually forcing you to pay more" },
          { text: "Ignore the leak (₱200)", cost: 200, bonus: 0, result: "Your savings remain mostly intact, but the leak grows worse, increasing your water bill. Eventually, you’ll need costly repairs, and the damage might spread to flooring and cabinets, making future expenses unavoidable" }
        ]
      },
      {
        question: "Your employer offers an overtime shift. Taking it means extra earnings, but it also means less free time. Should you prioritize income or personal balance?",
        options: [
          { text: "Work the full overtime shift (₱1,800)", cost: 300, bonus: 1800, result: "You earn an extra ₱1,800, boosting your savings. However, you've spent ₱300 to ease the additional stress may impact your health or energy levels later in the game." },
          { text: "Work a partial shift (₱900)", cost: 100, bonus: 900, result: "You maintain your well-being taking the work you are capable of doing without burning out, you've spent ₱100 to treat yourself for doing such a good job" }
        ]
      },
      {
        question: "Your usual commute is unavailable today due to unexpected road construction. This leaves you with the challenge of finding a new route to get to work. You now have to decide on the best alternative that will get you to your destination efficiently, whether it's taking a longer detour, using public transportation, or considering other options to avoid delays.",
        options: [
          { text: "Take a taxi or ride-sharing service (₱350)", cost: 350, bonus: 0, result: "You arrive on time, stress-free, and ready to start the day, ensuring job stability and a productive morning. However, this convenience comes at a cost, and the fare significantly reduces your savings for the week" },
          { text: "Use public transportation via an alternative route (₱200)", cost: 200, bonus: 0, result: "You save a decent amount of money by opting for public transport, but you do arrive slightly late. While this may be acceptable for one day, repeated lateness could begin to affect your job security and overall performance at work" },
          { text: "Walk to work (₱100)", cost: 100, bonus: 0, result: "Walking saves you money compared to other options, allowing you to avoid major transportation costs. However, this option leaves you arriving late and feeling exhausted, which might negatively affect your energy levels and productivity throughout the day causing you to spend on energy drinks" }
        ]
      },
      {
        question: "Your child wakes up feeling weak, and after checking, you notice they have a fever. You’re unsure if it’s a minor illness or something more serious. You must decide how to handle it",
        options: [
          { text: "Take your child to a doctor for a proper check-up and medication (₱1,000)", cost: 1000, bonus: 0, result: "Your child receives professional medical attention, ensuring the right treatment. While it’s an expense now, it prevents worsening symptoms that could lead to hospital visits and higher costs" },
          { text: "Buy over-the-counter medicine and monitor the condition at home (₱500) ", cost: 500, bonus: 0, result: "Your child gets basic treatment, and if it’s just a mild illness, they may recover. However, if the condition worsens, a delayed doctor’s visit could lead to additional expenses and a longer recovery time" }
        ]
      },
      {
        question: "Your parents have invited you and your family for a short weekend visit. While it’s a great chance to relax and spend time with family, it also comes with expenses like travel and food. You must decide how to handle the trip",
        options: [
          { text: "Accept the invitation and travel comfortably by bus (₱2,500)", cost: 2500, bonus: 0, result: "You and your family enjoy a smooth and comfortable trip, making the most of the time with your parents without any stress. However, this means spending money on tickets and other travel-related expenses" },
          { text: "Travel on a budget by taking a cheaper alternative (₱1,200)", cost: 1200, bonus: 0, result: "You still get to visit your parents but at a lower cost. However, the trip might be less comfortable, and delays could affect the time spent with family" }
        ]
      },
  {
      question: "Your hard-earned weekly salary has been deposited, providing you with fresh funds to manage your expenses and savings",
      options: [
          {
              text: "Proceed",
              pay: 0 
          }
      ]
  }
];

export const balanceHistory = [];

function SecondWeek({ day, handleNextDay, balance, setBalance, selectedJob }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showQuestion, setShowQuestion] = useState(true);
    const [animateQuestionOut, setAnimateQuestionOut] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [animateResultOut, setAnimateResultOut] = useState(false);
    const [transitionToThirdWeek, setTransitionToThirdWeek] = useState(false); 
    const [gameOver, setGameOver] = useState(false); 


    
    const handleOptionClick = (optionIndex) => {
        setSelectedOption(optionIndex);
        const selectedOption = scenarios[day - 8].options[optionIndex]; 
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
        const jobPay = selectedJob.pay - selectedJob.totalDeductions;
        setBalance((prevBalance) => prevBalance + jobPay);
        setShowResult(true);
        setTransitionToThirdWeek(true); 
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

    const currentScenario = scenarios[day - 8]; 

    if (transitionToThirdWeek) {
        return <ThirdWeek day={day} balance={balance} setBalance={setBalance} handleNextDay={handleNextDay} selectedJob={selectedJob} />;
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
                    {day === scenarios.length + 7 && (
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
                       You have received your weekly salary of ₱{selectedJob.pay}.<br/>
                       After accounting for tax deductions amounting to ₱{selectedJob.totalDeductions}, 
                       the remaining balance is now available for you to manage. Whether it's covering expenses, saving for future goals, or making necessary purchases, how you allocate it will impact your financial stability.
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
                        onClick={day === scenarios.length + 7 ? handleReceiveSalary : handleNextButton}
                    >
                        {day === scenarios.length + 7 ? "Receive Salary" : "Next Day"}
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

export default SecondWeek;