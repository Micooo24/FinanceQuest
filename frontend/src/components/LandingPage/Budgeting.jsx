import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton, TextField, Button, Card, CardContent } from "@mui/material";
import { Home, SportsEsports, Article, TravelExplore, Info, Login, ThumbUp, Comment } from "@mui/icons-material";

const BudgetingBlog = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        background: "white",
        overflowY: "auto",
        color: "#351742",
        paddingBottom: "50px",
      }}
    >
      {/* Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          top: 15,
          left: "5%",
          width: "90%",
          backgroundColor: "#331540",
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          borderRadius: "100px",
          height: "10%",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
          <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
            Finance Quest
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton component={Link} to="/" sx={{ color: "#fff" }}><Home /></IconButton>
            <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}><SportsEsports /></IconButton>
            <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}><Article /></IconButton>
            <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}><TravelExplore /></IconButton>
            <IconButton component={Link} to="/about" sx={{ color: "#fff" }}><Info /></IconButton>
            <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Top Image */}
      <Box sx={{ width: "100%", textAlign: "center", mt:10}}>
        <img src="/assets/moneyl.jpg" alt="Budgeting Tips" style={{ width: "90%", height: "400px", objectFit: "cover", borderRadius: "100px" }}  />
      </Box>

      {/* Main Content Layout */}
      <Box sx={{ display: "flex", width: "90%", margin: "40px auto", gap: 4 }}>
        {/* Left Side - Article */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", textAlign: "center" }}>
            Top 10 Budgeting Tips for Beginners
          </Typography>
          <Typography sx={{ fontSize: "1.1rem", fontFamily: "'Lilita One'", mt: 2, textAlign: "center", color: "#000000" }}>
            Budgeting is one of the most important skills when it comes to managing money. Whether you're a student, a young professional, or someone trying to improve your financial situation, learning how to budget properly can help you avoid debt, save for the future, and live a stress-free life.
          </Typography>
          {/* Budgeting Tips */}
          {[
            "Track Your Income and Expenses",
            "Use the 50/30/20 Rule",
            "Set a Monthly Budget and Stick to It",
            "Identify Needs vs. Wants",
            "Cook at Home and Reduce Takeouts",
            "Look for Student Discounts and Promos",
            "Avoid Impulse Buying",
            "Build an Emergency Fund",
            "Find Ways to Increase Your Income",
            "Reward Yourself (Within Budget!)",
          ].map((tip, index) => (
            <Box key={index} sx={{ mt: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#351742" }}>
                {index + 1}. {tip}
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontFamily: "'Lilita One'", mt: 1, color: "#000000" }}>
                {getTipContent(index)}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Right Side - Community Forum */}
        <Box sx={{ flex: 1, borderLeft: "2px solid #351742", paddingLeft: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#351742" }}>Community Forum</Typography>
          <Button startIcon={<ThumbUp />} sx={{ mt: 2 }}>Like</Button>
          <Button startIcon={<Comment />} sx={{ mt: 2, ml: 2 }}>Comment</Button>
          <TextField fullWidth label="Leave a comment" multiline rows={3} sx={{ mt: 2 }} />
          <Button variant="contained" sx={{ mt: 2, backgroundColor: "#351742" }}>Submit</Button>
        </Box>
      </Box>
      
      {/* Other Articles Section */}
      <Box sx={{ width: "80%", margin: "40px auto" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", color: "#351742" , fontFamily: "'Lilita One'"}}>Other Articles</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 3 }}>
          <Card sx={{ width: "300px" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#351742" , fontFamily: "'Lilita One'"}} >Smart Saving Strategies</Typography>
              <Button component={Link} to="/savings" sx={{ mt: 1, fontWeight: "bold", color: "#351742" , fontFamily: "'Lilita One'"}}>Read More</Button>
            </CardContent>
          </Card>
          <Card sx={{ width: "300px" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#351742" , fontFamily: "'Lilita One'"}} >Investing 101</Typography>
              <Button component={Link} to="/investing" sx={{  mt: 1, fontWeight: "bold", color: "#351742" , fontFamily: "'Lilita One'" }}>Read More</Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

const getTipContent = (index) => {
  const tips = [
    "Before creating a budget, you need to know how much money is coming in and going out. List down all your sources of income and track your expenses.",
    "A simple budgeting method is the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings or debt repayment.",
    "After tracking your expenses, set a realistic budget based on your income and allocate specific amounts for each expense category.",
    "Before making a purchase, ask yourself if it is a need or a want. Prioritizing essentials helps prevent unnecessary expenses.",
    "Dining out frequently can drain your budget fast. Cooking at home helps you save money while maintaining a healthier lifestyle.",
    "Take advantage of student discounts and promotions to lower expenses on transportation, food, and subscriptions.",
    "Sales and online shopping temptations can lead to overspending. Try waiting 24 hours before making an impulsive purchase.",
    "Unexpected expenses can arise at any time. Building an emergency fund ensures financial stability in tough situations.",
    "If your budget is tight, explore side hustles or freelancing to increase your income.",
    "Budgeting does not mean depriving yourself. Reward yourself occasionally but within a set budget to maintain motivation.",
  ];
  return tips[index];
};

export default BudgetingBlog;
