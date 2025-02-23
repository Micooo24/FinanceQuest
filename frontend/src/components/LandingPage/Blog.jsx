


import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import {
  Home,
  SportsEsports,
  Article,
  TravelExplore,
  Info,
  Login,
  ArrowUpward,
} from "@mui/icons-material";
import Navbar from './Navbar';

const blogPosts = [
  {
    title: "Mastering Budgeting",
    summary: "Learn the key strategies to manage your finances effectively.",
    date: "Feb 7, 2025",
    image: "/assets/savings.jpg",
    link: "/budgeting",
  },
  {
    title: "Investing for Beginners",
    summary: "A step-by-step guide to getting started with investments.",
    date: "Feb 8, 2025",
    image: "/assets/InvestmentIconBlog.jpg",
    link: "/investingBlog",
  },
  {
    title: "Avoiding Common Financial Mistakes",
    summary: "Discover the pitfalls that can derail your financial success.",
    date: "Feb 9, 2025",
    image: "/assets/savingIconBlog.jpg",
    link: "/savingBlog",
  },
];

const Blog = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #5e3967, #351742)",
        overflowY: "auto",
      }}
    >
      {/* Navbar */}
      <Navbar />
      {/* Blog Page */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 12,
          gap: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontFamily: "'Gravitas One'",
            color: "#fff",
            mt: 5,
          }}
        >
          Finance Quest Blog
        </Typography>
        <Typography
          sx={{ fontSize: "1.2rem", fontFamily: "'Lilita One'", color: "#fff" }}
        >
          Stay updated with the latest financial tips and insights.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
            gap: 3,
            mb: 5,
          }}
        >
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              sx={{
                width: "80%",
                backgroundColor: "#f5f5f5",
                p: 3,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              <Box
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "10px",
                  mx: 3,
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                {/* Clickable Arrow */}
                <IconButton
                  component={Link}
                  to={post.link}
                  sx={{ color: "#8c2fc7", mt: 1 }}
                >
                  <ArrowUpward
                    sx={{
                      transform: `rotate(${
                        index % 2 === 0 ? "45deg" : "-45deg"
                      })`,
                    }}
                  />
                </IconButton>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "'Fraunces'", color: "#331540" }}
                >
                  {post.title}
                </Typography>
                <Typography
                  sx={{ fontFamily: "'Lilita One'", mt: 1, color: "#451d6b" }}
                >
                  {post.summary}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Lilita One'",
                    fontSize: "0.9rem",
                    mt: 1,
                    color: "#8c2fc7",
                  }}
                >
                  {post.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;
