import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Navbar from "./Navbar";

const aboutSections = [
  {
    title: "About Finance Quest",
    icon: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388624/piggybank_kk1hm0.png",
    details:
      "Finance Quest is an innovative and educational game where players embark on an exciting journey to achieve financial mastery by making smart financial decisions. The game is designed to be both fun and educational, allowing players to level up by successfully navigating real-world financial scenarios. Players experience various stages of financial growth through interactive storytelling and strategic decision-making.\n\nBuilt using Python for the backend and Three.js for the dynamic 3D environment, players engage in strategic missions, face complex financial dilemmas, and participate in mini-games that test their knowledge on topics such as savings, debt management, investing, and smart spending. The game also incorporates real-life financial challenges inspired by scenarios in the Philippines, making it relatable and relevant to players. As players progress, they encounter NPCs who offer quests, financial tips, and challenges, influencing the storyline based on the player’s decisions.",
    bgColor: "#451d6b",
  },
  {
    title: "Mission & Vision",
    icon: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388622/building_uxfesp.png",
    details:
      "VISION\nWe aim to implement financial education by making learning fun, interactive, and impactful through gamified experiences and real-world scenarios. We believe that financial literacy is essential for everyone, regardless of age or background, and should be accessible, engaging, and practical. By transforming complex financial concepts into interactive adventures.\n\nMISSION\nOur mission is to empower individuals with the knowledge and tools they need to make informed financial decisions and reach their goals. We are dedicated to bridging the financial literacy gap by providing an immersive and educational gaming platform that encourages strategic thinking, problem-solving, and informed decision-making.",
    bgColor: "#351742",
  },
  {
    title: "Our Team",
    icon: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388623/people_pla7zy.png",
    details: "Our team is dedicated to providing a comprehensive and engaging learning experience for players.\nMeet our talented team members below:",
    teamImages: [
      "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388627/jane_dpkych.jpg",
      "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388622/jana_skw5r0.jpg",
      "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388622/lei_zjpxsq.jpg",
      "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388623/mico_bixxmy.jpg",
    ],
    teamNames: ["Jane Clarette Belano", "Justine Juliana Balla", "Raymond Lei Nogalo", "Mico Rabino"],
    bgColor: "#451d6b",
  },
  {
    title: "Inclusivity & Learning Resources",
    icon: "https://res.cloudinary.com/dwp8u82sd/image/upload/v1740388624/sand_go9eom.png",
    details:
      "We offer accessible financial education to everyone, no matter their background or experience level. Our platform is designed to be user-friendly and inclusive, ensuring that beginners can easily understand the basics of personal finance, while more advanced users can deepen their knowledge with complex financial strategies. We aim to break down barriers to financial education, making it approachable and engaging for people from all walks of life.\n\nAdditionally, we provide a variety of resources to help you learn, from articles and lessons to interactive quizzes and more. Our educational content is carefully crafted to cover essential financial topics such as budgeting, saving, investing, debt management, and retirement planning. We offer step-by-step guides, real-life financial scenarios, and practical tips to help users apply their knowledge in everyday situations. Our interactive quizzes and mini-games test your understanding in a fun and dynamic way, ensuring that learning is both enjoyable and effective.",
    bgColor: "#351742",
  },
];

const About = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        position: "absolute",
        background: "linear-gradient(135deg, #5e3967, #351742)",
        color: "#fff",
        overflowY: "auto", // Scrollbar for whole page
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#351742",
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#8c2fc7",
          borderRadius: "5px",
          "&:hover": {
            background: "#a13bdf",
          },
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#8c2fc7 #351742",
      }}
    >
      <Navbar />

      {/* Header with Centered Title */}
      <Box
        sx={{
          height: "20vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
          marginTop: "15vh",
          marginBottom: "5vh",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Fraunces'",
            fontWeight: "bold",
            color: "#fff",
            margin: 0,
            padding: 0,
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'Lilita One'",
            fontSize: "1.2rem",
            color: "#E8D9F0",
            margin: 0,
            padding: 0,
          }}
        >
          Discover the story behind Finance Quest, our mission, and the team driving financial literacy forward.
        </Typography>
      </Box>

      {/* Sections */}
      <Box
        sx={{
          flex: 1,
          width: "90%",
          overflowY: "auto",
          margin: 0,
          padding: 0,
          ml:10,
          
        }}
      >
        {aboutSections.map((section, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: section.bgColor,
              borderRadius: 10,
              padding: 0,
              width: "100%",
              boxShadow: "none",
              mt: 2,
              mb: 8,
            }}
          >
            <CardContent
              sx={{
                margin: 0,
                padding: "30px",
                mb: 5,
                "&:last-child": { paddingBottom: "8px" }, // Override MUI default
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                <Box
                  component="img"
                  src={section.icon}
                  alt={section.title}
                  sx={{
                    width: 60,
                    height: 60,
                    margin: 0,
                    padding: 0,
                    borderRadius: "50%",
                    mb: 3
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Fraunces'",
                    fontWeight: "bold",
                    color: "#fff",
                    margin: 0,
                    padding: 0,
                    mb: 3,
                    ml: 2
                  }}
                >
                  {section.title}
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Lilita One'",
                  fontSize: "1.1rem",
                  color: "#fff",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  margin: 0,
                  padding: 0,
                }}
              >
                {section.details}
              </Typography>

              {/* Team Section */}
              {section.teamImages && section.teamNames && (
                <Grid
                  container
                  spacing={0}
                  sx={{ margin: 0, padding: 0 }}
                >
                  {section.teamImages.map((image, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                      <Box
                        sx={{
                          textAlign: "center",
                          margin: 0,
                          padding: 0,
                          mt: 3,
                        }}
                      >
                        <Box
                          component="img"
                          src={image}
                          alt={section.teamNames[idx]}
                          sx={{
                            width: "100%",
                            maxWidth: 150,
                            height: "auto",
                            borderRadius: "10px",
                            margin: 0,
                            padding: 0,
                          }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontFamily: "'Lilita One'",
                            fontWeight: "bold",
                            color: "#fff",
                            margin: 0,
                            padding: 0,
                            mt: 1,
                          }}
                        >
                          {section.teamNames[idx]}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default About;