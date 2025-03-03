//linking
import { Link } from "react-router-dom";
//design
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AboutPageInvestGameInteractive = () => {
  const images = [
    {
      src: "./mediaMinigameInvestment/about/pic1.png",
      alt: "Slide 1",
      fallbackColor: "#ff9999",
    },
    {
      src: "./mediaMinigameInvestment/about/pic2.png",
      alt: "Slide 2",
      fallbackColor: "#99ccff",
    },
    {
      src: "./mediaMinigameInvestment/about/pic3.png",
      alt: "Slide 3",
      fallbackColor: "#ccffcc",
    },
    {
      src: "./mediaMinigameInvestment/about/pic4.png",
      alt: "Slide 3",
      fallbackColor: "#ccffcc",
    },
  ];

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(black, #351742)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="about-container"
        style={{
          height: "500px",
          width: "1200px",
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          position: "relative",
          paddingTop: "30px",
          gap: "30px",
          borderRadius: "30px",
          position: "relative",
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
         <Link to="/minigame" style={{ textDecoration: "none" }}>
        {/* Close Button */}
        <IconButton
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Semi-transparent background
            color: "white",
          }}
        >
          
          <CloseIcon />
        </IconButton>
        </Link>
        <div
          className="pictures_what_to_expect_in_the_game"
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            width: "60%",
            height: "80%",
            zIndex: 1,
            color: "#00cac9" /* Change button color to blue-green */,
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // Add Autoplay module
            navigation
            pagination={{ clickable: true }}
            spaceBetween={0} // Remove extra space between slides
            slidesPerView={1}
            loop // Enables continuous sliding
            autoplay={{
              delay: 3000, // Set delay to 3 seconds
              disableOnInteraction: false, // Keeps autoplay even after user interaction
            }}
            style={{
              width: "100%",
              height: "100%", // Ensure Swiper takes up full height
              color: "#00cac9",
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // Ensure images cover the entire SwiperSlide
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: image.fallbackColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                      backgroundImage: image.fallbackImage
                        ? `url(${image.fallbackImage})`
                        : "none", // Fallback image if provided
                      backgroundSize: "cover", // Ensures background image covers the container
                      backgroundRepeat: "no-repeat", // Prevents background repetition
                      backgroundPosition: "center", // Centers the background image
                    }}
                  >
                    {image.alt || "No Image"}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="about-invest-game" style={{ zIndex: 1 }}>
          <header className="about-header">
            <h1>About the Investment Game</h1>
          </header>
          <main className="about-content">
            <p>
              The Investment Game is designed to teach users the fundamentals of
              investing through an interactive and engaging experience. Players
              will learn about risk management, diversification, and long-term
              financial planning as they make decisions in a simulated
              environment.
            </p>
            <section className="features">
              <h2>Key Features</h2>
              <ul>
                <li>Real-world inspired investment scenarios</li>
                <li>Interactive assessments to test knowledge</li>
                <li>Dynamic market simulations</li>
              </ul>
            </section>
            <section className="objectives">
              <h2>Learning Objectives</h2>
              <p>By participating in the game, players will:</p>
              <ul>
                <li>Understand the basics of investment strategies</li>
                <li>Identify and mitigate potential risks</li>
                <li>Learn the importance of financial discipline</li>
              </ul>
            </section>
          </main>
          <div
            className="Buttons"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px",
              gap: 2,
              zIndex: 1,
            }}
          >
            {/* Play Button */}
            <Link to="/Invest_Game" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#d8b6e2", // Light violet color
                  color: "black", // Black font color
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background-color 0.3s, color 0.3s", // Smooth hover effect
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#351742"; // Darker violet on hover
                  e.target.style.color = "white"; // White font on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#d8b6e2"; // Restore light violet
                  e.target.style.color = "black"; // Restore black font
                }}
              >
                Play The Game
              </button>
            </Link>

            {/* See Assessment Button */}
            <Link to="/Invest_Assessment" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#d8b6e2", // Light violet color
                  color: "black", // Black font color
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background-color 0.3s, color 0.3s", // Smooth hover effect
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#351742"; // Darker violet on hover
                  e.target.style.color = "white"; // White font on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#d8b6e2"; // Restore light violet
                  e.target.style.color = "black"; // Restore black font
                }}
              >
                See Assessment
              </button>
            </Link>
          </div>
          <footer className="about-footer">
            <p>&copy; 2025 Investment Game Inc. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AboutPageInvestGameInteractive;
