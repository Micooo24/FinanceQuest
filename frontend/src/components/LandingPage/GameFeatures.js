import React, { useState } from "react";
import "./GameFeatures.css";
import { Link } from "react-router-dom";

const GameFeatures = () => {

  const [expandedFeatures, setExpandedFeatures] = useState(
    new Array(7).fill(false)
  );

  const features = [
    {
      title: "Real-Life Scenarios",
      description: "Make decisions in relatable financial challenges.",
      details: "Explore realistic financial situations and learn by making impactful decisions in a simulated environment."
    },
    {
      title: "Budgeting Mastery",
      description: "Learn to allocate resources for necessities and savings.",
      details: "Master the art of budgeting to balance expenses, plan savings, and optimize your financial life."
    },
    {
      title: "Savings Goals",
      description: "Plan and achieve financial milestones.",
      details: "Set achievable savings goals and learn strategies to make them a reality through smart planning."
    },
    {
      title: "Debt Management",
      description: "Develop strategies to handle and eliminate debt.",
      details: "Understand effective techniques to manage and reduce debt while maintaining financial stability."
    },
    {
      title: "Financial Tools",
      description: "Use expense trackers, budget planners, and savings calculators.",
      details: "Access advanced tools to track expenses, plan budgets, and calculate savings for better control over finances."
    },
    {
      title: "Progress Tracking",
      description: "Monitor in-game and real-life financial progress.",
      details: "Track your financial achievements and improvements both in the game and real life."
    },
    {
      title: "Learning Hub",
      description: "Access articles, guides, and quizzes to deepen your financial literacy.",
      details: "Expand your knowledge with a variety of resources, including articles, guides, and interactive quizzes."
    }
  ];

 
  const handleFeatureClick = (index) => {

    const newExpandedFeatures = [...expandedFeatures];
    newExpandedFeatures[index] = !newExpandedFeatures[index];
    setExpandedFeatures(newExpandedFeatures);
  };

  return (
    <div className="features-page">
      <nav className="navbar">
        <div className="logo">Finance Quest</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/start-journey">Start Journey</a></li>
          <li><a href="/gamefeatures">Game Features</a></li>
        </ul>
        <Link to="/signup">
          <button className="sign-in">Sign In</button>
        </Link>
      </nav>

      <header className="features-header">
        <h1>Discover Financial Freedom</h1>
        <p>Level up your financial knowledge through interactive gameplay.</p>
      </header>

      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>

            
            <button 
              className="feature-learn-more" 
              onClick={() => handleFeatureClick(index)} 
            >
              {expandedFeatures[index] ? "Show Less" : "Learn More"}
            </button>


            {expandedFeatures[index] && (
              <div className="feature-details">
                <p>{feature.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameFeatures;
