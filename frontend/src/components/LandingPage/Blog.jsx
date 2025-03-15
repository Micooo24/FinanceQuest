import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grow,
} from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import Navbar from './Navbar';

const blogPosts = [
  {
    title: "Mastering Budgeting",
    summary: "Learn the key strategies to manage your finances effectively.",
    date: "Feb 7, 2025",
    image: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388942/savings_efocff.jpg",
    link: "/budgeting",
  },
  {
    title: "Investing for Beginners",
    summary: "A step-by-step guide to getting started with investments.",
    date: "Feb 8, 2025",
    image: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388941/InvestmentIconBlog_tv0w42.jpg",
    link: "/investingBlog",
  },
  {
    title: "Avoiding Common Financial Mistakes",
    summary: "Discover the pitfalls that can derail your financial success.",
    date: "Feb 9, 2025",
    image: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388941/savingIconBlog_o3t4gq.jpg",
    link: "/savingBlog",
  },
];

const Blog = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #5e3967, #351742)",
      }}
    >
      <Navbar />
      
      <Box
        sx={{
          maxWidth: "1100px",
          margin: "0 auto",
          mt: 12,
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontFamily: "'Gravitas One'",
            color: "#fff",
            textAlign: "center",
            mb: 2,
          }}
        >
          Finance Quest Blog
        </Typography>
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontFamily: "'Lilita One'",
            color: "#d4b8e0",
            textAlign: "center",
            mb: 4,
          }}
        >
          Stay updated with the latest financial tips and insights
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {blogPosts.map((post, index) => (
            <Grow
              in={true}
              timeout={500 + index * 200}
              key={index}
            >
              <Card
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  boxShadow: hoveredCard === index 
                    ? "0 8px 24px rgba(92, 57, 103, 0.3)"
                    : "0 4px 12px rgba(92, 57, 103, 0.1)",
                  transform: hoveredCard === index 
                    ? "translateY(-8px) scale(1.02)"
                    : "translateY(0)",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                  '&:hover': {
                    '.card-image': {
                      transform: "scale(1.05)",
                    }
                  }
                }}
              >
                <Box
                  className="card-image"
                  sx={{
                    height: "200px",
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.3s ease",
                  }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Fraunces'",
                      color: "#351742",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Lilita One'",
                      color: "#5e3967",
                      fontSize: "0.95rem",
                      mb: 1,
                    }}
                  >
                    {post.summary}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Lilita One'",
                      fontSize: "0.85rem",
                      color: "#8c2fc7",
                    }}
                    
                  >
                    {post.date}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <IconButton
                    component={Link}
                    to={post.link}
                    sx={{ color: "#58148e" }}
                  >
                    <ArrowUpward sx={{ transform: "rotate(45deg)" , mt: 2}} />
                  </IconButton>
                </Box>
              </Card>
            </Grow>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;