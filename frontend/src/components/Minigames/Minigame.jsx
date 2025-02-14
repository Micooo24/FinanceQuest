import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of history
import "./Minigame.css"; // Import the external stylesheet

function MinigameScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [enterPressCount, setEnterPressCount] = useState(0); // State to count Enter presses
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBackClick = () => {
    navigate("/"); // Redirects to the home page
  };
  // Handle arrow key navigation and "Enter" key selection
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % 3); // Cycle through options
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + 3) % 3); // Cycle backward
    } else if (e.key === "Enter") {
      setEnterPressCount((prevCount) => prevCount + 1); // Increment Enter press count
    }
  };

  // Handle selecting any option after 2 "Enter" presses
  useEffect(() => {
    if (enterPressCount === 2) {
      switch (selectedIndex) {
        case 0:
          navigate("/budgeting");
          break;
        case 1:
          navigate("/saving");
          break;
        case 2:
          navigate("/investment");
          break;
        default:
          break;
      }
      setEnterPressCount(0); // Reset Enter press count after selection
    }
  }, [enterPressCount, selectedIndex, navigate]); // Use useEffect to trigger the navigation after Enter press count

  // Trigger the key event listener when the page loads
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown); // Add the event listener
    return () => window.removeEventListener("keydown", handleKeyDown); // Cleanup on component unmount
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="minigame-container">
      {/* Back Button */}
      <div className="back-button" onClick={handleBackClick}></div>

      {/* Title Section */}
      <div className="title-container">
        <div className="indicators">
          {["green", "yellow", "red", "blue", "purple"].map((color, index) => (
            <div
              key={index}
              className="indicator-dot"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
        <h1
          style={{ fontFamily: "Fraunces, serif", margin: "0" }}
          className="title"
        >
          WELCOME TO MINI GAMES
        </h1>
      </div>

      {/* Game Options */}
      <div className="options-container">
        {["BUDGETING", "SAVING", "INVESTMENT"].map((option, index) => (
          <div
            key={index}
            className={`option ${selectedIndex === index ? "selected" : ""}`}
          >
            <span>{option}</span>
            {selectedIndex === index && <span className="arrow">&#9664;</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MinigameScreen;
