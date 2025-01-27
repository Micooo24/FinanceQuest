import React, { useEffect, useState } from "react";
import "./LoadingPage.css";

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);

    const dotsInterval = setInterval(() => {
      setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => {
      clearInterval(progressInterval); 
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="loading-page">
      <div className="game-title">Finance Quest</div>
      <div className="loading-text">Loading{loadingDots} {progress}%</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default LoadingPage;
