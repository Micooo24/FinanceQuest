import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

// Importing images for each section
import piggybank from "/assets/piggybank.png";
import building from "/assets/building.png";
import cash from "/assets/cash.png";
import people from "/assets/people.png";
import sand from "/assets/sand.png";
import teamMember1 from "/assets/jane.jpg"; 
import teamMember2 from "/assets/jana.jpg";
import teamMember3 from "/assets/lei.jpg";
import teamMember4 from "/assets/mico.jpg";
import financeQuestImage1 from "/assets/sand.png";  
import financeQuestImage2 from "/assets/sand.png";  
import learningResourcesImage1 from "/assets/sand.png";  
import learningResourcesImage2 from "/assets/sand.png";  

// Data for the About sections
const aboutSections = [
  {
    title: "About Finance Quest",
    icon: piggybank,
    details:
          "Finance Quest is an innovative and educational game where players embark on an exciting journey to achieve financial mastery by making smart financial decisions. The game is designed to be both fun and educational, allowing players to level up by successfully navigating real-world financial scenarios. Players experience various stages of financial growth through interactive storytelling and strategic decision-making.\n\n Built using Python for the backend and Three.js for the dynamic 3D environment. Players engage in strategic missions, face complex financial dilemmas, and participate in mini-games that test their knowledge on topics such as savings, debt management, investing, and smart spending. The game also incorporates real-life financial challenges inspired by scenarios in the Philippines, making it relatable and relevant to players. As players progress, they encounter NPCs who offer quests, financial tips, and challenges, influencing the storyline based on the player’s decisions.",
    bgColor: "#451d6b",
    images: [financeQuestImage1, financeQuestImage2],  // Two images for About Finance Quest
  },
  {
    title: "Mission & Vision",
    icon: building,
    details:
    " VISION \nWe aim to implement financial education by making learning fun, interactive, and impactful through gamified experiences and real-world scenarios. We believe that financial literacy is essential for everyone, regardless of age or background, and should be accessible, engaging, and practical. By transforming complex financial concepts into interactive adventures. \n\nMISSION \n Our mission is to empower individuals with the knowledge and tools they need to make informed financial decisions and reach their goals. We are dedicated to bridging the financial literacy gap by providing an immersive and educational gaming platform that encourages strategic thinking, problem-solving, and informed decision-making. ",
    bgColor: "#351742",
  },
  {
    title: "Our Team",
    icon: people,
    details:
      "Our team is dedicated to providing a comprehensive and engaging learning experience for players. \nMeet our talented team members below:",
    teamImages: [teamMember1, teamMember2, teamMember3, teamMember4],
    teamNames: ["Jane Clarette Belano", "Justine Juliana Balla", "Raymond Lei Nogalo", "Mico Rabino"], // Added team member names
    bgColor: "#8c2fc7",
  },
  {
    title: "Inclusivity & Learning Resources",
    icon: sand,
    details:
      "We offer accessible financial education to everyone, no matter their background or experience level. Our platform is designed to be user-friendly and inclusive, ensuring that beginners can easily understand the basics of personal finance, while more advanced users can deepen their knowledge with complex financial strategies. We aim to break down barriers to financial education, making it approachable and engaging for people from all walks of life. \n \n Additionally, we provide a variety of resources to help you learn, from articles and lessons to interactive quizzes and more. Our educational content is carefully crafted to cover essential financial topics such as budgeting, saving, investing, debt management, and retirement planning. We offer step-by-step guides, real-life financial scenarios, and practical tips to help users apply their knowledge in everyday situations. Our interactive quizzes and mini-games test your understanding in a fun and dynamic way, ensuring that learning is both enjoyable and effective.",
    bgColor: "#451d6b",
    images: [learningResourcesImage1, learningResourcesImage2],  // Two images for Learning Resources
  },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Animation settings for fading in/up and pop effects
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const popEffect = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handleSectionClick = (index) => {
    // Set the active section index when a section is clicked
    setActiveIndex(index);
  };

  return (
    <Box>
      <Navbar />

      {aboutSections.map((section, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          style={{
            height: "100vh",
            position: "relative",
            scrollSnapAlign: "start",
            overflow: "hidden",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #5e3967, #351742)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              width: "80%",
              height: "60vh",
              backgroundColor: section.bgColor,
              transform: "skewY(0deg)",
              zIndex: 2,
              borderRadius: "20px",
              padding: "10px",
              boxShadow: "inset 0 0 0 00 rgba(255, 255, 255, 0.7)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "'Fraunces'",
                color: "#fff",
                mt: 25,
                fontSize: 60,
              }}
            >
              {section.title}
            </Typography>
          </Box>

          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{ opacity: 0, x: "100%" }}
            style={{
              position: "relative",
              zIndex: activeIndex === index ? 3 : 1,
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              color: "#fff",
              borderRadius: "1.5rem",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
              width: "60%",
              transform: activeIndex === index ? "scale(1)" : "scale(0.95)",
              height: 430,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-70px",
                left: "-50px",
                borderRadius: "50%",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 4,
                cursor: "pointer",
                width: "150px",
                height: "150px",
                animation: activeIndex === index ? "spin 1s ease-out" : "pulse 1.5s infinite",
              }}
              onClick={() => handleSectionClick(index)}
            >
              <img
                src={section.icon}
                alt={section.title}
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </Box>

            <motion.div variants={popEffect}>
              <Typography sx={{ color: "#fff" }}></Typography>
            </motion.div>

            <Typography
              sx={{
                mt: 10,
                mb: 1,
                fontSize: "1.2rem",
                fontFamily: "'Lilita One'",
                whiteSpace: "pre-wrap",
                minHeight: "80px",
                opacity: 1,
              }}
            >
              {section.details}
            </Typography>

            {section.teamImages && section.teamNames && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                {section.teamImages.map((teamMember, idx) => (
                  <Box key={idx} sx={{ width: "30%", padding: "10px" }}>
                    <img
                      src={teamMember}
                      alt={section.teamNames[idx]}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#fff",
                        mt: 1,
                        fontFamily: "'Lilita One'",
                      }}
                    >
                      {section.teamNames[idx]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </motion.div>
        </motion.div>
      ))}
    </Box>
  );
};

export default About;