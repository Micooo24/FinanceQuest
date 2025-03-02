import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SecondWeek from "./SecondWeek"; 

const scenarios = [
  {
      question: "As the evening settles in, your child hands you a list of essential school supplies. These materials are critical for their coursework, but purchasing them now could impact your ability to manage upcoming financial responsibilities. Rent is due in three days, and your available funds are limited. How do you proceed?",
      options: [
          { text: "Purchase the supplies immediately (₱1,500)", cost: 1500, bonus: 0, result: "Your child is fully prepared for school, boosting their confidence and ensuring they can participate effectively in class. However, this leaves you with fewer funds to cover other immediate" },
          { text: "Postpone the purchase", cost: 0, bonus: 0, result: "You maintain financial flexibility, ensuring resources are available for critical expenses like rent. However, your child may struggle in school without the necessary materials, potentially affecting their academic performance and morale" },
          { text: "Take on extra work to cover the expense(₱1,500)", cost: 1500, bonus: 2000, result: "You secure additional funds, reinforcing financial security while still affording the school supplies. However, this demands extra time and effort, which may impact your personal well-being" }
      ]
  },
  {
      question: "If your refrigerator is nearly empty and ensuring your family has enough food for the week is a priority, would you opt for a full grocery run to provide stability at the cost of financial flexibility, or would you choose a more frugal approach, potentially compromising on nutrition?",
      options: [
          { text: "Stock up with a full grocery run (₱2,000)", cost: 2000, bonus: 0, result: "You decided to purchase full groceries for ₱2,000, this ensures that your family will have proper nutrition for the week." },
          { text: "Buy only essentials (₱1,000)", cost: 1000, bonus: 0, result: "You opted to buy only the essentials, spending ₱1,000, which allowed you to save money for future needs. This careful budgeting helps improve your financial stability while still meeting your family's basic needs" },
          { text: "Stretch existing ingredients", cost: 0, bonus: 0, result: "By utilizing what is already available and planning meals strategically, you minimize expenses while still providing sustenance. However, this requires extra effort and creativity in meal preparation" }
      ]
  },
  {
      question: "Rising transportation costs force you to reconsider how you travel to work. Do you continue your regular routine, explore cost-saving alternatives, or make a long-term investment?",
      options: [
          { text: "Stick to your usual commute via jeepney (₱20/day)", cost: 560, bonus: 0, result: "You maintain convenience and punctuality, ensuring a predictable routine without disruptions. However, the cost accumulates daily, impacting long-term savings" },
          { text: "Walk to work", cost: 0, bonus: 0, result: "You eliminate commuting costs entirely, preserving funds for other priorities. However, walking daily requires additional time and energy, potentially affecting your productivity" },
          { text: "Invest in a second-hand bicycle (₱2,000)", cost: 2000, bonus: 0, result: "A one-time expense reduces your long-term transportation costs significantly. However, maintenance and potential wear and tear could lead to future expenses" }
      ]
  },
  {
      question: "Your younger sibling approaches you with a request: they need additional funds to complete an important school project that could impact their academic standing. With financial constraints looming, how do you respond?",
      options: [
          { text: "Provide the funds", cost: 500, bonus: 0, result: "Your sibling successfully completes the project, enhancing their academic performance. However, this reduces your available funds, potentially affecting other priorities" },
          { text: "Encourage them to find an alternative solution", cost: 0, bonus: 0, result: "Your finances remain intact, and your sibling learns to be resourceful. However, they may struggle with limited resources, which could impact their final project" },
          
      ]
  },
  {
      question: "A bill for ₱1,200 arrives with a warning that failure to pay within the week will incur a penalty. You need to decide how to prioritize this payment while managing your other financial responsibilities. How do you handle the situation to avoid the penalty?",
      options: [
          { text: "Settle the bill immediately (₱1,200)", cost: 1200, bonus: 0, result: "Your water service remains uninterrupted, providing stability at home. However, this reduces your financial flexibility for other expenses" }
      ]
  },
  {
      question: "A close friend invites you to a gathering, an opportunity to unwind and strengthen relationships. However, attending will require an expense for food, transportation, and other costs. How do you navigate this decision?",
      options: [
          { text: "Contribute money and attend without participating in preparation (₱1,200)", cost: 1200, bonus: 0, result: "You enjoy valuable social interaction, strengthening friendships. However, this affects your financial reserves, reducing funds for upcoming needs" },
          { text: "Decline the invitation", cost: 0, bonus: 0, result: "You maintain financial stability, prioritizing savings. However, you miss out on social engagement, which may impact relationships" },
          { text: "Participate in the preparation to reduce your contribution (₱600)", cost: 600, bonus: 0, result: "You still engage socially while significantly reducing costs by helping with preparation. However, this requires effort in planning and coordination" }
      ]
  },
  {
      question: "Congratulations on receiving your first hard-earned salary! Your dedication and effort have finally paid off, marking the beginning of your journey.",
      options: [
          {
              text: "Proceed",
              pay: 0 
          }
      ]
  }
];

export const balanceHistory = [];

function FirstWeek({ day, handleNextDay, balance, setBalance, selectedJob }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showQuestion, setShowQuestion] = useState(true);
  const [animateQuestionOut, setAnimateQuestionOut] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [animateResultOut, setAnimateResultOut] = useState(false);
  const [transitionToSecondWeek, setTransitionToSecondWeek] = useState(false); 
  const [gameOver, setGameOver] = useState(false); 
  
  const handleOptionClick = (optionIndex) => {
      setSelectedOption(optionIndex);
      const selectedOption = scenarios[day - 1].options[optionIndex];
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
      setTransitionToSecondWeek(true); 
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

  const currentScenario = scenarios[day - 1];

  if (transitionToSecondWeek) {
      return <SecondWeek day={day} balance={balance} setBalance={setBalance} handleNextDay={handleNextDay} selectedJob={selectedJob} />;
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
                  {day === scenarios.length && (
                      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
                         You have just received your weekly salary of ₱{selectedJob.pay}. After accounting for the necessary tax deductions, which total ₱{selectedJob.totalDeductions}, your net income for the week has been adjusted accordingly.
                         Despite the challenges, you've made it through this week! Keep up the hard work and stay focused—every step brings you closer to your financial goals. You've got this!
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
                      onClick={day === scenarios.length ? handleReceiveSalary : handleNextButton}
                  >
                      {day === scenarios.length ? "Receive Salary" : "Next Day"}
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

export default FirstWeek;